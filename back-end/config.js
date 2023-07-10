require('dotenv').config();

const dockerEnv = process.env.DOCKER_ENV || false;

const config = {
  app: {
    port: process.env.PORT || 3000
  },
  db: {
    host: dockerEnv ? process.env.MONGO_HOST : process.env.MONGO_HOST_LOCAL,
    port: process.env.MONGO_PORT,
    name: process.env.MONGO_DB_NAME
  }
};

module.exports = config;
