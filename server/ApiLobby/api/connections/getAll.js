var errors = require('../errors');
var db = require('../../../db');
var general = require('../general');
var winston = require('winston');

function getAll(req, res) {
    

    db.connections.getAll().then(
        function(records) {
            return res.status(general.codes.OK).json(records);
            winston.log(id);
        },
        function(err) {
            winston.log(req.url + "\n " + JSON.stringify(errors.INVALID_DATA) + "\n" + err);
    });

}


module.exports = getAll;