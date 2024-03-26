import { RecordModel } from "pocketbase";
import { Env } from "../models/env";

export async function addImageToDB(name: string, dataURL: string): Promise<RecordModel | null> {
	let res = await fetch('/api/images', {
		method: 'POST',
		body: JSON.stringify({ confirmationKey: Env.confirmationKey(), name: name, dataURL: dataURL }),
		cache: 'no-store'
	});
	if (res.status === 200) {
		return (await res.json()) as RecordModel;
	} else {
		return null;
	}
}

export async function removeImageByID(id: string): Promise<boolean> {
	let res = await fetch('/api/images', {
		method: 'DELETE',
		body: JSON.stringify({ confirmationKey: Env.confirmationKey(), id: id })
	})
	if (res.status === 200) {
		return (await res.json() as { deleted: boolean }).deleted;
	} else {
		return false;
	}
}