const sequelize = require('../Config/dbconfig');
const Functions = require("../models/Functions");

class FunctionRepository 
{
  async Functiondata(userData){
    try{
      return await Functions.findAll();
    }
    catch(error){
      console.log(error);
      throw(error);
    }
  } 
  
  async Addition(userData) 
  {
    try 
    {
      // Check for duplicate module name
       const existingModule = await Functions.findOne({
            where: { FunctionName: userData.FunctionName }
        });
        if (existingModule) {
            throw new Error('Function name already exists');
        }
      return await Functions.create(userData);
    } catch (error){
      console.log(error);
      throw error;
    }
  }

}

module.exports = new FunctionRepository();