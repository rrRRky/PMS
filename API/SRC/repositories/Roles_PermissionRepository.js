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
  async RMFPermission(roleId){
    try{
      return await sequelize.query('EXEC SP_GetRoleModuleFunctions :roleId ', {
        replacements: { roleId },
      });
    }
    catch(error){
      console.log(error);
      throw(error);
    }
  } 
  async InsertUpdateRolePermissons(jsonData) {
    try {
      const query = `EXEC InsertUpdateRolePermissons @jsonData = :jsonData`;
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

  async IsAuthorizeModuleForRole(roleId,muduleCode,functioncode) {
   
    try {
      const query = `EXEC SP_AuthorizedModuleForRole  :roleId ,:muduleCode ,:functioncode`;
      const [result] = await sequelize.query(query, {
        replacements: { roleId,muduleCode,functioncode } 
      });
      
      return result[0];
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