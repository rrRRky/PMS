import React, { useState } from 'react';
import AddRoleType from './add_role_type.component';
import Button from '@mui/material/Button';

const RoleSideDrawer = () => {
  const [showSideDrawer, setShowSideDrawer] = useState(false);

  const toggleSideDrawer = () => {
    setShowSideDrawer(!showSideDrawer);
  };

  return (
    <div>
      {!showSideDrawer && (
        <Button variant="contained" onClick={toggleSideDrawer}>Add</Button>
      )}
      {showSideDrawer && (
        <div>
          <Button variant="contained" onClick={toggleSideDrawer}>Close</Button>
          <AddRoleType />
        </div>
      )}
    </div>
  );
};

export default RoleSideDrawer;
