import { NextApiRequest, NextApiResponse } from "next";
import { IGitlabRepositoryPushEvent as IGitlabRepositoryEvent } from "../../models/interfaces";
import { ChannelType, TextChannel } from 'discord.js';
let discordConfig = require('../../models/discord');

let allChannels: {
   repo: TextChannel | null,
} = { repo: null };

async function getChannels() {
   if (discordConfig && discordConfig.discordClient && !allChannels.repo) {
      let repoChan = await discordConfig.discordClient.channels.fetch(process.env['NEXT_PUBLIC_DISCORD_REPO_CHANNEL']?.toString() ?? '');
      console.log("Got repo channel")
      if (repoChan && repoChan.type === ChannelType.GuildText) {
         allChannels.repo = repoChan as TextChannel;
      }
   }
}

export default async function repoEvent(req: NextApiRequest, resp: NextApiResponse) {
   await getChannels();
   if (req.headers['x-gitlab-token'] === process.env['NEXT_PUBLIC_GITLAB_EVENT_SECRET']) {
      if (req.headers['x-gitlab-event'] === "Push Hook") {
         if (req.headers['content-type'] !== 'application/json') {
            console.log("Incorrect content type for request");
            return resp.status(406).send({});
         }
         const pushEvent = req.body as IGitlabRepositoryEvent;
         if (pushEvent.commits.length !== 0) {
            try {
               if (allChannels.repo) {
                  allChannels.repo.send(
                     `**\`${pushEvent.project.path_with_namespace}\`**  ::  \`${pushEvent.ref.split('/')[pushEvent.ref.split('/').length - 1]}\`
${pushEvent.commits.length.toString()} incoming commit${(pushEvent.commits.length == 1)
                        ? '' : 's'}
` + "\n" + pushEvent.commits.map((cm) => {
                           return `**${cm.title}**
<${cm.url}>
${cm.message.includes(cm.title) ? cm.message.split(cm.title + '\n')[1] : cm.message}` + (cm.added.length === 0 ? "" : `
✨  ${cm.added.map(val => '*' + val + '*').join(', ')}`) + (cm.modified.length === 0 ? "" : `
✍️  ${cm.modified.map(val => '*' + val + '*').join(', ')}`) + (cm.removed.length === 0 ? "" : `
🗑️  ${cm.removed.map(val => '*' + val + '*').join(', ')}`) + `
`;
                        }).join('\n-------------------------------------------------------------------------------------------\n\n') + '\n'
                     + `by **${pushEvent.user_name}**

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
            const tagEvent = req.body as IGitlabRepositoryEvent;
            allChannels.repo.send(
               `**\`${tagEvent.project.path_with_namespace}\`**
Newly created tag ***${tagEvent.ref.split('/')[tagEvent.ref.split('/').length - 1]}***
Checkout SHA \`${tagEvent.checkout_sha}\``);
         }
      } else {
         console.log("No correct Gitlab event found")
      }
   } else {
      console.log("Gitlab token header not found");
   }
   return resp.status(200).send({});
}