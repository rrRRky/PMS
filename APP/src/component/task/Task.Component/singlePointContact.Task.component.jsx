import React, { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { useUserContext } from '../../../contexts/UserContext';

const SinglePointContactComponent = ({onSelectSPOC, initialValue}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOption, setSelectedOption] = useState(initialValue);
  const { Users } = useUserContext();

  console.log('selected SPOC to in edit task',selectedOption , initialValue);

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const handleOptionSelect = (_, newValueSPOC) => {
    if (!newValueSPOC) {
      // Show alert or perform any other action to notify the user
      alert('Please select a valid option.');
      return; // Stop further processing
    }
    setSelectedOption(newValueSPOC);
    setAnchorEl(null); // Close the popover
    if (onSelectSPOC) {
      onSelectSPOC(newValueSPOC.id);
    }
  };

     // Filter options based on the id
     const filteredOptions = Users.filter(AssignTo => AssignTo.id === Number(initialValue));

     console.log('selected SPOC to in edit tasks',filteredOptions[0]?.name , filteredOptions[0]?.userImagePath);

  return (
    <div className='autoOuterLayer'>
    {initialValue ? (
      // Show details if initialValue is present
      <>
      <Avatar
        onClick={handleAvatarClick}
        alt="Avatar"
        title={selectedOption?.name || filteredOptions[0]?.name || 'SPOC'}
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
        <Autocomplete
          id="country-select-demo"
          options={Users}
          sx={{ width: 300 }}
          getOptionLabel={(user) => (user ? user.name || filteredOptions[0]?.name : '')}
          isOptionEqualToValue={(Useroption, value) => Useroption.EmpCode === value.EmpCode} 
          onChange={handleOptionSelect}
          value={selectedOption}
          renderOption={(props, Useroption) => (
            <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
              <img
                loading="lazy"
                width="20"
                src={`https://app.jayanita.com/HRMSApp/image/UserPictures/${Useroption.EmpCode}.jpg`}
                srcSet={`https://app.jayanita.com/HRMSApp/image/UserPictures/${Useroption.EmpCode}.jpg 2x`}
                alt=""
              />
              {Useroption.label} {Useroption.name}
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
        SPOC
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
          getOptionLabel={(Useroption) => Useroption.name}
          isOptionEqualToValue={(Useroption, value) => Useroption.EmpCode === value.EmpCode} 
          onChange={handleOptionSelect}
          value={selectedOption}
          renderOption={(props, Useroption) => (
            <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
              <img
                loading="lazy"
                width="20"
                src={`https://app.jayanita.com/HRMSApp/image/UserPictures/${Useroption.EmpCode}.jpg`}
                srcSet={`https://app.jayanita.com/HRMSApp/image/UserPictures/${Useroption.EmpCode}.jpg 2x`}
                alt=""
              />
              {Useroption.label} {Useroption.name}
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
        SPOC
      </Typography>
      </>
    )}
      
    </div>
  );
};

export default SinglePointContactComponent;
