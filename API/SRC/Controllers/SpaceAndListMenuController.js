 const SpaceAndListMenuRepository = require('../repositories/SpaceAndListMenuRepository')
  
 const GetSpaceAndListMenuData= async (req,res)=>{
    try{
        const [results] = await SpaceAndListMenuRepository.GetSpaceAndListMenuData()
        //console.log(results);
        // res.status(200).json(list);
        let Spaces=[];

            for (const result of results) {      
                let Space = Spaces.find(s => s.SpaceId === result.SpaceId);
                if(!Space)
                {
                    Spaces.push
                    ({
                        SpaceId: result.SpaceId,
                        SpaceName: result.SpaceName,
                        SpaceIcon: result.SpaceIcon,
                    Sub_Spaces: [],
                    });
                }
                
                Space = Spaces.find(s => s.SpaceId === result.SpaceId);
            
                let spacelisty = Space.Sub_Spaces.find(s => s.spaceListId === result.SpacelistId);
                if (!spacelisty) 
                {
                    Space.Sub_Spaces.push
                    ({
                        SpacelistId: result.SpacelistId,
                        SpaceListName: result.SpaceListName,
                        SpaceListIcon: result.SpaceListIcon,
                        routingPage: result.routingPage,
                    });
                }     
            }

            const response = Array.from(Spaces.values());
            res.json(response);
    }
    catch(error){
        console.log("error fatching data",error);
        res.status(500).json({error:"error fatching data"})
    }
 }

 module.exports={
    GetSpaceAndListMenuData
 }