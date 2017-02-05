var config = {};


config.mongo = {};
config.web = {};
config.log = {};

config.mongo.uri = 'mongodb://localhost:27017/cmts'

config.web.port = 8081;
config.web.host= '127.0.0.1';

config.log.path = '/var/log/traffic.log';
module.exports = config;