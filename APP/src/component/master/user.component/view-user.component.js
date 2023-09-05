import React, { useState, useEffect, useMemo, Component } from 'react';
import Sidebar from '../../sidebar/sidebar.component';
import AddUserComponent from './add-user.component';
import { AgGridReact } from 'ag-grid-react';
import '../css/ag-grid.css';
import '../css/ag-theme-alpine.css';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import _ from 'lodash';
import './style.styles.css';
import API_URL from '../../../config';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from '@mui/material/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { faLock } from '@fortawesome/free-solid-svg-icons'
// import { faPenRuler } from '@fortawesome/free-solid-svg-icons'

const UserComponent = () => {
    const [Name, setUsername] = useState(localStorage.getItem('Name'));
    const [userMap, setUserMap] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [rowData, setRowData] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('token'));
  
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
            const response = await axios.get(API_URL + 'Users', {
                headers: {
                    'Authorization': `${userToken}`,
                  },
            });
            const rowData = response.data; // Assuming the API response is an array of objects
            setRowData(rowData);
            setIsLoading(false); 
        } catch (error) {
            console.error('Error fetching data:', error);
            setIsLoading(false);
        }
    };

    fetchData();
    }, []);



    // API require 

    // format date 

  const formatDate = (dateString) => {
    if (!dateString) {
      return "Not Updated"; // Default value for blank date
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
      maxWidth: 130,
      cellRendererFramework: BtnCellRenderer,
    },
    { field: 'userId', headerName: 'User Id' },
    { field: 'name', headerName: 'User Name' },
    { field: 'roleName', headerName: 'Role Name' },
    { field: 'address', headerName: 'User Address' },
    { field: 'createdByName', headerName: 'Created By', valueGetter: (params) => getUsername(params.data.createdByName)},
    { field: 'createdOn', headerName: 'Created On', minWidth: 220,valueGetter: (params) => formatDate(params.data.createdOn)},
    { field: 'updatedByName', headerName: 'Updated By', valueGetter: (params) => getUsername(params.data.updatedByName)},
    { field: 'updatedOn', headerName: 'Updated On', minWidth: 220,valueGetter: (params) => formatDate(params.data.updatedOn)},
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
                <h2>User List</h2>
                <AddUserComponent />
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
    </div>
  );
};

class BtnCellRenderer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Name: localStorage.getItem('Name'),
      userMap: {},
      isLoading: true,
      rowData: [],
      ModuleRights: [],
      token: localStorage.getItem('token'),
    };
  }

  async componentDidMount() {
    const storedUserData = localStorage.getItem('userSession');
     
    const userToken = localStorage.getItem('token');
    const RoleIDMY = localStorage.getItem('RoleIDMY');
    const selectedCategoryModuleId = localStorage.getItem('selectedCategoryModuleId');
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      this.setState({ Name: userData.Name, token: userData.token }); 
    }

    const fetchModuleRights = async () => {
      try { 
        const response = await axios.get(API_URL + `Users/ModuleAction?moduleId=${selectedCategoryModuleId}&roleId=${RoleIDMY}`, {
          headers: {
            'Authorization': `${userToken}`,
          },
        });
        const ModuleRights = response.data; // Assuming the API response is an array of objects
        this.setState({ ModuleRights, isLoading: false }); 
      } catch (error) {
        console.error('Error fetching data:', error);
        this.setState({ isLoading: false });
      }
    };

    fetchModuleRights();
    
  }
  
  btnClickedHandler = _.debounce((userNameId, action) => {
    console.log('clicked:', action);
    switch (action) {
      case 'edit':
        console.log('Cell clicked:', action);
        break;
      case 'lock':
        console.log('Lock button clicked');
        break;
      default:
        break;
    }
  }, 200);
  
  render() {
    function refreshPage() {
      window.location.reload(false);
    }

    // status API 
  
    const { data } = this.props;
    const userNameId = data.id;
    const ModuleRights = this.state.ModuleRights; 
    const roleId = data.id;
    const currentTime = new Date().toISOString();
    const {history} = this.props;
    // status API 
    // const currentTime = new Date().toISOString();
    const userSession = JSON.parse(sessionStorage.getItem('userSession'));
    const { id: userId } = userSession; // Extract the ID from userSession

    const ActiveStatusHandler = () => {
      const payload = {
        RoleName: data.RoleName,
        CreatedBy: data.CreatedBy,
        CreatedOn: data.CreatedOn,
        UpdatedBy: Number(userId),
        UpdatedOn: currentTime,
        IsActive: !data.IsActive,
      };  

      console.log('my' , payload);

      axios
        .patch(`${API_URL}/app-roles-status?id=${data.ID}`, payload )
        .then((resp) => {
          if (resp.status === 204) {
            console.log(resp);
            console.log('Update successful');
            refreshPage()
          } else if (resp.status !== 204) {
            console.log('Update unsuccessful');
          }
        })
        .catch((error) => {

          console.log(error);

        });
    }
    // Define a mapping of FunctionId to corresponding buttons
    const buttonMap = {
      '3': (
        <Button
          key="editButton"
          className='p-0'
          variant='outline'
          style={{ minWidth: '40px', height: '44px' }}
          onClick={() => this.btnClickedHandler(userNameId, 'edit')}
        >
          <Link to={`/edit-user/${userNameId}`}>
            <FontAwesomeIcon
              className='text-primary'
              icon={faEdit}
              style={{ fontSize: '16px', margin: '5px', color: 'blue' }}
            />
          </Link>
        </Button>
      ),
      '4': (
        <Button
          key="deleteButton"
          className='p-0'
          variant='outline'
          style={{ minWidth: '40px', height: '44px' }}
          onClick={() => this.btnClickedHandler(userNameId, 'delete')}
        >
          <Link onClick={ActiveStatusHandler}>
            <FontAwesomeIcon
              className='text-danger'
              icon={faLock}
              style={{ fontSize: '16px', margin: '5px', color: 'blue' }}
            />
          </Link>
        </Button>
      ),
    };
    
    return (
      <span className='d-flex justify-content-between align-items-center' style={{height:"44px"}} >
        {ModuleRights.map(permission => {
          const { FunctionId, IsApplicable } = permission;
          if (IsApplicable && buttonMap[FunctionId]) { // Changed condition here
            return buttonMap[FunctionId];
          }
          return null;
        })}
        {ModuleRights.every(permission => {
          const { FunctionId, IsApplicable } = permission;
          return !IsApplicable || !buttonMap[FunctionId];
        }) && <p>N/A</p>}
      </span>
    );
  }
}


export default UserComponent;
