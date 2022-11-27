import { NextApiRequest, NextApiResponse } from "next";
import { IGitlabRepositoryPushEvent } from "../../models/interfaces";
import { ChannelType, Client, GatewayIntentBits, TextChannel } from 'discord.js';
import { setTimeout } from "timers/promises";

let discordClient: Client | null = null;

export default async function repoEvent(req: NextApiRequest, resp: NextApiResponse) {
   if (req.headers['X-Gitlab-Token'] === process.env['NEXT_PUBLIC_GITLAB_EVENT_SECRET']) {
      if (req.headers['X-Gitlab-Event'] === "Push Hook") {
         if (req.headers['Content-Type'] === 'application/json') {
            const pushEvent = JSON.parse(req.body) as IGitlabRepositoryPushEvent;
            if (pushEvent.commits.length !== 0) {
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
                  discordClient.login(process.env['NEXT_PUBLIC_DISCORD_BOT_TOKEN']);
                  await setTimeout(5000);
               }
               try {
                  let repoChannel = await discordClient.channels.fetch(process.env['NEXT_PUBLIC_DISCORD_REPO_CHANNEL']?.toString() ?? '');
                  if (repoChannel && repoChannel.type === ChannelType.GuildText) {
                     (repoChannel as TextChannel).send(
                        `${pushEvent.commits.length.toString()} commit${(pushEvent.commits.length == 1)
                           ? '' : 's'
                        } pushed to ***${pushEvent.project.path_with_namespace}***
 ` + "\n" + pushEvent.commits.map((cm) => {
                           return `\`${cm.id}\` **${cm.title}**
${cm.url}
${cm.message}
✨  ${cm.added.map(val => '*' + val + '*').join(', ')}
✍️  ${cm.modified.map(val => '*' + val + '*').join(', ')}
🗑️  ${cm.removed.map(val => '*' + val + '*').join(', ')}
`;
                        }).join('\n') + '\n\n'
                        + `by **${pushEvent.user_name}**`
                     ).catch((e) => console.log("Error while creating the message: ", e))
                  } else {
                     console.log("Repo channel could not be retrieved");
                  }
               } catch (e) {
                  console.log("Error while posting repo update: ", e);
               }
               return resp.status(200).send({});
            }
         }
      }
   }
   return resp.status(200).send({});
}