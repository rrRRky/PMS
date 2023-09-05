import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../sidebar/sidebar.component';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControlLabel,
  Switch,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import './role-permission.styles.css';

const RolePermissionMaster = () => {
  const [allSwitch, setAllSwitch] = useState(false);
  const [switches, setSwitches] = useState({});
  const [PermissionList, setPermissionList] = useState({});

  useEffect(() => {
    axios.get('http://localhost:4343/api/RolesPermissions/RMFPermission?roleId=1')
      .then(response => {
        const fetchedSwitches = {};
        const fetchedPermissionList = response.data[0].Modules.map(module => ({
          teamName: module.ModuleName,
          permissions: module.Functions.map(func => ({
            id: func.FunctionId,
            label: func.FunctionName,
          })),
        }));
        
        fetchedPermissionList.forEach(team => {
          team.permissions.forEach(permission => {
            fetchedSwitches[`${permission.label}-${team.teamName}`] = false;
          });
        });
  
        setPermissionList(fetchedPermissionList); // Update the permissionList state
        setSwitches(fetchedSwitches);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
  

  const handleSwitchChange = (permission) => (event) => {
    const { checked } = event.target;
    setSwitches(prevSwitches => ({
      ...prevSwitches,
      [permission]: checked,
    }));
    
    // Handle logic for updating other switches if needed...
    // For example, if all switches for a team are checked, update the team switch
    const [funcName, teamName] = permission.split('-');
    const teamSwitches = permissionList.find(team => team.teamName === teamName).permissions;
    const allTeamSwitchesChecked = teamSwitches.every(p => switches[`${p.label}-${teamName}`]);
    if (allTeamSwitchesChecked) {
      setSwitches(prevSwitches => ({
        ...prevSwitches,
        [teamName]: true,
      }));
    } else {
      setSwitches(prevSwitches => ({
        ...prevSwitches,
        [teamName]: false,
      }));
    }
    
    // Update the "All" switch if all individual switches are checked
    const allSwitchesChecked = permissionList.every(team => 
      team.permissions.every(p => switches[`${p.label}-${team.teamName}`])
    );
    setAllSwitch(allSwitchesChecked);
  };

  const handleTeamSwitchChange = (teamName) => (event) => {
    const { checked } = event.target;
    setSwitches(prevSwitches => ({
      ...prevSwitches,
      [teamName]: checked,
    }));
    // Update all switches for the selected team
    permissionList.find(team => team.teamName === teamName).permissions.forEach(permission => {
      setSwitches(prevSwitches => ({
        ...prevSwitches,
        [`${permission.label}-${teamName}`]: checked,
      }));
    });
    
    // Update the "All" switch if all individual switches are checked
    const allSwitchesChecked = permissionList.every(team => 
      team.permissions.every(p => switches[`${p.label}-${team.teamName}`])
    );
    setAllSwitch(allSwitchesChecked);
  };

  // Replace with your actual permissionList
  const permissionList = [
    // ... Your permissionList content
  ];

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
              <Box>
              <Accordion>
  {permissionList.map(team => (
    <Box key={team.teamName}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <FormControlLabel
          className="mb-0"
          control={
            <Switch
              checked={switches[team.teamName] || false}
              onChange={handleTeamSwitchChange(team.teamName)}
            />
          }
          label={team.teamName}
        />
      </AccordionSummary>
      <AccordionDetails>
        <Box>
          {team.permissions.map(permission => (
            <FormControlLabel
              key={permission.id}
              className="p-2 m-2 border mt-2 mb-2"
              control={
                <Switch
                  checked={switches[`${permission.label}-${team.teamName}`] || false}
                  onChange={handleSwitchChange(`${permission.label}-${team.teamName}`)}
                />
              }
              label={permission.label}
            />
          ))}
        </Box>
      </AccordionDetails>
    </Box>
  ))}
</Accordion>

              </Box>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RolePermissionMaster;
<div className="row">
<Box>
  <div>
  {role.Modules.forEach(module =>  (
    <div key={module.ModuleId}>
      <h2>{module.ModuleName}</h2>
      
        {module.Functions.forEach(func => (
            <span key={func.FunctionId}>
                {func.FunctionName}
            </span>
          func.RMF.forEach(rmf => {
            <span key={rmf.RoleModuleFunctionId}>
                {rmf.IsApplicable}
            </span>
                });
              ))};
    </div>
    ))};
  </div>

  role.Modules.forEach(module => {
              console.log('Module ID:', module.ModuleId); // Log the module ID
              console.log('Module Name:', module.ModuleName); // Log the module name
  
              module.Functions.forEach(func => {
                console.log('Function ID:', func.FunctionId); // Log the function ID
  
                func.RMF.forEach(rmf => {
                  console.log('RoleModuleFunctionId:', rmf.RoleModuleFunctionId); // Log the RMF ID
                  console.log('IsApplicable:', rmf.IsApplicable); // Log the IsApplicable value
                });
              });
            });



              {/* <div>
                {rowData.map(role => (
                  <div key={role.RoleId}>
                    <h2>{role.RoleName}</h2>
                    {role.Modules.map(module => (
                      <div key={module.ModuleId}>
                        <h3>{module.ModuleName}</h3>
                        {module.Functions.map(func => (
                          <div key={func.FunctionId}>
                            <h4>{func.FunctionName}</h4>
                            {func.RMF.map(rmf => (
                              <div key={rmf.RoleModuleFunctionId}>
                                <span>IsApplicable: {rmf.IsApplicable.toString()}</span>
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                ))}
              </div> */}