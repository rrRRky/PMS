const express = require("express");
const router = express.Router();
const authenticateToken = require('./authenticateToken');
const {
    GetProjectTaskHeader,
    InsertUpdateProjectTaskHeader
} = require('../Controllers/ProjectTaskHeaderController')

const moduleCode='PRJTASK';
//---Modules----
router.route("/").get(authenticateToken('','V'),GetProjectTaskHeader);
router.route("/AddPrjTaskH").post(authenticateToken('','A'), InsertUpdateProjectTaskHeader);
router.route("/UpdatePrjTaskH").post(authenticateToken('','E'), InsertUpdateProjectTaskHeader);


module.exports = router;
