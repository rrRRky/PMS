import React, { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { useUserContext } from '../../../contexts/UserContext';

const AssignToComponent = ({ onAssignToChange , initialValue }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOption, setSelectedOption] = useState(initialValue);
  const { Users } = useUserContext();
  console.log('selected assign to in edit task',selectedOption , initialValue);

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const handleOptionSelect = (_, newValue) => {
    if (!newValue) {
      // Show alert or perform any other action to notify the user
      alert('Please select a valid option.');
      return; // Stop further processing
    }
  
    setSelectedOption(newValue);
    setAnchorEl(null);
  
    if (onAssignToChange) {
      onAssignToChange(newValue.id);
    }
  };
   // Filter options based on the id
   const filteredOptions = Users.filter(AssignTo => AssignTo.id === Number(initialValue));

  console.log('selected assign to in edit tasks',filteredOptions[0]?.name , filteredOptions[0]?.userImagePath);
  return (
    <div className="autoOuterLayer">
    {initialValue ? (
      // Show details if initialValue is present
      <>
        <Avatar
          onClick={handleAvatarClick}
          alt="Avatar"
          title={selectedOption?.name || filteredOptions[0]?.name || 'Assign To'}
          src={selectedOption?.userImagePath || filteredOptions[0]?.userImagePath || '../../../assets/images/rakesh.jpg'}
          aria-label="User Avatar"
        />
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handleClosePopover}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          {/* Autocomplete details */}
          <Autocomplete
            id="country-select-demo"
            options={Users}
            sx={{ width: 300 }}
            getOptionLabel={(user) => (user ? user.name || filteredOptions[0]?.name : '')}
            isOptionEqualToValue={(user, value) => user.id === value.id}
            onChange={handleOptionSelect}
            value={selectedOption}
            renderOption={(props, user) => (
              <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                <img
                  loading="lazy"
                  width="20"
                  src={`https://app.jayanita.com/HRMSApp/image/UserPictures/${user.EmpCode}.jpg`}
                  srcSet={`https://app.jayanita.com/HRMSApp/image/UserPictures/${user.EmpCode}.jpg 2x`}
                  alt=""
                />
                {user.label} {user.name}
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Assign To"
                inputProps={{
                  ...params.inputProps,
                  autoComplete: 'new-password',
                }}
              />
            )}
          />
        </Popover>
      <Typography variant="body2">
        OWNER
      </Typography>
      </>
    ) : (
      // Show empty state if initialValue is not present
      <>
      <Avatar
        onClick={handleAvatarClick}
        alt="Avatar"
        title={selectedOption ? selectedOption.name : 'Assign To'}
        src={selectedOption ? selectedOption.userImagePath : '../../../assets/images/rakesh.jpg'}
        aria-label="User Avatar"
      />
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Autocomplete
          id="country-select-demo"
          options={Users}
          sx={{ width: 300 }}
          getOptionLabel={(user) => user.name}
          isOptionEqualToValue={(user, value) => user.id === value.id}
          onChange={handleOptionSelect}
          value={selectedOption}
          renderOption={(props, user) => (
            <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
              <img
                loading="lazy"
                width="20"
                src={`https://app.jayanita.com/HRMSApp/image/UserPictures/${user.EmpCode}.jpg`}
                srcSet={`https://app.jayanita.com/HRMSApp/image/UserPictures/${user.EmpCode}.jpg 2x`}
                alt=""
              />
              {user.label} {user.name}
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Assign To"
              inputProps={{
                ...params.inputProps,
                autoComplete: 'new-password',
              }}
            />
          )}
        />
      </Popover>
      <Typography variant="body2">
        OWNER
      </Typography>
      </>
    )}
  </div>
  );
};

export default AssignToComponent;
