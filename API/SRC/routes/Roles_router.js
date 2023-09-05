const express = require("express");
const router = express.Router();
const authenticateToken = require('../routes/authenticateToken');
const {
    GetRolesData,
    InsertUpdateRoles,
    // AddRole,
    // UpdateRole,
    DeleteRole,
} = require('../Controllers/RolesController')

const moduleCode='RLS';
//---Modules----
router.route("/").get(authenticateToken(moduleCode,'V'),GetRolesData);
router.route("/AddRoles").post(authenticateToken(moduleCode,'A'),InsertUpdateRoles);
router.route("/UpdateRoles").post(authenticateToken(moduleCode,'E'),InsertUpdateRoles);
// router.route("/addRoles").post(authenticateToken,AddRole);
// router.route("/Update/").put(authenticateToken,UpdateRole);
router.route("/Delete/").delete(authenticateToken,DeleteRole);

module.exports = router;