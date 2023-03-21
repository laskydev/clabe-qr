import {NextApiRequest, NextApiResponse} from "next";
import {isValidEmail} from "~/utils/isValidEmail";
import {User} from "~/backend/User/User";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const {
          email,
          name,
          password,
        }: { email: string; name: string; password: string } = req.body;

        if (!isValidEmail(email))
          return res.send({error: true, message: "Email incorrecto"});
        if (
            name?.length <= 0 &&
            password?.length <= 0
        )
          return res.send({
            error: true,
            message: "Nombre y/o password faltantes",
          });

        const user = new User(email)
        const response = await user.saveUserInDb({password, name})
        res.send(response)

      } catch (e) {
        res.send(e);
      }
      break;
    default:
      res.status(404).send("Not Found Request");
  }
}
