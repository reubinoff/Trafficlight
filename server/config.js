var config = {};


config.mongo = {};
config.web = {};
config.log = {};
config.general = {};

config.general.queues = {};
config.general.queues.worker_keepalive = 'worker_keepalive';
config.general.queues.monitoring = 'core_monitoring';
config.general.monitoringIntervalMilliSec = '3000';

if (process.env.NODE_ENV != 'test') {
    config.mongo.uri = 'mongodb://localhost:27017/traffic-light'
} else {
    config.mongo.uri = 'mongodb://localhost:27017/test'
}
config.web.port = 8081;
config.web.host = '127.0.0.1';

config.log.path = '/var/log/traffic.log';
module.exports = config;