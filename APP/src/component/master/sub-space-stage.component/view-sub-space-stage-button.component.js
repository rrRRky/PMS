import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import API_URL from '../../../config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

const BtnCellRenderer = ({ data , toggleEditMode  }) => {
  const [Name] = useState(localStorage.getItem('Name'));
  const [isLoading, setIsLoading] = useState(true);
  const [ModuleRights, setModuleRights] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const userToken = localStorage.getItem('token');
      const RoleIDMY = localStorage.getItem('RoleIDMY');
      const selectedCategoryModuleId = localStorage.getItem('selectedCategoryModuleId');

      try {
        const response = await axios.get(
          `${API_URL}Users/ModuleAction?moduleId=${selectedCategoryModuleId}&roleId=${RoleIDMY}`,
          {
            headers: {
              Authorization: `${userToken}`,
            },
          }
        );
        const moduleRights = response.data;
        setModuleRights(moduleRights);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);


  const onBtSaveEditing = useCallback(() => {
    setIsEditMode(false);
    // Implement the logic for saving editing
  }, []);

  const onBtStartEditing = useCallback(() => {
        toggleEditMode();
  }, [toggleEditMode]);

  console.log('clicked' , toggleEditMode );

  const btnClickedHandler = (action) => {
    console.log('Button clicked with action:', action);
    switch (action) {
      case 'edit':
        toggleEditMode();
        console.log('Edit button clicked');
        break;
      case 'save':
        setIsEditMode(false);
        console.log('Save button clicked');
        break;
      case 'lock':
        console.log('Lock button clicked');
        break;
      default:
        break;
    }
  };





  const buttonMap = {
    'E': (
      <div>
        {isEditMode ? (
          <Button
            key="saveButton"
            className="p-0"
            variant="outline"
            style={{ minWidth: '40px', height: '44px' }}
            onClick={onBtSaveEditing}
          >
            Save
          </Button>
        ) : (
          <Button
            key="edit"
            className="p-0"
            variant="outline"
            style={{ minWidth: '40px', height: '44px' }}
            onClick={onBtStartEditing}
          >
            <FontAwesomeIcon
              className="text-primary"
              icon={faEdit}
              style={{ fontSize: '16px', margin: '5px', color: 'blue' }}
            />
          </Button>
        )}
      </div>
    ),
  };

  return (
    <span
      className="d-flex justify-content-between align-items-center"
      style={{ height: "44px" }}
      onClick={() => btnClickedHandler(data.spaceListId, 'edit')}
    >
      {ModuleRights.map(permission => {
        const { Code, IsApplicable } = permission;
        if (IsApplicable && buttonMap[Code]) {
          return buttonMap[Code];
        }
        return null;
      })}
      {ModuleRights.every(permission => {
        const { Code, IsApplicable } = permission;
        return !IsApplicable || !buttonMap[Code];
      }) && <p>N/A</p>}
    </span>
  );
};

export default BtnCellRenderer;
















// vuew-sub-space-stage-component ----   except save button all are working proper 


// import React, {useState, useEffect, useMemo , useCallback } from 'react';
// import Sidebar from '../../sidebar/sidebar.component';
// import AddSubSpaceStageComponent from './add-sub-space-stage.component';
// import BtnCellRenderer from './view-sub-space-stage-button.component';
// import { AgGridReact } from 'ag-grid-react';
// import '../css/ag-grid.css';
// import '../css/ag-theme-alpine.css';
// import Skeleton from '@mui/material/Skeleton';
// import Box from '@mui/material/Box';
// import _ from 'lodash';
// import './style.styles.css';
// import API_URL from '../../../config';
// import { useStageContext } from '../../../contexts/StageContext';
// import { useTemplateIdContext } from '../../../contexts/lookupTemplateIdContext';
// import Button from '@mui/material/Button';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEdit } from '@fortawesome/free-solid-svg-icons';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// const SubSpaceStageComponent = () => {
//   const [editModeRowId, setEditModeRowId] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [userMap, setUserMap] = useState({});
//   const [isLoading, setIsLoading] = useState(true);
//   const [rowData, setRowData] = useState([]);
//   const { id } = useParams();
//   const { stages } = useStageContext();
//   const { ContextTemplateId } = useTemplateIdContext();


//   const defaultColDef = useMemo(
//     () => ({
//       resizable: true,
//       sortable: true,
//       flex: 1,
//       minWidth: 140,
//       filter: true,
//       floatingFilter: true,
//       enablePivot: true,
//       enableCellChangeFlash: true,
//       suppressMenu: true,
//       suppressMovable: true,
//     }),
//     []
//   );

