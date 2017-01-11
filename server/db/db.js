var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var config = require('../../config')
var schemas = require('./schemas')


mongoose.model('Core', schemas.Core);
mongoose.model('Command', schemas.Command);
mongoose.model('Procedure', schemas.Procedure);



mongoose.Promise = global.Promise;
mongoose.connect(config.mongo.uri);



