
var checkCoresConnectivity = require('./coresConnectivity');
var cron = require('cron');

var tasks = []
AddTask(10,checkCoresConnectivity);












///////////////////////// ********************* /////////////////////////

function AddTask(everyXseconds, CB) {
    var task = new cron.CronJob({
        cronTime: '*/'+everyXseconds+' * * * * *',
        onTick: CB,
        start: true,
        context: {task :1}
    });
    tasks.push(task);
}

/*
Seconds: 0-59
Minutes: 0-59
Hours: 0-23
Day of Month: 1-31
Months: 0-11
Day of Week: 0-6
*/
