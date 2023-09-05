const express = require("express");
const router = express.Router();
const authenticateToken = require('./authenticateToken');
const {
    LookUpdata
} = require('../Controllers/LookUpController')

const moduleCode='LKUP';
//---Modules----
router.route("/LookupData").get(authenticateToken(moduleCode,'V'),LookUpdata);

module.exports = router;