var config = require('./config');
var express = require('express');
const path = require('path');
var app = express();
var url = require("url");
var queryString = require("querystring");
var db = require('./server/db')
var winston = require('winston');


var port =0;
if (process.env.NODE_ENV == 'test') {
    winston.remove(winston.transports.Console);
    var port =8081;
}else{
    port = config.web.port
}

var pages_path = "lights/build";

app.use(express.static('lights/build'));



// Create http Routers
var routers = require('./server/ApiLobby/routers')
routers.CreateRouters(app);




//Start Server Listener
var server = app.listen(port, function () {

    var host = server.address().address
    var port = server.address().port

    winston.info("Example app listening at http://%s:%s", host, port)

})

module.exports = app;