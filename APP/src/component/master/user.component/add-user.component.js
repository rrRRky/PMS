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

export default function AddUserComponent({ updateGridData }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [userId, setUserId] = useState('');
  const [address, setAddress] = useState('');
  const [roleId, setRoleId] = useState('');
  const [password, setPassword] = useState('');
  const [UserName, setUsername] = useState(localStorage.getItem('userSession.Name'));
  const [ID, setID] = useState(localStorage.getItem('userSession.id'));
  const [ModuleRights, setModuleRights] = useState([]); // Initialize ModuleRights state
  const navigate = useNavigate();
  const [UserRolesList, setUserRolesList] = useState([]);
  const [SelecteduserRolesData, setSelecteduserRolesData] = useState('');

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
        console.log(ModuleRights);
        setModuleRights(ModuleRights); // Update ModuleRights state 
      } catch (error) {
        console.error('Error fetching data:', error);
        this.setState({ isLoading: false });
      }
    };

    
    const fetchUserRolesList = async () => {
      try {
        const response = await fetch(API_URL + 'Roles', {
          headers: {
            'Authorization': `${userToken}`,
          },
        });
        const userRolesList = await response.json(); // Assuming the API response is an array of objects
        console.log(userRolesList);
        // Check if userRolesList is an array before updating the state
        if (Array.isArray(userRolesList)) {
          setUserRolesList(userRolesList); // Update state with user roles data
          console.log(userRolesList);
          if (userRolesList.length > 0) {
            setSelecteduserRolesData(userRolesList[0].id);
          }
        } else {
          console.error('Invalid userRolesList data:', userRolesList);
          // Handle the case where userRolesList is not an array
        }
      } catch (error) {
        console.error('Error fetching user roles:', error);
        // Handle error as needed
      }
    };
    

    fetchModuleRights();

    fetchUserRolesList();

  }, []);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };  
  const handleUserIdChange = (event) => {
    setUserId(event.target.value);
  }; 
  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  }; 
  const handleUserRoleChange = (event) => {
    const selectedRoleId = event.target.value;
    setSelecteduserRolesData(selectedRoleId); // Update the selected role ID
    setRoleId(selectedRoleId); // Update roleId with the selected role ID
    console.log(selectedRoleId);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
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
      const myuserId = userData.id;  
      const currentTime = new Date().toISOString();

        const payload = {
          name,
          userId,
          address,
          roleId,
          password,
          createdBy: myuserId,
          createdOn: currentTime,
          isActive: true
        };
       console.log(payload);
      const response = await fetch(`${API_URL}Users/addUsers`, {
        method: 'POST',
        headers: {
            'Authorization': userToken,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        console.log('New User added successfully');
        refreshPage()
        handleClose();
        updateGridData(); // Fetch the updated data
      } else {
        console.log(JSON.stringify(payload));
        // Handle error response
        console.error('Failed to add New User');
        console.log(payload);
      }
    } catch (error) {
      console.error('Failed to send the request', error);
    }
  };

  return (
    <div className="mySideDrawerOuter" >
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
              Add New User
            </Typography>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="mb-2 fw-bold" htmlFor="name">User Name:</label>
                    <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-control"
                    value={name}
                    onChange={handleNameChange}
                    placeholder="Enter User Name"
                    />
                </div>
                <div className="mb-3">
                    <label className="mb-2 fw-bold" htmlFor="userId">User ID:</label>
                    <input
                    type="text"
                    id="userId"
                    name="userId"
                    className="form-control"
                    value={userId}
                    onChange={handleUserIdChange}
                    placeholder="Enter User ID"
                    />
                </div>
                <div className="mb-3">
                    <label className="mb-2 fw-bold" htmlFor="description">User Address:</label>
                    <input
                    type="text"
                    id="address"
                    name="address"
                    className="form-control"
                    value={address}
                    onChange={handleAddressChange}
                    placeholder="Enter User Address"
                    />
                </div>
                <div className='mb-3'>
                  <label className="mb-2 fw-bold" htmlFor="RoleId">Select Role:</label>
                    <select className='form-select form-control' id="roleId" name="roleId"  onChange={handleUserRoleChange}>
                        <option value="">Role Name</option>
                        {UserRolesList.map(RoleViewList => (
                          <option key={RoleViewList.id} value={RoleViewList.id}  >
                            {RoleViewList.roleName}
                          </option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label className="mb-2 fw-bold" htmlFor="description">password:</label>
                    <input
                    type="text"
                    id="password"
                    name="password"
                    className="form-control"
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="Enter User password"
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
