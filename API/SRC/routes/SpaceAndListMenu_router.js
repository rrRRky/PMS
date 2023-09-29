const express=require ('express');
const router = express.Router();

const {GetSpaceAndListMenuData} =require("../Controllers/SpaceAndListMenuController")

const authenticateToken= require("../routes/authenticateToken")

router.route("/").get(authenticateToken('','V'),GetSpaceAndListMenuData);

module.exports=router;