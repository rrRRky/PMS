import React, { useState, useEffect } from 'react';
import API_URL from '../../../config';
import { useParams, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Sidebar from '../../sidebar/sidebar.component';

const EditUser = () => {
  const [role, setRole] = useState({
    id: '',
    userId: '',
    name: '',
    address: '',
    roleName: '',
    roleId: '',
    isActive: false,
  });
  const [isActive, setIsActive] = useState(false);
  const [UserRolesData, setuserRolesData] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [Name, setUsername] = useState(localStorage.getItem('Name'));
  const [UserRolesList, setUserRolesList] = useState([]);
  const [SelecteduserRolesData, setSelecteduserRolesData] = useState('');
  useEffect(() => {
    const storedUserData = localStorage.getItem('userSession');
    const userToken = localStorage.getItem('token');
    const RoleIDMY = localStorage.getItem('RoleIDMY');
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      setUsername(userData.Name);
      setToken(userData.token);
      const userToken = userData.token;
      fetchModuleDetails(userToken, id); 
    }

    const fetchUserRolesList = async (userToken) => {
      try {
        const response = await fetch(API_URL + 'Roles', {
          headers: {
            'Authorization': `${userToken}`,
          },
        });
        const userRolesList = await response.json(); // Assuming the API response is an array of objects
        console.log(userRolesList); 
        setUserRolesList(userRolesList); // Update state with user roles data
        if (userRolesList.length > 0) {
          setSelecteduserRolesData(userRolesList[0].id);
        }
      } catch (error) {
        console.error('Error fetching user roles:', error);
        // Handle error as needed
      }
    };
    fetchUserRolesList(userToken); // Pass userToken as an argument
  
  }, [id, token]);

  const fetchModuleDetails = async (userToken, UserRolesID) => {
    try {
      const response = await fetch(`${API_URL}Users?id=${UserRolesID}`, {
        headers: {
          'Authorization': userToken,
        },
      });
      console.log(response);
      if (!response.ok) {
        throw new Error('Failed to fetch User details');
      }
      const responseData = await response.json();
      console.log(responseData);
      const UserRolesData = responseData.find(myuserRole => myuserRole.id === parseInt(UserRolesID, 10));
      console.log(UserRolesData);
      setuserRolesData(UserRolesData); // Set the UserRolesData state
      setRole({
        name: UserRolesData.name,
        userId: UserRolesData.userId,
        address: UserRolesData.address,
        roleId: UserRolesData.roleId,
        roleName: UserRolesData.roleName,
        isActive: UserRolesData.isActive,
      });
      console.log(UserRolesData);
      setIsActive(UserRolesData.isActive);
    } catch (error) {
      console.error('Error fetching User details:', error);
    }
  };

  const handleInputChange = event => {

    const { name, value, type, checked } = event.target;
    const inputValue = type === 'checkbox' ? checked : value;

    if (type === 'radio' && name === 'isActive') {
      setRole(prevRole => ({ ...prevRole, isActive: value === 'true' }));
    } else {
      setRole(prevRole => ({ ...prevRole, [name]: inputValue }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const storedUserData = localStorage.getItem('userSession');
      const userData = JSON.parse(storedUserData);
      const userToken = userData.token;
      const userID = userData.id;
      const currentTime = new Date().toISOString();
      const UserRolesID = UserRolesData.id;
      if (!UserRolesID) {
        console.error('User ID is missing. Unable to update.');
        return;
      }
      const payload = {
        id : UserRolesID,
        name: role.name,
        userId: role.userId,
        address: role.address,
        roleId: role.roleId, // Extract the roleId from UserRolesData
        roleName: role.roleName,
        updatedBy: userID,
        updatedOn: currentTime,
        isActive: role.isActive,
      };
      console.log(payload);
      const response = await fetch(`${API_URL}Users/UpdateUsers`, {
        method: 'POST',
        headers: {
          'Authorization': userToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      console.log(JSON.stringify(payload));
      if (response.status === 200) {
        console.log('User updated successfully');
        navigate('/Users');
      } else {
        console.error('Failed to update User');
        console.log(response);
      }
    } catch (error) {
      console.error('Failed to send the request', error);
    }
  };

  const handleUserRoleChange = (event) => {
    const selectedRoleId = event.target.value;
    setSelecteduserRolesData(selectedRoleId); // Update the selected role ID
    setRole(prevRole => ({ ...prevRole, roleId: selectedRoleId })); // Update roleId in the role state
    console.log(selectedRoleId );
  };

  
  return (

    <div>
      <div className="d-flex justify-content-start p-0">
        <Sidebar />
        <div className="mainContainConatiner d-flex flex-column justify-content-start align-items-start">
          <div className='container-fluid'>
            <div className='row'>
              <div className='col-11 mb-3 mt-3 d-flex justify-content-start align-items-start'>
                <h2>Edit User</h2>
              </div>
            </div>
          </div>
          <div className='container-fluid'>
            <div className='row'>
                <Box sx={{ width: '100%' }} className="p-4">
                  <div className='row'>
                    <div className='col-12 m-auto p-4 rounded rounded-3 border border-1 border-success'>
                      <form onSubmit={handleSubmit}>
                        <div className='row'>
                          <div className='col-lg-3 col-md-4 col-sm-6 col-12 form-group mb-3'>
                            <label className="mb-2 fw-bold" htmlFor="userId">User ID:</label>
                            <input
                              type="text"
                              id="userId"
                              className='form-control'
                              name="userId"
                              value={role.userId || ''}
                              onChange={handleInputChange}
                              disabled
                            />
                          </div>
                          <div className='col-lg-3 col-md-4 col-sm-6 col-12 form-group mb-3'>
                            <label className="mb-2 fw-bold" htmlFor="name">User Name:</label>
                            <input
                              type="text"
                              id="name"
                              className='form-control'
                              name="name"
                              value={role.name || ''}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                          <div className='col-lg-3 col-md-4 col-sm-6 col-12 form-group mb-3'>
                            <label className="mb-2 fw-bold" htmlFor="RoleId">Select Role:</label>
                              <select className='form-select form-control' id="roleId" name="roleId" value={role.roleId}  onChange={handleUserRoleChange}>
                                  <option value="">Role Name</option>
                                  {UserRolesList.map(RoleViewList => (
                                    <option key={RoleViewList.id} value={RoleViewList.id}  >
                                      {RoleViewList.roleName}
                                    </option>
                                  ))}
                              </select>
                          </div>
                          <div className='col-lg-3 col-md-4 col-sm-6 col-12 form-group mb-3'>
                            <label className="mb-2 fw-bold" htmlFor="address">User Address:</label>
                            <input
                              type="text"
                              id="address"
                              className='form-control'
                              name="address"
                              value={role.address || ''}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                          <div className='col-lg-3 col-md-4 col-sm-6 col-12 form-group mb-3'>
                            <label className="mb-2 fw-bold">Status:</label>
                            <div className='row'>
                              <div className='col-6'>
                                <label className="mb-2 fw-bold d-flex justify-content-start align-items-center" htmlFor="true">
                                  <input
                                    className='me-3'
                                    type="radio"
                                    id="true"
                                    name="isActive"
                                    value="true"
                                    checked={role.isActive === true}
                                    onChange={handleInputChange}
                                  />
                                  Active
                                </label>
                              </div>
                              <div className='col-6'>
                                <label className="mb-2 fw-bold d-flex justify-content-start align-items-center" htmlFor="false">
                                  <input
                                    className='me-3'
                                    type="radio"
                                    id="false"
                                    name="isActive"
                                    value="false"
                                    checked={role.isActive === false}
                                    onChange={handleInputChange}
                                  />
                                  Inactive
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className='col-12 form-group mb-1 text-left mt-4'>
                            <button className='btn btn-success' type="submit">Save</button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </Box>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default EditUser;

