const sequelize = require('../Config/dbconfig');
const Modules = require("../models/Modules");

class ModulesRepository 
{
  async Modulesdata(userId){
    try{
      return await sequelize.query('EXEC sp_FatchModulesData');
    }
    catch(error){
      console.log(error);
      throw(error);
    }
  } 
   
  async InsertUpdateModules(jsonData) {
    try {
      const query = `EXEC InsertUpdateModules @jsonData = :jsonData`;
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
  
  // async Modulesdata(userData){
  //   try{
  //     return await Modules.findAll();
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
  //      const existingModule = await Modules.findOne({
  //           where: { Name: userData.Name }
  //       });
  //       if (existingModule) {
  //           throw new Error('Module name already exists');
  //       }
  //     return await Modules.create(userData);
  //   } catch (error){
  //     console.log(error);
  //     throw error;
  //   }
  // }

  // async UpdateModule(ModuleId, updatedData) {
  //   try {
  //       const moduleToUpdate = await Modules.findByPk(ModuleId);
  //       if (moduleToUpdate) {
  //           const updatemodule = await moduleToUpdate.update(updatedData);
  //           return updatemodule;
  //       } else {
  //           return null;
  //       }
  //   } catch (error) {
  //       console.log(error);
  //       throw error;
  //   }
  // }
}
module.exports = new ModulesRepository();