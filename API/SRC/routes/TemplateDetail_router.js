const express = require("express");
const router = express.Router();
const authenticateToken = require('../routes/authenticateToken');
const {
    TemplateDetailsdata,
    InsertUpdateTemplateDetails
} = require('../Controllers/TemplateDetailsController')

const moduleCode='TPLTDTL';
//---Modules----
router.route("/").get(authenticateToken(moduleCode,'V'),TemplateDetailsdata);
router.route("/AddTpltDtls").post(authenticateToken(moduleCode,'A'), InsertUpdateTemplateDetails);
router.route("/UpdateTpltDtls").post(authenticateToken(moduleCode,'E'), InsertUpdateTemplateDetails);


module.exports = router;