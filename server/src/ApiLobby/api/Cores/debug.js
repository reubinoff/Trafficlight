var db = require('../../../db');
var general = require('../general');
var winston = require('winston');
var randomstring = require("randomstring");


function debug(req, res) {
    var cores = []
    for (var i = 0; i < 20; i++) {
        const ip = randomstring.generate({
            length: 2,
            charset: '1234567890'
        });
        let core = {
            "ip": "10.0.0." +ip,
            "user": true,
            "password": randomstring.generate(10),
            "port": 2000 + i
        }
        cores.push(core);
    }
    cores.forEach((core) => {

        db.cores.createCore(core.ip, core.user, core.password, core.port, function (record) {
            winston.log('mock record added');
        });
    });
    return res.status(general.codes.OK).json("Done");
}

module.exports = debug;