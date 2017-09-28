'use strict';

var express = require('express');
var router = express.Router();
var logger = require('../helpers/logger');


var fs = require("fs");
var path = "./storage/users.txt";

var web3helper = require('../helpers/web3helper');

router.get("/", function (req, res) {
    
        logger.debug("### Get all Users in System");
        var result = fs.readFileSync(path, "utf8");
        var arrayOfLines = result.match(/[^\r\n]+/g);
    
        var users = [];
        if (arrayOfLines) {
            arrayOfLines.forEach(function (line) {
                users.push({ address: line.split('_')[0], name:line.split('_')[1]})
            }, this);
        }
    
        res.send(users)
    });
    module.exports = router;
    
    