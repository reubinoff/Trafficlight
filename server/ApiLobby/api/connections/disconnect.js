var errors = require('../errors');
var db = require('../../../db');
var general = require('../general')
function disconnect(req, res) {
    if (Object.keys(req.query).length === 0) {
        // empty query
        console.log(req.url + "\n " + JSON.stringify(errors.INVALID_DATA));
        return res.status(errors.INVALID_DATA.code).json(general.messages.errorMessage(errors.INVALID_DATA));
    }

    var args = req.query;

    var id = args.id;

    if (id == null) {
        console.log(req.url + "\n " + JSON.stringify(errors.INVALID_DATA));
        return res.status(errors.INVALID_DATA.code).json(general.messages.errorMessage(errors.INVALID_DATA));
    }


    db.connections.deleteConnection(id).then(
        function() {
            var msg = general.messages.generalMessage({}, 200, '');
            return res.status(msg.code).json(msg);
        },
        function(err) {
            return res.status(errors.NO_RESPONSE.code).json(errors.NO_RESPONSE);
        }
    );

}


module.exports = disconnect;