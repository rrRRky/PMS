const express = require("express");
const router = express.Router();
const authenticateToken = require('../routes/authenticateToken');
const {
    GetMCategoryData,
    AddMCategory,
    UpdatemCategory,
} = require('../Controllers/ModuleCategoryController')


//---Modules----
router.route("/").get(authenticateToken,GetMCategoryData);
router.route("/addMCategory").post(authenticateToken,AddMCategory);
router.route("/Update/").put(authenticateToken,UpdatemCategory);

module.exports = router;