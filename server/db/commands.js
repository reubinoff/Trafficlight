
var mongoose = require('mongoose');
var Command = mongoose.model('Command');

var create = function (command) {
    return new Promise(function (resolve, reject) {
        var cmd = new Command(command)
        cmd.save(function (err, rec) {
            if (err) reject(err);
            else resolve(cmd.id);
        });

    });
}

var remove = function (id) {
    return new Promise(function (resolve, reject) {

        Connection.findById(id, function (err, foundConn) {
            if (foundConn == null) {
                resolve();
            } else {
                foundConn.remove(function (err, res) {
                    if (err) reject(err)
                    else resolve();
                });
            }
        });
    });


}


var getAll = function (id) {
    return new Promise(function (resolve, reject) {
        Command.find(function (err, foundConn) {
            if (err) reject(err)
            else resolve(foundConn);
        });
    });


}
var getById = function (id) {
    return new Promise(function (resolve, reject) {
        Command.findById(id, function (err, foundConn) {
            if (err) reject(err)
            else resolve(foundConn);
        });
    });


}

var update = function (id, model) {
    return new Promise(function (resolve, reject) {
        var cmd = new Command(model)
        Command.update({ _id: id }, { $set: { cmd } }, function (err, foundConn) {
            if (err) reject(err)
            else resolve(foundConn);
        });
    });


}


module.exports.remove = remove;
module.exports.create = create;
module.exports.getAll = getAll;
module.exports.getById = getById;
module.exports.update = update;

