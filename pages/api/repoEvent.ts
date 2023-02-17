import { NextApiRequest, NextApiResponse } from "next";
import { IGithubPushEvent, IGitlabPushEvent, IPushedCommit } from "../../models/interfaces";
import { ChannelType, Client, GatewayIntentBits, TextChannel } from 'discord.js';
import { setTimeout } from "timers/promises";
import * as crypto from 'crypto';
import uploadNewCommits from "../../utils/newCommits";
import { Env } from "../../models/env";

let discordClient: Client | null;

let allChannels: {
	repo: TextChannel | null,
} = { repo: null };

async function getDiscordClient() {
	if (!discordClient) {
		discordClient = new Client({
			intents: [
				GatewayIntentBits.Guilds,
				GatewayIntentBits.GuildMembers,
				GatewayIntentBits.GuildBans,
				GatewayIntentBits.GuildEmojisAndStickers,
				GatewayIntentBits.GuildIntegrations,
				GatewayIntentBits.GuildWebhooks,
				GatewayIntentBits.GuildInvites,
				GatewayIntentBits.GuildVoiceStates,
				GatewayIntentBits.GuildPresences,
				GatewayIntentBits.GuildMessages,
				GatewayIntentBits.GuildMessageReactions,
				GatewayIntentBits.GuildMessageTyping,
				GatewayIntentBits.DirectMessages,
				GatewayIntentBits.DirectMessageReactions,
				GatewayIntentBits.DirectMessageTyping,
				GatewayIntentBits.MessageContent,
				GatewayIntentBits.GuildScheduledEvents,
				GatewayIntentBits.AutoModerationConfiguration,
				GatewayIntentBits.AutoModerationExecution
			]
		});
		discordClient.login(Env.discordBotToken());
		await setTimeout(3000);
	}
}

