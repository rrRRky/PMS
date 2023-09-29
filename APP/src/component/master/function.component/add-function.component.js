import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import axios from 'axios';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useSpring, animated } from '@react-spring/web';
import API_URL from '../../../config';
import { useNavigate } from 'react-router-dom';
import $ from 'jquery';

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

export default function AddFunctionComponent({ updateGridData }) {
  const [open, setOpen] = useState(false);
  const [functionName, setfunctionName] = useState('');
  const [inOrder, setInOrder] = useState('');
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

  useEffect(() => {
    $('#inOrder').on('input', function() {
      $(this).val($(this).val().replace(/\D/g, ''));
    });
  }, []); 

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNameChange = (event) => {
    setfunctionName(event.target.value);
  };  
  const handleInOrderChange = (event) => {
    setInOrder(event.target.value);
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
    '2': addButton, // Use the predefined addButton component
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
            functionName,
            inOrder,
            createdBy: userId,
            createdOn: currentTime,
            isActive: true,
        };
       console.log(payload);
      const response = await fetch(`${API_URL}Function/AddFunctions`, {
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
        console.log('New function added successfully');
        refreshPage()
        handleClose();
        updateGridData(); // Fetch the updated data
      } else {
        // Handle error response
        console.error('Failed to add New function');
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
            const { FunctionId, IsApplicable } = permission;
            if (IsApplicable && buttonMap[FunctionId]) {
              return React.cloneElement(buttonMap[FunctionId], { key: FunctionId });
            }
            return null;
          })}
      <div className="mySideDrawermain">
        <SideDrawer open={open} onClose={handleClose}>
          <Box className="mySideDrawer"  sx={{ width: 400, bgcolor: 'background.paper', p: 2 }}>
            <Typography variant="h6" component="h2">
              Add New function
            </Typography>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="mb-2 fw-bold" htmlFor="functionName">Name:</label>
                    <input
                    type="text"
                    id="functionName"
                    name="functionName"
                    className="form-control"
                    value={functionName}
                    onChange={handleNameChange}
                    placeholder="Enter function Name"
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
                    onChange={handleInOrderChange}
                    placeholder="Enter function Order"
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
