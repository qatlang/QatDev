import { NextApiRequest, NextApiResponse } from "next";

export default async function CompileHandler(req: NextApiRequest, res: NextApiResponse) {
   try {
      const body = JSON.parse(req.body) as { content: string, time: string, confirmationKey: string };
      if (body.confirmationKey === process.env['NEXT_PUBLIC_CONFIRMATION_KEY']) {
         const result = await fetch(process.env['NEXT_PUBLIC_SERVER_URL'] + "/compile", {
            method: "POST",
            mode: "cors",
            body: JSON.stringify(body),
            cache: 'no-cache',
         });
         console.log("Server returned result", (new Date()).toString())
         return res.status(200).json(await result.json());
      } else {
         console.log("Unauthorized access")
         return res.status(406).json({});
      }
   } catch (e) {
      console.log("Error compiling file: ", e);
      return res.status(200).json({});
   }
}