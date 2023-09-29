// App_routes.js
const express = require("express");
const router = express.Router();
const authenticateToken = require('../routes/authenticateToken');

const {
  getUsers,
  createUser,
  loginUser,
  getUserModulesRights,
  GetModuleFunctionsForRole,
  UpdateUser,
  ActivateUser,
  DeactivateUser,
  DeleteUser,
} = require('../Controllers/UsersControllers')


//---users----
router.route("/").get(authenticateToken,getUsers);
router.route("/addUsers").post(authenticateToken,createUser);
router.route('/login').post(loginUser);
router.route('/ModuleRight').get(authenticateToken,getUserModulesRights);
router.route('/ModuleAction').get(authenticateToken,GetModuleFunctionsForRole);
router.route('/Update/').put(authenticateToken,UpdateUser);
router.route('/Activate').get(authenticateToken,ActivateUser);
router.route('/Deactivate').get(authenticateToken,DeactivateUser);
router.route('/Delete/').delete(authenticateToken,DeleteUser);
//router.post('/modules/:id/update', ModuleController.UpdateModuleData);

module.exports = router;









