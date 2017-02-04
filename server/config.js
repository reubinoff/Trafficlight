var config = {};


config.mongo = {};
config.web = {};


config.mongo.uri = 'mongodb://localhost:27017/cmts'

config.web.port = 8081;
config.web.host= '127.0.0.1'

module.exports = config;