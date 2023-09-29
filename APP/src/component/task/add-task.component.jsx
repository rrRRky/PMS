import React, { useState, useEffect } from 'react';
import { Modal} from './task-modal.component'
import Box from '@mui/material/Box';
import axios from 'axios';
import Button from '@mui/material/Button';
import API_URL from '../../config';
// import { useNavigate } from 'react-router-dom';


export default function AddTaskComponent({ updateGridData }) {
  const [showmodal, setShowModal] = useState(false);
  const [ControlRights, setControlRights] = useState([]); 
//   const navigate = useNavigate();

  useEffect(() => {

    const userToken = localStorage.getItem('token');
    const RoleIDMY = localStorage.getItem('RoleIDMY');
    const selectedCategoryModuleId = localStorage.getItem('selectedCategoryModuleId');


    const fetchModuleRights = async () => {
      try { 
        const response = await axios.get(API_URL + `Users/ModuleAction?moduleId=${selectedCategoryModuleId}&roleId=${RoleIDMY}`, {
          headers: {
            'Authorization': `${userToken}`,
          },
        });
        const ControlRights = response.data; 
        setControlRights(ControlRights); 
      } catch (error) {
        console.error('Error fetching data:', error);
        this.setState({ isLoading: false });
      }
    };

    fetchModuleRights();

  }, []);



  const openModal = () => {
    setShowModal(showmodal=>!showmodal);
    document.body.style.overflow = 'hidden';
  };

  // Define the button components with proper JSX content
  const addButton = (
    <Button variant="contained" onClick={openModal}>
      Add
    </Button>
  );

  const buttonMap = {
    'A': addButton, 
  };



  return (
        <div>
        {ControlRights.map((permission) => {
            const { Code, IsApplicable } = permission;
            if (IsApplicable && buttonMap[Code]) {
              return React.cloneElement(buttonMap[Code], { key: Code});
            }
            return null;
          })}
          <Box className="">
            <Modal showmodal={showmodal} setShowModal={setShowModal} />
          </Box>
            </div>
  );
}
