const ControlsRepository = require('../repositories/ControlsRepository');

// ---------------------------- GET /users ---------------------------
const GetControlsData = async (req, res) => {
    try {
      const [list] = await ControlsRepository.Controlsdata()
      res.json(list);
    } catch (error) {
      res.status(500).json({ error: "Error fetching users from the database" });
    }
};

//---------------------------- POST /users ---------------------------
const InsertOrUpdateControls = async (req, res) => {
  try {
    const jsonData = JSON.stringify(req.body);
    const result = await ControlsRepository.InsertUpdateControls(jsonData);
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

// const AddControls = async (req, res) => {
//   try {
        
//     const newUser = await ControlsRepository.Addition(req.body);
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
// const UpdateControls = async (req, res) => {
//   try {
//       const ControlId =req.body.Id;

//       const updateControls = await ControlsRepository.UpdateControls(ControlId, req.body);
//       if (updateControls) {
//           res.json(updateControls);
//       } else {
//           res.status(404).json({ error: 'Control not found' });
//       }
//   } catch (error) {
//       console.error('Error updating Control:', error);
//       res.status(500).json({ error:error.message});
//   }
// };

module.exports = {
    GetControlsData,
    InsertOrUpdateControls
    // AddControls,
    // UpdateControls,
  };