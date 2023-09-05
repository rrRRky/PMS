import React, { useState, useEffect } from 'react';
import API_URL from '../../../config';
import { useParams, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Sidebar from '../../sidebar/sidebar.component';
import { useStageContext } from '../../../contexts/StageContext';
import { useTemplateIdContext } from '../../../contexts/lookupTemplateIdContext';

const EditsubspaceStage = () => {
  const [role, setRole] = useState({
    id: '',
    spaceListId: '',
    stageId: '',
    inOrder: '',
    remark: '',
    templateId:'',
    isActive: false,
  });
  const [isActive, setIsActive] = useState(false);
  const [spaceData, setspaceData] = useState(null);
  const { id1 , id2 } = useParams();
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [Name, setUsername] = useState(localStorage.getItem('Name'));
  const [ID, setUserID] = useState(localStorage.getItem('ID'));
  const { stages } = useStageContext();
  const { ContextTemplateId } = useTemplateIdContext();
  const [SelectedspaceID, setSelectedspaceID] = useState('');
  const [SelectedtemplateId, settemplateId] = useState('');


  useEffect(() => {
    const storedUserData = localStorage.getItem('userSession');
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      setUsername(userData.Name);
      setToken(userData.token);
      const userToken = userData.token;
      fetchModuleDetails(userToken, id1 , id2); 
    }
  }, [id1, id2]);
  const fetchModuleDetails = async (userToken, SpacesID) => {
    console.log(`${API_URL}SpcLstStg?spaceListId=${id1}&spaceListStageId=${id2}`);
    try {
      const response = await fetch(`${API_URL}SpcLstStg?spaceListId=${id1}&spaceListStageId=${id2}`, {
        headers: {
          'Authorization': userToken,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch module details');
      }

      const responseData = await response.json();
      console.log(responseData);
      
      const spaceData = responseData.find(module => module.id === parseInt(id2, 10));
      console.log(spaceData);
      setspaceData(spaceData); // Set the spaceData state
      setRole({
        spaceListId: spaceData.spaceListId,
        stageId: spaceData.stageId,
        remark: spaceData.remark,
        inOrder: spaceData.inOrder,
        templateId: spaceData.templateId,
        isActive: spaceData.isActive,
      });
      setIsActive(spaceData.isActive);
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

  const handletemplateIdChange = (event) => {
    const selectedtemplateId = event.target.value;
    settemplateId(selectedtemplateId);
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
        spaceListId: role.spaceListId,
        stageId: role.stageId,
        remark: role.remark,
        inOrder: role.inOrder,
        templateId: role.templateId,
        updatedBy: userID,
        updatedOn: currentTime,
        isActive: role.isActive,
      };
      console.log(payload);
      const response = await fetch(`${API_URL}SpcLstStg/UpdateSpcLstStg`, {
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
        navigate('/sub-space-stage');
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
        <Box sx={{ width: '100%' }} className="p-4">
                  <div className='row'>
                    <div className='col-12 m-auto p-4 rounded rounded-3 border border-1 border-success'>
                      <form onSubmit={handleSubmit}>
                        <div className='row'>
                          <div className='col-lg-3 col-md-4 col-sm-6 col-12 form-group mb-3'>
                            <label className="mb-2 fw-bold" htmlFor="spaceListId">Space List Id:</label>
                            <input
                              type="text"
                              id="spaceListId"
                              className='form-control'
                              name="spaceListId"
                              value={role.spaceListId || ''}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                          <div className='col-lg-3 col-md-4 col-sm-6 col-12 form-group mb-3'>
                            <label className="mb-2 fw-bold" htmlFor="stageId">Stage Id:</label>
                            <select className='form-control form-select' id="stageId" name="stageId" value={role.id} onChange={handlespaceIDChange}>
                              {stages.map(staged => (
                                  <option key={staged.id} value={staged.id}>
                                    {staged.name}
                                  </option>
                                ))}
                              </select>
                          </div>
                          <div className='col-lg-3 col-md-4 col-sm-6 col-12 form-group mb-3'>
                            <label className="mb-2 fw-bold" htmlFor="remark">Space remark:</label>
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
                            <label className="mb-2 fw-bold" htmlFor="inOrder">Space inOrder:</label>
                            <input
                              type="text"
                              id="inOrder"
                              className='form-control'
                              name="inOrder"
                              value={role.inOrder || ''}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                          <div className='col-lg-3 col-md-4 col-sm-6 col-12 form-group mb-3'>
                            <label className="mb-2 fw-bold" htmlFor="templateId">Space templateId:</label>
                            <select className='form-control form-select' id="templateId" name="templateId" value={role.id} onChange={handletemplateIdChange}>
                              {ContextTemplateId.map(TemplateIdsel => (
                                <option key={TemplateIdsel.id} value={TemplateIdsel.id}>
                                  {TemplateIdsel.name}
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

  );
};

export default EditsubspaceStage;

