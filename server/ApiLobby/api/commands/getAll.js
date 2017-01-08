var errors = require('../errors');
var db = require('../../../db');
var general = require('../general');

function getAll(req, res) {
    

    db.commands.getAll().then(
        function(records) {
            var msg = general.messages.generalMessage({ commands: records }, 200);
            return res.status(msg.code).json(msg);
            console.log(id);
        },
        function(err) {
            console.log(req.url + "\n " + JSON.stringify(errors.INVALID_DATA) + "\n" + err);
    });

}


module.exports = getAll;