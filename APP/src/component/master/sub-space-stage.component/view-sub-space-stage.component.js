import React, {useState, useEffect, useMemo , useCallback } from 'react';
import Sidebar from '../../sidebar/sidebar.component';
import AddSubSpaceStageComponent from './add-sub-space-stage.component';
import BtnCellRenderer from './view-sub-space-stage-button.component';
import { AgGridReact } from 'ag-grid-react';
import '../css/ag-grid.css';
import '../css/ag-theme-alpine.css';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import _ from 'lodash';
import './style.styles.css';
import API_URL from '../../../config';
import { useStageContext } from '../../../contexts/StageContext';
import { useSpaceListContext } from '../../../contexts/SpaceListContext';
import { useTemplateIdContext } from '../../../contexts/lookupTemplateIdContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const SubSpaceStageComponent = () => {
  const [editModeRowId, setEditModeRowId] = useState(null);
  const [currentlyEditedRow, setCurrentlyEditedRow] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [userMap, setUserMap] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [rowData, setRowData] = useState([]);
  const { id } = useParams();
  const [selectedRowData, setSelectedRowData] = useState(null);
  const { spacesList } = useSpaceListContext();
  const { stages } = useStageContext();
  const { ContextTemplateId } = useTemplateIdContext();

  console.log(spacesList);

  const defaultColDef = useMemo(
    () => ({
      resizable: true,
      sortable: true,
      flex: 1,
      minWidth: 140,
      filter: true,
      floatingFilter: true,
      enablePivot: true,
      enableCellChangeFlash: true,
      suppressMenu: true,
      suppressMovable: true,
    }),
    []
  );

  useEffect(() => {
    
    const fetchData = async (subSpaceId) => {
      const userToken = localStorage.getItem('token');
      try {
        const response = await axios.get(`${API_URL}SpcLstStg?spaceListId=${subSpaceId}&spaceListStageId=0`, {
          headers: {
            'Authorization': `${userToken}`,
          },
        });
        const rowData = response.data;
        console.log(rowData);
       
        const selectedRow = spacesList.find((row) => row.id === parseInt(id, 10));

        if (selectedRow) {
          // Set the selected row in state
          setSelectedRowData(selectedRow);
        } else {
          // Handle the case where no matching row is found
          setSelectedRowData(null);
        }
        
        // Add the isEditing property to each row
        const initialRowData = response.data.map(row => ({
          ...row,
          isEditing: false, // Initially set to false
        }));
        setRowData(initialRowData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData(id);
  }, [id]);




  const BtnCellRenderer = ({ data }) => {
    const [Name] = useState(localStorage.getItem('Name'));
    const [isLoading, setIsLoading] = useState(true);
    const [ModuleRights, setModuleRights] = useState([]);
    const { code, description, name } = data;

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
  
    const onBtStartEditing = useCallback(() => {
      if (currentlyEditedRow) {
        currentlyEditedRow.isEditing = false; // Reset the previously edited row
      }
      data.isEditing = !data.isEditing;
      setIsEditing((prevIsEditing) => !prevIsEditing);
      setCurrentlyEditedRow(data);
      // data.isEditing = !data.isEditing;
      setRowData([...rowData]);
      // setEditingRows((prevEditingRows) => {
      //   if (prevEditingRows.includes(data.spaceListId)) {
      //     setIsEditing((prevIsEditing) => !prevIsEditing);
      //     // Row is already in editing mode, so remove it from the array
      //     return prevEditingRows.filter((rowId) => rowId !== data.spaceListId);
      //   } else {
      //     // Row is not in editing mode, so add it to the array
      //     return [...prevEditingRows, data.spaceListId];
      //   }
      // });
    }, [data]);


    const onBtSaveEditing = useCallback(() => {
      handleCellValueChanged(data); // Pass the data of the current row
      data.isEditing = false; // Disable editing mode when "Save" button is clicked
      setRowData([...rowData]);
    }, [data]);
  
    const btnClickedHandler = (action) => {
      console.log('Button clicked with action:', action);
      switch (action) {
        case 'edit':
          console.log('Edit button clicked');
          break;
        case 'save':
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
          {data.isEditing ? (
            <button
            key="saveButton"
            className="p-0 btn btn-success"
            style={{ minWidth: '50px', height: '30px', marginTop: '-10px', }}
            onClick={onBtSaveEditing}
          >
            Save
          </button>
        ) : (
          <button
            key="edit"
            className="p-0 btn btn-primary"
            style={{ minWidth: '40px', height: '30px', marginTop: '-10px',  }}
            onClick={onBtStartEditing}
          >
            <FontAwesomeIcon
              className="text-white"
              icon={faEdit}
              style={{ fontSize: '16px', margin: '5px', color: 'white' }}
            />
          </button>
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

  const onBtSaveEditing = useCallback((rowDataItem) => {
    handleCellValueChanged(rowDataItem); // Pass the data of the current row
    setIsEditing(false); // Disable editing mode when "Save" button is clicked
  }, []);
  
  const formatDate = (dateString) => {
    if (!dateString) {
      return "Not Updated";
    }
    const date = new Date(dateString);
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };
    const formattedDate = date.toLocaleDateString(undefined, options);
    const formattedTime = date.toLocaleTimeString();
    return `${formattedDate} || ${formattedTime}`;
  };

  const getUsername = (Name) => {
    return userMap[Name] || Name;
  };

  const columnDefs = [
    {
      field: 'Edit',
      headerName: 'Action',
      maxWidth: 80,
      editable: false,
      floatingFilter: false, filter: false,
      cellRendererFramework: BtnCellRenderer,
      cellRendererParams: {
        isEditing: editModeRowId == null, 
      },
    },
    { 
      field: 'stageName', 
      headerName: 'Name',
      editable: (params) => params.data.isEditing,
      cellEditor: 'agSelectCellEditor', 
      floatingFilter: false, filter: false,
      cellEditorParams: {
        values: stages
        .filter(staged => staged.isActive === true)
        .map(stage => ((stage.name)))
      },
      valueGetter: (params) => params.data.stageName,
      valueSetter: (params) => {
        const selectedStageName = params.newValue;
        const selectedStage = stages.find(stage => stage.name === selectedStageName);
        if (selectedStage) {
          params.data.stageId = selectedStage.id; // Set the stageId based on the selected stageName
          params.data.stageName = selectedStageName;
        } else {
          console.error(`Selected stageName "${selectedStageName}" not found in options.`);
        }
    
        return true; // Return true to indicate a successful update
      },
    },
    
    { field: 'remark', headerName: 'Remark' , editable: (params) => params.data.isEditing, floatingFilter: false, filter: false},

    { 
      field: 'templateName', 
      headerName: 'Template Name', 
      editable: (params) => params.data.isEditing,
      cellEditor: 'agSelectCellEditor', 
      floatingFilter: false, filter: false,
      cellEditorParams: {
        values: ContextTemplateId
        .filter(Template => Template.isActive === true)
        .map(Template => ((Template.name)))
      },
      valueGetter: (params) => params.data.templateName,
      valueSetter: (params) => {
        const selectedTemplateName = params.newValue;
        const selectedTemplate = ContextTemplateId.find(Template => Template.name === selectedTemplateName);
        if (selectedTemplate) {
          params.data.templateId = selectedTemplate.id; // Set the TemplateSelId based on the selected stageName
          params.data.templateName = selectedTemplateName;
        } else {
          // Handle the case where the selected stageName doesn't match any in the options
          console.error(`Selected TemplateName "${selectedTemplateName}" not found in options.`);
        }
    
        return true; // Return true to indicate a successful update
      },
    },
    { field: 'inOrder', headerName: 'inOrder' , editable: (params) => params.data.isEditing, floatingFilter: false, filter: false  },

  ];
  const handleCellValueChanged = async (rowDataItem) => {
    const storedUserData = localStorage.getItem('userSession');
    const userData = JSON.parse(storedUserData);
    const userID = userData.id;
    const currentTime = new Date().toISOString();
    // Check if any of the relevant data fields have changed
    if (
      rowDataItem.stageId !== rowDataItem.originalStageId || // Check if the stageId has changed
      rowDataItem.remark !== rowDataItem.originalRemark ||   // Check if the remark has changed
      rowDataItem.templateId !== rowDataItem.originalTemplateId || // Check if the templateId has changed
      rowDataItem.inOrder !== rowDataItem.originalInOrder // Check if the inOrder has changed
    ) {
      // Prepare the payload for the API request
      const payload = {
        id: Number(rowDataItem.id),
        stageId: rowDataItem.stageId,
        spaceListId: rowDataItem.spaceListId,
        remark: rowDataItem.remark,
        templateId: rowDataItem.templateId,
        inOrder: rowDataItem.inOrder,
        updatedBy: userID,
        updatedOn: currentTime,
        isActive: rowDataItem.isActive,
      };
  
      try {
        const userToken = localStorage.getItem('token');
        const response = await axios.post(
          `${API_URL}SpcLstStg/UpdateSpcLstStg`,
          payload,
          {
            headers: {
              'Authorization': `${userToken}`,
            },
          }
        );
        console.log('Data updated successfully:', response.data);
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
    }
  };
  
console.log(selectedRowData);
  return (
    <div>
      <div className="d-flex justify-content-start p-0">
        <Sidebar />
        <div className="mainContainConatiner">
          <div className='container-fluid'>
            <div className='row'>
            <div className='col-12'>
              {selectedRowData && ( 
              <div className='my headerDetail'>
                <div className='h2'>
                  <span className='hederHeading'>Sub Space Name</span> 
                  <span className='hederHeading-view'>{selectedRowData.name}</span>
                </div> 
                <div className='h2'>
                  <span className='hederHeading'>Sub Space Code</span> 
                  <span className='hederHeading-view'>{selectedRowData.code}</span>
                </div> 
                <div className='h2'>
                  <span className='hederHeading'>Sub Space Description</span> 
                  <span className='hederHeading-view'>{selectedRowData.description}</span>
                </div> 
              </div>)}
            </div>
              <div className='col-12 mb-3 mt-3 d-flex justify-content-between'>
                <h2>
              {isLoading ? (
                  <Skeleton variant="text" width={200} height={40} animation="wave" />
                ) : (
                  <>
                  {rowData.length > 0 ? `${rowData[0].spaceListName} Stages` : 'No Data Available'}
                  </>
                )}
                </h2>
                <AddSubSpaceStageComponent />
              </div>
            </div>
          </div>
          <div className='container-fluid'>
            <div className='row'>
              {isLoading ? (
                <Box sx={{ width: '100%' }} className="p-4">
                  <Skeleton variant="rectangular" className='mb-1' width={'100%'} height={'15vh'} animation="wave" />
                  <Skeleton variant="rectangular" width={'100%'} height={'65vh'} animation="wave" />
                </Box>
              ) : (
                rowData && rowData.length === 0 ? (
                  <Box sx={{ width: '100%' }} className="p-4">
                    <Box sx={{ width: '100%' }} className="p-4 border border-danger border-2 text-danger fw-bold d-flex justify-content-center align-items-center">
                      No Data Available
                    </Box>
                  </Box>
                ) : (
                  <div className="ag-theme-alpine" style={{ width: '100%', height: '85vh' }}>
                    <AgGridReact
                      animateRows="true"
                      style={{ height: '75vh' }}
                      columnDefs={columnDefs}
                      defaultColDef={defaultColDef}
                      rowData={rowData}
                      domLayout="autoHeight"
                      frameworkComponents={{
                        btnCellRenderer: BtnCellRenderer,
                      }}
                    />
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

<BtnCellRenderer/>

export default SubSpaceStageComponent;
