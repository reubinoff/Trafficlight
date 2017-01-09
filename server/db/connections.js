
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
            console.log('Adding new connection to DB');
            conn.save(function (err, rec) {
                if (err) return next(err);
                if (cb) cb(rec.id);
            });
        } else {
            console.log('Updating new connection to DB');
            foundConn.modified = conn;
            foundConn[0].save(function (err, rec) {
                if (err) return next(err);
                if (cb) cb(rec.id);
            });
        }
    });
}

var deleteConnection = function (id) {
    return new Promise(function (resolve, reject) {

        Connection.findById(id, function (err, foundConn) {
            if (foundConn==null) {
                resolve(foundConn);
            } else {
                foundConn.remove(function (err, res) {
                    if (err) reject(err)
                    else resolve(res);
                });
            }
        });
    });


}
module.exports.deleteConnection=deleteConnection;
module.exports.createConnection = createConnection;

