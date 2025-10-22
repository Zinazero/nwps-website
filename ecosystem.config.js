module.exports = {
	apps: [
		{
			name: 'nwps-website',
			script: 'server/src/index.ts',
			interpreter: 'node',
			env_production: {
				NODE_ENV: 'production',
			},
		},
	],
};
