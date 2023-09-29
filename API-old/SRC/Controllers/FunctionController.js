const FunctionRepository = require('../repositories/FunctionRepository');

// ---------------------------- GET /users ---------------------------
const GetFunctionData = async (req, res) => {
    try {
      const list = await FunctionRepository.Functiondata()
      res.json(list);
    } catch (error) {
      res.status(500).json({ error: "Error fetching users from the database" });
    }
};

//---------------------------- POST /users ---------------------------
const AddFunction = async (req, res) => {
  try {
        
    const newUser = await FunctionRepository.Addition(req.body);
    console.log(newUser);
    return res.status(201).json(newUser);
    
  } 
  catch (error)
  {
    console.error("Error creating a new user:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
    GetFunctionData,
    AddFunction,
  };