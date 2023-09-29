import React, { useState, useEffect } from 'react';
import API_URL from '../../../config';
import { useParams, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Sidebar from '../../sidebar/sidebar.component';
import { useTemplateIdContext } from '../../../contexts/lookupTemplateIdContext';
import { useControlIdContext } from '../../../contexts/lookupControlIdContexr';
import { useRoleIdContext } from '../../../contexts/lookupRoleIdVisible';
import { useValueTypeIdContext } from '../../../contexts/lookupValueTypeIdContext';

const EditTemplateDetails = () => {
  const [role, setRole] = useState({
    id: '',
    templateId: '',
    controlId: '',
    valueTypeId: '',
    labelName: '',
    width: '',
    isEnable: '',
    isVisible: '',
    defaultValue: '',
    listValue: '',
    sqlQuery:'',
    inOrder: '',
    roleIdVisible: '',
    isActive: false,
  });
  console.log(role);
  const [isActive, setIsActive] = useState(false);
  const [templateDetailData, setTempDetailData] = useState(null);
  const [templateId, settemplateId] = useState('');
  const [controlId, setcontrolId] = useState('');
  const [valueTypeId, setvalueTypeId] = useState('');
  const [roleIdVisible, setroleIdVisible] = useState('');
  const [isaEnable, setisEnable] = useState();
  const [isaVisible, setisVisible] = useState();
  const { id1 , id2 } = useParams();
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [Name, setUsername] = useState(localStorage.getItem('Name'));
  const { ContextTemplateId } = useTemplateIdContext();
  const { ContextControlId } = useControlIdContext();
  const { ContextRoleId } = useRoleIdContext();
  const { ContextValueTypeId } = useValueTypeIdContext();


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

  const fetchModuleDetails = async (userToken, templateID) => {
    try {
      const response = await fetch(`${API_URL}TpltDtls?templateId=${id1}&templatedetailId=${id2}`, {
        headers: {
          'Authorization': userToken,
        },
      });
      console.log(response);
      console.log(`${API_URL}TpltDtls?templateId=${templateID}`);
      if (!response.ok) {
        throw new Error('Failed to fetch Template details');
      }

      const responseData = await response.json();
      console.log(responseData);
      const templateDetailData = responseData.find(module => module.id === parseInt(id2, 10));
      console.log(templateDetailData);
      setTempDetailData(templateDetailData);
      setRole({
        templateId: templateDetailData.templateId,
        controlId: templateDetailData.controlId,
        valueTypeId: templateDetailData.valueTypeId,
        labelName: templateDetailData.labelName,
        width: templateDetailData.width,
        isEnable: templateDetailData.isEnable,
        isVisible: templateDetailData.isVisible,
        defaultValue: templateDetailData.defaultValue,
        sqlQuery:templateDetailData.sqlQuery,
        listValue: templateDetailData.listValue,
        inOrder: templateDetailData.inOrder,
        roleIdVisible: templateDetailData.roleIdVisible,
        isActive: templateDetailData.isActive,
      });
      console.log(templateDetailData);
      setIsActive(templateDetailData.isActive);
    } catch (error) {
      console.error('Error fetching Template details:', error);
    }
  };
console.log(ContextControlId);
  const handleInputChange = event => {

    const { name, value, type, checked } = event.target;
    const inputValue = type === 'checkbox' ? checked : value;

    if (type === 'radio' && name === 'isActive') {
      setRole(prevRole => ({ ...prevRole, isActive: value === 'true' }));
    } else {
      setRole(prevRole => ({ ...prevRole, [name]: inputValue }));
    }
  };

  const handletemplateIdChange = (event) => {
    const selectedDetailtemplateId = event.target.value;
    settemplateId(selectedDetailtemplateId); 
    setRole(prevRole => ({ ...prevRole, roleId: selectedDetailtemplateId })); 
    console.log(selectedDetailtemplateId );
  };

  const handlevalueTypeIdChange = (event) => {
    const selectedDetailRoleId = event.target.value;
    setvalueTypeId(selectedDetailRoleId); 
    setRole(prevRole => ({ ...prevRole, roleId: selectedDetailRoleId })); 
    console.log(selectedDetailRoleId );
  };

  const handlecontrolIdChange = (event) => {
    const selectedDetailcontrolId = event.target.value;
    setcontrolId(selectedDetailcontrolId); 
    setRole(prevRole => ({ ...prevRole, roleId: selectedDetailcontrolId })); 
    console.log(selectedDetailcontrolId );
  };

  const handleroleIdVisibleChange = (event) => {
    const selectedDetailroleIdVisible = event.target.value;
    setroleIdVisible(selectedDetailroleIdVisible); 
    setRole(prevRole => ({ ...prevRole, roleId: selectedDetailroleIdVisible })); 
    console.log(selectedDetailroleIdVisible );
  };

  const handleisEnableChange = (event) => {
    const isEnableValue = event.target.value === 'true';
    setisEnable(isEnableValue);
    setRole((prevRole) => ({ ...prevRole, isEnable: isEnableValue })); 
    console.log(isEnableValue);
  };
  
  const handleisVisibleChange = (event) => {
    const isVisibleValue = event.target.value === 'true';
    setisVisible(isVisibleValue);
    setRole((prevRole) => ({ ...prevRole, isVisible: isVisibleValue }));
    console.log(isVisibleValue);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const storedUserData = localStorage.getItem('userSession');
      const userData = JSON.parse(storedUserData);
      const userToken = userData.token;
      const userID = userData.id;
      const currentTime = new Date().toISOString();
      const templateID = templateDetailData.id;
      if (!templateID) {
        console.error('Module ID is missing. Unable to update.');
        return;
      }

      const payload = {
        id : templateID,
        templateId: role.templateId,
        controlId: controlId,
        valueTypeId: role.valueTypeId,
        labelName: role.labelName,
        width: role.width,
        isEnable: isaEnable,
        isVisible: isaVisible,
        defaultValue: role.defaultValue,
        listValue:role.listValue,
        sqlQuery:role.sqlQuery,
        inOrder: role.inOrder,
        roleIdVisible: role.roleIdVisible,
        updatedBy: userID,
        updatedOn: currentTime,
        isActive: role.isActive,
      };
      console.log(payload);
      const response = await fetch(`${API_URL}TpltDtls/UpdateTpltDtls`, {
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
        navigate(`/template-Detail/${id1}`);
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
                <h2>Edit Template Detail</h2>
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
                            <label className="mb-2 fw-bold" htmlFor="templateId">Template ID:</label>
                            <select className='form-control form-select' id="templateId" value={templateId} name="templateId"  onChange={handletemplateIdChange}>
                              <option disabled selected>Select Template Id</option>
                              {ContextTemplateId.map(CTemplateId => (
                                <option key={CTemplateId.id} value={CTemplateId.id}>
                                  {CTemplateId.name}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className='col-lg-3 col-md-4 col-sm-6 col-12 form-group mb-3'>
                            <label className="mb-2 fw-bold" htmlFor="controlId">Control ID:</label>
                            <select className='form-control form-select' id="controlId" value={controlId} name="controlId"  onChange={handlecontrolIdChange}>
                              <option disabled selected>Select Control Id</option>
                              {ContextControlId.map(CControlId => (
                                <option key={CControlId.id} value={CControlId.id}>
                                  {CControlId.controlName}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className='col-lg-3 col-md-4 col-sm-6 col-12 form-group mb-3'>
                            <label className="mb-2 fw-bold" htmlFor="valueTypeId">Value Type Id:</label>
                            <select className='form-control form-select' id="valueTypeId" value={valueTypeId} name="valueTypeId"  onChange={handlevalueTypeIdChange}>
                              <option disabled selected>Select Value Type Id</option>
                              {ContextValueTypeId.map(CValueTypeId => (
                                <option key={CValueTypeId.id} value={CValueTypeId.id}>
                                  {CValueTypeId.name}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className='col-lg-3 col-md-4 col-sm-6 col-12 form-group mb-3'>
                            <label className="mb-2 fw-bold" htmlFor="sqlQuery">Sql Query:</label>
                            <input
                              type="text"
                              id="sqlQuery"
                              className='form-control'
                              name="sqlQuery"
                              value={role.sqlQuery || ''}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                          <div className='col-lg-3 col-md-4 col-sm-6 col-12 form-group mb-3'>
                            <label className="mb-2 fw-bold" htmlFor="labelName">Label Name:</label>
                            <input
                              type="text"
                              id="labelName"
                              className='form-control'
                              name="labelName"
                              value={role.labelName || ''}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                          <div className='col-lg-3 col-md-4 col-sm-6 col-12 form-group mb-3'>
                            <label className="mb-2 fw-bold" htmlFor="width">Input Width:</label>
                            <input
                              type="text"
                              id="width"
                              className='form-control'
                              name="width"
                              value={role.width || ''}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                          <div className='col-lg-3 col-md-4 col-sm-6 col-12 form-group mb-3'>
                            <label className="mb-2 fw-bold" htmlFor="remark">isEnable:</label>
                            <select
                              className="form-control form-select"
                              id="isEnable"
                              name="isEnable"
                              value={isaEnable}
                              onChange={handleisEnableChange}
                            >
                              <option value="true" selected={isaEnable === true}>
                                True
                              </option>
                              <option value="false" selected={isaEnable === false}>
                                False
                              </option>
                            </select>
                          </div>
                          <div className='col-lg-3 col-md-4 col-sm-6 col-12 form-group mb-3'>
                            <label className="mb-2 fw-bold" htmlFor="isVisible">isVisible:</label>
                            <select
                              className="form-control form-select"
                              id="isVisible"
                              name="isVisible"
                              value={isaVisible}
                              onChange={handleisVisibleChange}
                            >
                              <option value="true" selected={isaVisible === true}>
                                True
                              </option>
                              <option value="false" selected={isaVisible === false}>
                                False
                              </option>
                            </select>
                          </div>
                          <div className='col-lg-3 col-md-4 col-sm-6 col-12 form-group mb-3'>
                            <label className="mb-2 fw-bold" htmlFor="remark">Default Value:</label>
                            <input
                              type="text"
                              id="defaultValue"
                              className='form-control'
                              name="defaultValue"
                              value={role.defaultValue || ''}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                          <div className='col-lg-3 col-md-4 col-sm-6 col-12 form-group mb-3'>
                            <label className="mb-2 fw-bold" htmlFor="listValue">List Value:</label>
                            <input
                              type="text"
                              id="listValue"
                              className='form-control'
                              name="listValue"
                              value={role.listValue || ''}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                          <div className='col-lg-3 col-md-4 col-sm-6 col-12 form-group mb-3'>
                            <label className="mb-2 fw-bold" htmlFor="inOrder">In Order:</label>
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
                            <label className="mb-2 fw-bold" htmlFor="roleIdVisible">Visible to Role:</label>
                            <select className='form-control form-select' id="roleIdVisible" value={roleIdVisible} name="roleIdVisible"  onChange={handleroleIdVisibleChange}>
                              <option disabled selected>Select Role</option>
                              {ContextRoleId.map(CRoleId => (
                                <option key={CRoleId.id} value={CRoleId.id}>
                                  {CRoleId.roleName}
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

export default EditTemplateDetails;