const express = require("express");
const router = express.Router();
const authenticateToken = require('../routes/authenticateToken');
const {
    Templatesdata,
    InsertUpdateTemplates
} = require('../Controllers/TemplatesController')

const moduleCode='TPLT';
//---Modules----
router.route("/").get(authenticateToken(moduleCode,'V'),Templatesdata);
router.route("/AddTemplates").post(authenticateToken(moduleCode,'A'), InsertUpdateTemplates);
router.route("/UpdateTemplates").post(authenticateToken(moduleCode,'E'), InsertUpdateTemplates);


module.exports = router;
