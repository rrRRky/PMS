const express = require("express");
const router = express.Router();
const authenticateToken = require('../routes/authenticateToken');
const {
    GetControlsData,
    AddControls,
    UpdateControls
} = require('../Controllers/ControlsController')


//---Modules----
router.route("/").get(authenticateToken,GetControlsData);
router.route("/addControls").post(authenticateToken,AddControls);
router.route("/Update/").put(authenticateToken,UpdateControls);

module.exports = router;
