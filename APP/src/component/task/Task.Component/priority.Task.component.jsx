import React, { useState , useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import { usePriorityContext } from '../../../contexts/LookupPriorityContext';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

const PriorityComponent = ({onSelectPriority}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const { LookupPriority } = usePriorityContext();
  const defaultOption = LookupPriority[2];

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const handleOptionSelect = (_, newValuePriority) => {
    setSelectedOption(newValuePriority);
    console.log(newValuePriority);
    setAnchorEl(null); // Close the popover
    if (onSelectPriority) {
      onSelectPriority(newValuePriority);
    }
  };

  useEffect(() => {
    setSelectedOption(defaultOption); // Set the default option on mount
    if (onSelectPriority) {
      onSelectPriority(defaultOption); // Send the default option's id
    }
  }, [onSelectPriority, defaultOption]);

  return (
    <div className='autoOuterLayer'>
        <Avatar
        onClick={handleAvatarClick}
        alt="Priority"
        title={selectedOption ? selectedOption.name : 'Priority'}
        aria-label="User Avatar"
        className={selectedOption ? selectedOption.code : 'name'}
        >
        <i className="fa-solid fa-flag" style={{color:'#ffffff'}}></i>
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
          id="country-select-demo"
          options={LookupPriority}
          sx={{ width: 300 }}
          getOptionLabel={(LookupPriorityList) => LookupPriorityList.name}
          onChange={handleOptionSelect}
          value={selectedOption}
          getoptionselected={(option, value) => option.id === value.id}
          renderOption={(props, LookupPriorityList) => (
            <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                <i className="fa-solid fa-flag me-2" ></i>
                {LookupPriorityList.label} {LookupPriorityList.name}
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Set Priority"
              inputProps={{
                ...params.inputProps,
                autoComplete: 'new-password', 
              }}
            />
          )}
        />
      </Popover>
      <Typography variant="body2">
        PRIOITY
      </Typography>
      
    </div>
  );
};

export default PriorityComponent;
