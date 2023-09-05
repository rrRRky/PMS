const express = require("express");
const router = express.Router();
const authenticateToken = require('../routes/authenticateToken');
const {
    SpaceListsdata,
    InsertUpdateSpaceLists
} = require('../Controllers/SpaceListsController')

const moduleCode='SPLST';
//---Modules----
router.route("/").get(authenticateToken(moduleCode,'V'),SpaceListsdata);
router.route("/AddSpaceLists").post(authenticateToken(moduleCode,'A'), InsertUpdateSpaceLists);
router.route("/UpdateSpaceLists").post(authenticateToken(moduleCode,'E'), InsertUpdateSpaceLists);


module.exports = router;
