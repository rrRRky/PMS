const sequelize = require('../Config/dbconfig');
const Roles = require("../models/Roles");


class RolesRepository 
{
  async getdata(){
    try{
      return await Roles.findAll();
    }
    catch(error){
      console.log(error);
      throw(error);
    }
  } 

  async Addition(RolesData) 
  {
    try 
    {
      // Check for duplicate module name
       const existingModule = await Roles.findOne({
            where: { RoleName: RolesData.RoleName }
        });
        if (existingModule) {
            throw new Error('RoleName already exists');
        }
      return await Roles.create(RolesData);
    } catch (error){
      console.log(error);
      throw error;
    }
  }

  async findByName(Name) {
    try {
      return await Roles.findOne({
        where: {
            RoleName : RoleName,
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
  
  async UpdateRoles(RoleId, updatedData) 
    {
        try {
            const RolesToUpdate = await Roles.findByPk(RoleId);
            if (RolesToUpdate) {
                const updateRoles = await RolesToUpdate.update(updatedData);
                return updateRoles;
            } else {
                return null;
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

  async DeleteRole(RoleId)
   {
    try 
    {
      const RolesToDelete = await Roles.findByPk(RoleId);
      if (RolesToDelete) {
          await RolesToDelete.destroy();
      } else {
          throw new Error('Role not found');
      }
      
    } 
    catch (error) 
    {
      console.log(error);
      throw error;
    }
  }
}  
  module.exports = new RolesRepository();