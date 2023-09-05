const express = require("express");
const router = express.Router();
const authenticateToken = require('../routes/authenticateToken');
const {
    GetControlsData,
    InsertOrUpdateControls
    // AddControls,
    // UpdateControls
} = require('../Controllers/ControlsController')

const moduleCode='CNT';
//---Modules----
router.route("/").get(authenticateToken(moduleCode,'V'),GetControlsData);
router.route("/AddControls").post(authenticateToken(moduleCode,'A'), InsertOrUpdateControls);
router.route("/UpdateControls").post(authenticateToken(moduleCode,'E'), InsertOrUpdateControls);


module.exports = router;
