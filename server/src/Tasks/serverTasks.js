var winston = require('winston');
var checkCoresConnectivity = require('./coresConnectivityTask');
var config = require('../../config');

var kue = require('kue')

var Queue = kue.createQueue();

Queue.process(config.general.queues.worker_keepalive, () => {
    winston.info('Worker keep alive recieved')
    var job = Queue.create(config.general.queues.monitoring, {
        intervalInMilliSeconds: config.general.monitoringIntervalMilliSec
    }).priority('normal').save(function (err) {
        if (!err) winston.info("Adding monitoring job. jobId=" + job.id);
    });
})


