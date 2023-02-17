import { Env } from "../models/env";
import { IPushedCommit } from "../models/interfaces";

export default function uploadNewCommits(commits: IPushedCommit[]) {
	fetch(Env.serverUrl() + "/newCommits", {
		method: "POST",
		mode: "cors",
		body: JSON.stringify({
			confirmationKey: Env.confirmationKey(),
			commits,
		}),
		cache: 'no-cache',
	});
}