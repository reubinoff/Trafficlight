var errors = require('../errors');
var db = require('../../../db');
var general = require('../general');

function getById(req, res) {
        if (Object.keys(req.params).length === 0) {
        // empty query
        console.log(req.url + "\n " + JSON.stringify(errors.INVALID_DATA));
        return res.status(errors.INVALID_DATA.code).json(general.messages.errorMessage(errors.INVALID_DATA));
    }

    var args = req.params;

    var id = args.id;

    if (id == null) {
        console.log(req.url + "\n " + JSON.stringify(errors.INVALID_DATA));
        return res.status(errors.INVALID_DATA.code).json(general.messages.errorMessage(errors.INVALID_DATA));
    }

    db.procedures.getById(id).then(
        function(record) {
            var msg = general.messages.generalMessage({ command: record }, 200);
            return res.status(msg.code).json(msg);
            console.log(id);
        },
        function(err) {
            console.log(req.url + "\n " + JSON.stringify(errors.INVALID_DATA) + "\n" + err);
    });

}


module.exports = getById;