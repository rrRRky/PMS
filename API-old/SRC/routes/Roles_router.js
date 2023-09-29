const express = require("express");
const router = express.Router();
const authenticateToken = require('../routes/authenticateToken');
const {
    GetRolesData,
    AddRole,
    UpdateRole,
    DeleteRole,
} = require('../Controllers/RolesController')


//---Modules----
router.route("/").get(authenticateToken,GetRolesData);
router.route("/addRoles").post(authenticateToken,AddRole);
router.route("/Update/").put(authenticateToken,UpdateRole);
router.route("/Delete/").delete(authenticateToken,DeleteRole);

module.exports = router;