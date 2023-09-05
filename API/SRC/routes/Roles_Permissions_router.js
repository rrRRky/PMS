const express = require("express");
const router = express.Router();
const authenticateToken = require('../routes/authenticateToken');
const {
    GetRPData,
    RMFPermission,
    InsertUpdateRolePermissons,
    //AddStages,
    UpdateRoles_Permissions,
    DeleteRoles_Permissions,
} = require('../Controllers/Roles_PermissionsController')

const moduleCode='ROLEPERM';
//---Modules----
router.route("/").get(authenticateToken,GetRPData);
router.route("/RMFPermission").get(authenticateToken(moduleCode,'V'),RMFPermission);
router.route("/InsertUpdateRolePermissons").post(authenticateToken(moduleCode,'E'),InsertUpdateRolePermissons);
//router.route("/addModules").post(authenticateToken,AddModules);
router.route("/Update/").put(authenticateToken,UpdateRoles_Permissions);
router.route("/Delete/").put(authenticateToken,DeleteRoles_Permissions);

module.exports = router;

