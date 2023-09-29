const sequelize = require('../Config/dbconfig');
const Stages = require("../models/Stages");


class StagesRepository 
{
  async getdata(){
    try{
      return await Stages.findAll();
    }
    catch(error){
      console.log(error);
      throw(error);
    }
  } 

  async Addition(StageData) 
  {
    try 
    {
      // Check for duplicate module name
       const existingModule = await Stages.findOne({
            where: { Name: StageData.Name }
        });
        if (existingModule) {
            throw new Error('Stage name already exists');
        }
      return await Stages.create(StageData);
    } catch (error){
      console.log(error);
      throw error;
    }
  }

  async findByName(Name) {
    try {
      return await Stages.findOne({
        where: {
          Name : Name,
        },
      });
    } catch (error) {
      throw error;
    }
  }

//   //=====================================
//   async modulesRights(userId){
//     try{
//       return await sequelize.query('EXEC USP_GetUserModuleRights :userId', {
//         replacements: { userId },
//       });
//     }
//     catch(error){
//       console.log(error);
//       throw(error);
//     }
//   } 
//   //==============================
  
  async UpdateStage(StageId, updatedData) 
    {
        try {
            const StageToUpdate = await Stages.findByPk(StageId);
            if (StageToUpdate) {
                const updateStage = await StageToUpdate.update(updatedData);
                return updateStage;
            } else {
                return null;
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

  

  async DeletStage(StageId) {
    try 
    {
      const StageToDelete = await Stages.findByPk(StageId);
      if (StageToDelete) {
          await StageToDelete.destroy();
      } else {
          throw new Error('User not found');
      }
      
    } 
    catch (error) 
    {
      console.log(error);
      throw error;
    }
  }

}

  
  module.exports = new StagesRepository();