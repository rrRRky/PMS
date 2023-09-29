const Roles_PermissionsRepository = require('../repositories/Roles_PermissionRepository');

// ---------------------------- GET / ---------------------------
const GetRPData = async (req, res) => {
    try {
      const list = await Roles_PermissionsRepository.RPdata()
      console.log(list)
      res.json(list);
    } catch (error) {
      res.status(500).json({ error: "Error fetching Roles_Permissions from the database" });
    }
};

// //---------------------------- POST /users ---------------------------
// const AddStages = async (req, res) => {
//   try {
        
//     const newUser = await StagesRepository.Addition(req.body);
//     console.log(newUser);
//     return res.status(201).json(newUser);
    
//   } 
//   catch (error)
//   {
//     console.error("Error creating a new user:", error);
//     res.status(500).json({ error: error.message });
//   }
// };


// ---------------------------- PUT /module/:id ---------------------------


const UpdateRoles_Permissions = async (req, res) => {
  try {
      const Roles_PermissionsId =req.body.Id;

      const updateRole_P = await Roles_PermissionsRepository.UpdateRP(Roles_PermissionsId, req.body);
      console.log(updateRole_P)
      if (updateRole_P) {
          res.json(updateRole_P);
      } else {
          res.status(404).json({ error: 'Roles_Permissions not found' });
      }
  } catch (error) {
      console.error('Error updating Roles_Permissions:', error);
      res.status(500).json({ error:error.message});
  }
};

// ---------------------------- Delete / ---------------------------
const DeleteRoles_Permissions = async (req, res) => {
    try {
        const Roles_PermissionsId = req.body.Id; // Assuming you're passing the module ID in the URL
        await Roles_PermissionsRepository.DeleteRP(Roles_PermissionsId, req.body);
        res.status(204).json({ message: 'Data Deleted Successfully' });
    } catch (error) {
        console.error('Error deleting Stage:', error);
        res.status(500).json({ error: error.message });
    }
  };

module.exports = {
    GetRPData,
    //AddStages,
    UpdateRoles_Permissions,
    DeleteRoles_Permissions,
  };