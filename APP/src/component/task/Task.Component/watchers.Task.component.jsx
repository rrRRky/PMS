import React, { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { useUserContext } from '../../../contexts/UserContext';

const WatcherComponent = ({onSelectWatchers}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]); // Use an array to store selected options
    const { Users } = useUserContext();


  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const handleOptionSelect = (_, newValues) => {
    setSelectedOptions(newValues); // Update the selected options
    console.log([newValues]);

    // Extract id and name from each selected option
    const selectedValues = newValues.map((option) => ({
      id: option.id,
      name: option.name,
    }));

     // Create a comma-separated string of id and name pairs
     const commaSeparatedValues = selectedValues
     .map((value) => `${value.name}`)
     .join(', ');

   console.log(commaSeparatedValues);


    setAnchorEl(null); // Close the popover
    if (onSelectWatchers) {
      onSelectWatchers(commaSeparatedValues);
    }
  };

  
  return (
    <div className='autoOuterLayermultiselect'>
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
    </div>
  );
};

export default WatcherComponent;


  