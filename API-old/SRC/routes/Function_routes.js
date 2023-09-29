const express = require("express");
const router = express.Router();
const authenticateToken = require('../routes/authenticateToken');
const {
    GetFunctionData,
    AddFunction,
} = require('../Controllers/FunctionController')


//---Modules----
router.route("/").get(authenticateToken,GetFunctionData);
router.route("/addFunction").post(authenticateToken,AddFunction);

module.exports = router;
