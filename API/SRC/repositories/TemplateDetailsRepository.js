const sequelize = require('../Config/dbconfig');


class TemplateDetailsRepository 
{
  async TemplateDetailsdata(templateId ,templatedetailId){
    try{
      const query = `EXEC sp_FatchTemplateDetailsData :templateId ,:templatedetailId`;
      const result = await sequelize.query(query, {
        replacements: { templateId ,templatedetailId},
        type: sequelize.QueryTypes.SELECT
      });
      return result;
    }
    catch(error){
      console.log(error);
      throw(error);
    }
  } 
  async InsertUpdateTemplateDetails(jsonData) {
    try {
      const query = `EXEC InsertUpdateTemplateDetails @jsonData = :jsonData`;
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

module.exports = new TemplateDetailsRepository();