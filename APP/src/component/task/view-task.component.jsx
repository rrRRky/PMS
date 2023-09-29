// import React, { useState, useEffect, useMemo, Component } from 'react';
// import Sidebar from '../sidebar/sidebar.component';
// import AddTaskComponent from './add-task.component';
// import { AgGridReact } from 'ag-grid-react';
// import '../master/css/ag-grid.css';
// import '../master/css/ag-theme-alpine.css';
// import Skeleton from '@mui/material/Skeleton';
// import Box from '@mui/material/Box';
// import { Modal} from './task-modal.component'
// import _ from 'lodash';
// import './style.styles.css';
// import API_URL from '../../config';
// import {Link } from 'react-router-dom';
// import axios from 'axios';
// import Button from '@mui/material/Button';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faEdit } from '@fortawesome/free-solid-svg-icons'

// const TaskViewComponent = ({ openModal }) => {
//     const [Name, setUsername] = useState(localStorage.getItem('Name'));
//     const [userMap, setUserMap] = useState({});
    
//   const [showmodal, setShowModal] = useState(false);
//     const [isLoading, setIsLoading] = useState(true);
//     const [rowData, setRowData] = useState([]);
//     const [token, setToken] = useState(localStorage.getItem('token'));
//     // const [spaceID, setspaceID] = useState(localStorage.getItem('spaceID'));
//     // const [SubSpaceID, setSubSpaceID] = useState(localStorage.getItem('SubSpaceID'));
//     // const [SpaceName, setSpaceName] = useState(localStorage.getItem('SpaceName'));
//     const SubSpaceName = localStorage.getItem('SubSpaceName');

//     useEffect(() => {
//       const storedUserData = localStorage.getItem('userSession');
       
//       const userToken = localStorage.getItem('token');
//       if (storedUserData) {
//         const userData = JSON.parse(storedUserData);
//         setUsername(userData.Name);
//         setToken(userData.token); 
    
//     }
//       const fetchData = async () => {
//         try { 
//             const response = await axios.get(API_URL + 'PrjktTask', {
//                 headers: {
//                     'Authorization': `${userToken}`,
//                   },
//             });
//             const rowData = response.data; 
//             setRowData(rowData);
//             setIsLoading(false); 
//         } catch (error) {
//             console.error('Error fetching data:', error);
//             setIsLoading(false);
//         }
//     };

//     fetchData();
//     }, []);

//     // format date 

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

//   const columnDefs = [
//     {
//       field: 'Edit',
//       headerName: 'Action',
//       maxWidth: 80,
//       cellRendererFramework: BtnCellRenderer,
//     },
//     { field: 'taskName', headerName: 'Name' },
//     { field: 'spaceListName', headerName: 'Sub Space Name' },
//     { field: 'stageName', headerName: 'Stage Name' },
//     { field: 'AssignTo', headerName: 'Assigned To' },
//     { field: 'PriorityName', headerName: 'Priority' },
//     { field: 'ProjectId', headerName: 'Project' },
//     { field: 'SPOC', headerName: 'SPOC' },
//     { field: 'StartDate', headerName: 'Start Date',valueGetter: (params) => formatDate(params.data.StartDate)},
//     { field: 'EndDate', headerName: 'End Date',valueGetter: (params) => formatDate(params.data.EndDate)},
//     { field: 'Watchers', headerName: 'Watchers' },
//     { field: 'createdByName', headerName: 'Created By', valueGetter: (params) => getUsername(params.data.createdByName)},
//     { field: 'createdOn', headerName: 'Created On', minWidth: 220,valueGetter: (params) => formatDate(params.data.createdOn)},
//     { field: 'updatedByName', headerName: 'Updated By', valueGetter: (params) => getUsername(params.data.updatedByName)},
//     { field: 'updatedOn', headerName: 'Updated On', minWidth: 220,valueGetter: (params) => formatDate(params.data.updatedOn)},
//     { field: 'isActive', headerName: 'Status', valueGetter: (params) => params.data.isActive ? 'Active' : 'Inactive' },
//   ];

//   const defaultColDef = useMemo(
//     () => ({
//       resizable: true,
//       sortable: true,
//       flex: 1,
//       minWidth: 140,
//       editable: false,
//       filter: true,
//       floatingFilter: true,
//       enablePivot: true,
//       enableCellChangeFlash: true,
//       suppressMenu: true,
//       suppressMovable: true,
//     }),
//     []
//   );

