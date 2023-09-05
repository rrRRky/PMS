import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import API_URL from '../../../config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

const BtnCellRenderer = ({ data , toggleEditMode  }) => {
  const [Name] = useState(localStorage.getItem('Name'));
  const [isLoading, setIsLoading] = useState(true);
  const [ModuleRights, setModuleRights] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const userToken = localStorage.getItem('token');
      const RoleIDMY = localStorage.getItem('RoleIDMY');
      const selectedCategoryModuleId = localStorage.getItem('selectedCategoryModuleId');

      try {
        const response = await axios.get(
          `${API_URL}Users/ModuleAction?moduleId=${selectedCategoryModuleId}&roleId=${RoleIDMY}`,
          {
            headers: {
              Authorization: `${userToken}`,
            },
          }
        );
        const moduleRights = response.data;
        setModuleRights(moduleRights);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);


  const onBtSaveEditing = useCallback(() => {
    setIsEditMode(false);
    // Implement the logic for saving editing
  }, []);

  const onBtStartEditing = useCallback(() => {
        toggleEditMode();
  }, [toggleEditMode]);

  console.log('clicked' , toggleEditMode );

  const btnClickedHandler = (action) => {
    console.log('Button clicked with action:', action);
    switch (action) {
      case 'edit':
        toggleEditMode();
        console.log('Edit button clicked');
        break;
      case 'save':
        setIsEditMode(false);
        console.log('Save button clicked');
        break;
      case 'lock':
        console.log('Lock button clicked');
        break;
      default:
        break;
    }
  };





  const buttonMap = {
    'E': (
      <div>
        {isEditMode ? (
          <Button
            key="saveButton"
            className="p-0"
            variant="outline"
            style={{ minWidth: '40px', height: '44px' }}
            onClick={onBtSaveEditing}
          >
            Save
          </Button>
        ) : (
          <Button
            key="edit"
            className="p-0"
            variant="outline"
            style={{ minWidth: '40px', height: '44px' }}
            onClick={onBtStartEditing}
          >
            <FontAwesomeIcon
              className="text-primary"
              icon={faEdit}
              style={{ fontSize: '16px', margin: '5px', color: 'blue' }}
            />
          </Button>
        )}
      </div>
    ),
  };

  return (
    <span
      className="d-flex justify-content-between align-items-center"
      style={{ height: "44px" }}
      onClick={() => btnClickedHandler(data.spaceListId, 'edit')}
    >
      {ModuleRights.map(permission => {
        const { Code, IsApplicable } = permission;
        if (IsApplicable && buttonMap[Code]) {
          return buttonMap[Code];
        }
        return null;
      })}
      {ModuleRights.every(permission => {
        const { Code, IsApplicable } = permission;
        return !IsApplicable || !buttonMap[Code];
      }) && <p>N/A</p>}
    </span>
  );
};

export default BtnCellRenderer;
