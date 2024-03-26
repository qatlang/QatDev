import { NextApiRequest, NextApiResponse } from "next";
import pb, { Tables } from "../../models/pb";
import http from 'http'
import { Env } from "../../models/env";

export default async function ImagesHandler(req: NextApiRequest, res: NextApiResponse) {
	try {
		if (req.method === "GET" && req.query["id"]) {
			const filename = (await pb.collection(Tables.images).getOne<{ file: string }>(req.query["id"] as string)).file;
			let url = pb.files.getUrl({ collectionId: pb.collection(Tables.images).collectionIdOrName, id: req.query["id"] }, filename);
			http.get(url, (resp) => {
				let chunks: any[] = [];
				resp.on('data', chunk => {
					chunks.push(chunk);
				});
				resp.on('end', () => {
					return res.status(200).send(Buffer.concat(chunks));
				})
			}).on("error", (e) => {
				console.log(e.message);
				return res.status(500).send({});
			});
		} else if (req.method === "POST") {
			const body = JSON.parse(req.body) as { confirmationKey: string; data: FormData };
			if (body.confirmationKey === Env.confirmationKey()) {
				const res = await pb.collection(Tables.images).create(body.data)
				return res.status(200).json(res);
			} else {
				return res.status(404).json({});
			}
		} else if (req.method === "DELETE") {
			const body = JSON.parse(req.body) as { confirmationKey: string; id: string };
			if (body.confirmationKey === Env.confirmationKey()) {
				const deleted = await pb.collection(Tables.images).delete(body.id);
				return res.status(200).json({ deleted: deleted });
			} else {
				return res.status(404).json({});
			}
		} else {
			return res.status(500).json({});
		}
	} catch (e) {
		return res.status(500).json({});
	}
}