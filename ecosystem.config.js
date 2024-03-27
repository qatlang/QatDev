module.exports = {
	apps: [
		{
			name: 'QatDev',
			exec_mode: 'cluster',
			instances: 'max',
			script: 'node_modules/next/dist/bin/next',
			args: 'start -p 3000 -H 127.0.0.1',
			env: { NODE_ENV: 'production' }
		}
	]
}