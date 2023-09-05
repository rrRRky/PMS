const express = require("express");
const router = express.Router();
const authenticateToken = require('../routes/authenticateToken');
const {
    SpaceListStagesData,
    InsertUpdateSpaceListStages
} = require('../Controllers/SpaceListStagesController')

const moduleCode='SPLSTSTG';
//---Modules----
router.route("/").get(authenticateToken(moduleCode,'V'),SpaceListStagesData);
router.route("/AddSpcLstStg").post(authenticateToken(moduleCode,'A'), InsertUpdateSpaceListStages);
router.route("/UpdateSpcLstStg").post(authenticateToken(moduleCode,'E'), InsertUpdateSpaceListStages);


module.exports = router;
