module.exports = {
  apps: [
    {
      name: 'nwps-website',
      script: 'dist/index.js',
      cwd: './server',
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