//   useEffect(() => {
    
//   console.log('Effect triggered');
//     const fetchData = async (subSpaceId) => {
//       const userToken = localStorage.getItem('token');
//       try {
//         const response = await axios.get(`${API_URL}SpcLstStg?spaceListId=${subSpaceId}&spaceListStageId=0`, {
//           headers: {
//             'Authorization': `${userToken}`,
//           },
//         });
//         const rowData = response.data;
//         console.log(rowData);
//         console.log(JSON.stringify(rowData));
//         // Add the isEditing property to each row
//         const initialRowData = response.data.map(row => ({
//           ...row,
//           isEditing: false, // Initially set to false
//         }));
//         setRowData(initialRowData);
//         setIsLoading(false);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         setIsLoading(false);
//       }
//     };

//     fetchData(id);
//   }, [id]);






//   const BtnCellRenderer = ({ data }) => {
//     const [Name] = useState(localStorage.getItem('Name'));
//     const [isLoading, setIsLoading] = useState(true);
//     const [ModuleRights, setModuleRights] = useState([]);
//     const [isEditMode, setIsEditMode] = useState(false);
  
//     useEffect(() => {
//       const fetchData = async () => {
//         const userToken = localStorage.getItem('token');
//         const RoleIDMY = localStorage.getItem('RoleIDMY');
//         const selectedCategoryModuleId = localStorage.getItem('selectedCategoryModuleId');
  
//         try {
//           const response = await axios.get(
//             `${API_URL}Users/ModuleAction?moduleId=${selectedCategoryModuleId}&roleId=${RoleIDMY}`,
//             {
//               headers: {
//                 Authorization: `${userToken}`,
//               },
//             }
//           );
//           const moduleRights = response.data;
//           setModuleRights(moduleRights);
//           setIsLoading(false);
//         } catch (error) {
//           console.error('Error fetching data:', error);
//           setIsLoading(false);
//         }
//       };
  
//       fetchData();
//     }, []);
  
//     const onBtStartEditing = useCallback(() => {
//       setIsEditing((prevIsEditing) => !prevIsEditing);
//       console.log('onBtStartEditing', isEditing);
//     }, []);

//     const onBtSaveEditing = useCallback((event) => {
//       setIsEditing(false); // Disable editing mode when "Save" button is clicked
//       console.log('onBtSaveEditing', isEditing);
//       handleCellValueChanged(event);
//       const updatedData = event.data;
//       console.log('event data', event.data);
//       console.log('onBtSaveEditing', handleCellValueChanged(event), updatedData);
//     }, []);
  
  
//     const btnClickedHandler = (action) => {
//       console.log('Button clicked with action:', action);
//       switch (action) {
//         case 'edit':
//           console.log('Edit button clicked');
//           break;
//         case 'save':
//           console.log('Save button clicked');
//           break;
//         case 'lock':
//           console.log('Lock button clicked');
//           break;
//         default:
//           break;
//       }
//     };
  
//     const buttonMap = {
//       'E': (
//         <div>
//           {isEditing ? (
//             <Button
//               key="saveButton"
//               className="p-0"
//               variant="outline"
//               style={{ minWidth: '40px', height: '44px' }}
//               onClick={onBtSaveEditing}
//             >
//               Save
//             </Button>
//           ) : (
//             <Button
//               key="edit"
//               className="p-0"
//               variant="outline"
//               style={{ minWidth: '40px', height: '44px' }}
//               onClick={onBtStartEditing}
//             >
//               <FontAwesomeIcon
//                 className="text-primary"
//                 icon={faEdit}
//                 style={{ fontSize: '16px', margin: '5px', color: 'blue' }}
//               />
//             </Button>
//           )}
//         </div>
//       ),
//     };
  
//     return (
//       <span
//         className="d-flex justify-content-between align-items-center"
//         style={{ height: "44px" }}
//         onClick={() => btnClickedHandler(data.spaceListId, 'edit')}
//       >
//         {ModuleRights.map(permission => {
//           const { Code, IsApplicable } = permission;
//           if (IsApplicable && buttonMap[Code]) {
//             return buttonMap[Code];
//           }
//           return null;
//         })}
//         {ModuleRights.every(permission => {
//           const { Code, IsApplicable } = permission;
//           return !IsApplicable || !buttonMap[Code];
//         }) && <p>N/A</p>}
//       </span>
//     );
//   };



