const ProjectTaskDynamicFieldRepository= require('../repositories/ProjectTaskDynamicFieldRepository')

const InsertUpdateProjectTaskDynamicField = async (req, res) => {
    try 
    {
        const jsonData = JSON.stringify(req.body);
        const result = await ProjectTaskDynamicFieldRepository.InsertUpdateProjectTaskDynamicField(jsonData);
        if(result.MsgFlag==0)
        {
            res.status(500).json({ error: result.Msg });
        }
        else {
            res.status(200).json({ msg: result.Msg });
        }
    } 
    catch (error) 
    {
        res.status(500).json({ error: error.message });
    }
};

module.exports={
    InsertUpdateProjectTaskDynamicField
}