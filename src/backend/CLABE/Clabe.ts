import {collection, doc, getDoc, setDoc} from "firebase/firestore";
import {db} from "~/backend/db";

export interface ModelClabe {
  CLABE: string;
  owner: string;
  banco: string;
  whatsapp: string;
  nombreDeCuentaBancaria: string;
  whatsappButtonActive: boolean;

  path: string;
}

const COLLECTION_ID = "CLABES";

export class Clabe {
  CLABE?: string;
  owner?: string;
  banco?: string;
  whatsapp?: string;
  clabesCopiadas?: number;
  nombreDeCuentaBancaria?: string;
  whatsappButtonActive?: boolean;
  visitasDeCLABE?: number;
  path?: string;

  constructor(path?: string) {
    if (path) {
      this.path = path
    }
  }

  public async saveCLABEInDB({
                               CLABE,
                               banco,
                               nombreDeCuentaBancaria,
                               owner,
                               whatsapp,
                               whatsappButtonActive,
                               path,
                             }: ModelClabe) {
    const isNewPath = await this.isNewPath(path);
    if (!isNewPath) return {error: true, message: 'El url ya se encuentra utilizado por una CLABE'}

    //Normalizacion de la data
    this.path = path;
    this.visitasDeCLABE = 0;
    this.clabesCopiadas = 0;
    this.CLABE = CLABE;
    this.banco = banco;
    this.nombreDeCuentaBancaria = nombreDeCuentaBancaria;
    this.whatsapp = whatsapp;
    this.owner = owner;
    this.whatsappButtonActive = whatsappButtonActive;
    console.log(this);
    const docRef = doc(db, COLLECTION_ID, path); // Crear una referencia al documento utilizando el email del usuario
    await setDoc(docRef, {
      ...this,
    });
    return this;
  }

  public async setDataByPath(path: string) {
    const isNewPath = await this.isNewPath(path);
    if (isNewPath)
      return {error: true, message: 'Path not found'}

    const pathDocRef = doc(collection(db, COLLECTION_ID), path);
    const pathDoc = await getDoc(pathDocRef);
    const pathData = pathDoc.data();

    this.CLABE = pathData?.clabe as string;
    this.banco = pathData?.banco as string;
    this.clabesCopiadas = pathData?.clabesCopiadas as number;
    this.whatsapp = pathData?.whatsapp as string;
    this.nombreDeCuentaBancaria = pathData?.nombreDeCuentaBancaria as string;
    this.whatsappButtonActive = pathData?.whatsappButtonActive as boolean;
    this.visitasDeCLABE = pathData?.visitasDeCLABE as number;
    this.owner = pathData?.owner as string;
    this.path = path;

    return this
  }

  private async isNewPath(path: string) {
    const docRef = doc(db, COLLECTION_ID, path);
    const docSnapshot = await getDoc(docRef);
    return !docSnapshot.exists();
  }
}
