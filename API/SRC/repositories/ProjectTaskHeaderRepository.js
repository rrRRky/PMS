const sequelize = require('../Config/dbconfig');

class ProjectTaskHeaderRepository 
{
  async GetProjectTaskHeader(){
    try
    {
      const result = await sequelize.query(`EXEC sp_FatchProjectTaskHeader`);
      return result
    }
    catch(error)
    {
      console.log(error);
      throw error
    }
  }

  async InsertUpdateProjectTaskHeader(jsonData) {
    try {
      const query = `EXEC InsertUpdateProjectTaskHeader @jsonData = :jsonData`;
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

module.exports = new ProjectTaskHeaderRepository();