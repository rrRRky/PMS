const sequelize =  require('../Config/dbconfig')

class ProjectTaskDynamicFieldRepository
{
  async InsertUpdateProjectTaskDynamicField(jsonData) {
    try {
      const query = `InsertUpdateProjectTaskDynamicField @jsonData = :jsonData`;
      const result = await sequelize.query(query, {
        replacements: { jsonData },
        type: sequelize.QueryTypes.SELECT
      });
      return result[0];
    } 
    catch (error) {
      console.log(error);
      throw error;
    }
  }
}
module.exports= new ProjectTaskDynamicFieldRepository();