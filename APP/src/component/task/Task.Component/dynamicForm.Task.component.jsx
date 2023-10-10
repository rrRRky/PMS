import React , {useEffect , useState} from 'react';
import API_URL from '../../../config';
import axios from 'axios';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import DropdownMultiselect from 'react-multiselect-dropdown-bootstrap';

const DynamicFormComponent = ({stageId , mytaskId }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [dynamicFormFeildDatavalue, setDynamicFormFeildData] = useState([]);
  const [formData, setFormData] = useState({});
  const [selectedMultiValues, setSelectedMultiValues] = useState([]);
  const spaceID = localStorage.getItem('spaceID');
  const SubSpaceID = localStorage.getItem('SubSpaceID');
  const SpaceName = localStorage.getItem('SpaceName');
  const SubSpaceName = localStorage.getItem('SubSpaceName');
  useEffect(() => {
    const taskId = mytaskId || 0;
    const userToken = localStorage.getItem('token');

    const fetchData = async () => {
      try {
          const response = await axios.get(API_URL + `DFFTLS?SpaceListId=${SubSpaceID}&StageId=${stageId}&ProjectTaskHeaderId=${taskId}`, {
              headers: {
                  'Authorization': `${userToken}`,
                },
          });
          const dynamicFormFeildData = response.data; 
          setDynamicFormFeildData(dynamicFormFeildData)
          setIsLoading(false);
      } catch (error) {
          console.error('Error fetching data:', error);
          alert(error.response);
          setIsLoading(false);
      }
  };

  fetchData();

  }, [SubSpaceID, mytaskId, stageId]);

  console.log('mytaskId in DynamicFormComponent:', mytaskId);

  const handleInputChange = (fieldId, value) => {
    setFormData((prevFormData) => {
      const updatedFormData = {
        ...prevFormData,
        [`fieldId_${fieldId}`]: value,
        [`value_${fieldId}`]: dynamicFormFeildDatavalue
          .filter((field) => field.fieldId === fieldId)
          .map((field) => {
            return field.controlType === 'checkbox' ? value === 'on' : value;
          })[0],
      };
  
      console.log('Updated FormData:', updatedFormData);
      return updatedFormData;
    });
  };
  
  
// Function to handle the Add API call
const handleAddClick = async () => {
  try {
    const userToken = localStorage.getItem('token');
    const dynamicFieldData = {};

    dynamicFormFeildDatavalue.forEach((field) => {
      const fieldId = field.fieldId;
      const fieldKey = `fieldId_${fieldId}`;
      const valueKey = `value_${fieldId}`;

      // Handle the case where formData[fieldKey] is not a string
      const selectedValues = typeof formData[fieldKey] === 'string'
        ? formData[fieldKey].split(',')
        : Array.isArray(formData[fieldKey])
          ? formData[fieldKey]
          : [];

      dynamicFieldData[fieldKey] = field.fieldId;

      if (field.controlType === 'MultiSelect') {
        dynamicFieldData[valueKey] = selectedValues.map(value => value.trim()).join(', '); // Join array values with ', '
      } else if (field.controlType === 'SingleSelect') {
        dynamicFieldData[valueKey] = selectedValues.map(value => value.trim())[0] || '';
      } else {
        dynamicFieldData[valueKey] = formData[fieldKey] || field.fieldValue;
      }
    });

    const dataToAdd = {
      id: 0,
      projectTaskHeaderId: mytaskId !== null && mytaskId !== undefined ? mytaskId : 0,
      spaceListId: Number(SubSpaceID),
      stageId: stageId,
      createdBy: 1,
      createdOn: '2023-09-14T14:30:00',
      ...dynamicFieldData,
    };

    const response = await axios.post(API_URL + 'PrjktTskDtl/AddProjectTD', dataToAdd, {
      headers: {
        Authorization: userToken,
      },
    });

    console.log('Add API Response:', response.data);
  } catch (error) {
    console.error('Error adding data:', error);
    if (error.response) {
      alert(error.response.data.error);
    }
  }
};

console.log('mytaskId:', mytaskId);



  return (
    <div className='TaskBottomLayerOutlayer form-group'>
      <div className='row'>
      {isLoading ? (
                <Box sx={{ width: '100%' }} className="p-4 d-flex">
                  <Skeleton variant="rectangular" className='mb-1' width={'33%'} height={'15vh'} animation="wave" />
                  <Skeleton variant="rectangular" className='mb-1'  width={'33%'} height={'15vh'} animation="wave" />
                  <Skeleton variant="rectangular" className='mb-1' width={'33%'} height={'15vh'} animation="wave" />
                  <Skeleton variant="rectangular" className='mb-1' width={'33%'} height={'15vh'} animation="wave" />
                  <Skeleton variant="rectangular" className='mb-1'  width={'33%'} height={'15vh'} animation="wave" />
                  <Skeleton variant="rectangular" className='mb-1' width={'33%'} height={'15vh'} animation="wave" />
                </Box>
              ) : (
          dynamicFormFeildDatavalue
          .filter(ControlInput => ControlInput.isVisible === true)
          .map(dynamicFormFeildDatavalueInput => {
            const fieldId = dynamicFormFeildDatavalueInput.fieldId;
            const fieldKey = `fieldId_${fieldId}`;
            let inputElement;
            switch (dynamicFormFeildDatavalueInput.controlType) {
                case 'text':
                  inputElement = <input type={dynamicFormFeildDatavalueInput.controlType} 
                  id={dynamicFormFeildDatavalueInput.fieldId} 
                  disabled ={dynamicFormFeildDatavalueInput.isEnable===false}
                  value={formData[fieldKey] || dynamicFormFeildDatavalueInput.fieldValue } 
                  className='dynamicformInput form-control'
                  onChange={(e) => handleInputChange(fieldId, e.target.value)} />;
                  console.log('all' , formData[fieldKey] || dynamicFormFeildDatavalueInput.fieldValue);
                break;
                case 'date':
                inputElement = (
                  <input
                    type={dynamicFormFeildDatavalueInput.controlType}
                    id={dynamicFormFeildDatavalueInput.fieldId}
                    disabled ={dynamicFormFeildDatavalueInput.isEnable===false}
                    value={formData[fieldKey] || dynamicFormFeildDatavalueInput.fieldValue}
                    className='dynamicformInput form-control'
                    onChange={(e) => handleInputChange(fieldId, e.target.value)}
                  />
                );
                console.log('date', dynamicFormFeildDatavalueInput.controlType, formData[fieldKey] || dynamicFormFeildDatavalueInput.fieldValue);
                break;
                case 'checkbox':
                  inputElement = (
                    <input
                      type={dynamicFormFeildDatavalueInput.controlType}
                      id={dynamicFormFeildDatavalueInput.fieldId}
                      disabled ={dynamicFormFeildDatavalueInput.isEnable===true}
                      className='dynamicformInput form-control'
                      checked={formData[fieldKey] || dynamicFormFeildDatavalueInput.fieldValue === 'true'}
                      onChange={(e) => handleInputChange(fieldId, e.target.checked ? 'true' : 'false')}
                    />
                  );
                  console.log('checkbox', dynamicFormFeildDatavalueInput.controlType, fieldId, dynamicFormFeildDatavalueInput.fieldValue);
                break;
                case 'radio':
                  inputElement = (
                    <input
                      type={dynamicFormFeildDatavalueInput.controlType}
                      id={dynamicFormFeildDatavalueInput.fieldId}
                      className='dynamicformInput form-control'
                      disabled ={dynamicFormFeildDatavalueInput.isEnable===false}
                      checked={formData[fieldKey] || dynamicFormFeildDatavalueInput.fieldValue === 'true'}
                      onChange={(e) => handleInputChange(fieldId, e.target.checked ? 'true' : 'false')}
                    />
                  );
                  console.log('checkbox', dynamicFormFeildDatavalueInput.controlType, fieldId, dynamicFormFeildDatavalueInput.fieldValue);
                  break;
                  case 'textarea':
                    inputElement = <textarea
                      id={dynamicFormFeildDatavalueInput.fieldId}
                      className='dynamicformInput form-control'
                      disabled ={dynamicFormFeildDatavalueInput.isEnable===false}
                      value={formData[fieldKey] || dynamicFormFeildDatavalueInput.fieldValue}
                      onChange={(e) => handleInputChange(fieldId, e.target.value)}
                    />
                    console.log('textarea' , formData[fieldKey] || dynamicFormFeildDatavalueInput.fieldValue);
                  break;
                  case 'submit':
                  case 'button':
                    inputElement = <button type={dynamicFormFeildDatavalueInput.controlType} 
                    id={dynamicFormFeildDatavalueInput.fieldId} 
                    className='dynamicformInput btn btn-primary' 
                    disabled ={dynamicFormFeildDatavalueInput.isEnable===false}
                    onChange={(e) => handleInputChange(fieldId, e.target.value)}>
                    {formData[fieldKey] || dynamicFormFeildDatavalueInput.fieldValue }</button>;
                    console.log('submit' , formData[fieldKey] || dynamicFormFeildDatavalueInput.fieldValue);
                  break;
                  case 'SQLQuery':
                    inputElement = <textarea id={dynamicFormFeildDatavalueInput.fieldId} 
                    className='dynamicformInput form-control' 
                    disabled ={dynamicFormFeildDatavalueInput.isEnable===false}
                    onChange={(e) => handleInputChange(fieldId, e.target.value)}>{}</textarea>;
                    console.log('SQLQuery' , formData[fieldKey] || dynamicFormFeildDatavalueInput.fieldValue);
                  break;
                  case 'SingleSelect':
                    const listValue = (formData[fieldKey] || dynamicFormFeildDatavalueInput.listValue).toString();
                    const SinglelistValues = listValue.split(',');
                    const selectedValue = formData[fieldKey] || ''; // Get the selected value
                    const optionvalue = dynamicFormFeildDatavalueInput.listValue.split(',').map(value => value.trim())
                      inputElement = (
                        <select
                          id={dynamicFormFeildDatavalueInput.fieldId}
                          style={{ height: '42px' }}
                          disabled ={dynamicFormFeildDatavalueInput.isEnable===false}
                          className='dynamicformInput form-control form-select'
                          onChange={(e) => handleInputChange(fieldId, e.target.value)}
                          value={selectedValue}
                        >
                          <option>Select </option>
                          {optionvalue.map((option, index) => (
                            <option key={index} value={option}>
                              {option}  
                            </option>
                          ))}
                        </select>
                      );
                    
                    console.log( 'aaa' , dynamicFormFeildDatavalueInput.listValue.split(',').map(value => value.trim())  ,  'SingleSelect' , formData[fieldKey] , 'SingleSelect.list' ,  dynamicFormFeildDatavalueInput.listValue , 'SingleSelectvalues' ,'and' , listValue , SinglelistValues , 'listvalues' , listValue);
                    break;
                    case 'MultiSelect':
                  const optionMultivalue = dynamicFormFeildDatavalueInput.listValue.split(';').map((value) => value.trim());

                  inputElement = (
                    <DropdownMultiselect
                      options={optionMultivalue}
                      name={fieldKey}
                      handleOnChange={(selectedOptions) => {
                        setSelectedMultiValues(selectedOptions);
                        handleInputChange(fieldId, selectedOptions);
                      }}
                      selected={selectedMultiValues}
                    />
                  );
                      
                  console.log(
                    'MultiSelect',
                    formData[fieldKey],
                    'MultiSelect.listvalues',
                    dynamicFormFeildDatavalueInput.listValue,
                    'and',
                    selectedMultiValues,
                    'listvalues',
                    optionMultivalue
                  );
                    break;
                  
                    default:
                      inputElement = null; 
                    }

                    return (
                      
                        <div className='col-lg-4 col-12' key={dynamicFormFeildDatavalueInput.fieldId}>
                          <div className='mb-2 dynamicformBox'>
                            <label 
                            className= {`${dynamicFormFeildDatavalueInput.controlType} form-label dynamicformLabel`}>
                              {dynamicFormFeildDatavalueInput.labelName}</label>
                            {inputElement}
                          </div>
                        </div>
                        );
                      })
                    )}
                  <div className='col-12'>
                  <Button variant="contained" color="primary" 
                    onClick={handleAddClick} 
                    disabled={mytaskId === 0 || mytaskId === null}>
                    Move to Next Stage
                  </Button>
                  </div>
            </div>
          </div>
  );
};

export default DynamicFormComponent;