var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var config = require('../../config')

var Connection = new Schema({
    ip: String,
    user: String,
    password: String,
    port: Number,
});

mongoose.model('Connection', Connection);



mongoose.Promise = global.Promise;
mongoose.connect(config.mongo.uri);


var Connection = mongoose.model('Connection');


