const express = require("express");
const router = express.Router();
const authenticateToken = require('../routes/authenticateToken');
const {
    GetStagesData,
    AddStages,
    UpdateStages,
    DeleteStage,
} = require('../Controllers/StagesController')


//---Modules----
router.route("/").get(authenticateToken,GetStagesData);
router.route("/addStage").post(authenticateToken,AddStages);
router.route("/Update/").put(authenticateToken,UpdateStages);
router.route("/Delete/").delete(authenticateToken,DeleteStage);

module.exports = router;

