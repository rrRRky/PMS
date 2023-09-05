import React, { useState, useEffect } from 'react';
import API_URL from '../../../config';
import { useParams, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Sidebar from '../../sidebar/sidebar.component';

const EditModuleCategory = () => {
  const [role, setRole] = useState({
    id: '',
    name: '',
    routingPage: '',
    iconUrl: '',
    isActive: false,
  });
  console.log(role);
  const [isActive, setIsActive] = useState(false);
  const [moduleData, setModuleData] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [Name, setUsername] = useState(localStorage.getItem('Name'));
  const [ID, setUserID] = useState(localStorage.getItem('ID'));

  useEffect(() => {
    const storedUserData = localStorage.getItem('userSession');
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      setUsername(userData.Name);
      setToken(userData.token);
      const userToken = userData.token;
      fetchModuleDetails(userToken, id); 
    }
  }, [id]);

  const fetchModuleDetails = async (userToken, moduleID) => {
    try {
      const response = await fetch(`${API_URL}MCategory?id=${moduleID}`, {
        headers: {
          'Authorization': userToken,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch module details');
      }

      const responseData = await response.json();
      console.log(responseData);
      const moduleData = responseData.find(module => module.id === parseInt(moduleID, 10));
      console.log(moduleData);
      setModuleData(moduleData); // Set the moduleData state
      setRole({
        name: moduleData.name,
        routingPage: moduleData.routingPage,
        iconUrl: moduleData.iconUrl,
        isActive: moduleData.isActive,
      });
      setIsActive(moduleData.isActive);
      // const convertedData = {
      //   ...moduleData,
      // };

      // setRole(convertedData);
      // setIsActive(convertedData.IsActive);
    } catch (error) {
      console.error('Error fetching module details:', error);
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
      const moduleID = moduleData.id;
      if (!moduleID) {
        console.error('Module ID is missing. Unable to update.');
        return;
      }

      const payload = {
        id : moduleID,
        name: role.name,
        routingPage: role.routingPage,
        iconUrl: role.iconUrl,
        updatedBy: userID,
        updatedOn: currentTime,
        isActive: role.isActive,
      };
      console.log(payload);
      const response = await fetch(`${API_URL}MCategory/UpdateModuleCategory`, {
        method: 'POST',
        headers: {
          'Authorization': userToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      console.log(JSON.stringify(payload));
      if (response.status === 200) {
        console.log('Module updated successfully');
        navigate('/module-category');
      } else {
        console.error('Failed to update module');
        console.log(response);
      }
    } catch (error) {
      console.error('Failed to send the request', error);
    }
  };

  return (

    <div>
      <div className="d-flex justify-content-start p-0">
        <Sidebar />
        <div className="mainContainConatiner d-flex flex-column justify-content-start align-items-start">
          <div className='container-fluid'>
            <div className='row'>
              <div className='col-11 mb-3 mt-3 d-flex justify-content-start align-items-start'>
                <h2>Edit Module Category</h2>
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
                            <label className="mb-2 fw-bold" htmlFor="name">Module Category Name:</label>
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
                            <label className="mb-2 fw-bold" htmlFor="routingPage">Module Category Link:</label>
                            <input
                              type="text"
                              id="routingPage"
                              className='form-control'
                              name="routingPage"
                              value={role.routingPage || ''}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                          <div className='col-lg-3 col-md-4 col-sm-6 col-12 form-group mb-3'>
                            <label className="mb-2 fw-bold" htmlFor="iconUrl">Module Icon:</label>
                            <input
                              type="text"
                              id="iconUrl"
                              className='form-control'
                              name="iconUrl"
                              value={role.iconUrl || ''}
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

export default EditModuleCategory;

