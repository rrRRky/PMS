import React, { useState, useEffect } from 'react';
import API_URL from '../../../config';
import { useParams, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Sidebar from '../../sidebar/sidebar.component';
import { useSpaceContext } from '../../../contexts/SpaceContext';

const Editsubspace = () => {
  const [role, setRole] = useState({
    id: '',
    code: '',
    name: '',
    description: '',
    iconUrl: '',
    spaceId:'',
    isActive: false,
  });
  console.log(role.spaceId);
  const [isActive, setIsActive] = useState(false);
  const [spaceData, setspaceData] = useState(null);
  const [spaceDataID, setspaceDataID] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [Name, setUsername] = useState(localStorage.getItem('Name'));
  const [ID, setUserID] = useState(localStorage.getItem('ID'));
  const { spaces } = useSpaceContext();
  const [SelectedspaceID, setSelectedspaceID] = useState('');


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
      const response = await fetch(`${API_URL}SpaceLists?id=${SpacesID}`, {
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
        spaceId: spaceData.spaceId,
        isActive: spaceData.isActive,
      });
      console.log(role);
      console.log(spaceData);
      setIsActive(spaceData.isActive);
      setspaceDataID(spaceData.spaceId);
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


  const handlespaceIDChange = (event) => {
    const selectedRoleId = event.target.value;
    setSelectedspaceID(selectedRoleId); // Update the selected role ID
    setRole(prevRole => ({ ...prevRole, roleId: selectedRoleId })); // Update roleId in the role state
    console.log(selectedRoleId );
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
        spaceId: SelectedspaceID,
        updatedBy: userID,
        updatedOn: currentTime,
        isActive: role.isActive,
      };
      console.log(SelectedspaceID);
      console.log(payload);
      const response = await fetch(`${API_URL}SpaceLists/UpdateSpaceLists`, {
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
        navigate('/sub-space');
      } if(response.status !== 200) {
        console.error('Failed to update module');
        alert(response.data.error);
        console.log(response , response.data.error);
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
console.log(spaces.find(space => space.value === SelectedspaceID));
console.log(role.spaceId);
console.log(spaceDataID);
  return (

    <div>
      <div className="d-flex justify-content-start p-0">
        <Sidebar />
        <div className="mainContainConatiner d-flex flex-column justify-content-start align-items-start">
          <div className='container-fluid'>
            <div className='row'>
              <div className='col-11 mb-3 mt-3 d-flex justify-content-start align-items-start'>
                <h2>Edit Sub Space</h2>
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
                            <label className="mb-2 fw-bold" htmlFor="code">Code:</label>
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
                            <label className="mb-2 fw-bold" htmlFor="name">Name:</label>
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
                            <label className="mb-2 fw-bold" htmlFor="description">Description:</label>
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
                            <label className="mb-2 fw-bold" htmlFor="iconUrl">Icon Name:</label>
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
                            <label className="mb-2 fw-bold" htmlFor="iconUrl">Select Space:</label>
                            <select className='form-control form-select' id="spaceId" name="spaceId" value={spaces.find(space => space.value === SelectedspaceID)} onChange={handlespaceIDChange}>
                              {spaces.map(space => (
                                <option key={space.id} value={space.id} >
                                  {space.name}
                                </option>
                              ))}
                            </select>
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

export default Editsubspace;

