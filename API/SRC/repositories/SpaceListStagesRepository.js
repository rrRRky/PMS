const sequelize = require('../Config/dbconfig');


class SpaceListsRepository 
{
  async SpaceListStagesData(spaceListId, spaceListStageId){
    try {
      const query = `EXEC sp_FatchSpaceListStagesData :spaceListId ,:spaceListStageId`;
      const result = await sequelize.query(query, {
        replacements: {spaceListId, spaceListStageId },
        type: sequelize.QueryTypes.SELECT
      });
      
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  } 
  async InsertUpdateSpaceListStages(jsonData) {
    try {
      const query = `EXEC InsertUpdateSpaceListStages @jsonData = :jsonData`;
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