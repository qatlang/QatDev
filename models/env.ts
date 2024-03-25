export const Env = {
	pocketbaseURL: () => process.env['NEXT_PUBLIC_POCKETBASE_URL'] ?? '',
	confirmationKey: () => process.env['NEXT_PUBLIC_CONFIRMATION_KEY'] ?? '',
	discordBotToken: () => process.env['NEXT_PUBLIC_DISCORD_BOT_TOKEN'] ?? '',
	discordRepoChannel: () => process.env['NEXT_PUBLIC_DISCORD_REPO_CHANNEL'] ?? '',
	gitlabEventSecret: () => process.env['NEXT_PUBLIC_GITLAB_EVENT_SECRET'] ?? '',
	githubEventSecret: () => process.env['NEXT_PUBLIC_GITHUB_EVENT_SECRET'] ?? '',
}