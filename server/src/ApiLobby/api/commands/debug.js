var db = require('../../../db');
var general = require('../general');
var winston = require('winston');
var randomstring = require("randomstring");


function debug(req, res) {
    var commands = []
    for (var i = 0; i < 20; i++) {
        let command = {
            "command": randomstring.generate(7),
            "isSudoRequired": true,
            "timeoutInMilli": 1000 + i,
            "description": randomstring.generate(10)
        }
        commands.push(command);
    }
    commands.forEach((cmd) => {
        db.commands.create(cmd).then(
            function (record) {
                winston.log('mock record added');
            },
            function (err) {
                winston.err('mock record reject');
            }
        );
    });
    return res.status(general.codes.OK).json("Done");

}

module.exports = debug;