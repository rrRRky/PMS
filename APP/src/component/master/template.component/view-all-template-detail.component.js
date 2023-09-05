import React, { useState, useEffect, useMemo, Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import '../css/ag-grid.css';
import '../css/ag-theme-alpine.css';
import Skeleton from '@mui/material/Skeleton';
import Sidebar from '../../sidebar/sidebar.component';
import Box from '@mui/material/Box';
import _ from 'lodash';
import './style.styles.css';
import API_URL from '../../../config';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Button from '@mui/material/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'

const AllTemplateDetailComponent = () => {
    const [userMap, setUserMap] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [rowData, setRowData] = useState([]);
    const { id } = useParams();
    const [UserName, setUsername] = useState(localStorage.getItem('userSession.Name'));
    const [ID, setID] = useState(localStorage.getItem('userSession.id'));
    const [ModuleRights, setModuleRights] = useState([]); // Initialize ModuleRights state
  
    useEffect(() => {
      const userToken = localStorage.getItem('token');
      const storedUserData = localStorage.getItem('userSession');
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      setUsername(userData.Name);
      const userToken = userData.token;
    }
    console.log(id);
      const fetchData = async (userToken, templateId) => {
        try { 
            const response = await axios.get(`${API_URL}TpltDtls?templateId=0&templatedetailId=0`, {
                headers: {
                    'Authorization': `${userToken}`,
                  },
            });
            console.log(id);
            const rowData = response.data; // Assuming the API response is an array of objects
            setRowData(rowData);
            setIsLoading(false); 
        } catch (error) {
            console.error('Error fetching data:', error);
            setIsLoading(false);
        }
    };
    fetchData(userToken, id); 
    }, [id]);

    useEffect(() => {

      const storedUserData = localStorage.getItem('userSession');
      const userToken = localStorage.getItem('token');
      const RoleIDMY = localStorage.getItem('RoleIDMY');
      const selectedCategoryModuleId = localStorage.getItem('selectedCategoryModuleId');
      if (storedUserData) {
        const userData = JSON.parse(storedUserData);
        setUsername(userData.UserName);
        setID(userData.ID);
      }
  
      const fetchModuleRights = async () => {
        try { 
          const response = await axios.get(API_URL + `Users/ModuleAction?moduleId=${selectedCategoryModuleId}&roleId=${RoleIDMY}`, {
            headers: {
              'Authorization': `${userToken}`,
            },
          });
          const ModuleRights = response.data; 
          setModuleRights(ModuleRights); 
        } catch (error) {
          console.error('Error fetching data:', error);
          this.setState({ isLoading: false });
        }
      };
  
      fetchModuleRights();
  
    }, []);


    // format date 
    const addButton = (
      <a href="/template-Detail" variant="outlined" className='me-3' >Add Template Detail</a>
    );
  
    const buttonMap = {
      'A': addButton, // Use the predefined addButton component
    };


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
      maxWidth: 80,
      cellRendererFramework: BtnCellRenderer,
    },
    { field: 'templatetName', headerName: 'Template Name' },
    { field: 'controlId', headerName: 'Control Name' },
    { field: 'valueType', headerName: 'Value Type' },
    { field: 'labelName', headerName: 'Label Name' },
    { field: 'width', headerName: 'Width' },
    { field: 'isEnable', headerName: 'IsEnable' },
    { field: 'isVisible', headerName: 'IsVisible' },
    { field: 'roleVisible', headerName: 'Role Visiable To' },
    { field: 'defaultValue', headerName: 'Defult Value' },
    { field: 'inOrder', headerName: 'InOrder' },
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
        <div className="mainContainConatiner d-flex flex-column justify-content-start align-items-start">
          <div className='container-fluid'>
            <div className='row'>
              <div className='col-11 mb-3 mt-3 d-flex justify-content-start align-items-start'>
                <h2>All Template Details</h2>
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
  
  btnClickedHandler = _.debounce((action) => {
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
 
    const { data } = this.props;
    const ModuleRights = this.state.ModuleRights; 
    const templateId = data.id;
    const roleId = data.templateId;
    const buttonMap = {
      'E': (
        <Button
          key="editButton"
          className='p-0'
          variant='outline'
          style={{ minWidth: '40px', height: '44px' }}
          onClick={() => this.btnClickedHandler(roleId/templateId, 'edit')}
        >
          <Link to={`/edit-template-details/${roleId}/${templateId}`}>
            <FontAwesomeIcon
              className='text-primary'
              icon={faEdit}
              style={{ fontSize: '16px', margin: '5px', color: 'blue' }}
            />
          </Link>
        </Button>
      ),
    };
    
    return (
      <span className='d-flex justify-content-between align-items-center' style={{height:"44px"}} onClick={() => this.btnClickedHandler(roleId, 'edit')}>

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
  }
}


export default AllTemplateDetailComponent;
