
var api = require('./api')
var bodyParser = require('body-parser');
var express = require('express');
var methodOverride = require('method-override')
var morgan = require('morgan')

var CreateRouters = function (app) {

    var router = express.Router()
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(methodOverride())

    //General
    if (process.env.NODE_ENV != 'test') {
        app.use(morgan('combined')); //'combined' outputs the Apache style LOGs
    }
    router.use(api.general.logging.timestamp);
    app.use(api.general.logging.logErrors)
    app.use(api.general.logging.clientErrorHandler)
    app.use(api.general.logging.errorHandler)


    //*** GET ***
    //cores
    router.get('/api/cores/', api.cores.getAll); ///api/Core
    router.get('/api/cores/:id', api.cores.getById); ///api/Core/58724d50d25ac002ff417602
    //Commands
    router.get('/api/commands/', api.commands.getAll); ///api/commands
    router.get('/api/commands/:id', api.commands.getById); // /api/commands/58724d50d25ac002ff417602
    //Procedures
    router.get('/api/procedures/', api.procedures.getAll); // /api/procedures
    router.get('/api/procedures/:id', api.procedures.getById); // /api/procedures/58729f3c34efe341ae684bde


    //*** Put ***
    //cores
    router.put('/api/cores/', api.cores.connect); // /api/Cores/ {body}
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
    //cores
    //Create new Procedures only
    router.post('/api/cores/:id', api.cores.update); // /api/cores/58729f3c34efe341ae684bde { body}


    //*** Delete ***
    //cores
    router.delete('/api/cores/:id', api.cores.disconnect); //api/Core/5871fd760f4db73813c1e9a9
    //Commands
    router.delete('/api/commands/:id', api.commands.remove); ///api/commands/5872866831518b21b69dc58e
    //Procedures
    router.delete('/api/procedures/:id', api.procedures.remove); ///api/procedures/58729f3c34efe341ae684bde

    app.use('/', router);
}



module.exports.CreateRouters = CreateRouters;