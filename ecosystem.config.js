module.exports = {
	apps: [
		{
			name: 'nwps-website',
			script: 'server/dist/index.js',
			env_production: {
				NODE_ENV: 'production',
			},
		},
	],
};
