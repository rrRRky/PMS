const express =  require('express')
const router = express.Router()
const authenticateToken = require('./authenticateToken');
const {InsertUpdateProjectTaskDynamicField} = require('../Controllers/ProjectTaskDynamicFieldController')

router.route("/AddProjectTD").post(authenticateToken('','A'),InsertUpdateProjectTaskDynamicField)
router.route("/UpdateProjectTD").post(authenticateToken('','E'),InsertUpdateProjectTaskDynamicField)

module.exports= router;