var kue = require('kue')
    , queue = kue.createQueue();
var monitoringHandler = require('./src/Tasks/monitoringHandler')
var config = require('./config');

var job = queue.create(config.general.queues.worker_keepalive,{}).priority('normal').save();

queue.process(config.general.queues.monitoring, 1, function (job, done) {
    monitoringHandler.handleMonitoring(job.data);
    done();
});


process.on('exit',()=>{
console.log('bye');
});
process.once('SIGTERM', function (sig) {
    queue.shutdown(5000, function (err) {
        winston.log('Kue shutdown: ', err || '');
        process.exit(0);
    });
});