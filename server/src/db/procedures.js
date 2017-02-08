
var mongoose = require('mongoose');
var Procedure = mongoose.model('Procedure');
var Command = mongoose.model('Command');

var create = function (procedure) {
    return new Promise(function (resolve, reject) {
        var pro = new Procedure(procedure)
        pro.save()
            .then((pro) => { resolve(pro) })
            .catch((err) => { reject(err) })
    });
}

var remove = function (id) {
    return new Promise(function (resolve, reject) {
        Procedure.remove({ _id: id }, function (err, foundConn) {
            if (err) reject(err)
            else resolve(foundConn);
        });
    });
}

var getAll = function () {
    return new Promise(function (resolve, reject) {
        Procedure.find().populate('commands.command').exec(function (err, doc) {
            if (err) reject(err);
            resolve(doc);
        });

    });


}

var getById = function (id) {
    return new Promise(function (resolve, reject) {
        Procedure.findById(id).populate('commands.command').exec(function (err, foundProc) {
            if (err) reject(err)
            else resolve(foundProc);
        });
    });


}

var update = function (id, model) {
    return new Promise(function (resolve, reject) {
        Procedure.update({ _id: id }, model, function (err, foundConn) {
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

