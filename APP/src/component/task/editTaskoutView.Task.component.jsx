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

  btnClickedHandler = (action, controlId) => {
    console.log('clicked:', action);
    console.log('Editing list with ID:', controlId);
    // Open the modal by calling the function from props
    this.props.setShowModal(true);
  };

  render() {
    const { data } = this.props;
    const ModuleRights = this.state.ModuleRights;
    const roleId = data.id;
    const SubSpaceID = data.SpaceListId;

    const EditButton = (
      <Button variant="contained" style={{ minWidth: '30px', height: '30px' }} onClick={() => this.btnClickedHandler(SubSpaceID, 'edit')}>
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
      <span className='d-flex justify-content-between align-items-center' style={{ height: "44px" }} onClick={() => this.btnClickedHandler(roleId, 'edit')}>
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
