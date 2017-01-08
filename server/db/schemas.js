
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Connection = new Schema({
    ip: String,
    user: String,
    password: String,
    port: Number,
});


var Command = new Schema({
    command: String,
    isSudoRequired: Boolean,
    timeoutInMilli: Number,
    description: String
});


var Procedure = new Schema({
    commands:
    [{
        command: { type: Schema.Types.ObjectId, ref: 'Command' },
        order: Number
    }],
    description: String
});

module.exports.Connection = Connection;
module.exports.Command = Command;
module.exports.Procedure = Procedure;