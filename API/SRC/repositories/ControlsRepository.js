const sequelize = require('../Config/dbconfig');
const Controls = require("../models/Controls");

class ControlsRepository 
{
  async Controlsdata(userId){
    try{
      return await sequelize.query('EXEC sp_FatchControlsData');
    }
    catch(error){
      console.log(error);
      throw(error);
    }
  } 
  
  async InsertUpdateControls(jsonData) {
    try {
      const query = `EXEC InsertUpdateControls @jsonData = :jsonData`;
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
  
  // async Controlsdata(userData){
  //   try{
  //     return await Controls.findAll();
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
  //      const existingModule = await Controls.findOne({
  //           where: { ControlName: userData.ControlName }
  //       });
  //       if (existingModule) {
  //           throw new Error('Control name already exists');
  //       }
  //     return await Controls.create(userData);
  //   } catch (error){
  //     console.log(error);
  //     throw error;
  //   }
  // }

  // async UpdateControls(ControlId, updatedData) {
  //   try {
  //       const ControlToUpdate = await Controls.findByPk(ControlId);
  //       if (ControlToUpdate) {
  //           const updateControls = await ControlToUpdate.update(updatedData);
  //           return updateControls;
  //       } else {
  //           return null;
  //       }
  //   } catch (error) {
  //       console.log(error);
  //       throw error;
  //   }
  // }

}

module.exports = new ControlsRepository();