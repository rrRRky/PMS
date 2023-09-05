const express = require("express");
const router = express.Router();
const authenticateToken = require('../routes/authenticateToken');
const {
    GetMCategoryData,
    InsertUpdateModuleCategory
    // AddMCategory,
    // UpdatemCategory,
} = require('../Controllers/ModuleCategoryController')


//---Modules----
const moduleCode='MDC';

router.route("/").get(authenticateToken(moduleCode,'V'),GetMCategoryData);
router.route("/AddModuleCategory").post(authenticateToken(moduleCode,'A'),InsertUpdateModuleCategory);
router.route("/UpdateModuleCategory").post(authenticateToken(moduleCode,'E'),InsertUpdateModuleCategory);
// router.route("/addMCategory").post(authenticateToken,AddMCategory);
// router.route("/Update/").put(authenticateToken,UpdatemCategory);

module.exports = router;