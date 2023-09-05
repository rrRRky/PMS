const sequelize = require('../Config/dbconfig');
const Functions = require("../models/Functions");

class FunctionRepository 
{
  async Functiondata(){
    try{
      return await sequelize.query('EXEC sp_FatchFunctionsData');
    }
    catch(error){
      console.log(error);
      throw(error);
    }
  } 
  async InsertUpdateFunctions(jsonData) {
    try {
      const query = `EXEC InsertUpdateFunctions @jsonData = :jsonData`;
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

  // async Functiondata(userData){
  //   try{
  //     return await Functions.findAll();
  //   }
  //   catch(error){
  //     console.log(error);
  //     throw(error);
  //   }
  // } 
  // async Addition(userData) 
  // {
  //   try 
  //   {
  //     // Check for duplicate module name
  //      const existingModule = await Functions.findOne({
  //           where: { FunctionName: userData.FunctionName }
  //       });
  //       if (existingModule) {
  //           throw new Error('Function name already exists');
  //       }
  //     return await Functions.create(userData);
  //   } catch (error){
  //     console.log(error);
  //     throw error;
  //   }
  // }

}

module.exports = new FunctionRepository();