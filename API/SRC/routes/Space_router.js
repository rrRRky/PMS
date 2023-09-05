const express = require("express");
const router = express.Router();
const authenticateToken = require('../routes/authenticateToken');
const {
    GetSpaceData,
    InsertUpdateSpaces,
    // AddSpace,
    // UpdateSpace,
    DeleteSpace,
} = require('../Controllers/SpaceController')

const moduleCode='SPC';
//---Modules----
router.route("/").get(authenticateToken(moduleCode,'V'),GetSpaceData);
router.route("/AddSpaces").post(authenticateToken(moduleCode,'A'),InsertUpdateSpaces);
router.route("/UpdateSpaces").post(authenticateToken(moduleCode,'E'),InsertUpdateSpaces);
// router.route("/addSpace").post(authenticateToken,AddSpace);
// router.route("/Update/").put(authenticateToken,UpdateSpace);
router.route("/Delete/").delete(authenticateToken,DeleteSpace);

module.exports = router;

