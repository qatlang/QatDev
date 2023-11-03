import { NextApiRequest, NextApiResponse } from "next";
import { Env } from "../../models/env";

export default async function DownloadedReleaseHandler(req: NextApiRequest, res: NextApiResponse) {
	try {
		const body = await JSON.parse(req.body) as { content: string, time: string, confirmationKey: string };
		if (body.confirmationKey === Env.confirmationKey()) {
			const result = await fetch(Env.serverUrl() + "/downloadedRelease", {
				method: "POST",
				mode: "cors",
				body: JSON.stringify(body),
				cache: 'no-cache',
			});
			return res.status(200).json(await result.json());
		} else {
			return res.status(406).json({});
		}
	} catch (e) {
		return res.status(500).json({});
	}
}