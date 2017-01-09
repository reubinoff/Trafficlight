var errors = require('../errors');
var ssh = require('../../../ssh')
var db = require('../../../db');
var general = require('../general')
var winston = require('winston');

function connect(req, res) {
    if (Object.keys(req.body).length === 0) {
        // empty query
        winston.log(req.url + "\n " + JSON.stringify(errors.INVALID_DATA));
        return res.status(errors.INVALID_DATA.code).json(general.messages.errorMessage(errors.INVALID_DATA));
    }

    var args = req.body;

    var ip = args.ip;
    var user = args.user;
    var password = args.password;
    var port = args.port;

    if (ip == null || user == null || password == null || port == null) {
        winston.log(req.url + "\n " + JSON.stringify(errors.INVALID_DATA));
        return res.status(errors.INVALID_DATA.code).json(general.messages.errorMessage(errors.INVALID_DATA));
    }

    checkConnection(ip, port).then(function () {
        ssh.createConnection(ip, user, password, port)
        .then(
            function () {
            db.connections.createConnection(ip, user, password, port, function (record) {
                return res.status(general.codes.OK).json(record);
            });
        },
            function (err) {
                return res.status(errors.NO_RESPONSE.code).json(errors.NO_RESPONSE);
            });
    }, function (err) {
        return res.status(errors.NO_RESPONSE.code).json(errors.NO_RESPONSE);
    })




}


var net = require('net');
var Promise = require('bluebird');

function checkConnection(host, port, timeout) {
    return new Promise(function (resolve, reject) {
        if (process.env.NODE_ENV == 'test') {
            resolve();
        }
        timeout = timeout || 5000;     // default of 10 seconds
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