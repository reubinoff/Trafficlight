var config = require('./config');
var express = require('express');
const path = require('path');
var app = express();
var url = require("url");
var queryString = require("querystring");
var db = require('./server/db')





var pages_path = "lights/build";

app.use(express.static('lights/build'));



// Create http Routers
var routers = require('./server/ApiLobby/routers')
routers.CreateRouters(app);




//Start Server Listener
var server = app.listen(config.web.port, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)

})

