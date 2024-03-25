import { RecordModel } from "pocketbase";
import pb, { Tables } from "../models/pb";

export async function addImageFromBlob(name: string, blob: Blob): Promise<RecordModel> {
	let imageData = new FormData();
	imageData.append("file", blob, name);
	return await pb.collection(Tables.images).create(imageData);
}

export function removeImageByID(id: string) {
	pb.collection(Tables.images).delete(id, { requestKey: null });
}