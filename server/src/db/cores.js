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
    Core.find({ "ip": conn.ip })
        .then((foundConn) => {
            if (foundConn.length == 0) {
                winston.info('Adding new Core to DB');
                conn.save()
                    .then((rec) => {
                        if (cb) cb(rec);
                    })
                    .catch((err) => {
                        return next(err);
                    });

            } else {
                winston.info('Updating new Core to DB');
                foundConn.modified = conn;
                foundConn[0].save()
                    .then((rec) => {
                        if (cb) cb(rec);
                    })
                    .catch((err) => {
                        return next(err);
                    });
            }
        })
        .catch((err) => { console.log('error!!!!!'); });
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
        Core.find()
            .then((foundConn) => {
                resolve(foundConn.sort('ip'));
            })
            .catch((err) => { reject(err) });
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

var updateModel = function (model) {
    return new Promise(function (resolve, reject) {
        model.save((err, core) => {
            if (err) reject(err)
            else resolve(core);
        });
    });
}



module.exports.deleteCore = deleteCore;
module.exports.createCore = createCore;
module.exports.getAll = getAll;
module.exports.getById = getById;
module.exports.update = update;
module.exports.updateModel = updateModel;

