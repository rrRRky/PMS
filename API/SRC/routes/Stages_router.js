const express = require("express");
const router = express.Router();
const authenticateToken = require('../routes/authenticateToken');
const {
    GetStagesData,
    InsertUpdateStages,
    // AddStages,
    // UpdateStages,
    DeleteStage,
} = require('../Controllers/StagesController')

const moduleCode='STG';

//---Modules----
router.route("/").get(authenticateToken(moduleCode,'V'),GetStagesData);
router.route("/AddStages").post(authenticateToken(moduleCode,'A'),InsertUpdateStages);
router.route("/UpdateStages").post(authenticateToken(moduleCode,'E'),InsertUpdateStages);
// router.route("/addStage").post(authenticateToken,AddStages);
// router.route("/Update/").put(authenticateToken,UpdateStages);
router.route("/Delete/").delete(authenticateToken,DeleteStage);

module.exports = router;

