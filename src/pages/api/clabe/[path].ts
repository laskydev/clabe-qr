import {type NextApiRequest, type NextApiResponse} from "next";
import {Clabe} from "~/backend/CLABE/Clabe";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      try {
        const {path} = req.query;
        if (typeof path === "string") {
          const clabe = new Clabe(path);
          const response = await clabe.setDataByPath(path);
          return res.send(response);
        }

        res.status(500).send({error: true, message: "Invalid Path"});
      } catch (e) {
        res.send(e);
      }
      break;
    default:
      res.status(404).send("Not Found Request");
  }
}
