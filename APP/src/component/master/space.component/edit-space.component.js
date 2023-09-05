import React, { useState, useEffect } from 'react';
import API_URL from '../../../config';
import { useParams, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Sidebar from '../../sidebar/sidebar.component';

const Editspace = () => {
  const [role, setRole] = useState({
    id: '',
    code: '',
    name: '',
    description: '',
    iconUrl: '',
    isActive: false,
  });
  const [isActive, setIsActive] = useState(false);
  const [spaceData, setspaceData] = useState(null);
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

  const fetchModuleDetails = async (userToken, SpacesID) => {
    try {
      const response = await fetch(`${API_URL}Spaces?id=${SpacesID}`, {
        headers: {
          'Authorization': userToken,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch module details');
      }

      const responseData = await response.json();
      console.log(responseData);
      const spaceData = responseData.find(module => module.id === parseInt(SpacesID, 10));
      console.log(spaceData);
      setspaceData(spaceData); // Set the spaceData state
      setRole({
        code: spaceData.code,
        name: spaceData.name,
        description: spaceData.description,
        iconUrl: spaceData.iconUrl,
        isActive: spaceData.isActive,
      });
      setIsActive(spaceData.isActive);
      // const convertedData = {
      //   ...spaceData,
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
      const SpacesID = spaceData.id;
      if (!SpacesID) {
        console.error('Module ID is missing. Unable to update.');
        return;
      }

      const payload = {
        id : SpacesID,
        code: role.code,
        name: role.name,
        description: role.description,
        iconUrl: role.iconUrl,
        roleName: role.roleName,
        updatedBy: userID,
        updatedOn: currentTime,
        isActive: role.isActive,
      };
      console.log(payload);
      const response = await fetch(`${API_URL}Spaces/UpdateSpaces`, {
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
        navigate('/spaces');
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
                <h2>Edit Module</h2>
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
                            <label className="mb-2 fw-bold" htmlFor="code">Space code:</label>
                            <input
                              type="text"
                              id="code"
                              className='form-control'
                              name="code"
                              value={role.code || ''}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                          <div className='col-lg-3 col-md-4 col-sm-6 col-12 form-group mb-3'>
                            <label className="mb-2 fw-bold" htmlFor="name">Space Name:</label>
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
                            <label className="mb-2 fw-bold" htmlFor="description">Space description:</label>
                            <input
                              type="text"
                              id="description"
                              className='form-control'
                              name="description"
                              value={role.description || ''}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                          <div className='col-lg-3 col-md-4 col-sm-6 col-12 form-group mb-3'>
                            <label className="mb-2 fw-bold" htmlFor="iconUrl">Space iconUrl:</label>
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

export default Editspace;

