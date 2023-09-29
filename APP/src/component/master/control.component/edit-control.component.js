import React, { useState, useEffect } from 'react';
import API_URL from '../../../config';
import { useParams, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Sidebar from '../../sidebar/sidebar.component';

const EditControl = () => {
  const [role, setRole] = useState({
    id: '',
    controlName: '',
    type: '',
    typeId: '',
    isActive: false, // Changed the value to a boolean
  });
  const [controlData, setControlData] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('token'); // Removed state for token
  const [Name] = useState(localStorage.getItem('Name')); // Removed state for Name
  const [ID] = useState(localStorage.getItem('ID')); // Removed state for ID

  useEffect(() => {
    const storedUserData = localStorage.getItem('userSession');
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      const userToken = userData.token;
      fetchControlDetails(userToken, id);
    }
  }, [id]);

  const fetchControlDetails = async (userToken, controlID) => {
    try {
      const response = await fetch(`${API_URL}Controls?id=${controlID}`, {
        headers: {
          Authorization: userToken,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch control details');
      }
      const responseData = await response.json();
      
      if (!responseData || responseData.length === 0) {
        console.error('No control data found for the given ID');
        return;
      }
      const controlData = responseData.find(control => control.id === parseInt(controlID, 10));
      setControlData(controlData);
      setRole({
        id: controlData.id,
        controlName: controlData.controlName,
        type: controlData.type,
        typeId:controlData.typeId,
        isActive: controlData.isActive,
      });
      
      console.log(controlData);
    } catch (error) {
      console.error('Error fetching control details:', error);
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

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const storedUserData = localStorage.getItem('userSession');
      const userData = JSON.parse(storedUserData);
      const userToken = userData.token;
      const userID = userData.id;
      const currentTime = new Date().toISOString();
      const controlID = controlData.id;
      if (!controlID) {
        console.error('Control ID is missing. Unable to update.');
        return;
      }

      const payload = {
        id: controlID,
        controlName: role.controlName,
        type: role.type,
        typeId: role.typeId,
        updatedBy: userID,
        updatedOn: currentTime,
        isActive: role.isActive,
      };

      const response = await fetch(`${API_URL}Controls/UpdateControls`, {
        method: 'POST',
        headers: {
          Authorization: userToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.status === 200) {
        console.log('Control updated successfully');
        navigate('/controls');
      } else {
        console.error('Failed to update control');
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
                <h2>Edit Control</h2>
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
                          <label className="mb-2 fw-bold" htmlFor="controlName">Name:</label>
                          <input
                            type="text"
                            id="controlName"
                            className='form-control'
                            name="controlName"
                            value={role.controlName || ''}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className='col-lg-3 col-md-4 col-sm-6 col-12 form-group mb-3'>
                          <label className="mb-2 fw-bold" htmlFor="type">Type:</label>
                          <input
                            type="text"
                            id="type"
                            className='form-control'
                            name="type"
                            value={role.type || ''}
                            onChange={handleInputChange}
                            disabled
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

export default EditControl;
