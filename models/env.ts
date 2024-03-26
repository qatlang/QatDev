export const Env = {
	pocketbaseURL: () => process.env['NEXT_PUBLIC_POCKETBASE_URL'] ?? '',
	confirmationKey: () => process.env['NEXT_PUBLIC_CONFIRMATION_KEY'] ?? '',
	gitlabEventSecret: () => process.env['NEXT_PUBLIC_GITLAB_EVENT_SECRET'] ?? '',
	githubEventSecret: () => process.env['NEXT_PUBLIC_GITHUB_EVENT_SECRET'] ?? '',
}