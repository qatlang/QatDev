import { NextApiRequest, NextApiResponse } from "next";
import { IGithubPushEvent, IGitlabPushEvent, ICommit } from "../../models/interfaces";
import * as crypto from 'crypto';
import { Env } from "../../models/env";
import pb, { Tables } from "../../models/pb";

export default async function RepoEventHandler(req: NextApiRequest, resp: NextApiResponse) {
	if (req.headers['x-gitlab-token'] === Env.gitlabEventSecret()) {
		if (req.headers['x-gitlab-event'] === "Push Hook") {
			if (req.headers['content-type'] !== 'application/json') {
				console.error("Incorrect content type for request");
				return resp.status(406).send({});
			}
			const pushEvent = req.body as IGitlabPushEvent;
			if (pushEvent.commits.length !== 0) {
				try {
					uploadNewCommits(gitlabCommitsToICommits(pushEvent));
					return resp.status(200).send({});
				} catch (e) {
					console.dir(e, { depth: null });
					console.error("Error while posting repo update");
					return resp.status(500).send({});
				}
			}
		} else {
			console.error("No correct Gitlab event found")
			return resp.status(404).send({});
		}
	} else if (req.headers['x-github-event'] === "push") {
		if ((req.headers['x-hub-signature-256'] ?? '').includes('sha256=')) {
			let hmac = crypto.createHmac('sha256', Env.githubEventSecret());
			const digest = hmac.update(JSON.stringify(req.body)).digest('hex');
			if (digest === ((req.headers['x-hub-signature-256']! as string).substring(7))) {
				console.debug("Signature matches");
				if (req.headers['content-type'] !== "application/json") {
					console.error("Content type is not JSON");
					return resp.status(406).send({});
				}
				const pushEvent = req.body as IGithubPushEvent;
				if (pushEvent.commits.length !== 0 && (pushEvent.ref.split('/')[1] !== 'tags')) {
					uploadNewCommits(githubCommitsToICommits(pushEvent))
				} else {
					return resp.status(406).send({});
				}
			} else {
				console.error("Signature does not match")
				return resp.status(400).send({});
			}
		} else {
			console.error("No signature found in headers")
			return resp.status(400).send({});
		}
	} else {
		console.error("No expected headers found");
		return resp.status(400).send({});
	}
	return resp.status(200).send({});
}

function splitCommitMessage(total: string): { title: string, message: string } {
	let title = total;
	let message = '';
	if (total.includes('\n\n')) {
		let i = 0;
		for (; i < total.length; i++) {
			if ((total.at(i) === '\n') || ((total.length > (i + 1)) && (total.at(i + 1) === '\n'))) {
				i++;
				break;
			}
		}
		title = total.split('\n\n')[0];
		message = total.substring(i + 1);
	}
	return { title, message };
}

function gitlabCommitsToICommits(event: IGitlabPushEvent): ICommit[] {
	let result: ICommit[] = [];
	for (let i = 0; i < event.commits.length; i++) {
		let { title, message } = splitCommitMessage(event.commits[i].message);
		result.push({
			author: { name: event.user_name, email: event.user_email },
			id: crypto.randomUUID().toString(),
			title,
			message,
			ref: event.ref,
			repository: event.repository.name,
			site: 'gitlab',
			timestamp: event.commits[i].timestamp,
		});
	}
	return result;
}

function githubCommitsToICommits(event: IGithubPushEvent): ICommit[] {
	let result: ICommit[] = [];
	for (let i = 0; i < event.commits.length; i++) {
		let { title, message } = splitCommitMessage(event.commits[i].message);
		result.push({
			author: { name: event.pusher.name, email: event.pusher.email ?? undefined },
			id: crypto.randomUUID().toString(),
			title,
			message,
			ref: event.ref,
			repository: event.repository.full_name,
			site: 'github',
			timestamp: event.commits[i].timestamp,
		});
	}
	return result;
}

export function uploadNewCommits(commits: ICommit[]) {
	for (let i = 0; i < commits.length; i++) {
		pb.collection(Tables.commits).create(commits[i], { requestKey: null });
	}
}