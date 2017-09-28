'use strict';
var logger = require('./helpers/logger');
var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var config = require('./config');
var web3Helper = require('./helpers/web3helper');
var app = express();
var cors = require('cors');

app.options('*', cors());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));


app.use(function (req, res, next) {
    return next();
});

app.get("/hello", function (req, res) {
    res.send("Hello");
});

app.use('/api/contracts', require('./routes/contracts'));
app.use('/api/tickets', require('./routes/tickets'));
app.use('/api/users', require('./routes/users'));
/* START SERVER CODE */
var host = config.host;
var port = config.port;
var server = http.createServer(app).listen(port, function () {
});
logger.info('****************** SERVER STARTED ************************');
logger.info('**************  http://' + host + ':' + port +
    '  ******************');
server.timeout = config.timeout;


web3Helper.setup(config.addressOwner,config.privateKeyOwner);