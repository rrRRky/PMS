import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import axios from 'axios';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useSpring, animated } from '@react-spring/web';
import API_URL from '../../../config';
import { useNavigate } from 'react-router-dom';

const SideDrawer = React.forwardRef(function SideDrawer(props, ref) {
  const { children, open, onClose } = props;
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

export default function AddStageComponent({ updateGridData }) {
  const [open, setOpen] = useState(false);
  const [name, setname] = useState('');
  const [descriptions, setdescription] = useState('');
  const [inOrder, setinOrder] = useState('');
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
 
  const handleNameChange = (event) => {
    setname(event.target.value);
  }; 
  const handleDescriptionChange = (event) => {
    setdescription(event.target.value);
  }; 
  const handleinOrderChange = (event) => {
    setinOrder(event.target.value);
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

        const payload = {
          name,
          descriptions,
          inOrder,
          createdBy: userId,
          createdOn: currentTime,
          isActive: true,
        };
       console.log(payload);
      const response = await fetch(`${API_URL}Stages/UpdateStages`, {
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
        console.log('New Stage added successfully');
        refreshPage()
        handleClose();
        updateGridData(); // Fetch the updated data
      } else {
        // Handle error response
        console.error('Failed to add New Stage');
        console.log(payload);
      }
    } catch (error) {
        console.error('Error updating data:', error);
      
        if (error.response) {
          // If the server responded with an error message
          alert(error.response.data.error);
        }
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
              Add New Stage
            </Typography>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="mb-2 fw-bold" htmlFor="name">Name:</label>
                    <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-control"
                    value={name}
                    onChange={handleNameChange}
                    placeholder="Enter Stage Name"
                    />
                </div>
                <div className="mb-3">
                    <label className="mb-2 fw-bold" htmlFor="descriptions">Description:</label>
                    <input
                    type="text"
                    id="descriptions"
                    name="descriptions"
                    className="form-control"
                    value={descriptions}
                    onChange={handleDescriptionChange}
                    placeholder="Enter Stage Description"
                    />
                </div>
                <div className="mb-3">
                    <label className="mb-2 fw-bold" htmlFor="inOrder">inOrder:</label>
                    <input
                    type="text"
                    id="inOrder"
                    name="inOrder"
                    className="form-control"
                    value={inOrder}
                    onChange={handleinOrderChange}
                    placeholder="Enter Stage Url Link"
                    />
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
