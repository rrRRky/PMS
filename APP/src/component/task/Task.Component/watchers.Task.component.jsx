import React, { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { useUserContext } from '../../../contexts/UserContext';

const WatcherComponent = ({onSelectWatchers , initialValue}) => {
  console.log('initialValue watchers' , initialValue)
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState(initialValue ? [initialValue] : []); // Use an array to store selected options
    const { Users } = useUserContext();

    console.log('selected watchers to in edit task',selectedOptions , initialValue);

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const handleOptionSelect = (_, newValues) => {
    if (!newValues || newValues.length === 0) {
      // Show alert or perform any other action to notify the user
      alert('Please select at least one valid option.');
      return; // Stop further processing
    }
  
    // Update the selected options
    setSelectedOptions(newValues);
  
    // Create a comma-separated string of id and name pairs
    const commaSeparatedValues = newValues
      .map((value) => `${value.name}`)
      .join(', ');
  
    setAnchorEl(null); // Close the popover
    if (onSelectWatchers) {
      onSelectWatchers(commaSeparatedValues);
    }
  };


  let filteredOptions = [];

// Check if initialValue is defined and has at least one element
if (initialValue && initialValue.length > 0) {
  const namesString = initialValue[0];
  console.log('Names string:', namesString); // Log the namesString
  // Split the string
  const userIds = namesString.split(', ').map(userId => userId.toLowerCase());

  console.log('Selected userIds:', userIds);
  // Filter Users based on userIds
  filteredOptions = Users.filter(user => {
    const lowerCaseUserId = user.name.toLowerCase();
    const isIncluded = userIds.some(id => id === lowerCaseUserId);
    console.log(`User ${user.name} - Match: ${isIncluded}`);
    return isIncluded;
});

  // Output the result
  console.log('Selected users in edit tasks:', filteredOptions);

  console.log('Selected users:', Users, userIds);
} else {
  console.error('initialValue is undefined or empty.');
}



  return (
    <div className='autoOuterLayermultiselect'>
      {initialValue ? (
      // Show details if initialValue is present
      <>
      <div className="selectedAvatars">
        {filteredOptions.map((Useroption) => (
          <Avatar
            key={Useroption.id}
            alt={Useroption.EmpCode}
            src={Useroption.userImagePath}
            aria-label="User Avatar"
            id={`${Useroption.id}${Useroption.name}`}
          />
        ))}
      </div>
      <div className='optionalChooseAvatar'>
      <Avatar
        onClick={handleAvatarClick}
        alt="Watcher"
        aria-label="User Avatar"
        >
        <i className="fa-solid fa-eye" style={{color:'#ffffff'}}></i>
        </Avatar>
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
          multiple
          id="multiple-limit-tags"
          options={Users}
          value={filteredOptions} 
          sx={{ width: 300 }}
          getOptionLabel={(Useroption) => Useroption.name}
          isOptionEqualToValue={(Useroption, value) => Useroption.EmpCode === value.EmpCode} 
          onChange={handleOptionSelect}
          renderOption={(props, Useroption) => (
            <Box component="li" key={Useroption.id} sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
              <img
                loading="lazy"
                width="20"
                src={Useroption.userImagePath}
                alt={Useroption.name}
              />
              {Useroption.name}
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Watcher"
              inputProps={{
                ...params.inputProps,
                autoComplete: 'new-password',
              }}
            />
          )}
        />
      </Popover>
      <Typography variant="body2">
        WATCHERS
      </Typography>
      </div>
      </>
    ) : (
      // Show empty state if initialValue is not present
      <>
      <div className="selectedAvatars">
        {selectedOptions.map((Useroption) => (
          <Avatar
            key={Useroption.id}
            alt={Useroption.EmpCode}
            src={Useroption.userImagePath}
            aria-label="User Avatar"
            id={`${Useroption.id}${Useroption.name}`}
          />
        ))}
      </div>
      <div className='optionalChooseAvatar'>
      <Avatar
        onClick={handleAvatarClick}
        alt="Watcher"
        aria-label="User Avatar"
        >
        <i className="fa-solid fa-eye" style={{color:'#ffffff'}}></i>
        </Avatar>
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
          multiple
          id="multiple-limit-tags"
          options={Users}
          value={selectedOptions} 
          sx={{ width: 300 }}
          getOptionLabel={(Useroption) => Useroption.name}
          isOptionEqualToValue={(Useroption, value) => Useroption.EmpCode === value.EmpCode} 
          onChange={handleOptionSelect}
          renderOption={(props, Useroption) => (
            <Box component="li" key={Useroption.id} sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
              <img
                loading="lazy"
                width="20"
                src={Useroption.userImagePath}
                alt={Useroption.name}
              />
              {Useroption.name}
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Watcher"
              inputProps={{
                ...params.inputProps,
                autoComplete: 'new-password',
              }}
            />
          )}
        />
      </Popover>
      <Typography variant="body2">
        WATCHERS
      </Typography>
      </div>

      </>
    )}
    </div>
  );
};

export default WatcherComponent;


  