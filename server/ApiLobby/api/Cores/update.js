var errors = require('../errors');
var db = require('../../../db');
var general = require('../general');
var winston = require('winston');

function update(req, res) {
      if (Object.keys(req.params).length === 0 || Object.keys(req.body).length === 0) {
        // empty query
        winston.log(req.url + "\n " + JSON.stringify(errors.INVALID_DATA));
        return res.status(errors.INVALID_DATA.code).json(general.messages.errorMessage(errors.INVALID_DATA));
    }
    var id = req.params.id;

    if (id == null) {
        winston.log(req.url + "\n " + JSON.stringify(errors.INVALID_ID));
        return res.status(errors.INVALID_ID.code).json(general.messages.errorMessage(errors.INVALID_ID));
    }

    db.cores.update(id,req.body).then(
        function(record) {
            var msg = general.messages.generalMessage({ core: record }, 200);
            return res.status(msg.code).json(msg);
            winston.log(id);
        },
        function(err) {
            winston.log(req.url + "\n " + JSON.stringify(errors.INTERNAL_ERROR) + "\n" + err);
            return res.status(errors.INTERNAL_ERROR.code).json(general.messages.errorMessage(errors.INTERNAL_ERROR));
    });

}


module.exports = update;
