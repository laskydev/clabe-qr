import {type NextApiRequest, type NextApiResponse} from "next";
import {Clabe, type ModelClabe} from "~/backend/CLABE/Clabe";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const {
          CLABE,
          banco,
          nombreDeCuentaBancaria,
          owner,
          whatsapp,
          whatsappButtonActive,
          path,
        }: ModelClabe = req.body;

        const clabe = new Clabe();
        const response = await clabe.saveCLABEInDB({
          CLABE,
          banco,
          nombreDeCuentaBancaria,
          owner,
          whatsapp,
          whatsappButtonActive,
          path,
        });
        res.send(response);
      } catch (e) {
        res.send(e);
      }
      break;
    default:
      res.status(404).send("Not Found Request");
  }
}
