import { NextApiRequest, NextApiResponse } from "next";
import { Env } from "../../models/env";

export default async function WorkStatsHandler(req: NextApiRequest, res: NextApiResponse) {
	try {
		const getProjectStats = (prj: string) => {
			return fetch(
				"https://wakatime.com/api/v1/users/current/all_time_since_today?project=" +
				prj,
				{
					method: "GET",
					mode: "cors",
					headers: {
						Authorization:
							"Bearer " + Env.wakatimeAccessToken(),
						"Access-Control-Origin-Policy": "*",
					},
					next: { revalidate: 7200 },
				}
			);
		};
		const compilerRes = await getProjectStats("qat");
		const siteRes = await getProjectStats("qatdev");
		const serverRes = await getProjectStats("QatDevServer");
		const vscodeRes = await getProjectStats("qat_vscode");
		const docsRes = await getProjectStats("QatDocs");
		return res.status(200).json({
			compiler: await compilerRes.json(),
			website: await siteRes.json(),
			server: await serverRes.json(),
			vscode: await vscodeRes.json(),
			docs: await docsRes.json(),
		});
	} catch (e) {
		console.log("Error trying to get wakatime stats: ", e);
		return res.status(200).json({});
	}
}