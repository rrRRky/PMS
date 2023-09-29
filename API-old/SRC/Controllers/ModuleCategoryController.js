const ModuleCategoryRepository = require('../repositories/ModuleCategoryRepository');

// ---------------------------- GET / ---------------------------
const GetMCategoryData = async (req, res) => {
    try {
      const list = await ModuleCategoryRepository.ModuleCategorydata()
      
      res.json(list);
    } catch (error) {
      res.status(500).json({ error: "Error fetching MCategorydata from the database" });
    }
};

//---------------------------- POST /users ---------------------------
const AddMCategory = async (req, res) => {
  try {
        
    const newUser = await ModuleCategoryRepository.Addition(req.body);
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
const UpdatemCategory = async (req, res) => {
  try {
      const MCategoryId =req.body.ID;

      const updatemCategory = await ModuleCategoryRepository.UpdateMCategory(MCategoryId, req.body);
      console.log(updatemCategory)
      if (updatemCategory) {
          res.json(updatemCategory);
      } else {
          res.status(404).json({ error: 'moduleCategory not found' });
      }
  } catch (error) {
      console.error('Error updating Control:', error);
      res.status(500).json({ error:error.message});
  }
};

module.exports = {
    GetMCategoryData,
    AddMCategory,
    UpdatemCategory,
  };