const StagesRepository = require('../repositories/StagesRepository');

// ---------------------------- GET / ---------------------------
const GetStagesData = async (req, res) => {
    try {
      const list = await StagesRepository.getdata()
      console.log(list)
      res.json(list);
    } catch (error) {
      res.status(500).json({ error: "Error fetching Stages from the database" });
    }
};

//---------------------------- POST /users ---------------------------
const AddStages = async (req, res) => {
  try {
        
    const newUser = await StagesRepository.Addition(req.body);
    console.log(newUser);
    return res.status(201).json(newUser);
    
  } 
  catch (error)
  {
    console.error("Error creating a new user:", error);
    res.status(500).json({ error: error.message });
  }
};

// ---------------------------- PUT /module/:id ---------------------------
const UpdateStages = async (req, res) => {
  try {
      const StageId =req.body.Id;

      const updateStages = await StagesRepository.UpdateStage(StageId, req.body);
      console.log(updateStages)
      if (updateStages) {
          res.json(updateStages);
      } else {
          res.status(404).json({ error: 'Stage not found' });
      }
  } catch (error) {
      console.error('Error updating Stage:', error);
      res.status(500).json({ error:error.message});
  }
};

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
    AddStages,
    UpdateStages,
    DeleteStage,
  };