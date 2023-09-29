import React , {useEffect , useState} from 'react';
import API_URL from '../../../config';
import axios from 'axios';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';

const DynamicFormComponent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [dynamicFormFeildDatavalue, setDynamicFormFeildData] = useState([]);
  const [formData, setFormData] = useState({});
  const spaceID = localStorage.getItem('spaceID');
  const SubSpaceID = localStorage.getItem('SubSpaceID');
  const SpaceName = localStorage.getItem('SpaceName');
  const SubSpaceName = localStorage.getItem('SubSpaceName');
  useEffect(() => {
    const userToken = localStorage.getItem('token');

    const fetchData = async () => {
      try {
          const response = await axios.get(API_URL + `DFFTLS?SpaceListId=${SubSpaceID}&StageId=3&ProjectTaskHeaderId=13`, {
              headers: {
                  'Authorization': `${userToken}`,
                },
          });
          const dynamicFormFeildData = response.data; 
          setDynamicFormFeildData(dynamicFormFeildData)
          // console.log('dynamicFormFeildData' , dynamicFormFeildData);
          setIsLoading(false);
          // console.log(dynamicFormFeildDatavalue );
      } catch (error) {
          console.error('Error fetching data:', error);
          alert(error.response);
          setIsLoading(false);
      }
  };

  fetchData();

  }, [SubSpaceID]);

  const handleInputChange = (fieldId, value) => {
    // Update the formData object with user-entered data
    setFormData((prevFormData) => ({
      ...prevFormData,
      [`fieldId_${fieldId}`]: value,
      [`value_${fieldId}`]: value,
    }));
    
    // console.log(formData);
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
        const delimiter = (field.controlType === 'SingleSelect' || field.controlType === 'MultiSelect') ? ',' : ';';

        dynamicFieldData[fieldKey] = field.fieldId;

        // Handle multi-select values with different delimiters
        if (field.controlType === 'MultiSelect') {
          // Split the selected values based on the delimiter
          const selectedValues = (formData[fieldKey] || field.listValue || field.fieldValue).split(';');
          // console.log(selectedValues );
          // console.log(delimiter);
          // Assign the individual values to the valueKey
          selectedValues.forEach((value, index) => {
            dynamicFieldData[`${valueKey}`] = value.trim();
          });
        } else if (field.controlType === 'SingleSelect') {
          // Split the selected values based on the delimiter
          const selectedsingleValues = (formData[fieldKey] || field.listValue || field.fieldValue).split(',');
          // console.log(selectedsingleValues);
          // console.log(delimiter);
          // Assign the individual values to the valueKey
          selectedsingleValues.forEach((value, index) => {
            dynamicFieldData[`${valueKey}`] = value.trim();
          });
        } else {
          dynamicFieldData[valueKey] = formData[fieldKey] || field.listValue || field.fieldValue;
        }
      });
      const dataToAdd = {
        id: 0, 
        projectTaskHeaderId: 15,
        spaceListId: Number(SubSpaceID),
        stageId: 3, 
        createdBy: 1, 
        createdOn: '2023-09-14T14:30:00', 
        ...dynamicFieldData,
      };
      // console.log(dataToAdd , dynamicFormFeildDatavalue[0].StageId);
      const response = await axios.post(API_URL + 'PrjktTskDtl/AddProjectTD', dataToAdd, {
        headers: {
          Authorization: userToken,
        },
      });

      // Handle success and update UI if needed
      console.log('Add API Response:', response.data);
    } catch (error) {
      console.error('Error adding data:', error);
      if (error.response) {
        // If the server responded with an error message
        alert(error.response.data.error);
      }
    }
  };



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
              case 'radio':
              case 'checkbox':
              case 'date':
                inputElement = <input type={dynamicFormFeildDatavalueInput.controlType} id={dynamicFormFeildDatavalueInput.fieldId} 
                value={formData[fieldKey] || dynamicFormFeildDatavalueInput.fieldValue } className='dynamicformInput form-control'
                onChange={(e) => handleInputChange(fieldId, e.target.value)} />;
                break;
              case 'textarea':
                inputElement = <textarea
                id={dynamicFormFeildDatavalueInput.fieldId}
                className='dynamicformInput form-control'
                value={formData[fieldKey] || dynamicFormFeildDatavalueInput.fieldValue}
                onChange={(e) => handleInputChange(fieldId, e.target.value)}
              />
                break;
              case 'submit':
                inputElement = <button type={dynamicFormFeildDatavalueInput.controlType} id={dynamicFormFeildDatavalueInput.fieldId} className='dynamicformInput form-control' onChange={(e) => handleInputChange(fieldId, e.target.value)}>
                  {formData[fieldKey] || dynamicFormFeildDatavalueInput.fieldValue }</button>;
                break;
              case 'SQLQuery':
                inputElement = <textarea id={dynamicFormFeildDatavalueInput.fieldId} className='dynamicformInput form-control' onChange={(e) => handleInputChange(fieldId, e.target.value)}>{}</textarea>;
                break;
              case 'SingleSelect':
                let SinglelistValues;
                const listValue = formData[fieldKey] || dynamicFormFeildDatavalueInput.listValue;

                if (listValue.includes(',')) {
                  SinglelistValues = listValue.split(',').map(value => value.trim());
                } else {
                  SinglelistValues = listValue.split(';').map(value => value.trim());
                }
                // console.log(SinglelistValues);
                inputElement = (
                  <select id={dynamicFormFeildDatavalueInput.fieldId}  style={{height:'42px'}} className='dynamicformInput form-control form-select' onSelect={(e) => handleInputChange(fieldId, e.target.value)}>
                  <option>Select </option>
                    {SinglelistValues.map((value, index) => (
                      <option key={index} value={value}>{value}</option>
                    ))}
                  </select>
                );
                break;
                case 'MultiSelect':
                  const MultilistValues = (formData[fieldKey] || dynamicFormFeildDatavalueInput.listValue).split(';');
                  // console.log(MultilistValues);
                  inputElement = (
                    <select id={dynamicFormFeildDatavalueInput.controlType} multiple className='dynamicformInput form-control form-select' style={{height:'42px'}} onSelect={(e) => handleInputChange(fieldId, e.target.value)}>
                      <option>Select </option>
                      {MultilistValues.map((value, index) => (
                        <option key={index} value={value}>{value}</option>
                      ))}
                    </select>
                  );
                  break;
              default:
                inputElement = null; 
            }

            return (
              
                <div className='col-lg-4 col-12' key={dynamicFormFeildDatavalueInput.fieldId}>
                  <div className='mb-2 dynamicformBox'>
                    <label className='form-label dynamicformLabel'>{dynamicFormFeildDatavalueInput.labelName}</label>
                    {inputElement}
                  </div>
                </div>
            );
          })
        )}
            <div className='col-12'>
              <Button variant="contained" onClick={handleAddClick}> Move to Next Stage</Button>
            </div>
      </div>
    </div>
  );
};

export default DynamicFormComponent;