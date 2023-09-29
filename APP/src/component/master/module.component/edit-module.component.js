import React, { useState, useEffect } from 'react';
import API_URL from '../../../config';
import { useParams, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { useModuleCategoryContext } from '../../../contexts/ModuleCategoryContext';
import Sidebar from '../../sidebar/sidebar.component';
import $ from 'jquery';


const EditModule = () => {
  const [role, setRole] = useState({
    id: '',
    moduleName: '',
    moduleCategoryID: '',
    routingPage: '',
    moduleIconUrl: '',
    sortOrder: '',
    isActive: false,
  });
  const [isActive, setIsActive] = useState(false);
  const [moduleData, setModuleData] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const { ModuleCategoryList } = useModuleCategoryContext();
  const [SelectedModuleCategory, setSelectedModuleCategory] = useState('');
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

  useEffect(() => {
    $('#sortOrder').on('input', function() {
      $(this).val($(this).val().replace(/\D/g, ''));
    });
  }, []); 

  const fetchModuleDetails = async (userToken, moduleID) => {
    try {
      const response = await fetch(`${API_URL}Module?id=${moduleID}`, {
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
        moduleName: moduleData.moduleName,
        moduleCategoryID: moduleData.moduleCategoryID,
        routingPage: moduleData.routingPage,
        moduleIconUrl: moduleData.moduleIconUrl,
        sortOrder: moduleData.sortOrder,
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

  
  const handleModuleCategoryChange = (event) => {
    const selectedModuleCategory = event.target.value;
    setSelectedModuleCategory(selectedModuleCategory); // Update the selected role ID
    setRole(prevRole => ({ ...prevRole, roleId: selectedModuleCategory })); // Update roleId in the role state
    console.log(selectedModuleCategory );
  };
  
  console.log(ModuleCategoryList , SelectedModuleCategory);
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
        moduleName: role.moduleName,
        moduleCategoryID: SelectedModuleCategory,
        routingPage: role.routingPage,
        sortOrder: role.sortOrder,
        moduleIconUrl: role.moduleIconUrl,
        updatedBy: userID,
        updatedOn: currentTime,
        isActive: role.isActive,
      };
      console.log(payload);
      console.log(role);
      const response = await fetch(`${API_URL}Module/UpdateModules`, {
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
        navigate('/modules');
      } else {
        console.error('Failed to update module');
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
                            <label className="mb-2 fw-bold" htmlFor="stageId">Module Category:</label>
                            <select className='form-control form-select' id="moduleCategoryID" name="moduleCategoryID" value={SelectedModuleCategory} onChange={handleModuleCategoryChange}>
                              <option  disabled selected>Select</option>
                              {ModuleCategoryList.map(ModuleCategory => (
                                  <option key={ModuleCategory.id} value={ModuleCategory.id}>
                                    {ModuleCategory.name}
                                  </option>
                                ))}
                              </select>
                          </div>
                          <div className='col-lg-3 col-md-4 col-sm-6 col-12 form-group mb-3'>
                            <label className="mb-2 fw-bold" htmlFor="moduleName">Name:</label>
                            <input
                              type="text"
                              id="moduleName"
                              className='form-control'
                              name="moduleName"
                              value={role.moduleName || ''}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                          <div className='col-lg-3 col-md-4 col-sm-6 col-12 form-group mb-3'>
                            <label className="mb-2 fw-bold" htmlFor="routingPage">Link:</label>
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
                            <label className="mb-2 fw-bold" htmlFor="moduleIconUrl">Icon:</label>
                            <input
                              type="text"
                              id="moduleIconUrl"
                              className='form-control'
                              name="moduleIconUrl"
                              value={role.moduleIconUrl || ''}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                          <div className='col-lg-3 col-md-4 col-sm-6 col-12 form-group mb-3'>
                            <label className="mb-2 fw-bold" htmlFor="sortOrder">Order:</label>
                            <input
                              type="text"
                              id="sortOrder"
                              className='form-control'
                              name="sortOrder"
                              value={role.sortOrder || ''}
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

export default EditModule;

