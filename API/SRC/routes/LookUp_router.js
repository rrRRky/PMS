const express = require("express");
const router = express.Router();
const authenticateToken = require('./authenticateToken');
const {
    LookUpdata
} = require('../Controllers/LookUpController')


//---Modules----
router.route("/LookupData").get(authenticateToken('','V'),LookUpdata);

module.exports = router;