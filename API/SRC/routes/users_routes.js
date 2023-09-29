// App_routes.js
const express = require("express");
const router = express.Router();
const authenticateToken = require('../routes/authenticateToken');

const {
  getUsers,
  InsertUpdateUsers,
  loginUser,
  getUserModulesRights,
  GetModuleFunctionsForRole,
  UpdateUser,
  ActivateUser,
  DeactivateUser,
  DeleteUser,
} = require('../Controllers/UsersControllers')

const moduleCode='USR';

//---users----
router.route("/").get(authenticateToken(moduleCode,'V'),getUsers);
router.route("/addUsers").post(authenticateToken(moduleCode,'A'),InsertUpdateUsers);
router.route("/UpdateUsers").post(authenticateToken(moduleCode,'E'),InsertUpdateUsers);
router.route('/login').post(loginUser);
router.route('/ModuleRight').get(authenticateToken('','V'),getUserModulesRights);
router.route('/ModuleAction').get(authenticateToken('','V'),GetModuleFunctionsForRole);
router.route('/Update/').put(authenticateToken,UpdateUser);
router.route('/Activate').get(authenticateToken,ActivateUser);
router.route('/Deactivate').get(authenticateToken,DeactivateUser);
router.route('/Delete/').delete(authenticateToken,DeleteUser);
//router.post('/modules/:id/update', ModuleController.UpdateModuleData);

module.exports = router;









