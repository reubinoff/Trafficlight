
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


    //*** GET ***
    //Commands
    router.get('/api/commands/', api.commands.getAll); ///api/commands
    router.get('/api/commands/:id', api.commands.getById); // /api/commands/58724d50d25ac002ff417602
    //Procedures
    router.get('/api/procedures/', api.procedures.getAll); // /api/procedures
    router.get('/api/procedures/:id', api.procedures.getById); // /api/procedures/58729f3c34efe341ae684bde


    //*** Put ***
    //Connections
    router.put('/api/connection/', api.connections.connect); // /api/connection/ {body}
    //Commands
    // Create new command only 
    router.put('/api/commands/', api.commands.create); // /api/commands {body}
    //Procedures
    // Create new Procedures only
    router.put('/api/procedures/', api.procedures.create); // /api/procedures {bodys}


    //*** POST ***
    //Commands
    // update command only
    router.post('/api/commands/:id', api.commands.update); // /api/commands/5872567214aae01071781368 {body}
    //Procedures
    //Create new Procedures only
    router.post('/api/procedures/:id', api.procedures.update); // /api/procedures/58729f3c34efe341ae684bde { body}


    //*** Delete ***
    //connections
    router.delete('/api/connection/:id', api.connections.disconnect); //api/connection/5871fd760f4db73813c1e9a9
    //Commands
    router.delete('/api/commands/:id', api.commands.remove); ///api/commands/5872866831518b21b69dc58e
    //Procedures
    router.delete('/api/procedures/:id', api.procedures.remove); 

    app.use('/', router);
}



module.exports.CreateRouters = CreateRouters;