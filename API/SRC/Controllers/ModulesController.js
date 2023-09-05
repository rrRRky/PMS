const ModulesRepository = require('../repositories/ModulesRepository');

// ---------------------------- GET / ---------------------------
const GetMuduleData = async (req, res) => {
    try {
      const [list] = await ModulesRepository.Modulesdata()
      res.json(list);
    } catch (error) {
      res.status(500).json({ error: "Error fetching users from the database" });
    }
};

//---------------------------- POST / ---------------------------
const InsertUpdateModules = async (req, res) => {
  try {
    const jsonData = JSON.stringify(req.body);
    const result = await ModulesRepository.InsertUpdateModules(jsonData);
    if(result.MsgFlag==0)
    {
      res.status(500).json({ error: result.Msg });
    }
    else {
    res.status(200).json({ msg: result.Msg });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// const AddModules = async (req, res) => {
//   try {
        
//     const newUser = await ModulesRepository.Addition(req.body);
//     console.log(newUser);
//     return res.status(201).json(newUser);
    
//   } 
//   catch (error)
//   {
//     console.error("Error creating a new user:", error);
//     res.status(500).json({ error: error.message });
//   }
// };

// // ---------------------------- PUT /module/:id ---------------------------
// const Updatemodule = async (req, res) => {
//   try {
//       const ModuleId =req.body.ID;

//       const updatemodule = await ModulesRepository.UpdateModule(ModuleId, req.body);
//       console.log('eske andr kya h ',updatemodule)
//       if (updatemodule) {
//           res.json(updatemodule);
//       } else {
//           res.status(404).json({ error: 'module not found' });
//       }
//   } catch (error) {
//       console.error('Error updating Control:', error);
//       res.status(500).json({ error:error.message});
//   }
// };

module.exports = {
    GetMuduleData,
    InsertUpdateModules,
    // AddModules,
    // Updatemodule,
  };