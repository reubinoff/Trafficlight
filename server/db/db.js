var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var config = require('../../config')
var schemas = require('./schemas')

var uri ='mongodb://localhost:27017';
if (process.env.NODE_ENV != 'test') {
    port = config.mongo.uri
}


mongoose.model('Connection', schemas.Connection);
mongoose.model('Command', schemas.Command);
mongoose.model('Procedure', schemas.Procedure);



mongoose.Promise = global.Promise;
mongoose.connect(config.mongo.uri);



