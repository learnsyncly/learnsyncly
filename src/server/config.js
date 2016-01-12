module.exports = {
  // App Settings
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost/lsyncly',
  TOKEN_SECRET: process.env.TOKEN_SECRET || '0Z1i1000DG0GBcYnhhsi4LHa',

  // OAuth 2.0
  GITHUB_SECRET: process.env.GITHUB_SECRET || '16aa2ac815c374eeaec10c9fe96116ce863914a9',

  // Bcrypt
  SALT_WORK_FACTOR: 10
};
