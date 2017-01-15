
var mongoose = require('mongoose');
var Command = mongoose.model('Command');

var create = function (command) {
    return new Promise(function (resolve, reject) {
        var cmd = new Command(command)
        cmd.save(function (err, rec) {
            if (err) reject(err);
            else resolve(cmd);
        });

    });
}

var remove = function (id) {
    return new Promise(function (resolve, reject) {
        Command.remove({_id:id}, function (err, foundConn) {
            if (err) reject(err)
            else resolve(foundConn);
        });
    });
}


var getAll = function () {
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
        Command.update({ _id: id }, model, function (err, foundConn) {
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