async function getChannels() {
	if (discordClient && !allChannels.repo) {
		let repoChan = await discordClient.channels.fetch(Env.discordRepoChannel());
		console.log("Got repo channel")
		if (repoChan && repoChan.type === ChannelType.GuildText) {
			allChannels.repo = repoChan as TextChannel;
		}
	}
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

function gitlabCommitsToPushedCommits(event: IGitlabPushEvent): IPushedCommit[] {
	let result: IPushedCommit[] = [];
	for (let i = 0; i < event.commits.length; i++) {
		let { title, message } = splitCommitMessage(event.commits[i].message);
		result.push({
			confirmationKey: Env.confirmationKey(),
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

function githubCommitsToPushedCommits(event: IGithubPushEvent): IPushedCommit[] {
	let result: IPushedCommit[] = [];
	for (let i = 0; i < event.commits.length; i++) {
		let { title, message } = splitCommitMessage(event.commits[i].message);
		result.push({
			confirmationKey: Env.confirmationKey(),
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

export default async function repoEvent(req: NextApiRequest, resp: NextApiResponse) {
	await getDiscordClient();
	await getChannels();
	if (req.headers['x-gitlab-token'] === Env.gitlabEventSecret()) {
		if (req.headers['x-gitlab-event'] === "Push Hook") {
			if (req.headers['content-type'] !== 'application/json') {
				console.log("Incorrect content type for request");
				return resp.status(406).send({});
			}
			const pushEvent = req.body as IGitlabPushEvent;
			if (pushEvent.commits.length !== 0) {
				try {
					uploadNewCommits(gitlabCommitsToPushedCommits(pushEvent))
					if (allChannels.repo) {
						allChannels.repo.send(
							`\`Gitlab\` **\`${pushEvent.project.path_with_namespace}\`**  ::  \`${pushEvent.ref.includes('/')
								? pushEvent.ref.split('/')[pushEvent.ref.split('/').length - 1]
								: pushEvent.ref}\`
Pushed ${pushEvent.commits.length.toString()} commit${(pushEvent.commits.length == 1)
								? '' : 's'}
` + "\n" + pushEvent.commits.map((cm) => {
									return `**${cm.title}**
<${cm.url}>
${cm.message.includes(cm.title) ? cm.message.split(cm.title + '\n')[1] : cm.message}` + (cm.added.length === 0 ? "" : `
> ✨  ${cm.added.map(val => '*' + val + '*').join(', ')}`) + (cm.modified.length === 0 ? "" : `
> ✍️  ${cm.modified.map(val => '*' + val + '*').join(', ')}`) + (cm.removed.length === 0 ? "" : `
> 🗑️  ${cm.removed.map(val => '*' + val + '*').join(', ')}`) + `
`;
								}).join('--------------------------------------------------------------------------------------------------\n') + '\n'
							+ `by **${pushEvent.user_name}**
 
......
`
						).catch((e) => console.log("Error while creating the message: ", e))
					} else {
						console.log("Repo channel could not be retrieved");
					}
				} catch (e) {
					console.log("Error while posting repo update: ", e);
				}
			}
		} else if (req.headers['x-gitlab-event'] == 'Tag Push Hook') {
			if (req.headers['content-type'] !== 'application/json') {
				console.log("Incorrect content type for request");
				return resp.status(406).send({});
			}
			if (allChannels.repo) {
				const tagEvent = req.body as IGitlabPushEvent;
				allChannels.repo.send(
					`\`Gitlab\` **\`${tagEvent.project.path_with_namespace}\`**
Newly created tag ***${tagEvent.ref.split('/')[tagEvent.ref.split('/').length - 1]}***
Checkout SHA \`${tagEvent.checkout_sha}\``);
			}
		} else {
			console.log("No correct Gitlab event found")
		}
	} else if (req.headers['x-github-event'] === "push") {
		if ((req.headers['x-hub-signature-256'] ?? '').includes('sha256=')) {
			let hmac = crypto.createHmac('sha256', Env.githubEventSecret());
			const digest = hmac.update(JSON.stringify(req.body)).digest('hex');
			if (digest === ((req.headers['x-hub-signature-256']! as string).substring(7))) {
				console.log("Signature matches");
				if (req.headers['content-type'] !== "application/json") {
					console.log("Content type is not JSON");
					return resp.status(406).send({});
				}
				const pushEvent = req.body as IGithubPushEvent;
				if (pushEvent.commits.length !== 0 && (pushEvent.ref.split('/')[1] !== 'tags')) {
					uploadNewCommits(githubCommitsToPushedCommits(pushEvent))
					try {
						if (allChannels.repo) {
							allChannels.repo.send(
								`\`Github\` **\`${pushEvent.repository.full_name}\`**  ::  \`${pushEvent.ref.includes('/')
									? pushEvent.ref.split('/')[pushEvent.ref.split('/').length - 1]
									: pushEvent.ref}\`
   Pushed ${pushEvent.commits.length.toString()} commit${(pushEvent.commits.length == 1)
									? '' : 's'}
   ` + "\n" + pushEvent.commits.map((cm) => {
										let commitTitle = cm.message.includes('\n') ? cm.message.split('\n')[0] : cm.message.substring(0, cm.message.length > 20 ? 20 : undefined);
										return `**${commitTitle}**
   <${cm.url}>
   ${cm.message.includes(commitTitle) ? cm.message.split(commitTitle + '\n')[1] : cm.message}` + ((cm.added ?? []).length === 0 ? "" : `
   > ✨  ${cm.added!.map(val => '*' + val + '*').join(', ')}`) + ((cm.modified ?? []).length === 0 ? "" : `
   > ✍️  ${cm.modified!.map(val => '*' + val + '*').join(', ')}`) + ((cm.removed ?? []).length === 0 ? "" : `
   > 🗑️  ${cm.removed!.map(val => '*' + val + '*').join(', ')}`) + `
   `;
									}).join('--------------------------------------------------------------------------------------------------\n') + '\n'
								+ `by **${pushEvent.pusher.name}**
    
   ......
   `
							).catch((e) => console.log("Error while creating the message: ", e))
						} else {
							console.log("Repo channel could not be retrieved");
							return resp.status(500).send({});
						}
					} catch (e) {
						console.log("Error while posting repo update: ", e);
						return resp.status(500).send({});
					}
				} else if (pushEvent.ref.split('/')[1] === 'tags') {
					if (allChannels.repo) {
						allChannels.repo.send(
							`\`Github\` **\`${pushEvent.repository?.full_name ?? 'Unknown repository'}\`**
      Newly created tag ***${pushEvent.ref.split('/')[pushEvent.ref.split('/').length - 1]}***
      Checkout SHA \`${pushEvent.after}\``);
						return resp.status(200).send({});
					} else {
						return resp.status(500).send({});
					}
				} else {
					return resp.status(406).send({});
				}
			} else {
				console.log("Signature does not match")
				return resp.status(400).send({});
			}
		} else {
			console.log("No signature found in headers")
			return resp.status(400).send({});
		}
	} else {
		console.log("No expected headers found");
		return resp.status(400).send({});
	}
	return resp.status(200).send({});
}