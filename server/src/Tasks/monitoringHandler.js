var checkCoresConnectivity = require('./coresConnectivityTask');


var isMonitoringStarted = false
var timer;

function handleMonitoring(data) {
    if (data.intervalInMilliSeconds) {
        isMonitoringStarted = true;
        timer= setInterval(checkCoresConnectivity, data.intervalInMilliSeconds)
    }
}

function stopMonitoring(){


}


module.exports.handleMonitoring = handleMonitoring;
module.exports.stopMonitoring = stopMonitoring;