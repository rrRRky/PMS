import React, { useState, useEffect } from 'react';
import API_URL from '../../../config';
import { useParams, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Sidebar from '../../sidebar/sidebar.component';

const EditTemplate = () => {
  const [role, setRole] = useState({
    id: '',
    name: '',
    remark: '',
    isActive: false,
  });
  const [isActive, setIsActive] = useState(false);
  const [templateData, setspaceData] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [Name, setUsername] = useState(localStorage.getItem('Name'));


  useEffect(() => {
    const storedUserData = localStorage.getItem('userSession');
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      setUsername(userData.Name);
      setToken(userData.token);
      const userToken = userData.token;
      fetchModuleDetails(userToken, id); 
    }
  }, []);

  const fetchModuleDetails = async (userToken, templateID) => {
    try {
      const response = await fetch(`${API_URL}Template?id=${templateID}`, {
        headers: {
          'Authorization': userToken,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch Template details');
      }

      const responseData = await response.json();
      console.log(responseData);
      const templateData = responseData.find(module => module.id === parseInt(templateID, 10));
      console.log(templateData);
      setspaceData(templateData); // Set the templateData state
      setRole({
        name: templateData.name,
        remark: templateData.remark,
        isActive: templateData.isActive,
      });
      console.log(role);
      setIsActive(templateData.isActive);
    } catch (error) {
      console.error('Error fetching Template details:', error);
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
      const templateID = templateData.id;
      if (!templateID) {
        console.error('Module ID is missing. Unable to update.');
        return;
      }

      const payload = {
        id : templateID,
        name: role.name,
        remark: role.remark,
        updatedBy: userID,
        updatedOn: currentTime,
        isActive: role.isActive,
      };
      console.log(payload);
      const response = await fetch(`${API_URL}Template/UpdateTemplates`, {
        method: 'POST',
        headers: {
          'Authorization': userToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      console.log(JSON.stringify(payload));
      if (response.status === 200) {
        console.log('Template updated successfully');
        navigate('/templates');
      } else {
        console.error('Failed to update Template');
        console.log(response);
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

    <div>
      <div className="d-flex justify-content-start p-0">
        <Sidebar />
        <div className="mainContainConatiner d-flex flex-column justify-content-start align-items-start">
          <div className='container-fluid'>
            <div className='row'>
              <div className='col-11 mb-3 mt-3 d-flex justify-content-start align-items-start'>
                <h2>Edit Template</h2>
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
                            <label className="mb-2 fw-bold" htmlFor="name">Template Name:</label>
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
                            <label className="mb-2 fw-bold" htmlFor="remark">Template remark:</label>
                            <input
                              type="text"
                              id="remark"
                              className='form-control'
                              name="remark"
                              value={role.remark || ''}
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

export default EditTemplate;