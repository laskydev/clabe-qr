import {collection, doc, getDoc, setDoc} from "firebase/firestore";
import {db} from "~/backend/db";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import bcrypt from "bcrypt";
import {formatDate} from "~/utils/formatDate";

export class User {
  email: string;
  name?: string;
  dateSignup?: string;
  lastConnect?: string;

  constructor(email: string) {
    this.email = email;
  }

  public async isNewUser() {
    try {
      const docRef = doc(db, "users", this.email); // Crear una referencia al documento utilizando el email
      const docSnapshot = await getDoc(docRef); // Obtener el documento
      return !docSnapshot.exists(); // Devolver true si el documento no existe, false si existe
    } catch (error) {
      console.error("Error al verificar si el documento existe:", error);
      return false;
    }
  }

  public async saveUserInDb({
                              password,
                              name,
                            }: {
    password: string;
    name: string;
  }) {
    try {
      //Validacion de usuario repetido
      const isNewUser = await this.isNewUser();
      if (!isNewUser) return {error: true, message: "El email ya se encuentra registrado"};

      // Hasheo de la password
      const hashedPassword = await this.encryptPassword(password);

      //Normalizacion de la data

      this.name = name;
      this.dateSignup = formatDate(new Date());
      this.lastConnect = formatDate(new Date());

      const userData = {
        email: this.email,
        name: this.name,
        dateSignUp: this.dateSignup,
        lastConnect: this.lastConnect,
      };

      const docRef = doc(db, "users", this.email); // Crear una referencia al documento utilizando el email del usuario
      await setDoc(docRef, {...userData, password: hashedPassword}); // Crear el documento con los datos proporcionados
      return userData;
    } catch (error) {
      console.error("Error al crear el documento:", error);
    }
  }

  public async verifyPassword(passwordPlain: string): Promise<boolean> {
    const userDocRef = doc(collection(db, "users"), this.email);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const encryptedPassword = userDoc.data().password;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
      const match = await bcrypt.compare(passwordPlain, encryptedPassword);
      return match as boolean
    } else {
      throw new Error(`No se encontró el usuario con email: ${this.email}`);
    }
  }

  public async getUserData() {
    const userDocRef = doc(collection(db, "users"), this.email);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const userData = userDoc.data()
      this.name = userData.name as string
      this.dateSignup = userData.dateSignup as string
      this.lastConnect = userData.lastConnect as string

      return {
        email: this.email,
        name: this.name
      }

    } else {
      return {
        error: true,
        message: 'El usuario no se encuentra registrado'
      }
    }
  }

  private async encryptPassword(password: string) {
    const saltRounds = 10;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    const hashedPassword = (await bcrypt.hash(password, saltRounds)) as string;
    return hashedPassword;
  }
}
