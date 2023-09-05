const StagesRepository = require('../repositories/StagesRepository');

// ---------------------------- GET / ---------------------------
const GetStagesData = async (req, res) => {
    try {
      const [list] = await StagesRepository.getdata()
      let jsonresult;
      for (const result of list) {
      jsonresult= JSON.parse(result.jsonvalue);

    }    
    res.json(jsonresult);
    } catch (error) {
      res.status(500).json({ error: "Error fetching Stages from the database" });
    }
};

//---------------------------- POST /users ---------------------------
const InsertUpdateStages = async (req, res) => {
  try {
    const jsonData = JSON.stringify(req.body);
    const result = await StagesRepository.InsertUpdateStages(jsonData);
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

// // ---------------------------- PUT /module/:id ---------------------------
// const UpdateStages = async (req, res) => {
//   try {
//       const StageId =req.body.Id;

//       const updateStages = await StagesRepository.UpdateStage(StageId, req.body);
//       console.log(updateStages)
//       if (updateStages) {
//           res.json(updateStages);
//       } else {
//           res.status(404).json({ error: 'Stage not found' });
//       }
//   } catch (error) {
//       console.error('Error updating Stage:', error);
//       res.status(500).json({ error:error.message});
//   }
// };

// ---------------------------- Delete / ---------------------------
const DeleteStage = async (req, res) => {
    try {
        const StageId = req.body.Id; // Assuming you're passing the module ID in the URL
        await StagesRepository.DeletStage(StageId, req.body);
        res.status(204).json({ message: 'Data Deleted Successfully' });
    } catch (error) {
        console.error('Error deleting Stage:', error);
        res.status(500).json({ error: error.message });
    }
  };

module.exports = {
    GetStagesData,
    InsertUpdateStages,
    // AddStages,
    // UpdateStages,
    DeleteStage,
  };