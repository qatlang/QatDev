import { NextApiRequest, NextApiResponse } from "next";
import { ILanguagePublicRelease } from "../../models/interfaces";

export default async function ReleasesListHandler(req: NextApiRequest, res: NextApiResponse) {
   try {
      const result = await fetch(process.env['NEXT_PUBLIC_SERVER_URL'] + "/releases", {
         method: "GET",
         mode: "cors",
         cache: 'no-cache',
      });
      return res.status(200).json((await result.json()) as { releases: ILanguagePublicRelease[] });
   } catch (e) {
      return res.status(200).json({});
   }
}