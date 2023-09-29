// DynamicFieldsForTaskListStage
const DynamicFieldForTLSRepository = require('../repositories/DynamicFieldForTLS_Repository')

// ---------------------------- GET /users ---------------------------
const DynamicFieldForTLSdata= async (req, res) =>{
    const SpaceListId = req.query.SpaceListId
    const StageId  = req.query.StageId 
    const ProjectTaskHeaderId  = req.query.ProjectTaskHeaderId 

    const list = await DynamicFieldForTLSRepository.DynamicFieldForTLSdata(SpaceListId,StageId,ProjectTaskHeaderId)
    console.log(list)

    let jsonresult;
      for (const result of list) {
      jsonresult= JSON.parse(result.jsonvalue);

      }    
    res.json(jsonresult);
} 

module.exports={
                DynamicFieldForTLSdata
             };