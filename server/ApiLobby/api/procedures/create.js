var errors = require('../errors');
var db = require('../../../db');
var general = require('../general');

function create(req, res) {
    if (Object.keys(req.body).length === 0) {
        // empty query
        console.log(req.url + "\n " + JSON.stringify(errors.INVALID_DATA));
        return res.status(errors.INVALID_DATA.code).json(general.messages.errorMessage(errors.INVALID_DATA));
    }

    if (req.body.commands == null || req.body.commands.length == 0) {
        console.log(req.url + "\n " + general.messages.errorMessage(errors.INVALID_DATA, JSON.stringify(req.body)));
        return res.status(errors.INVALID_DATA.code).json(general.messages.errorMessage(errors.INVALID_DATA, JSON.stringify(req.body)));
    }

    db.procedures.create(req.body).then(
        function (record_id) {
            var msg = general.messages.generalMessage({ id: record_id }, 200, req.body);
            return res.status(msg.code).json(msg);
            console.log(id);
        },
        function (err) {
            console.log(req.url + "\n " + JSON.stringify(errors.INVALID_DATA) + "\n" + err);
            var errMsg = general.messages.errorMessage(errors.INVALID_DATA, JSON.stringify(req.body));
            return res.status(errors.INVALID_DATA.code).json(errMsg);
        }
    );


}


module.exports = create;