import { NextApiRequest, NextApiResponse } from "next";
import { ILanguagePublicRelease, ILanguageRelease } from "../../models/interfaces";

export default async function ReleasesListHandler(req: NextApiRequest, res: NextApiResponse) {
   try {
      const result = await fetch(process.env['NEXT_PUBLIC_SERVER_URL'] + "/releases", {
         method: "GET",
         mode: "cors",
         cache: 'no-cache',
      });
      return res.status(200).json({
         releases: ((await result.json()) as { releases: ILanguageRelease[] }).releases.map((r) => {
            return {
               version: r.version,
               title: r.title,
               content: r.content,
               files: r.files.map((f) => {
                  return {
                     platform: f.platform,
                     architecture: f.architecture,
                     path: f.path,
                  }
               }),
               createdAt: r.createdAt,
            }
         })
      });
   } catch (e) {
      return res.status(200).json({});
   }
}