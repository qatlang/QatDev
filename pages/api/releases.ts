import { NextApiRequest, NextApiResponse } from "next";

export default async function ReleasesListHandler(req: NextApiRequest, res: NextApiResponse) {
   try {
      const result = await fetch(process.env['NEXT_PUBLIC_SERVER_URL'] + "/releases", {
         method: "GET",
         mode: "cors",
         cache: 'no-cache',
      });
      return res.status(200).json(await result.json());
   } catch (e) {
      return res.status(200).json({});
   }
}