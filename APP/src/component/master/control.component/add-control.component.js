import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import axios from 'axios';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useSpring, animated } from '@react-spring/web';
import API_URL from '../../../config';
import { useNavigate } from 'react-router-dom';
import { useControltypeContext } from '../../../contexts/LookupControlTypeContext';



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

export default function AddControlComponent({ updateGridData }) {
  const [open, setOpen] = useState(false);
  const [controlName, setcontrolName] = useState('');
  // const [type, settype] = useState('');
  const [UserName, setUsername] = useState(localStorage.getItem('userSession.Name'));
  const [ID, setID] = useState(localStorage.getItem('userSession.id'));
  const { LookupcontrolType } = useControltypeContext();
  const [typeId, setcontrolTypeId] = useState('');
  const [ControlRights, setControlRights] = useState([]); // Initialize ControlRights state
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
        const ControlRights = response.data; // Assuming the API response is an array of objects
        setControlRights(ControlRights); // Update ControlRights state 
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

  const handlecontrolNameChange = (event) => {
    setcontrolName(event.target.value);
  };  
  // const handletypeChange = (event) => {
  //   settype(event.target.value);
  // }; 
  const handlecontrolTypeLookupChange = (event) => {
    const selectedcontrolTypeId = event.target.value;
    setcontrolTypeId(selectedcontrolTypeId); // Update the selected controlType ID
    console.log(selectedcontrolTypeId );
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
        const payloadCatID = {
            controlName,
            typeId,
            // controlTypeId,
            createdBy: userId,
            createdOn: currentTime,
            isActive: true,
        };
       console.log(payloadCatID);
      const response = await fetch(`${API_URL}Controls/AddControls`, {
        method: 'POST',
        headers: {
            'Authorization': userToken,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payloadCatID),
      });
      console.log(JSON.stringify(payloadCatID));
      if (response.status === 200) {
        console.log('New Control added successfully');
        refreshPage()
        handleClose();
        updateGridData(); // Fetch the updated data
      } else {
        // Handle error response
        console.error('Failed to add New Control');
        console.log(payloadCatID);
      }
    } catch (error) {
        console.error('Error updating data:', error);
      
        if (error.response) {
          // If the server responded with an error message
          alert(error.response.data.error);
        } else {
          // If there was a network error or some other issue
          alert('An error occurred. Please try again later.');
        }
      }
  };

  return (
    <div className="mySideDrawerOuter" >
        {ControlRights.map((permission) => {
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
              Add New Control
            </Typography>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="mb-2 fw-bold" htmlFor="controlName">Name:</label>
                    <input
                    type="text"
                    id="controlName"
                    name="controlName"
                    className="form-control"
                    value={controlName}
                    onChange={handlecontrolNameChange}
                    placeholder="Enter Control Name"
                    />
                </div>
                {/* <div className="mb-3">
                    <label className="mb-2 fw-bold" htmlFor="type">Control type:</label>
                    <input
                    type="text"
                    id="type"
                    name="type"
                    className="form-control"
                    value={type}
                    onChange={handletypeChange}
                    placeholder="Enter Control Icon URL"
                    />
                </div> */}
                <div className='mb-3'>
                  <label className='form-label mb-2 fw-bold'>Type:</label>
                    <select className='form-control form-select' id="type" name="type"  onChange={handlecontrolTypeLookupChange}>
                      {LookupcontrolType.map(controlTypeLookup => (
                        <option key={controlTypeLookup.id} value={controlTypeLookup.id}>
                          {controlTypeLookup.name}
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
