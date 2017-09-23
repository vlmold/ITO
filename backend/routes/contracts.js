'use strict';

var express = require('express');
var router = express.Router();
var logger = require('../helpers/logger');


/**
 * Get All Current Products
 */
router.get("/", function (req, res) {

    logger.debug("### Get all Contracts in System");
    var contracts = [];
    res.send(contracts)
});


router.post("/", function (req, res) {

    logger.debug("#Create ticket contract");
    res.send(JSON.stringify({address:""}));
})




module.exports = router;
