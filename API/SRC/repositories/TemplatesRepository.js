const sequelize = require('../Config/dbconfig');


class TemplatesRepository 
{
  async Templatesdata(){
    try{
      return await sequelize.query('EXEC sp_FatchTemplatesData');
    }
    catch(error){
      console.log(error);
      throw(error);
    }
  } 
  async InsertUpdateTemplates(jsonData) {
    try {
      const query = `EXEC InsertUpdateTemplates @jsonData = :jsonData`;
      const result = await sequelize.query(query, {
        replacements: { jsonData },
        type: sequelize.QueryTypes.SELECT
      });
      return result[0];
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

}

module.exports = new TemplatesRepository();