//   // const toggleEditMode = () => {
//   //   setIsEditing((prevIsEditing) => !prevIsEditing);
//   //   console.log('clicked toogleEditMode' ,  setIsEditing((prevIsEditing) => !prevIsEditing));
//   // };
  

//   const formatDate = (dateString) => {
//     if (!dateString) {
//       return "Not Updated";
//     }
//     const date = new Date(dateString);
//     const options = {
//       day: "2-digit",
//       month: "2-digit",
//       year: "numeric",
//     };
//     const formattedDate = date.toLocaleDateString(undefined, options);
//     const formattedTime = date.toLocaleTimeString();
//     return `${formattedDate} || ${formattedTime}`;
//   };

//   const getUsername = (Name) => {
//     return userMap[Name] || Name;
//   };



//   const handleSaveClick = async (row) => {
//     await handleCellValueChanged({ data: row });
//   };

//   console.log('Stages:', stages.map(stage => ((stage.id))));
//   console.log('template:', ContextTemplateId);

//   const columnDefs = [
//     {
//       field: 'Edit',
//       headerName: 'Action',
//       maxWidth: 80,
//       editable: false,
//       cellRendererFramework: BtnCellRenderer,
//       cellRendererParams: {
//         isEditing: editModeRowId == null, 
//       },
//     },
//     { 
//       field: 'stageName', 
//       headerName: 'Stage Name',
//       editable: isEditing,
//       cellEditor: 'agSelectCellEditor', 
//       cellEditorParams: {
//         values: stages.map(stage => ((stage.name)))
//       },
//       valueGetter: (params) => params.data.stageName,
//       valueSetter: (params) => {
//         const selectedStageName = params.newValue;
//         console.log('1', selectedStageName );
//         const selectedStage = stages.find(stage => stage.name === selectedStageName);
//         console.log('2', selectedStage);
//         if (selectedStage) {
//           params.data.stageId = selectedStage.id; // Set the stageId based on the selected stageName
//           params.data.stageName = selectedStageName;
//           console.log('3', params.data.stageId);
//         } else {
//           // Handle the case where the selected stageName doesn't match any in the options
//           console.error(`Selected stageName "${selectedStageName}" not found in options.`);
//         }
    
//         return true; // Return true to indicate a successful update
//       },
//     },
    
//     { field: 'remark', headerName: 'Stage Remark' , editable: isEditing,},

//     { 
//       field: 'templateName', 
//       headerName: 'Stage Template', 
//       editable: isEditing,
//       cellEditor: 'agSelectCellEditor', 
//       cellEditorParams: {
//         values: ContextTemplateId.map(Template => ((Template.name)))
//       },
//       valueGetter: (params) => params.data.templateName,
//       valueSetter: (params) => {
//         const selectedTemplateName = params.newValue;
//         console.log('1', selectedTemplateName );
//         const selectedTemplate = ContextTemplateId.find(Template => Template.name === selectedTemplateName);
//         console.log('2', selectedTemplate);
//         if (selectedTemplate) {
//           params.data.templateId = selectedTemplate.id; // Set the TemplateSelId based on the selected stageName
//           params.data.templateName = selectedTemplateName;
//           console.log('3', params.data.templateId);
//         } else {
//           // Handle the case where the selected stageName doesn't match any in the options
//           console.error(`Selected TemplateName "${selectedTemplateName}" not found in options.`);
//         }
    
//         return true; // Return true to indicate a successful update
//       },
//     },
//     { field: 'inOrder', headerName: 'Stage Order' , editable: isEditing, },

//   ];
// console.log('columndef ' , columnDefs);
// // const handleCellValueChanged = async (event) => {
// //   const storedUserData = localStorage.getItem('userSession');
// //     const userData = JSON.parse(storedUserData);
// //     const userID = userData.id;
// //     const currentTime = new Date().toISOString();
// //     const updatedRowData = rowData.map(async (row) => {

// //   if (event.data && event.data.id) {
// //     const updatedData = event.data;
// //     console.log('event data', event.data);

