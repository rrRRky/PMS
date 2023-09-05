import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import axios from 'axios';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useSpring, animated } from '@react-spring/web';
import API_URL from '../../../config';
import { useNavigate } from 'react-router-dom';
import { useStageContext } from '../../../contexts/StageContext';
import { useTemplateIdContext } from '../../../contexts/lookupTemplateIdContext';

const SideDrawer = React.forwardRef(function SideDrawer(props, ref) {
  const { children, open } = props;
  const style = useSpring({
    from: { transform: 'translateX(-80%)' },
    to: { transform: open ? 'translateX(-80%)' : 'translateX(100%)' },
  });

  return (
    <animated.div ref={ref} style={style}>
      {children}
    </animated.div>
  );
});

SideDrawer.propTypes = {
  children: PropTypes.element.isRequired,
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

export default function AddSubSpaceStageComponent({ updateGridData }) {
  const [open, setOpen] = useState(false);
  const [spaceListId, setspaceListId] = useState('');
  const [inOrder, setinOrder] = useState('');
  const [remark, setremark] = useState('');
  const [stageId, setstageId] = useState('');
  const [templateId , settemplateId] = useState('');
  const { stages } = useStageContext();
  const { ContextTemplateId } = useTemplateIdContext();
  const [UserName, setUsername] = useState(localStorage.getItem('userSession.Name'));
  const [ID, setID] = useState(localStorage.getItem('userSession.id'));
  const [ModuleRights, setModuleRights] = useState([]); // Initialize ModuleRights state
  const navigate = useNavigate();

  useEffect(() => {

    const storedUserData = localStorage.getItem('userSession');
    const userToken = localStorage.getItem('token');
    const RoleIDMY = localStorage.getItem('RoleIDMY');
    const selectedCategoryModuleId = localStorage.getItem('selectedCategoryModuleId');
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      // this.setState({ Name: userData.Name, token: userData.token });
      setUsername(userData.UserName);
      setID(userData.ID);
    }

    const fetchModuleRights = async () => {
      try { 
        const response = await axios.get(API_URL + `Users/ModuleAction?moduleId=${selectedCategoryModuleId}&roleId=${RoleIDMY}`, {
          headers: {
            'Authorization': `${userToken}`,
          },
        });
        const ModuleRights = response.data; // Assuming the API response is an array of objects
        setModuleRights(ModuleRights); // Update ModuleRights state 
      } catch (error) {
        console.error('Error fetching data:', error);
        this.setState({ isLoading: false });
      }
    };

    fetchModuleRights();

  }, []);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSpaceListIdChange = (event) => {
    setspaceListId(event.target.value);
  };  
  const handleInOrderChange = (event) => {
    setinOrder(event.target.value);
  }; 
  const handleRemarkChange = (event) => {
    setremark(event.target.value);
  }; 
  const handleStageIdChange = (event) => {
    const selectedstageId = event.target.value;
    setstageId(selectedstageId); // Update the selected role ID
    // setSelectedstageId(prevRole => ({ ...prevRole, stageId: selectedstageId })); // Update roleId in the role state
    console.log(selectedstageId );
  }; 
  const handletemplateIdChange = (event) => {
    const selectedtemplateId = event.target.value;
    settemplateId(selectedtemplateId);
  }; 
  function refreshPage() {
    window.location.reload(false);
  }
  const handleAddClick = () => {
    setOpen(true);
  };

  // Define the button components with proper JSX content
  const addButton = (
    <Button variant="contained" onClick={toggleDrawer}>
      Add
    </Button>
  );

  const buttonMap = {
    'A': addButton, // Use the predefined addButton component
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {  
        
      const storedUserData = localStorage.getItem('userSession');
      const userData = JSON.parse(storedUserData);
      const userToken = userData.token;
      const userId = userData.id;  
        const currentTime = new Date().toISOString();
        console.log(stageId);
        const payload = {
          spaceListId,
          stageId,
          inOrder,
          templateId,
          remark,
          createdBy: userId,
          createdOn: currentTime,
          isActive: true,
        };
       console.log(payload);
      const response = await fetch(`${API_URL}SpcLstStg/AddSpcLstStg`, {
        method: 'POST',
        headers: {
            'Authorization': userToken,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      console.log(JSON.stringify(payload));
      console.log(userToken);
      if (response.status === 200) {
        console.log('New Sub Space added successfully');
        refreshPage()
        handleClose();
        updateGridData(); // Fetch the updated data
      } else {
        // Handle error response
        console.error('Failed to add New Sub Space');
        console.log(payload);
      }
    } catch (error) {
      console.error('Failed to send the request', error);
    }
  };

  return (
    <div className="mySideDrawerOuter" >
      {/* <Button variant="contained" onClick={toggleDrawer}>
        Add
      </Button> */}
        {ModuleRights.map((permission) => {
            const { Code, IsApplicable } = permission;
            if (IsApplicable && buttonMap[Code]) {
              return React.cloneElement(buttonMap[Code], { key: Code});
            }
            return null;
          })}
      <div className="mySideDrawermain">
        <SideDrawer open={open} onClose={handleClose}>
          <Box className="mySideDrawer"  sx={{ width: 400, bgcolor: 'background.paper', p: 2 }}>
            <Typography variant="h6" component="h2">
              Add New Sub Space
            </Typography>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="mb-2 fw-bold" htmlFor="spaceListId">Sub Space Id:</label>
                    <input
                    type="text"
                    id="spaceListId"
                    name="spaceListId"
                    className="form-control"
                    value={spaceListId}
                    onChange={handleSpaceListIdChange}
                    placeholder="Enter Sub Space Code"
                    />
                </div>
                <div className="mb-3">
                    <label className="mb-2 fw-bold" htmlFor="inOrder">Sub Space Stage Order:</label>
                    <input
                    type="text"
                    id="inOrder"
                    name="inOrder"
                    className="form-control"
                    value={inOrder}
                    onChange={handleInOrderChange}
                    placeholder="Enter Sub Space Name"
                    />
                </div>
                <div className='mb-3'>
                  <label className="mb-2 fw-bold" htmlFor="iconUrl">Sub Space Stage Id:</label>
                  <select className='form-control form-select' id="stageId" name="stageId"  onChange={handleStageIdChange}>
                    {stages.map(staged => (
                      <option key={staged.id} value={staged.id}>
                        {staged.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                    <label className="mb-2 fw-bold" htmlFor="remark">Sub Space Stage Remark:</label>
                    <input
                    type="text"
                    id="remark"
                    name="remark"
                    className="form-control"
                    value={remark}
                    onChange={handleRemarkChange}
                    placeholder="Enter Sub Space Description"
                    />
                </div>
                <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-3">
                    <label className="mb-2 fw-bold" htmlFor="templateId">Template ID:</label>
                    <select className='form-control form-select' id="templateId" name="templateId"  onChange={handletemplateIdChange}>
                    <option disabled selected>Select Template Id</option>
                    {ContextTemplateId.map(CTemplateId => (
                      <option key={CTemplateId.id} value={CTemplateId.id}>
                        {CTemplateId.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                    <Button
                    variant="outlined"
                    type="reset"
                    style={{ marginRight: '10px' }}
                    onClick={handleClose}
                    >
                        Close
                    </Button>
                    <Button variant="contained" type="submit">
                    Save
                    </Button>
              </div>
            </form>
          </Box>
        </SideDrawer>
      </div>
    </div>
  );
}
