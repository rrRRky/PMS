import React, { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import { usePriorityContext } from '../../../contexts/LookupPriorityContext';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

const PriorityComponent = ({ onSelectPriority, initialValue }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { LookupPriority } = usePriorityContext();
  const defaultOption = LookupPriority[2];
  // for edit priority 
  const [selectedOption, setSelectedOption] = useState(
    initialValue ? LookupPriority.find(option => option.id === initialValue) : defaultOption 
  );
  // for new priority 
  const [startselectedOption, setstartSelectedOption] = useState(defaultOption);
  console.log('selected Priority in edit task', selectedOption, initialValue);

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    console.log('initialValue on mount:', initialValue);
    if (initialValue) {
      // If initialValue is present, find the corresponding option
      const initialOption = LookupPriority.find((option) => option.id === initialValue);
      setSelectedOption(initialOption || defaultOption);
      if (onSelectPriority) {
        onSelectPriority(initialOption || defaultOption);
      }
    } else {
      setSelectedOption(defaultOption);
      if (onSelectPriority) {
        onSelectPriority(defaultOption);
      }
    }
  }, [onSelectPriority, defaultOption, initialValue, LookupPriority]);
  
  const handleOptionSelect = (_, newValuePriority) => {
    setstartSelectedOption(newValuePriority);
    setAnchorEl(null);
    if (onSelectPriority) {
      onSelectPriority(newValuePriority);
    }
    console.log('newValuePriority' ,  newValuePriority , 'selectedOption' ,  selectedOption);
  };

  // Filter options based on the id
  const filteredOptions = LookupPriority.filter((PriorityTo) => PriorityTo.id === Number(initialValue));

  return (
    <div className="autoOuterLayer">
      {initialValue ? (
        // Show details if initialValue is present
        <>
          <Avatar
            onClick={handleAvatarClick}
            alt="Priority"
            title={selectedOption?.name || filteredOptions[0]?.name || 'Priority'}
            aria-label="User Avatar"
            className={selectedOption?.code || filteredOptions[0]?.code || 'name'}
          >
            <i className="fa-solid fa-flag" style={{ color: '#ffffff' }}></i>
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
            {/* Autocomplete details */}
            <Autocomplete
              id="country-select-demo"
              options={LookupPriority}
              sx={{ width: 300 }}
              getOptionLabel={(LookupPriorityList) => LookupPriorityList.name}
              onChange={handleOptionSelect}
              value={selectedOption}
              getOptionSelected={(option, value) => option.id === value.id}
              renderOption={(props, LookupPriorityList) => (
                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                  <i className="fa-solid fa-flag me-2"></i>
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
          <Typography variant="body2">PRIOITY</Typography>
        </>
      ) : (
        // Show empty state if initialValue is not present
        <>
          <Avatar
            onClick={handleAvatarClick}
            alt="Priority"
            title={startselectedOption ? startselectedOption.name : 'Priority'}
            aria-label="User Avatar"
            className={startselectedOption ? startselectedOption.code : 'name'}
          >
            <i className="fa-solid fa-flag" style={{ color: '#ffffff' }}></i>
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
            {/* Autocomplete details */}
            <Autocomplete
              id="country-select-demo"
              options={LookupPriority}
              sx={{ width: 300 }}
              getOptionLabel={(LookupPriorityList) => LookupPriorityList.name}
              onChange={handleOptionSelect}
              value={startselectedOption}
              getOptionSelected={(option, value) => option.id === value.id}
              renderOption={(props, LookupPriorityList) => (
                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                  <i className="fa-solid fa-flag me-2"></i>
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
          <Typography variant="body2">PRIOITY</Typography>
        </>
      )}
    </div>
  );
};

export default PriorityComponent;
