
var api = require('./api')
var bodyParser = require('body-parser');
var express = require('express');
var methodOverride = require('method-override')


var CreateRouters = function (app) {

    var router = express.Router()
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(methodOverride())

    //General
    router.use(api.general.logging.timestamp);
    app.use(api.general.logging.logErrors)
    app.use(api.general.logging.clientErrorHandler)
    app.use(api.general.logging.errorHandler)

    //Put
    router.put('/api/connection/', api.connections.connect);

    //Delete
    router.delete('/api/connection/', api.connections.disconnect);

    app.use('/', router);
}



module.exports.CreateRouters = CreateRouters;