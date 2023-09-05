import React, { useState } from 'react';
import Sidebar from '../../sidebar/sidebar.component';
import Button from '@mui/material/Button';
import API_URL from '../../../config';
import { useNavigate } from 'react-router-dom';
import TemplateDetailComponent from './view-template-detail.component';
import { useTemplateIdContext } from '../../../contexts/lookupTemplateIdContext';
import { useControlIdContext } from '../../../contexts/lookupControlIdContexr';
import { useRoleIdContext } from '../../../contexts/lookupRoleIdVisible';
import { useValueTypeIdContext } from '../../../contexts/lookupValueTypeIdContext';

export default function AddTemplateDetailComponent({ updateGridData }) {
  const [templateId, settemplateId] = useState('');
  const [controlId, setcontrolId] = useState('');
  const [valueTypeId, setvalueTypeId] = useState('');
  const [labelName, setlabelName] = useState('');
  const [width, setwidth] = useState('');
  const [isEnable, setisEnable] = useState();
  const [isVisible, setisVisible] = useState();
  const [defaultValue, setdefaultValue] = useState('');
  const [inOrder, setinOrder] = useState('');
  const [roleIdVisible, setroleIdVisible] = useState('');
  const { ContextTemplateId } = useTemplateIdContext();
  const { ContextControlId } = useControlIdContext();
  const { ContextRoleId } = useRoleIdContext();
  const { ContextValueTypeId } = useValueTypeIdContext();
  const navigate = useNavigate();
  
 
  const handletemplateIdChange = (event) => {
    const selectedtemplateId = event.target.value;
    settemplateId(selectedtemplateId);
  }; 
  const handlecontrolIdChange = (event) => {
    const selectedcontrolId = event.target.value;
    setcontrolId(selectedcontrolId);
  }; 
  const handlevalueTypeIdChange = (event) => {
    const selectedvalueTypeId = event.target.value;
    setvalueTypeId(selectedvalueTypeId);
  }; 
  const handlelabelNameChange = (event) => {
    setlabelName(event.target.value);
  }; 
  const handlewidthChange = (event) => {
    setwidth(event.target.value);
  }; 
  const handleisEnableChange = (event) => {
    const newValue = event.target.value === 'true';
    setisEnable(newValue);
  };
  
  const handleisVisibleChange = (event) => {
    const newValue = event.target.value === 'true';
    setisVisible(newValue);
  };
  const handledefaultValueChange = (event) => {
    setdefaultValue(event.target.value);
  }; 
  const handleinOrderChange = (event) => {
    setinOrder(event.target.value);
  }; 
  const handleroleIdVisibleChange = (event) => {
    const selectedroleIdVisible = event.target.value;
    setroleIdVisible(selectedroleIdVisible);
  }; 
  function refreshPage() {
    window.location.reload(false);
  }

  // Define the button components with proper JSX content

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {  
        
      const storedUserData = localStorage.getItem('userSession');
      const userData = JSON.parse(storedUserData);
      const userToken = userData.token;
      const userId = userData.id;  
        const currentTime = new Date().toISOString();
        const payload = {
          templateId,
          controlId,
          valueTypeId,
          labelName,
          width,
          isEnable,
          isVisible,
          defaultValue,
          inOrder,
          roleIdVisible,
          createdBy: userId,
          createdOn: currentTime,
          isActive: true,
        };
       console.log(payload);
      const response = await fetch(`${API_URL}TpltDtls/AddTpltDtls`, {
        method: 'POST',
        headers: {
            'Authorization': userToken,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      console.log(JSON.stringify(payload));
      console.log(userToken);
      if (response.status === 200) {
        console.log('New Template Detail added successfully');
        refreshPage()
        updateGridData(); // Fetch the updated data
      } else {
        // Handle error response
        console.error('Failed to add New Template Detail');
        console.log(payload);
      }
    } catch (error) {
      console.error('Failed to send the request', error);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-start p-0">
        <Sidebar />
        <div className="mainContainConatiner">
          <div className='container-fluid'>
            <div className='row'>
              <div className='col-12 mb-3 mt-3 d-flex justify-content-between'>
                <h2>Add New Template Detail</h2>
              </div>
            </div>
          </div>
          <div className='container-fluid'>
            <div className='row'>
              <div className='col-lg-12'>
                <form onSubmit={handleSubmit}>
                  <div className='row'>
                    <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-3">
                        <label className="mb-2 fw-bold" htmlFor="templateId">Select Template:</label>
                        <select className='form-control form-select' id="templateId" name="templateId"  onChange={handletemplateIdChange}>
                        <option disabled selected>Select</option>
                        {ContextTemplateId.map(CTemplateId => (
                          <option key={CTemplateId.id} value={CTemplateId.id}>
                            {CTemplateId.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-3">
                        <label className="mb-2 fw-bold" htmlFor="controlId">Select Control:</label>
                        <select className='form-control form-select'  id="controlId" name="controlId"  onChange={handlecontrolIdChange}>
                        <option disabled selected>Select</option>
                        {ContextControlId.map(CControlId => (
                          <option key={CControlId.id} value={CControlId.id}>
                            {CControlId.controlName}
                          </option>
                        ))}
                      </select>
                    </div>
                    {controlId === '12' && (
                      <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-3">
                        <label className="mb-2 fw-bold" htmlFor="inOrder">SQL-Query:</label>
                        <input
                          type="text"
                          id="inOrder"
                          name="inOrder"
                          className="form-control"
                          value={inOrder}
                          onChange={handleinOrderChange}
                          placeholder="Enter SQL-Query"
                        />
                      </div>
                    )}
                    <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-3">
                        <label className="mb-2 fw-bold" htmlFor="valueTypeId">Select Value Type:</label>
                        <select className='form-control form-select' id="valueTypeId" name="valueTypeId"  onChange={handlevalueTypeIdChange}>
                        <option disabled selected>Select</option>
                        {ContextValueTypeId.map(CValueTypeId => (
                          <option key={CValueTypeId.id} value={CValueTypeId.id}>
                            {CValueTypeId.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-3">
                        <label className="mb-2 fw-bold" htmlFor="labelName">Template Label:</label>
                        <input
                        type="text"
                        id="labelName"
                        name="labelName"
                        className="form-control"
                        value={labelName}
                        onChange={handlelabelNameChange}
                        placeholder="Enter Template Label"
                        />
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-3">
                        <label className="mb-2 fw-bold" htmlFor="width">Template Input Width:</label>
                        <input
                        type="text"
                        id="width"
                        name="width"
                        className="form-control"
                        value={width}
                        onChange={handlewidthChange}
                        placeholder="Enter Template Input Width"
                        />
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-3">
                        <label className="mb-2 fw-bold" htmlFor="isEnable">Template Input IsEnable:</label>
                        <select
                          className="form-control form-select"
                          id="isEnable"
                          name="isEnable"
                          value={isEnable}
                          onChange={handleisEnableChange}
                        > 
                          <option> Select</option>
                          <option value={true}>True</option>
                          <option value={false}>False</option>
                        </select>
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-3">
                        <label className="mb-2 fw-bold" htmlFor="isVisible">Template Input IsVisible:</label>
                        <select
                          className="form-control form-select"
                          id="isVisible"
                          name="isVisible"
                          value={isVisible}
                          onChange={handleisVisibleChange}
                        >
                          <option> Select</option>
                          <option value={true}>True</option>
                          <option value={false}>False</option>
                        </select>
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-3">
                        <label className="mb-2 fw-bold" htmlFor="defaultValue">Template Input Defult Value:</label>
                        <input
                        type="text"
                        id="defaultValue"
                        name="defaultValue"
                        className="form-control"
                        value={defaultValue}
                        onChange={handledefaultValueChange}
                        placeholder="Enter Template Input Defult Value"
                        />
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-3">
                        <label className="mb-2 fw-bold" htmlFor="inOrder">Template Input Order:</label>
                        <input
                        type="text"
                        id="inOrder"
                        name="inOrder"
                        className="form-control"
                        value={inOrder}
                        onChange={handleinOrderChange}
                        placeholder="Enter Template Input Order"
                        />
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-3">
                        <label className="mb-2 fw-bold" htmlFor="roleIdVisible">Select Template Role Visible:</label>
                        <select className='form-control form-select' id="roleIdVisible" name="roleIdVisible"  onChange={handleroleIdVisibleChange}>
                        <option disabled selected>Select</option>
                        {ContextRoleId.map(CRoleId => (
                          <option key={CRoleId.id} value={CRoleId.id}>
                            {CRoleId.roleName}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <Button variant="contained" type="submit">  Save </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className='container-fluid'>
            <div className='row'>
              <div className='col-12 mb-3 mt-3 d-flex justify-content-between'>
                <h2>Template Detail List</h2>
              </div>
            </div>
          </div>
          <div className='container-fluid'>
            <div className='row'>
              <div className='col-lg-12'>
                <TemplateDetailComponent/>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
  );
}
