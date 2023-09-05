const express = require("express");
const router = express.Router();
const authenticateToken = require('../routes/authenticateToken');
const {
  GetMuduleData,
  InsertUpdateModules
  // AddModules,
  // Updatemodule
} = require('../Controllers/ModulesController')

const moduleCode='MOD';
//---Modules----
router.route("/").get(authenticateToken(moduleCode,'V'),GetMuduleData);
router.route("/AddModules").post(authenticateToken(moduleCode,'A'),InsertUpdateModules);
router.route("/UpdateModules").post(authenticateToken(moduleCode,'E'),InsertUpdateModules);
// router.route("/addModules").post(authenticateToken,AddModules);
// router.route("/Update/").put(authenticateToken,Updatemodule);

module.exports = router;

