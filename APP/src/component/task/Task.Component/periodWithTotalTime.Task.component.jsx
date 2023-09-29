import React, { useState, useRef , useEffect } from 'react';
import Popover from '@mui/material/Popover';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import Typography from '@mui/material/Typography';
import { addDays } from 'date-fns'; 

const PeriodWithTotalTimeComponent = ({ onPeriodstartDateChange , onPeriodendDateChange }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const datePickerRef = useRef(null);

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const handleDateRangeChange = (ranges) => {
    const selectedRange = ranges.selection;
    setStartDate(startDate);
    setEndDate(endDate);
    setState([selectedRange]);

    // Call the parent callback function with the updated data
    if (startDate) {
      onPeriodstartDateChange(startDate);
    }
    if (endDate) {
      onPeriodendDateChange(endDate);
    }
  };

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 0),
      key: 'selection',
    },
  ]);

  const [startDate, setStartDate] = useState(state[0].startDate); 
  const [endDate, setEndDate] = useState(state[0].endDate); 

  const formattedStartDate = startDate.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  const formattedEndDate = endDate.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  console.log('start' ,formattedStartDate, 'end' , formattedEndDate)





  useEffect(() => {
    if ({startDate , endDate}) {
      onPeriodstartDateChange(startDate);
      onPeriodendDateChange(endDate);
      console.log('PeriodstartDate' , startDate , 'PeriodendDate' , endDate);
    }
  }, [endDate, onPeriodendDateChange, onPeriodstartDateChange, startDate]);


  return (
    <div className='autoOuterLayer' ref={datePickerRef}>
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
        <DateRangePicker
          onChange={handleDateRangeChange}
          showSelectionPreview={true}
          moveRangeOnFirstSelection={false}
          months={2}
          ranges={state}
          direction="horizontal"
        />
      </Popover>
      <Typography variant="body1" onClick={handleAvatarClick}>
        {formattedStartDate} - {formattedEndDate}
      </Typography>
      <Typography variant="body2">
        PERIOD OF WORK
      </Typography>
    </div>
  );
};

export default PeriodWithTotalTimeComponent;
