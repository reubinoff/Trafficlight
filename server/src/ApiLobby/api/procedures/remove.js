var errors = require('../errors');
var db = require('../../../db');
var general = require('../general');
var winston = require('winston');

function remove(req, res) {
 if (Object.keys(req.params).length === 0) {
        // empty query
        winston.log(req.url + "\n " + JSON.stringify(errors.INVALID_DATA));
        return res.status(errors.INVALID_DATA.code).json(general.messages.errorMessage(errors.INVALID_DATA));
    }

    var args = req.params;

    var id = args.id;

    if (id == null) {
        winston.log(req.url + "\n " + JSON.stringify(errors.INVALID_DATA));
        return res.status(errors.INVALID_DATA.code).json(general.messages.errorMessage(errors.INVALID_DATA));
    }

    db.procedures.remove(id).then(
        function (record) {
            var msg = general.messages.generalMessage({ procedure: record }, 200);
            return res.status(msg.code).json(msg);
            winston.log(id);
        },
        function (err) {
            winston.log(req.url + "\n " + JSON.stringify(errors.INVALID_DATA) + "\n" + err);
        });

}


module.exports = remove;