//   return (
//     <div>
//       <div className="d-flex justify-content-start p-0">
//         <Sidebar />
//         <div className="mainContainConatiner">
//           <div className='container-fluid'>
//             <div className='row'>
//               <div className='col-12 mb-3 mt-3 d-flex justify-content-between'>
//                 <h2>{SubSpaceName} Task</h2>
//                 <AddTaskComponent />
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
//                 rowData.length > 0 ? (
//                   <div className="ag-theme-alpine" style={{ width: '100%', height: '85vh' }}>
//                     <AgGridReact
//                       animateRows="true"
//                       style={{ height: '75vh' }}
//                       columnDefs={columnDefs}
//                       defaultColDef={defaultColDef}
//                       rowData={rowData}
//                       domLayout="autoHeight"
//                     />
//                   </div>
//                 ) : (
//                   <Box sx={{ width: '100%' }} className="p-4">
//                     <Box sx={{ width: '100%' }} className="p-4 border border-danger border-2 text-danger fw-bold d-flex justify-content-center align-items-center">
//                       No Data Available
//                     </Box>
//                   </Box>
//                 )
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//         <Box className="">
//           <Modal showmodal={showmodal} setShowModal={showmodal} />
//         </Box>
//     </div>
//   );
// };

// class BtnCellRenderer extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       Name: localStorage.getItem('Name'),
//       userMap: {},
//       isLoading: true,
//       rowData: [],
//       ModuleRights: [],
//       token: localStorage.getItem('token'),
//       showModal: false, // Add showModal to the state
//     };
//   }

//   async componentDidMount() {
//     const storedUserData = localStorage.getItem('userSession');
//     this.openModal = () => {
//       this.setState((prevState) => ({ showModal: !prevState.showModal }));
//       document.body.style.overflow = 'hidden';
//     };
//     const userToken = localStorage.getItem('token');
//     const RoleIDMY = localStorage.getItem('RoleIDMY');
//     const selectedCategoryModuleId = localStorage.getItem('selectedCategoryModuleId');
//     if (storedUserData) {
//       const userData = JSON.parse(storedUserData);
//       this.setState({ Name: userData.Name, token: userData.token }); 
//     }

//     const fetchModuleRights = async () => {
//       try { 
//         const response = await axios.get(API_URL + `Users/ModuleAction?moduleId=${selectedCategoryModuleId}&roleId=${RoleIDMY}`, {
//           headers: {
//             'Authorization': `${userToken}`,
//           },
//         });
//         const ModuleRights = response.data; // Assuming the API response is an array of objects
//         this.setState({ ModuleRights, isLoading: false }); 
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         this.setState({ isLoading: false });
//       }
//     };

//     fetchModuleRights();
    
//   }


//   btnClickedHandler = _.debounce((action, controlId) => {
//     console.log('clicked:', action);
//     console.log('Editing list with ID:', controlId);
//     this.openModal(); 
//     switch (action) {
//       case 'edit':
//         console.log('Cell clicked:', action);
//         break;
//       case 'lock':
//         console.log('Lock button clicked');
//         break;
//       default:
//         break;
//     }
//   }, 200);
  
//   render() {
  
//     const { data } = this.props;
//     const ModuleRights = this.state.ModuleRights; 
//     const roleId = data.id;
//     const SubSpaceID = data.SpaceListId;


 
//   const EditButton = (
//     <Button variant="contained" style={{ minWidth: '30px', height: '30px' }} onClick={() => this.btnClickedHandler(SubSpaceID, 'edit')}>
//       <FontAwesomeIcon
//         className='text-light'
//         icon={faEdit}
//         style={{ fontSize: '16px', margin: '5px', color: 'white' }}
//       />
//     </Button>
//   );

//     const buttonMap = {
//       'E': EditButton,
//     };
    
//     return (
//       <span className='d-flex justify-content-between align-items-center' style={{height:"44px"}} onClick={() => this.btnClickedHandler(roleId, 'edit')}>

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
//   }
// }


// export default TaskViewComponent;


