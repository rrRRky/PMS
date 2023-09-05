const sequelize = require('../Config/dbconfig');


class LookUpRepository 
{
  
  async LookUpdata(type) {
    
    try {
      const query = `EXEC sp_FatchLookupsData :type`;
      const result = await sequelize.query(query, {
        replacements: { type },
        type: sequelize.QueryTypes.SELECT
      });
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
    
  }
  

}

module.exports = new LookUpRepository();