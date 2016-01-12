module.exports = {
  // App Settings
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost/lsyncly',
  TOKEN_SECRET: process.env.TOKEN_SECRET || '0Z1i1000DG0GBcYnhhsi4LHa',

  // Bcrypt
  SALT_WORK_FACTOR: 10
};