// TaskViewComponent.js
import React, { useState, useEffect, useMemo, Component } from 'react';
import Sidebar from '../sidebar/sidebar.component';
import AddTaskComponent from './add-task.component';
import { AgGridReact } from 'ag-grid-react';
import '../master/css/ag-grid.css';
import '../master/css/ag-theme-alpine.css';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import { EditTaskModal } from './edit-task.component';
import _ from 'lodash';
import './style.styles.css';
import API_URL from '../../config';
import axios from 'axios';
import BtnCellRenderer from './editTaskoutView.Task.component';

const TaskViewComponent = () => {
  const [Name, setUsername] = useState(localStorage.getItem('Name'));
  const [userMap, setUserMap] = useState({});
  const [showModal, setShowModal] = useState(false); // State for modal visibility

  const [isLoading, setIsLoading] = useState(true);
  const [rowData, setRowData] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token'));

  const SubSpaceName = localStorage.getItem('SubSpaceName');

  useEffect(() => {
    const storedUserData = localStorage.getItem('userSession');

    const userToken = localStorage.getItem('token');
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      setUsername(userData.Name);
      setToken(userData.token);
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL + 'PrjktTask', {
          headers: {
            'Authorization': `${userToken}`,
          },
        });
        const rowData = response.data;
        setRowData(rowData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
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
      cellRendererFramework: BtnCellRenderer,
      cellRendererParams: { setShowModal },
    },
    { field: 'taskName', headerName: 'Name' },
    { field: 'spaceListName', headerName: 'Sub Space Name' },
    { field: 'stageName', headerName: 'Stage Name' },
    { field: 'AssignTo', headerName: 'Assigned To' },
    { field: 'PriorityName', headerName: 'Priority' },
    { field: 'ProjectId', headerName: 'Project' },
    { field: 'SPOC', headerName: 'SPOC' },
    { field: 'StartDate', headerName: 'Start Date', valueGetter: (params) => formatDate(params.data.StartDate) },
    { field: 'EndDate', headerName: 'End Date', valueGetter: (params) => formatDate(params.data.EndDate) },
    { field: 'Watchers', headerName: 'Watchers' },
    { field: 'createdByName', headerName: 'Created By', valueGetter: (params) => getUsername(params.data.createdByName) },
    { field: 'createdOn', headerName: 'Created On', minWidth: 220, valueGetter: (params) => formatDate(params.data.createdOn) },
    { field: 'updatedByName', headerName: 'Updated By', valueGetter: (params) => getUsername(params.data.updatedByName) },
    { field: 'updatedOn', headerName: 'Updated On', minWidth: 220, valueGetter: (params) => formatDate(params.data.updatedOn) },
    { field: 'isActive', headerName: 'Status', valueGetter: (params) => params.data.isActive ? 'Active' : 'Inactive' },
  ];

  const defaultColDef = useMemo(
    () => ({
      resizable: true,
      sortable: true,
      flex: 1,
      minWidth: 140,
      editable: false,
      filter: true,
      floatingFilter: true,
      enablePivot: true,
      enableCellChangeFlash: true,
      suppressMenu: true,
      suppressMovable: true,
    }),
    []
  );

  return (
    <div>
      <div className="d-flex justify-content-start p-0">
        <Sidebar />
        <div className="mainContainConatiner">
          <div className='container-fluid'>
            <div className='row'>
              <div className='col-12 mb-3 mt-3 d-flex justify-content-between'>
                <h2>{SubSpaceName} Task</h2>
                <AddTaskComponent />
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
                rowData.length > 0 ? (
                  <div className="ag-theme-alpine" style={{ width: '100%', height: '85vh' }}>
                    <AgGridReact
                      animateRows="true"
                      style={{ height: '75vh' }}
                      columnDefs={columnDefs}
                      defaultColDef={defaultColDef}
                      rowData={rowData}
                      domLayout="autoHeight"
                    />
                  </div>
                ) : (
                  <Box sx={{ width: '100%' }} className="p-4">
                    <Box sx={{ width: '100%' }} className="p-4 border border-danger border-2 text-danger fw-bold d-flex justify-content-center align-items-center">
                      No Data Available
                    </Box>
                  </Box>
                )
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Pass showModal and setShowModal to Modal */}
      <Box className="editmodalpopup">
        <EditTaskModal showmodal={showModal} setShowModal={setShowModal} />
      </Box>
    </div>
  );
};
export default TaskViewComponent;
