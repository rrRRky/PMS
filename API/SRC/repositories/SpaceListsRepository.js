const sequelize = require('../Config/dbconfig');


class SpaceListsRepository 
{
  async SpaceListsdata(){
    try{
      return await sequelize.query('EXEC sp_FatchSpaceListsData');
    }
    catch(error){
      console.log(error);
      throw(error);
    }
  } 
  async InsertUpdateSpaceLists(jsonData) {
    try {
      const query = `EXEC InsertUpdateSpaceLists @jsonData = :jsonData`;
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

module.exports = new SpaceListsRepository();