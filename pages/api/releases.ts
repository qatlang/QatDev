import { NextApiRequest, NextApiResponse } from "next";
import { ILanguageRelease } from "../../models/interfaces";
import { Env } from "../../models/env";

export default async function ReleasesListHandler(req: NextApiRequest, res: NextApiResponse) {
	try {
		const result = await fetch(Env.serverUrl() + "/releases", {
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
							architecture: f.target,
							path: f.path,
						}
					}),
					createdAt: r.createdAt,
				}
			})
		});
	} catch (e) {
		return res.status(500).json({});
	}
}