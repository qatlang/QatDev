import { NextApiRequest, NextApiResponse } from "next";
import pb from "../../models/pb";
import http from 'http'

export default async function ImagesHandler(req: NextApiRequest, res: NextApiResponse) {
	try {
		if (req.method === "GET" && req.query["id"]) {
			const filename = (await pb.collection("images").getOne<{ file: string }>(req.query["id"] as string)).file;
			let url = pb.files.getUrl({ collectionId: pb.collection("images").collectionIdOrName, id: req.query["id"] }, filename);
			http.get(url, (resp) => {
				let chunks: any[] = [];
				resp.on('data', chunk => {
					chunks.push(chunk);
				});
				resp.on('end', () => {
					res.status(200).send(Buffer.concat(chunks));
				})
			}).on("error", (e) => {
				console.log(e.message);
				res.status(500).send({});
			});
		} else {
			return res.status(500).json({});
		}
	} catch (e) {
		return res.status(500).json({});
	}
}