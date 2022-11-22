import { NextApiRequest, NextApiResponse } from "next";

export default async function CompileHandler(req: NextApiRequest, res: NextApiResponse) {
   const body = JSON.parse(req.body);
   try {
      const result = await fetch("http://localhost:5000/compile", {
         method: "POST",
         mode: "cors",
         body: JSON.stringify({ content: body.content, time: body.time }),
         next: { revalidate: 0 },
      });
      return res.status(200).json(await result.json());
   } catch (e) {
      console.log("Error trying to compile file: ", e);
      return res.status(200).json({});
   }
}