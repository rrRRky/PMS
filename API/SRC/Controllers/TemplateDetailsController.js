const TemplateDetailsRepository = require('../repositories/TemplateDetailsRepository');

// ---------------------------- GET /users ---------------------------
const TemplateDetailsdata = async (req, res) => {
    try {
      const templateId =req.query.templateId 
      const templatedetailId=req.query.templatedetailId
      const [list] = await TemplateDetailsRepository.TemplateDetailsdata(templateId, templatedetailId)
      let jsonresult
      jsonresult=JSON.parse(list.jsonvalue);
      res.json(jsonresult);
    } catch (error) {
      res.status(500).json({ error: "Error fetching users from the database" });
    }
};

//---------------------------- POST /users ---------------------------
const InsertUpdateTemplateDetails = async (req, res) => {
  try {
    const jsonData = JSON.stringify(req.body);
    const result = await TemplateDetailsRepository.InsertUpdateTemplateDetails(jsonData);
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
    TemplateDetailsdata,
    InsertUpdateTemplateDetails
  };