const SpaceListsRepository = require('../repositories/SpaceListsRepository');

// ---------------------------- GET /users ---------------------------
const SpaceListsdata = async (req, res) => {
    try {
      const [list] = await SpaceListsRepository.SpaceListsdata()
      let jsonresult;
      for (const result of list) {
      jsonresult= JSON.parse(result.jsonvalue);

    }    
    res.json(jsonresult);
      
    } 
    
    catch (error) {
      res.status(500).json({ error: "Error fetching users from the database" });
    }
};

//---------------------------- POST /users ---------------------------
const InsertUpdateSpaceLists = async (req, res) => {
  try {
    const jsonData = JSON.stringify(req.body);
    const result = await SpaceListsRepository.InsertUpdateSpaceLists(jsonData);
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



module.exports = {
    SpaceListsdata,
    InsertUpdateSpaceLists
  };