var errors = require('../errors');
var db = require('../../../db');
var general = require('../general');
var winston = require('winston');

function create(req, res) {
    if (Object.keys(req.body).length === 0) {
        // empty query
        winston.log(req.url + "\n " + JSON.stringify(errors.INVALID_DATA));
        return res.status(errors.INVALID_DATA.code).json(general.messages.errorMessage(errors.INVALID_DATA));
    }

    if (req.body.commands == null || req.body.commands.length == 0) {
        winston.log(req.url + "\n " + general.messages.errorMessage(errors.INVALID_DATA, JSON.stringify(req.body)));
        return res.status(errors.INVALID_DATA.code).json(general.messages.errorMessage(errors.INVALID_DATA, JSON.stringify(req.body)));
    }

    db.procedures.create(req.body).then(
        function (record) {
            return res.status(general.codes.OK).json(record);
            winston.log(record.id);
        },
        function (err) {
            winston.log(req.url + "\n " + JSON.stringify(errors.INVALID_DATA) + "\n" + err);
            var errMsg = general.messages.errorMessage(errors.INVALID_DATA, JSON.stringify(req.body));
            return res.status(errors.INVALID_DATA.code).json(errMsg);
        }
    );


}


module.exports = create;