// //     const payload = {
// //       id: Number(updatedData.id),
// //       stageId: updatedData.stageId,
// //       spaceListId: updatedData.spaceListId,
// //       remark: updatedData.remark,
// //       templateId: updatedData.templateId,
// //       inOrder: updatedData.inOrder,
// //       updatedBy: userID,
// //       updatedOn: currentTime,
// //       isActive: updatedData.isActive,
// //     };
// //     console.log(JSON.stringify(payload));
// //     try {
// //       const userToken = localStorage.getItem('token');
// //       const response = await axios.post(
// //         `${API_URL}SpcLstStg/UpdateSpcLstStg`,
// //         payload,
// //         {
// //           headers: {
// //             'Authorization': `${userToken}`,
// //           },
// //         }
// //       );
// //       console.log(JSON.stringify(payload), `${userToken}`);
// //       console.log('Data updated successfully:', response.data);
// //     } catch (error) {
// //       console.error('Error updating data:', error);
// //     }
// //   }
// // });
// // };

// const handleCellValueChanged = async (row) => {
//   const storedUserData = localStorage.getItem('userSession');
//   const userData = JSON.parse(storedUserData);
//   const userID = userData.id;
//   const currentTime = new Date().toISOString();

//   // Map over the rowData and create an array of promises for each update
//   const updatedDataPromises = rowData.map(async (rowDataItem) => {
//     if (rowDataItem.isEditing && rowDataItem.id) {
//       // Prepare the payload for the API request
//       const payload = {
//         id: Number(rowDataItem.id),
//         stageId: rowDataItem.stageId,
//         spaceListId: rowDataItem.spaceListId,
//         remark: rowDataItem.remark,
//         templateId: rowDataItem.templateId,
//         inOrder: rowDataItem.inOrder,
//         updatedBy: userID,
//         updatedOn: currentTime,
//         isActive: rowDataItem.isActive,
//       };

//       try {
//         const userToken = localStorage.getItem('token');
//         const response = await axios.post(
//           `${API_URL}SpcLstStg/UpdateSpcLstStg`,
//           payload,
//           {
//             headers: {
//               'Authorization': `${userToken}`,
//             },
//           }
//         );
//         console.log('Data updated successfully:', response.data);
//         console.log(JSON.stringify(payload));
//       } catch (error) {
//         console.error('Error updating data:', error);
//       }
//     }
//   });

//   // Wait for all the update promises to complete
//   await Promise.all(updatedDataPromises);

//   // After saving, you can optionally refresh the data or perform other actions as needed
//   // For example, you can refetch the data here
//   // fetchData(id);

//   // Finally, set isEditing to false to exit edit mode
//   // setIsEditing(false);
// };


  

//   return (
//     <div>
//       <div className="d-flex justify-content-start p-0">
//         <Sidebar />
//         <div className="mainContainConatiner">
//           <div className='container-fluid'>
//             <div className='row'>
//               <div className='col-12 mb-3 mt-3 d-flex justify-content-between'>
//               {isLoading ? (
//                   <Skeleton variant="text" width={200} height={40} animation="wave" />
//                 ) : (
//                   <h2>{rowData.length > 0 ? `${rowData[0].spaceListName} Stage List` : 'No Data Available'}</h2>
//                 )}
//                 <AddSubSpaceStageComponent />
//               </div>
//             </div>
//           </div>
//           <div className='container-fluid'>
//             <div className='row'>
//               {isLoading ? (
//                 <Box sx={{ width: '100%' }} className="p-4">
//                   <Skeleton variant="rectangular" className='mb-1' width={'100%'} height={'15vh'} animation="wave" />
//                   <Skeleton variant="rectangular" width={'100%'} height={'65vh'} animation="wave" />
//                 </Box>
//               ) : (
//                 rowData && rowData.length === 0 ? (
//                   <Box sx={{ width: '100%' }} className="p-4">
//                     <Box sx={{ width: '100%' }} className="p-4 border border-danger border-2 text-danger fw-bold d-flex justify-content-center align-items-center">
//                       No Data Available
//                     </Box>
//                   </Box>
//                 ) : (
//                   <div className="ag-theme-alpine" style={{ width: '100%', height: '85vh' }}>
//                     <AgGridReact
//                       animateRows="true"
//                       style={{ height: '75vh' }}
//                       columnDefs={columnDefs}
//                       defaultColDef={defaultColDef}
//                       rowData={rowData}
//                       domLayout="autoHeight"
//                       frameworkComponents={{
//                         btnCellRenderer: BtnCellRenderer, 
//                       }}
//                       onCellValueChanged={handleCellValueChanged}
//                     />
//                   </div>
//                 )
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// <BtnCellRenderer/>

// export default SubSpaceStageComponent;


