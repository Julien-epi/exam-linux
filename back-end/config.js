const config = {
    app: {
        port: process.env.PORT || 3000
    },
    db: {
        host: process.env.MONGO_HOST || 'localhost',
        port: process.env.MONGO_PORT_CONTAINER || 27017,
        name: process.env.MONGO_DB_NAME || 'dblinux'
    }
};

module.exports = config;
