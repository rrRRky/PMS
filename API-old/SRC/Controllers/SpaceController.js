const SpacesRepository = require('../repositories/SpacesRepository');

// ---------------------------- GET / ---------------------------
const GetSpaceData = async (req, res) => {
    try {
      const list = await SpacesRepository.getdata()
      console.log(list)
      res.json(list);
    } catch (error) {
      res.status(500).json({ error: "Error fetching SpaceData from the database" });
    }
};

//---------------------------- POST /users ---------------------------
const AddSpace = async (req, res) => {
  try {
        
    const newUser = await SpacesRepository.Addition(req.body);
    console.log(newUser);
    return res.status(201).json(newUser);
    
  } 
  catch (error)
  {
    console.error("Error creating a new Space:", error);
    res.status(500).json({ error: error.message });
  }
};

// ---------------------------- PUT /module/:id ---------------------------
const UpdateSpace = async (req, res) => {
  try {
      const SpaceId =req.body.Id;

      const updateSpace = await SpacesRepository.UpdateSpace(SpaceId, req.body);
      console.log(updateSpace)
      if (updateSpace) {
          res.json(updateSpace);
      } else {
          res.status(404).json({ error: 'Space not found' });
      }
  } catch (error) {
      console.error('Error updating Space:', error);
      res.status(500).json({ error:error.message});
  }
};

// ---------------------------- Delete / ---------------------------
const DeleteSpace= async (req, res) => {
    try {
        const SpaceId = req.body.Id; // Assuming you're passing the module ID in the URL
        await SpacesRepository.DeletSpace(SpaceId, req.body);
        res.status(204).json({ message: 'Data Deleted Successfully' });
    } catch (error) {
        console.error('Error deleting Stage:', error);
        res.status(500).json({ error: error.message });
    }
  };

module.exports = {
    GetSpaceData,
    AddSpace,
    UpdateSpace,
    DeleteSpace,
  };