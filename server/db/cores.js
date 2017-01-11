var winston = require('winston');
var mongoose = require('mongoose');
var Core = mongoose.model('Core');

var createCore = function (ip, user, password, port, cb) {
    var conn = new Core({
        ip: ip,
        user: user,
        password: password,
        port: port,
    })


    Core.find({ "ip": conn.ip }, function (err, foundConn) {
        if (foundConn.length == 0) {
            winston.log('Adding new Core to DB');
            conn.save(function (err, rec) {
                if (err) return next(err);
                if (cb) cb(rec);
            });
        } else {
            winston.log('Updating new Core to DB');
            foundConn.modified = conn;
            foundConn[0].save(function (err, rec) {
                if (err) return next(err);
                if (cb) cb(rec);
            });
        }
    });
}

var deleteCore = function (id) {
    return new Promise(function (resolve, reject) {
        Core.remove({ _id: id }, function (err, foundConn) {
            if (err) reject(err)
            else resolve(foundConn);
        });
    });


}


var getAll = function () {
    return new Promise(function (resolve, reject) {
        Core.find(function (err, foundConn) {
            if (err) reject(err)
            else resolve(foundConn);
        });
    });


}
var getById = function (id) {
    return new Promise(function (resolve, reject) {
        Core.findById(id, function (err, foundConn) {
            if (err) reject(err)
            else if (foundConn == null) resolve({})
            else resolve(foundConn);
        });
    });


}

var update = function (id, model) {
    return new Promise(function (resolve, reject) {
        Core.update({ _id: id }, model, function (err, foundConn) {
            if (err) reject(err)
            else resolve(foundConn);
        });
    });
}




module.exports.deleteCore = deleteCore;
module.exports.createCore = createCore;
module.exports.getAll = getAll;
module.exports.getById = getById;
module.exports.update = update;

