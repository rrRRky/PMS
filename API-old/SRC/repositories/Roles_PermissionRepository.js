const sequelize = require('../Config/dbconfig');
const Roles_Permissions = require("../models/Roles_Permission");

class Roles_PermissionsRepository 
{
  async RPdata(){
    try{
      return await Roles_Permissions.findAll();
    }
    catch(error){
      console.log(error);
      throw(error);
    }
  } 
  
//   async Addition(userData) 
//   {
//     try 
//     {
//       // Check for duplicate module name
//        const existingModule = await Controls.findOne({
//             where: { ControlName: userData.ControlName }
//         });
//         if (existingModule) {
//             throw new Error('Control name already exists');
//         }
//       return await Controls.create(userData);
//     } catch (error){
//       console.log(error);
//       throw error;
//     }
//   }

  async UpdateRP(Roles_PermissionsId, updatedData) 
  {
    try {
        const RPToUpdate = await Roles_Permissions.findByPk(Roles_PermissionsId);
        if (RPToUpdate) {
            const updateRP = await RPToUpdate.update(updatedData);
            return updateRP;
        } else {
            return null;
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
  }
   
  async DeleteRP(RPId)
   {
    try 
    {
      const RPToDelete = await Roles_Permissions.findByPk(RPId);
      if (RPToDelete) {
          await RPToDelete.destroy();
      } else {
          throw new Error('Roles_Permissions not found');
      }
      
    } 
    catch (error) 
    {
      console.log(error);
      throw error;
    }
  }

}


module.exports = new Roles_PermissionsRepository();