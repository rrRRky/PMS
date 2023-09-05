const sequelize = require('../Config/dbconfig');
const User = require("../models/Users");
// const bcrypt = require('bcrypt');
const bcryptUtils = require('../Authentication/bycriptUtils')

class UserRepository 
{
  async getdata(){
    try{
      return await sequelize.query('EXEC sp_FatchUsersData');
    }
    catch(error){
      console.log(error);
      throw(error);
    }
  } 
  
  async InsertUpdateUsers(jsonData) {
    try {    
    

      const query = `EXEC InsertUpdateUsers @jsonData = :jsonData`;      
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
  // async Createee(userData) 
  // {
  //   try {
  //     // Check for duplicate module name
  //     const existingUser = await User.findOne({
  //       where: { Name: userData.Name }
  //     });
  //     if (existingUser) {
  //       throw new Error('User name already exists');
  //     }
  //     const hashedPassword = await bcryptUtils.hashpassword(userData.Password, 10);
  //     userData.Password = hashedPassword;
      
  //     return await User.create(userData);
  //   } catch (error){
  //     console.log(error);
  //     throw error;
  //   }
  // }
  async validateUser(jsonData) {
    try {
      const query = `EXEC SP_IsValidateUser @jsonData = :jsonData`;      
      const result = await sequelize.query(query, {
        replacements: { jsonData },
        type: sequelize.QueryTypes.SELECT
      });
      return result[0];
    } catch (error) {
      throw error;
    }
  }


  async findByName1(UserId) {
    try {
      
      return await User.findOne({
        where: {
          UserId : UserId,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  //==================GetMenuesForUser===================
  async GetMenuesForUser(userId){
    try{
      return await sequelize.query('EXEC SP_GetMenuesForUser :userId', {
        replacements: { userId },
      });
    }
    catch(error){
      console.log(error);
      throw(error);
    }
  } 
  //=============GetModuleFunctionsForRole=================
  async GetModuleFunctionsForRole(roleId ,moduleId){
    try{
      return await sequelize.query('EXEC SP_GetModuleFunctionsForRole :roleId ,:moduleId', {
        replacements: { roleId , moduleId },
      });
    }
    catch(error){
      console.log(error);
      throw(error);
    }
  } 
  
  async UpdateUser(UserId, updatedData) {
    try {
        const UserToUpdate = await User.findByPk(UserId);
        if (UserToUpdate) {
            const updateUser = await UserToUpdate.update(updatedData);
            return updateUser;
        } else {
            return null;
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

  async UpdateUserStatus(UserId, isActive) {
    try {
        const UserToUpdate = await User.findByPk(UserId);
        if (UserToUpdate) {
          UserToUpdate.isActive = isActive;
            await UserToUpdate.save();
            return UserToUpdate;
        } else {
            return null;
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
  }

  async DeleteUser(UserId) {
    try 
    {
      const userToDelete = await User.findByPk(UserId);
      if (userToDelete) {
          await userToDelete.destroy();
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

  
  module.exports = new UserRepository();