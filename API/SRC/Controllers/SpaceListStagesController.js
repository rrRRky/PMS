const SpaceListStagesRepository = require('../repositories/SpaceListStagesRepository');

// ---------------------------- GET /users ---------------------------
const SpaceListStagesData = async (req, res) => {
    try {
      
      const spaceListId = req.query.spaceListId
      const spaceListStageId = req.query.spaceListStageId

      const [list] = await SpaceListStagesRepository.SpaceListStagesData(spaceListId, spaceListStageId)
      
      let jsonresult
      jsonresult=JSON.parse(list.jsonvalue);
      res.json(jsonresult);
    } catch (error) {
      res.status(500).json({ error: error.message});
    }
};

//---------------------------- POST /users ---------------------------
const InsertUpdateSpaceListStages = async (req, res) => {
  try {
    const jsonData = JSON.stringify(req.body);
    const result = await SpaceListStagesRepository.InsertUpdateSpaceListStages(jsonData);
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
    SpaceListStagesData,
    InsertUpdateSpaceListStages
  };