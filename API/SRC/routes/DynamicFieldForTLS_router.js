// DynamicFieldsForTaskListStage

const express = require('express')
const router = express.Router()
const authenticateToken = require('../routes/authenticateToken');
const {DynamicFieldForTLSdata} = require('../Controllers/DynamicFieldForTLS_Controller')

router.route("/").get(authenticateToken('','V'),DynamicFieldForTLSdata);

module.exports= router;