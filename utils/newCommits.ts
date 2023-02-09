import { IPushedCommit } from "../models/interfaces";

export default function uploadNewCommits(commits: IPushedCommit[]) {
	fetch(process.env['NEXT_PUBLIC_SERVER_URL'] + "/newCommits", {
		method: "POST",
		mode: "cors",
		body: JSON.stringify({
			confirmationKey: process.env['NEXT_PUBLIC_CONFIRMATION_KEY'] ?? '',
			commits,
		}),
		cache: 'no-cache',
	});
}