const express = require("express");
const router = express.Router();
const authenticateToken = require('../routes/authenticateToken');

const {
    GetFunctionData,
    InsertUpdateFunctions,
} = require('../Controllers/FunctionController')


const moduleCode='FUN';

//---Modules----
router.route("/").get(authenticateToken(moduleCode,'V'),GetFunctionData);
router.route("/AddFunctions").post(authenticateToken(moduleCode,'A') ,InsertUpdateFunctions);
router.route("/UpdateFunctions").post(authenticateToken(moduleCode,'E') ,InsertUpdateFunctions);




module.exports = router;
