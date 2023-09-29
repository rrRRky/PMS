const sequelize = require('../Config/dbconfig');
const ModuleCategory = require("../models/ModuleCategory");


// const express = require('express')
// const app = express()
// app.get("/",(req,res)=>{
//   const a=  ModuleCategory.findAll();

//   console.log(a)
//   res.send("Hi.. this is node+express application.")
// })

class ModuleCategoryRepository 
{
  async ModuleCategorydata(){
    try{
      return await ModuleCategory.findAll();
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
       const existingModule = await ModuleCategory.findOne({
            where: { Name: userData.Name }
        });
        if (existingModule) {
            throw new Error('Control name already exists');
        }
      return await ModuleCategory.create(userData);
    } catch (error){
      console.log(error);
      throw error;
    }
  }
  async UpdateMCategory(MCategoryId, updatedData) {
    try {
        const mCategoryToUpdate = await ModuleCategory.findByPk(MCategoryId);
        if (mCategoryToUpdate) {
            const updatemCategory = await mCategoryToUpdate.update(updatedData);
            return updatemCategory;
        } else {
            return null;
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
  }
 
}
module.exports = new ModuleCategoryRepository();