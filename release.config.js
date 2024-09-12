module.exports = {
  branches: [
    'main',
    {
      name: 'next',
      channel: 'next',
    },
  ],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/changelog',
    ['@semantic-release/npm', { npmPublish: false }],
    '@semantic-release/github',
  ],
  prepare: ['@semantic-release/changelog', '@semantic-release/git'],
  publish: ['@semantic-release/github'],
  output: [
    {
      path: 'semantic',
      setOutput: true,
    },
  ],
};
