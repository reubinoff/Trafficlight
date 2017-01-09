var errors = require('../errors');
var db = require('../../../db');
var general = require('../general');

function getAll(req, res) {
    

    db.commands.getAll().then(
        function(records) {
            return res.status(general.codes.OK).json(records);
            console.log(id);
        },
        function(err) {
            console.log(req.url + "\n " + JSON.stringify(errors.INVALID_DATA) + "\n" + err);
    });

}


module.exports = getAll;