var errors = require('../errors');

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

    if (ip == null || user == null || password == null || port == null || !ValidateIPaddress(ip))  {
        winston.log(req.url + "\n " + JSON.stringify(errors.INVALID_DATA));
        return res.status(errors.INVALID_DATA.code).json(general.messages.errorMessage(errors.INVALID_DATA));
    }

    db.Cores.createCore(ip, user, password, port, function (record) {
        return res.status(general.codes.OK).json(record);
    });





}
function ValidateIPaddress(ipaddress) {
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) {
        return (true)
    }
    return (false)
}


module.exports = connect;