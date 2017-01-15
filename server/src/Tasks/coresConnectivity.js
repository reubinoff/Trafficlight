
var db = require('../db');
var net = require('net');
var ssh = require('../ssh')
var winston = require('winston');
var Promise = require('bluebird');

function checkCoresConnectivity() {
    db.cores.getAll().then(
        function (records) {
            records.forEach(function (core) {
                checkSocket(core).then( // Check socket (and ping)
                    //SUCESS
                    function () {
                        core.hasPing = true;
                        updateCoreStatusInDb(core);
                        winston.log("IP: %s Pass", core.ip);


                    },
                    //ERROR
                    function (err) {
                        core.hasPing = false;
                        core.hasConnection = false;
                        updateCoreStatusInDb(core);
                        winston.warn("IP: %s Fail\n" + err, core.ip);
                    }
                )
                    .then( //Check SSH
                    function () {
                        CheckCoreSsh(core).then(
                            //SUCESS
                            function () {
                                core.hasConnection = true;
                                updateCoreStatusInDb(core);
                                winston.log("IP: %s SSH Pass", core.ip);
                            },
                            //ERROR
                            function (err) {
                                core.hasConnection = false;
                                updateCoreStatusInDb(core);
                                winston.warn("IP: %s SSH Fail\n" + err, core.ip);
                            }

                        );
                    });
            });
        },
        function (err) {
            winston.error(err);
        });

}


function CheckCoreSsh(core) {
    var ip = core.ip, user = core.user, password = core.password, port = core.port;
    return new Promise(function (resolve, reject) {
        if (!core.hasPing)
            reject('No Socket connection')
        ssh.createConnection(ip, user, password, port)
            .then(
            //SUCESS
            function () {
                resolve();
            },
            //FAIL
            function (err) {
                reject(err);
            });
    });
}


function checkSocket(core, timeout) {
    var ip = core.ip, port = core.port;
    return new Promise(function (resolve, reject) {
        if (process.env.NODE_ENV == 'test') {
            resolve();
        }
        timeout = timeout || 5000;
        var socket = {};
        try {
            var timer = setTimeout(function () {
                reject("timeout");
                socket.end();
            }, timeout);
            socket = net.createConnection(port, ip, function () {
                clearTimeout(timer);
                resolve();
                socket.end();
            });
            socket.on('error', function (err) {
                clearTimeout(timer);
                reject(err);
            });
        } catch (ex) { reject(ex); }
    });
}

function updateCoreStatusInDb(model) {
    db.cores.updateModel(model).then(
        function (record) {
            winston.debug("Update success for core ip %s", model.ip);
        },
        function (err) {
            winston.log(err);
        });
}

module.exports = checkCoresConnectivity;
