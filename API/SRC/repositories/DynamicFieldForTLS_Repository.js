// DynamicFieldsForTaskListStage

const sequelize = require('../Config/dbconfig');


class DynamicFieldForTLSRepository 
{
  async DynamicFieldForTLSdata(SpaceListId,StageId,ProjectTaskHeaderId){
    try{
        const query=`EXEC SP_GetDynamicFieldsForTaskListStage :SpaceListId, :StageId, :ProjectTaskHeaderId`
        const result = await sequelize.query(query, {
            replacements: {SpaceListId, StageId, ProjectTaskHeaderId },
            type: sequelize.QueryTypes.SELECT
        });
        return result
    }
    catch(error){
      console.log(error);
      throw(error);
    }
  } 
}

module.exports = new DynamicFieldForTLSRepository();