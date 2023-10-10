import React, { useState, useRef , useEffect} from 'react';
import Typography from '@mui/material/Typography';
import Popover from '@mui/material/Popover';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ScheduleOnComponent = ({onSelectSechudule , initialValue}) => {
  console.log('before start ' ,onSelectSechudule,  initialValue);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isDatePickerOpen, setDatePickerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(initialValue  ? new Date(initialValue) : new Date()); // Initialize with a default value
  const datePickerRef = useRef(null);
  console.log('initialValue initialValue initialValue' , initialValue);
  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
    setDatePickerOpen(!isDatePickerOpen);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const formattedDate = selectedDate.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  const handleDateChange = (formattedDate) => {
    setSelectedDate(formattedDate);
    setDatePickerOpen(false);
    setAnchorEl(null);
    if (onSelectSechudule) {
      onSelectSechudule(formattedDate);
    }
  };

  useEffect(() => {
    // Set the initial value when the component mounts or when initialValue changes
    setSelectedDate(initialValue ? new Date(initialValue) : new Date());
  }, [initialValue]);

  useEffect(() => {
    if (onSelectSechudule) {
      onSelectSechudule(formattedDate);
      console.log('onSelectSechudule' , formattedDate);
    }
  }, [formattedDate, onSelectSechudule]);



  return (
    <div className='autoOuterLayer absolutecalender' ref={datePickerRef}>
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
        {isDatePickerOpen && <DatePicker selected={selectedDate} onChange={handleDateChange} inline />}
      </Popover>
      <Typography variant="body1" onClick={handleAvatarClick}>
        <span>{formattedDate}</span>
      </Typography>
      <Typography variant="body2">SCHEDULE ON</Typography>
    </div>
  );
};

export default ScheduleOnComponent;
