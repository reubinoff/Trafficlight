
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Connection = new Schema({
    ip:{type: String,required:true},
    user: {type: String,required:true},
    password: {type: String,required:true},
    port: {type: Number,required:true},
});


var Command = new Schema({
    command: {type: String,required:true},
    isSudoRequired: {type:Boolean,default:false},
    timeoutInMilli: {type:Number,default:500},
    description: {type:String,default:""}
});


var Procedure = new Schema({
    commands:
    [{
        command: { type: Schema.Types.ObjectId, ref: 'Command' },
        order: Number
    }],
    description: {type:String,default:""}
});

module.exports.Connection = Connection;
module.exports.Command = Command;
module.exports.Procedure = Procedure;