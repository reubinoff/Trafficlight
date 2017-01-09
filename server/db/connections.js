var winston = require('winston');
var mongoose = require('mongoose');
var Connection = mongoose.model('Connection');

var createConnection = function (ip, user, password, port, cb) {
    var conn = new Connection({
        ip: ip,
        user: user,
        password: password,
        port: port,
    })


    Connection.find({ "ip": conn.ip }, function (err, foundConn) {
        if (foundConn.length == 0) {
            winston.log('Adding new connection to DB');
            conn.save(function (err, rec) {
                if (err) return next(err);
                if (cb) cb(rec);
            });
        } else {
            winston.log('Updating new connection to DB');
            foundConn.modified = conn;
            foundConn[0].save(function (err, rec) {
                if (err) return next(err);
                if (cb) cb(rec);
            });
        }
    });
}

var deleteConnection = function (id) {
    return new Promise(function (resolve, reject) {
        Connection.remove({ _id: id }, function (err, foundConn) {
            if (err) reject(err)
            else resolve(foundConn);
        });
    });


}


var getAll = function () {
    return new Promise(function (resolve, reject) {
        Connection.find(function (err, foundConn) {
            if (err) reject(err)
            else resolve(foundConn);
        });
    });


}
var getById = function (id) {
    return new Promise(function (resolve, reject) {
        Connection.findById(id, function (err, foundConn) {
            if (err) reject(err)
            else if (foundConn == null) resolve({})
            else resolve(foundConn);
        });
    });


}


module.exports.deleteConnection = deleteConnection;
module.exports.createConnection = createConnection;
module.exports.getAll = getAll;
module.exports.getById = getById;

