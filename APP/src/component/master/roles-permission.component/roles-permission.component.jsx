import React, { useState, useEffect } from 'react';
import Sidebar from '../../sidebar/sidebar.component';
import './role-permission.styles.css';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import Switch from 'react-switch';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import API_URL from '../../../config';
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemPanel,
  AccordionItemHeading,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';

const RolePermissionMaster = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [rowData, setRowData] = useState([]);
  const [token] = useState(localStorage.getItem('token'));
  const [checkboxValues, setCheckboxValues] = useState({});
  const RoleIDMY = localStorage.getItem('RoleIDMY');
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL + `RolesPermissions/RMFPermission?roleId=${id}`, {
          headers: {
            Authorization: token,
          },
        });
        console.log(API_URL + `RolesPermissions/RMFPermission?roleId=${id}`);
        const initialCheckboxValues = {};
        const mergedData = response.data.map((role) => ({
          ...role,
          Modules: role.Modules.map((module) => {
            // Check if all RMF switches are checked within this module
            const areAllRmfChecked = module.Functions.every((func) =>
              func.RMF.every((rmf) => checkboxValues[rmf.RoleModuleFunctionId])
            );
            console.log('areAllRmfChecked for module', module.ModuleName, ':', areAllRmfChecked);
        
            return {
              ...module,
              Functions: module.Functions.map((func) => ({
                ...func,
                RMF: func.RMF.map((rmf) => {
                  initialCheckboxValues[rmf.RoleModuleFunctionId] = rmf.IsApplicable;
                  return rmf;
                }),
              })),
              ModulesAllChecked: areAllRmfChecked, // Set to true if all RMF switches are checked
            };
          }),
        }));
        console.log(initialCheckboxValues);
        setRowData(mergedData);
        setCheckboxValues(initialCheckboxValues);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };
    // ModulesAllChecked: module.ModuleId === areAllRmfChecked
    fetchData();
  }, [id, token]);

  const handleCheckboxAllToggle = (moduleId) => {
    
    setRowData((prevData) =>
      prevData.map((role) => ({
        ...role,
        Modules: role.Modules.map((module) => ({
          ...module,
          ModulesAllChecked: module.ModuleId === moduleId ? !module.ModulesAllChecked : module.ModulesAllChecked,
        })),
      }))
    );

    setCheckboxValues((prevValues) => {
      const newCheckboxValues = { ...prevValues };
      rowData.forEach((role) => {
        role.Modules.forEach((module) => {
          if (module.ModuleId === moduleId) {
            module.Functions.forEach((func) => {
              func.RMF.forEach((rmf) => {
                newCheckboxValues[rmf.RoleModuleFunctionId] = module.ModulesAllChecked;
              });
            });
          }
        });
      });
      return newCheckboxValues;
    });
    
  };

  const handleCheckboxToggle = (rmfId) => {
    setCheckboxValues((prevValues) => {
      const newCheckboxValues = { ...prevValues };
      newCheckboxValues[rmfId] = !newCheckboxValues[rmfId];

      const updatedRowData = rowData.map((role) => ({
        ...role,
        Modules: role.Modules.map((module) => ({
          ...module,
          
          Functions: module.Functions.map((func) => ({
            ...func,
            RMF: func.RMF.map((rmf) => ({
              ...rmf,
              IsApplicable: rmf.RoleModuleFunctionId === rmfId ? !newCheckboxValues[rmfId] : rmf.IsApplicable,
             
            })),
          })),
        })),
      }));
      setRowData(updatedRowData);
      return newCheckboxValues;
    });
  };

  const updatePermissions = async () => {
    const updatedData = [];

    rowData.forEach((role) => {
      role.Modules.forEach((module) => {
        module.Functions.forEach((func) => {
          func.RMF.forEach((rmf) => {
            if (checkboxValues[rmf.RoleModuleFunctionId] !== undefined) {
              updatedData.push({
                id: rmf.RoleModuleFunctionId,
                isApplicable: checkboxValues[rmf.RoleModuleFunctionId] ? 'True' : 'False',
              });
            }
          });
        });
      });
    });

    try {
      await axios.post(API_URL + 'RolesPermissions/InsertUpdateRolePermissons', updatedData, {
        headers: {
          Authorization: token,
        },
      });
      setIsLoading(true); 
      console.log(updatedData);
      console.log('Permissions updated successfully');
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      console.error('Error updating permissions:', error);
    }
  };
  
   const areAllRmfChecked = (module) => {
    return module.Functions.every((func) =>
      func.RMF.every((rmf) => checkboxValues[rmf.RoleModuleFunctionId])
    );
  };

  return (
    <div>
      <div className="d-flex justify-content-start p-0 w-100">
        <Sidebar />
        <div className="mainContainContainer flex-column d-flex w-100">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12 mb-3 mt-3 d-flex justify-content-between">
                <h2>Role and Permission</h2>
              </div>
            </div>
          </div>
          <div className="container-fluid">
            <div className="row">
              
            {isLoading ? (
                <Box sx={{ width: '100%' }} className="p-4">
                  <Skeleton variant="rectangular" className='mb-1' width={'100%'} height={'15vh'} animation="wave" />
                  <Skeleton variant="rectangular" width={'100%'} height={'65vh'} animation="wave" />
                </Box>
              ) : (
              <Accordion allowZeroExpanded className='p-2'>
                {rowData.map((role) => (
                  <AccordionItem key={role.RoleId}>
                    <AccordionItemHeading>
                      <AccordionItemButton>
                        <h3 className='fw-bold'>{role.RoleName}</h3>
                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                      <div className='row'>
                        {role.Modules.map((module) => (
                          <><div key={module.ModuleId} className='col-lg-12 col-sm-12 col-12'>
                            <h5 className='fw-bold d-flex justify-content-between align-items-center'>
                              {module.ModuleName}
                                
                              <Switch
                                onChange={() => handleCheckboxAllToggle(module.ModuleId)}
                                checked={areAllRmfChecked(module) ? !module.ModulesAllChecked : module.ModulesAllChecked}
                                // type='checkbox'
                                className='ms-2' />
                            </h5>

                          </div><div className='col-lg-12 col-sm-12 col-12 mb-2 border-bottom'>
                              <div className='row'>
                                {module.Functions.map(func => (
                                  <div className='col-lg-2 col-md-3 col-sm-4 col-6 d-flex flex-row justify-content-between p-2 align-items-center border-end border-start border-top functionBlock'>
                                  
                                    <div key={func.FunctionId} className='m-2 fw-bold'>
                                      {func.FunctionName}
                                    </div>
                                    {func.RMF.map((rmf) => (
                                      <span key={rmf.RoleModuleFunctionId} className='m-2 d-flex'>
                                        <Switch 
                                          onChange={() => handleCheckboxToggle(rmf.RoleModuleFunctionId)}
                                          checked={checkboxValues[rmf.RoleModuleFunctionId] || false}
                                          // type='checkbox'
                                          name={rmf.RoleModuleFunctionId}
                                          className='' />
                                      </span>
                                    ))}
                                   
                                  </div>
                                ))}
                              </div>
                            </div></>
                           ))}
                         </div>
                       </AccordionItemPanel>
                     </AccordionItem>
                   ))}
                 </Accordion>
              )}
              <div className='d-flex justify-content-start align-items-center p-2'>
                <button className='p-2 btn-sm bg-success text-white btn-sm ' onClick={updatePermissions}>Update Permissions</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RolePermissionMaster;
