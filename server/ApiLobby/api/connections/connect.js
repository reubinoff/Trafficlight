var errors = require('../errors');
var ssh = require('../../../ssh')
var db = require('../../../db');
var general = require('../general')
function connect(req, res) {
    if (Object.keys(req.body).length === 0) {
        // empty query
        console.log(req.url + "\n " + JSON.stringify(errors.INVALID_DATA));
        return res.status(errors.INVALID_DATA.code).json(general.messages.errorMessage(errors.INVALID_DATA));
    }

    var args = req.body;

    var ip = args.ip;
    var user = args.user;
    var password = args.password;
    var port = args.port;

    if (ip == null || user == null || password == null || port == null) {
        console.log(req.url + "\n " + JSON.stringify(errors.INVALID_DATA));
        return res.status(errors.INVALID_DATA.code).json(general.messages.errorMessage(errors.INVALID_DATA));
    }

    checkConnection(ip, port).then(function () {
        ssh.createConnection(ip, user, password, port)
        .then(
            function () {
            db.connections.createConnection(ip, user, password, port, function (record_id) {
                var msg = general.messages.generalMessage({ id: record_id }, 200, '');
                return res.status(msg.code).json(msg);
                console.log(id);
            });
        },
            function (err) {
                return res.status(errors.NO_RESPONSE.code).json(errors.NO_RESPONSE);
            });
    }, function (err) {
        return res.status(errors.NO_RESPONSE.code).json(errors.NO_RESPONSE);
    })




}

var ping = require('net-ping');

function checkPing(ip) {
    checkConnection(ip, 22);
    var options = {
        retries: 1,
        timeout: 2000
    };

    var session = ping.createSession(options);
    session.pingHost(ip, function (error, target) {
        if (error)
            return false;
        else
            return true;
    });
}

var net = require('net');
var Promise = require('bluebird');

function checkConnection(host, port, timeout) {
    return new Promise(function (resolve, reject) {
        timeout = timeout || 10000;     // default of 10 seconds
        var timer = setTimeout(function () {
            reject("timeout");
            socket.end();
        }, timeout);
        var socket = net.createConnection(port, host, function () {
            clearTimeout(timer);
            resolve();
            socket.end();
        });
        socket.on('error', function (err) {
            clearTimeout(timer);
            reject(err);
        });
    });
}

checkConnection("example1.com", 8080).then(function () {
    // successful
}, function (err) {
    // error
})
module.exports = connect;