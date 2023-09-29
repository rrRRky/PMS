const express = require("express");
const router = express.Router();
const authenticateToken = require('../routes/authenticateToken');
const {
    GetSpaceData,
    AddSpace,
    UpdateSpace,
    DeleteSpace,
} = require('../Controllers/SpaceController')


//---Modules----
router.route("/").get(authenticateToken,GetSpaceData);
router.route("/addSpace").post(authenticateToken,AddSpace);
router.route("/Update/").put(authenticateToken,UpdateSpace);
router.route("/Delete/").delete(authenticateToken,DeleteSpace);

module.exports = router;

