module.exports = {
	apps: [
		{
			name: 'nwps-website',
			script: 'server/dist/index.js',
            cwd: './server',
			env_production: {
				NODE_ENV: 'production',
			},
		},
	],
};
