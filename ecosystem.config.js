module.exports = {
	apps: [
		{
			name: 'nwps-website',
			cwd: './server',
			script: '/dist/index.js',
			env_production: {
				NODE_ENV: 'production',
			},
		},
	],
};
