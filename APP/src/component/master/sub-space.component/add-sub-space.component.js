import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import axios from 'axios';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useSpring, animated } from '@react-spring/web';
import API_URL from '../../../config';
import { useNavigate } from 'react-router-dom';
import { useSpaceContext } from '../../../contexts/SpaceContext';

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

export default function AddSubSpaceComponent({ updateGridData }) {
  const [open, setOpen] = useState(false);
  const [code, setcode] = useState('');
  const [name, setname] = useState('');
  const [description, setdescription] = useState('');
  const [iconUrl, seticonUrl] = useState('');
  const [spaceId, setspaceId] = useState('');
  // const [SelectedspaceID, setSelectedspaceID] = useState('');
  const { spaces } = useSpaceContext();
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

  const handleCodeChange = (event) => {
    setcode(event.target.value);
  };  
  const handleNameChange = (event) => {
    setname(event.target.value);
  }; 
  const handleDescriptionChange = (event) => {
    setdescription(event.target.value);
  }; 
  const handleIconUrlChange = (event) => {
    seticonUrl(event.target.value);
  }; 
  const handleSpaceIdChange = (event) => {
    const selectedSpaceId = event.target.value;
    setspaceId(selectedSpaceId); // Update the selected role ID
    // setSelectedspaceID(prevRole => ({ ...prevRole, spaceId: selectedSpaceId })); // Update roleId in the role state
    console.log(selectedSpaceId );
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
        console.log(spaceId);
        const payload = {
          code,
          name,
          description,
          iconUrl,
          spaceId,
          createdBy: userId,
          createdOn: currentTime,
          isActive: true,
        };
       console.log(payload);
      const response = await fetch(`${API_URL}SpaceLists/AddSpaceLists`, {
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
                    <label className="mb-2 fw-bold" htmlFor="code">Sub Space Code:</label>
                    <input
                    type="text"
                    id="code"
                    name="code"
                    className="form-control"
                    value={code}
                    onChange={handleCodeChange}
                    placeholder="Enter Sub Space Code"
                    />
                </div>
                <div className="mb-3">
                    <label className="mb-2 fw-bold" htmlFor="name">Sub Space Name:</label>
                    <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-control"
                    value={name}
                    onChange={handleNameChange}
                    placeholder="Enter Sub Space Name"
                    />
                </div>
                <div className='mb-3'>
                  <label className="mb-2 fw-bold" htmlFor="iconUrl">Sub Space iconUrl:</label>
                  <select className='form-control form-select' id="spaceId" name="spaceId"  onChange={handleSpaceIdChange}>
                    {spaces.map(space => (
                      <option key={space.id} value={space.id}>
                        {space.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                    <label className="mb-2 fw-bold" htmlFor="description">Sub Space Description:</label>
                    <input
                    type="text"
                    id="description"
                    name="description"
                    className="form-control"
                    value={description}
                    onChange={handleDescriptionChange}
                    placeholder="Enter Sub Space Description"
                    />
                </div>
                <div className="mb-3">
                    <label className="mb-2 fw-bold" htmlFor="iconUrl">Sub Space Url Link:</label>
                    <input
                    type="text"
                    id="iconUrl"
                    name="iconUrl"
                    className="form-control"
                    value={iconUrl}
                    onChange={handleIconUrlChange}
                    placeholder="Enter Sub Space Url Link"
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
