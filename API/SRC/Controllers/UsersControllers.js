const jwt = require('jsonwebtoken');
//const bcrypt = require('bcrypt');
const UsersRepository = require('../repositories/UsersRepository');
const {comparePasswords,hashpassword} = require('../Authentication/bycriptUtils')
const  TokenKey='J@y@n!t@';

// ---------------------------- GET /users ---------------------------
const getUsers = async (req, res) => {
    try {
      const [list] = await UsersRepository.getdata()
      let jsonresult;
      for (const result of list) {
      jsonresult= JSON.parse(result.jsonvalue);
    }    
    res.json(jsonresult);
    } catch (error) {
      res.status(500).json({ error: "Error fetching users from the database" });
    }
};

//---------------------------- POST /users ---------------------------
const InsertUpdateUsers = async (req, res) => {
  try {
    
    if(req.body.hasOwnProperty("password") && req.body.password!="")
    {
      const hashedPassword = await hashpassword(req.body.password, 10);
      req.body.password = hashedPassword;
    }
    
    
    const result = await UsersRepository.InsertUpdateUsers(JSON.stringify(req.body));
    if (result.MsgFlag === 0) {
      res.status(500).json({ error: result.Msg });
    } else {
      res.status(200).json({ msg: result.Msg });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


//---------------------------- Login /users ---------------------------
const loginUser = async (req, res) => {
  try {   

    const jsonData = JSON.stringify(req.body);

    const result = await UsersRepository.validateUser(jsonData);
    
    if(result.MsgFlag==0)
    {
      res.status(500).json({ error: result.Msg });
    }
    else if(! await comparePasswords(req.body.password, result.Password)){
      return res.status(401).json({ error: 'Invalid  password' });
    }
    else 
    {

        const expiresIn= '24h';
        const token1 = jwt.sign({ roleId:result.RoleId, }, TokenKey, { expiresIn }); // Change yourSecretKey
        res.status(200).json({ token:token1, expiresIn, id:result.Id,userId:req.body.userId, name:result.Name,roleId:result.RoleId,roleName:result.RoleName, userImage :result.UserImagePath});
         
      

        // try {
        //   const decodedToken = jwt.verify(token1, TokenKey);
          
        //   if (decodedToken) {
        //     const Rolename = decodedToken.roleName;
        //     console.log('Role Nmae:', Rolename);
        //   } else {
        //     console.log('Invalid JWT');
        //   }
        // } catch (error) {
        //   console.error('Error decoding JWT:', error.message);
        // }
    }

  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Error logging in' +'  '+ error});
  }
};

//-------------------------- MenuesForUser ---------------------------
const getUserModulesRights = async (req, res) =>
{
  const userId = req.query.userId; // Assuming you pass the userId as a query parameter

  try {
    
    //console.log(await UsersRepository.modulesRights(userId));
    const [results] = await UsersRepository.GetMenuesForUser(userId)
    console.log(results);
    //const moduleCategories = new Map();
    let moduleCategories=[];

    for (const result of results) {      
      let moduleCategory = moduleCategories.find(m => m.ModuleCategoryID === result.ModuleCategoryID);
      if(!moduleCategory)
      {
        moduleCategories.push
        ({
          ModuleCategoryID: result.ModuleCategoryID,
          ModuleCategory: result.ModuleCategory,
          CategoryIconURL: result.CategoryIconURL,
          Modules: [],
        });
      }
      
      moduleCategory = moduleCategories.find(m => m.ModuleCategoryID === result.ModuleCategoryID);
  
      let module = moduleCategory.Modules.find(m => m.moduleid === result.ModuleId);
      if (!module) 
      {
        moduleCategory.Modules.push
        ({
          moduleid: result.ModuleId,
          module: result.Module,
          // Actions: [],
          iconurl: result.ModuleIconUrl,
          routingpage: result.RoutingPage,
        });
      }

      // let currentModule = moduleCategory.Modules.find(m => m.moduleid === result.ModuleId);
      // currentModule && currentModule.Actions.push
      ({
        ModuleFunctions: result.ModuleFunctions
      });
    }

    const response = Array.from(moduleCategories.values());
    res.json(response);
  } 
  catch (error) {
    console.error('Error fetching user module rights:', error);
    res.status(500).json({ error: 'Error fetching user module rights' });
  }
};

//-------------------------- ModuleFunctionsForRole ---------------------------
const GetModuleFunctionsForRole = async (req, res) =>
{
  const roleId  = req.query.roleId;  // Assuming you pass the userId as a query parameter
  const moduleId = req.query.moduleId; // Assuming you pass the userId as a query parameter

  try {
    
    //console.log(await UsersRepository.modulesRights(userId));
    const [results] = await UsersRepository.GetModuleFunctionsForRole(roleId,moduleId)
    console.log(results);
    // //const moduleCategories = new Map();
    // let moduleCategories=[];
    // //let moduleCategories=[];

    // for (const result of results) {      
    //   let moduleCategory = moduleCategories.find(m => m.ModuleCategoryID === result.ModuleCategoryID);
    //   if(!moduleCategory)
    //   {
    //     moduleCategories.push
    //     ({
    //       ModuleCategoryID: result.ModuleCategoryID,
    //       ModuleCategory: result.ModuleCategory,
    //       CategoryIconURL: result.CategoryIconURL,
    //       Modules: [],
    //     });
    //   }
      
    //   moduleCategory = moduleCategories.find(m => m.ModuleCategoryID === result.ModuleCategoryID);

    //   let module = moduleCategory.Modules.find(m => m.moduleid === result.ModuleId);
    //   if (!module) 
    //   {
    //     moduleCategory.Modules.push
    //     ({
    //       moduleid: result.ModuleId,
    //       module: result.Module,
    //       Actions: [],
    //       iconurl: result.ModuleIconUrl,
    //       routingpage: result.RoutingPage,
    //     });
    //   }

    //   let currentModule = moduleCategory.Modules.find(m => m.moduleid === result.ModuleId);
    //   currentModule && currentModule.Actions.push
    //   ({
    //     ModuleFunctions: result.ModuleFunctions
    //   });
    //   // let module = moduleCategory.Modules.find(m => m.moduleid === result.ModuleId);
    //   // if (!module) 
    //   // {
    //   //   moduleCategory.Modules.push
    //   //   ({
    //   //     moduleid: result.ModuleId,
    //   //     module: result.Module,
    //   //     Actions: [],
    //   //     iconurl: result.ModuleIconUrl,
    //   //     routingpage: result.RoutingPage,
    //   //   });
    //   // }

    //   // let currentModule = moduleCategory.Modules.find(m => m.moduleid === result.ModuleId);
    //   // currentModule && currentModule.Actions.push
    //   // ({
    //   //   ModuleFunctions: result.ModuleFunctions
    //   // });
    // }

    // const response = Array.from(moduleCategories.values());
    // res.json(response);
    res.json(results);
  } 
  catch (error) {
    console.error('Error fetching user module rights:', error);
    res.status(500).json({ error: 'Error fetching user module rights' });
  }
};

// ---------------------------- PUT /Users/:id ---------------------------
const UpdateUser = async (req, res) => {
  try {
      const UserId =req.body.ID;

      const updatedUser = await UsersRepository.UpdateUser(UserId, req.body);
      if (updatedUser) {
          res.json(updatedUser);
      } else {
          res.status(404).json({ error: 'User not found' });
      }
  } catch (error) {
      console.error('Error updating User:', error);
      res.status(500).json({ error:error.message});
  }
};

// ---------------------------- PATCH /modules/:id/activate ---------------------------
const ActivateUser = async (req, res) => {
  try {
      const UserId = req.params.id;
      const updatedUser = await UsersRepository.UpdateUserStatus(UserId, true);
      if (updatedUser) {
          res.json(updatedUser);
      } else {
          res.status(404).json({ error: 'Module not found' });
      }
  } catch (error) {
      console.error('Error activating module:', error);
      res.status(500).json({ error: 'Error activating module' });
  }
};

// ---------------------------- PATCH /modules/:id/deactivate ---------------------------
const DeactivateUser = async (req, res) => {
  try {
      const UserId = req.params.id;
      const updatedUser = await UsersRepository.UpdateUserStatus(UserId, false);
      if (updatedUser) {
          res.json(updatedUser);
      } else {
          res.status(404).json({ error: 'Module not found' });
      }
  } catch (error) {
      console.error('Error deactivating module:', error);
      res.status(500).json({ error: 'Error deactivating module' });
  }
};

// ---------------------------- Delete /User/ ---------------------------
const DeleteUser = async (req, res) => {
  try {
      const UserId = req.body.ID; // Assuming you're passing the module ID in the URL
      await UsersRepository.DeleteUser(UserId, req.body);
      //res.sendStatus(204); // No content
      res.status(204).json({ message: 'Data Deleted Successfully' });
  } catch (error) {
      console.error('Error deleting module:', error);
      res.status(500).json({ error: error.message });
  }
};


module.exports = {
  getUsers,
  InsertUpdateUsers,
  loginUser,
  getUserModulesRights,
  GetModuleFunctionsForRole,
  UpdateUser,
  ActivateUser,
  DeactivateUser,
  DeleteUser,
};