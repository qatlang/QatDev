/** @type {import('next').NextConfig} */

const discordJS = require('discord.js');
const discordConfig = require('./models/discord');

module.exports = async () => {
   discordConfig.discordClient = new discordJS.Client({
      intents: [
         discordJS.GatewayIntentBits.Guilds,
         discordJS.GatewayIntentBits.GuildMembers,
         discordJS.GatewayIntentBits.GuildBans,
         discordJS.GatewayIntentBits.GuildEmojisAndStickers,
         discordJS.GatewayIntentBits.GuildIntegrations,
         discordJS.GatewayIntentBits.GuildWebhooks,
         discordJS.GatewayIntentBits.GuildInvites,
         discordJS.GatewayIntentBits.GuildVoiceStates,
         discordJS.GatewayIntentBits.GuildPresences,
         discordJS.GatewayIntentBits.GuildMessages,
         discordJS.GatewayIntentBits.GuildMessageReactions,
         discordJS.GatewayIntentBits.GuildMessageTyping,
         discordJS.GatewayIntentBits.DirectMessages,
         discordJS.GatewayIntentBits.DirectMessageReactions,
         discordJS.GatewayIntentBits.DirectMessageTyping,
         discordJS.GatewayIntentBits.MessageContent,
         discordJS.GatewayIntentBits.GuildScheduledEvents,
         discordJS.GatewayIntentBits.AutoModerationConfiguration,
         discordJS.GatewayIntentBits.AutoModerationExecution
      ]
   });
   discordConfig.discordClient.login(process.env['NEXT_PUBLIC_DISCORD_BOT_TOKEN']);
   return {
      reactStrictMode: true,
      swcMinify: true,
   };
}
