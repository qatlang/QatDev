import { NextApiRequest, NextApiResponse } from "next";

export default async function DownloadedReleaseHandler(req: NextApiRequest, res: NextApiResponse) {
	try {
		if (req.method === 'GET') {
			const result = await fetch(process.env['NEXT_PUBLIC_SERVER_URL'] + "/latestCommit", {
				method: "GET",
				mode: "cors",
				cache: 'no-cache',
			});
			return res.status(200).json(await result.json());
		} else {
			return res.status(405).json({});
		}
	} catch (e) {
		return res.status(200).json({});
	}
}