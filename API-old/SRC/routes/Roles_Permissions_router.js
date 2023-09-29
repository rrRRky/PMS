const express = require("express");
const router = express.Router();
const authenticateToken = require('../routes/authenticateToken');
const {
    GetRPData,
    //AddStages,
    UpdateRoles_Permissions,
    DeleteRoles_Permissions,
} = require('../Controllers/Roles_PermissionsController')


//---Modules----
router.route("/").get(authenticateToken,GetRPData);
//router.route("/addModules").post(authenticateToken,AddModules);
router.route("/Update/").put(authenticateToken,UpdateRoles_Permissions);
router.route("/Delete/").put(authenticateToken,DeleteRoles_Permissions);

module.exports = router;

