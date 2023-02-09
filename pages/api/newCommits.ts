import { NextApiRequest, NextApiResponse } from "next";
import { IPushedCommit } from "../../models/interfaces";

export default async function NewCommitsHandler(req: NextApiRequest, res: NextApiResponse) {
	try {
		const body = await JSON.parse(req.body) as { confirmationKey: string, commits: IPushedCommit[] };
		if (body.confirmationKey === process.env['NEXT_PUBLIC_CONFIRMATION_KEY']) {
			const result = await fetch(process.env['NEXT_PUBLIC_SERVER_URL'] + "/newCommits", {
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
		return res.status(200).json({});
	}
}