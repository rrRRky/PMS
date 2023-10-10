import React, { Component } from 'react';
import Button from '@mui/material/Button';
import API_URL from '../../config';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

class BtnCellRenderer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      TaskIdToEdit: null,
      Name: localStorage.getItem('Name'),
      userMap: {},
      isLoading: true,
      rowData: [],
      ModuleRights: [],
      token: localStorage.getItem('token'),
    };
  }

  async componentDidMount() {
    const storedUserData = localStorage.getItem('userSession');
    const userToken = localStorage.getItem('token');
    const RoleIDMY = localStorage.getItem('RoleIDMY');
    const selectedCategoryModuleId = localStorage.getItem('selectedCategoryModuleId');
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      this.setState({ Name: userData.Name, token: userData.token });
    }

    const fetchModuleRights = async () => {
      try {
        const response = await axios.get(API_URL + `Users/ModuleAction?moduleId=${selectedCategoryModuleId}&roleId=${RoleIDMY}`, {
          headers: {
            'Authorization': `${userToken}`,
          },
        });
        const ModuleRights = response.data; // Assuming the API response is an array of objects
        this.setState({ ModuleRights, isLoading: false });
      } catch (error) {
        console.error('Error fetching data:', error);
        this.setState({ isLoading: false });
      }
    };

    fetchModuleRights();
  }

  btnClickedHandler = (TaskRowID) => {
    const { setShowModal , handleOpenModal  } = this.props;
    console.log('Clicked edit button. Task ID:', TaskRowID);
    setShowModal(true, TaskRowID);
    handleOpenModal(TaskRowID);
    this.setState({
      TaskIdToEdit: TaskRowID,
      showModal: true,
    });
  };

  render() {
    const { data } = this.props;
    const ModuleRights = this.state.ModuleRights;
    const TaskRowID = data.id;
    const SubSpaceID = data.SpaceListId;
    const EditButton = (
      <Button
        variant="contained"
        style={{ minWidth: '30px', height: '30px' }}
        onClick={() => this.btnClickedHandler(TaskRowID)}
      >
        <FontAwesomeIcon
          className='text-light'
          icon={faEdit}
          style={{ fontSize: '16px', margin: '5px', color: 'white' }}
        />
      </Button>
    );
    
    const buttonMap = {
      'E': EditButton,
    };

    return (
      <span className='d-flex justify-content-between align-items-center' 
      style={{ height: "44px" }} 
      onClick={() => this.btnClickedHandler(TaskRowID)}>
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
  }
}

export default BtnCellRenderer;
