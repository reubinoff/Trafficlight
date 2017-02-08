var config = require('./config');
var express = require('express');
const path = require('path');
var app = express();
var url = require("url");
var queryString = require("querystring");
var db = require('./src/db')
var serverTasks = require('./src/Tasks/serverTasks')
var winston = require('winston');
var fork = require('child_process').fork;



console.log(__dirname)

if (process.env.NODE_ENV == 'test') {
    winston.remove(winston.transports.Console);
}
 winston.add(winston.transports.File, {
    filename: config.log.path,
    handleExceptions: true,
    humanReadableUnhandledException: true
  });

var pages_path = __dirname +"./../www";

app.use(express.static(pages_path));
winston.log(express.static(pages_path))


// Create http Routers
var routers = require('./src/ApiLobby/routers')
routers.CreateRouters(app);




//Start Server Listener
var server = app.listen(config.web.port,config.web.host, function () {

    var host = server.address().address
    var port = server.address().port

    winston.info("listening at http://%s:%s", host, port)

})



// Start worker
var worker = fork('./app_worker.js');

module.exports = app;