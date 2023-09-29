const express = require("express");
const router = express.Router();
const authenticateToken = require('../routes/authenticateToken');
const {
  GetMuduleData,
  AddModules,
  Updatemodule
} = require('../Controllers/ModulesController')


//---Modules----
router.route("/").get(authenticateToken,GetMuduleData);
router.route("/addModules").post(authenticateToken,AddModules);
router.route("/Update/").put(authenticateToken,Updatemodule);

module.exports = router;

