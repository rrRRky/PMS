const sequelize = require('../Config/dbconfig');
const Spaces = require("../models/Spaces");


class SpacesRepository 
{
  async getdata(){
    try{
      return await sequelize.query('EXEC sp_FatchSpacesData');
    }
    catch(error){
      console.log(error);
      throw(error);
    }
  } 
  async InsertUpdateSpaces(jsonData) {
    try {
      const query = `EXEC InsertUpdateSpaces @jsonData = :jsonData`;
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
  
  // async getdata(){
  //   try{
  //     return await Spaces.findAll();
  //   }
  //   catch(error){
  //     console.log(error);
  //     throw(error);
  //   }
  // } 
  // async Addition(SpacesData) 
  // {
  //   try 
  //   {
  //     // Check for duplicate module name
  //      const existingModule = await Spaces.findOne({
  //           where: { Name: SpacesData.Name }
  //       });
  //       if (existingModule) {
  //           throw new Error('Name already exists');
  //       }
  //     return await Spaces.create(SpacesData);
  //   } catch (error){
  //     console.log(error);
  //     throw error;
  //   }
  // }

  // async findByName(Name) {
  //   try {
  //     return await Spaces.findOne({
  //       where: {
  //         Name : Name,
  //       },
  //     });
  //   } catch (error) {
  //     throw error;
  //   }
  // }

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
  
  // async UpdateSpace(SpaceId, updatedData) 
  //   {
  //       try {
  //           const SpaceToUpdate = await Spaces.findByPk(SpaceId);
  //           if (SpaceToUpdate) {
  //               const updateSpace = await SpaceToUpdate.update(updatedData);
  //               return updateSpace;
  //           } else {
  //               return null;
  //           }
  //       } catch (error) {
  //           console.log(error);
  //           throw error;
  //       }
  //   }

  

  async DeletSpace(SpaceId) {
    try 
    {
      const SpaceToDelete = await Spaces.findByPk(SpaceId);
      if (SpaceToDelete) {
          await SpaceToDelete.destroy();
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

  
  module.exports = new SpacesRepository();