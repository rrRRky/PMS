const sequelize= require('../Config/dbconfig');

class SpaceAndListMenuRepository
{
    async GetSpaceAndListMenuData() {
      try{
        return await sequelize.query(`EXEC SP_GetSpaceAndListMenu`);

      }catch(error){
        console.log(error);
        throw error
      }
    }
}

module.exports = new SpaceAndListMenuRepository();