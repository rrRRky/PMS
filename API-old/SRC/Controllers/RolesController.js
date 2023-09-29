const RolesRepository = require('../repositories/RolesRepository');

// ---------------------------- GET / ---------------------------
const GetRolesData = async (req, res) => {
    try {
      const list = await RolesRepository.getdata()
      console.log(list)
      res.json(list);
    } catch (error) {
      res.status(500).json({ error: "Error fetching RolesData from the database" });
    }
};

//---------------------------- POST /users ---------------------------
const AddRole = async (req, res) => {
  try {
        
    const newUser = await RolesRepository.Addition(req.body);
    console.log(newUser);
    return res.status(201).json(newUser);
    
  } 
  catch (error)
  {
    console.error("Error creating a new Role:", error);
    res.status(500).json({ error: error.message });
  }
};

// ---------------------------- PUT /module/:id ---------------------------
const UpdateRole = async (req, res) => {
  try {
      const RoleId =req.body.Id;

      const updateRole = await RolesRepository.UpdateRoles(RoleId, req.body);
      console.log(updateRole)
      if (updateRole) {
          res.json(updateRole);
      } else {
          res.status(404).json({ error: 'Space not found' });
      }
  } catch (error) {
      console.error('Error updating Role:', error);
      res.status(500).json({ error:error.message});
  }
};

// ---------------------------- Delete / ---------------------------
const DeleteRole= async (req, res) => {
    try {
        const RoleId = req.body.Id; // Assuming you're passing the module ID in the URL
        await RolesRepository.DeleteRole(RoleId, req.body);
        res.status(204).json({ message: 'Data Deleted Successfully' });
    } catch (error) {
        console.error('Error deleting Role:', error);
        res.status(500).json({ error: error.message });
    }
  };

module.exports = {
    GetRolesData,
    AddRole,
    UpdateRole,
    DeleteRole,
  };