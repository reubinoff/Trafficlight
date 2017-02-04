var errors = require('../errors');
var db = require('../../../db');
var general = require('../general');
var winston = require('winston');

function getAll(req, res) {


    db.cores.getAll().then(
        function (records) {
            records.sort(function (a, b) {
                return parseFloat(a.ip) - parseFloat(b.ip);
            });
            return res.status(general.codes.OK).json(records);
            winston.log(id);
        },
        function (err) {
            winston.log(req.url + "\n " + JSON.stringify(errors.INVALID_DATA) + "\n" + err);
        });

}


module.exports = getAll;