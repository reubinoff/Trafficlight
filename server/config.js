var config = {};


config.mongo = {};
config.web = {};
config.log = {};

if (process.env.NODE_ENV == 'test') {
    config.mongo.uri = 'mongodb://localhost:27017/cmts'
} else {
    config.mongo.uri = 'mongodb://localhost:27017/test'
}
config.web.port = 8081;
config.web.host = '127.0.0.1';

config.log.path = '/var/log/traffic.log';
module.exports = config;