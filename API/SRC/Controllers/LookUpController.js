const LookUpRepository = require('../repositories/LookUpRepository');

// ---------------------------- GET /users ---------------------------
const LookUpdata = async (req, res) => {
    try {
      const [list] = await LookUpRepository.LookUpdata(req.query.type);
      let jsonresult
      jsonresult=JSON.parse(list.jsonvalue);
      res.json(jsonresult);
      
    } catch (error) {
      res.status(500).json({ error:error.message });
    }
};

module.exports = {
    LookUpdata
  };