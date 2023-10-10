import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Popover from '@mui/material/Popover';
import 'react-datepicker/dist/react-datepicker.css';

const EditTaskTotalTimeComponent = ({onSelecthour , onSelectmin, initialHourValue, initialMinValue }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [hours, setHours] = useState(initialHourValue);
  const [minutes, setMinutes] = useState(initialMinValue);

  console.log('my total time ' ,  initialHourValue  ,  initialMinValue );

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const handleHoursChange = (event) => {
    const newHours = parseInt(event.target.value) || initialHourValue;
    setHours(newHours);
    if (onSelecthour) {
      onSelecthour(newHours);
    }
  };

  const handleMinutesChange = (event) => {
    let newMinutes = parseInt(event.target.value) || initialMinValue;
    
    // Ensure minutes are not more than 59
    if (newMinutes > 59) {
      newMinutes = 59;
    }

    setMinutes(newMinutes);
    if (onSelectmin) {
      onSelectmin(newMinutes);
    }
  };
  useEffect(() => {
    console.log('initialHourValue:', initialHourValue);
    console.log('initialMinValue:', initialMinValue);
    onSelecthour(hours);
    onSelectmin(minutes);
  }, [hours, initialHourValue, initialMinValue, minutes, onSelecthour, onSelectmin]);

  const formattedTime = `${String(hours).padStart(2, '0')} Hr:${String(minutes).padStart(2, '0')} Mins`;

  console.log('my total time ' ,  initialHourValue  ,  initialMinValue , formattedTime );
  return (
    <div className='autoOuterLayer'>
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
        <div style={{ padding: '16px' }}>
            <div className='form-group'>
                <div className='row'>
                    <div className='col-12'>
                        <h4 className='fw-bold'>Enter Total Time</h4>
                    </div>
                    <div className='col-lg-6 col-12'>
                        <div className='mb-2'>
                            <label className='form-label'>Enter Hours</label>
                            <input type="number" className='form-control' value={hours} onChange={handleHoursChange} />
                        </div>
                    </div>
                    <div className='col-lg-6 col-12'>
                        <div className='mb-2'>
                            <label className='form-label'>Enter Minutes</label>
                            <input type="number" className='form-control' value={minutes}  onChange={handleMinutesChange} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </Popover>
      <Typography variant="body1" onClick={handleAvatarClick} >
        {formattedTime}
      </Typography>
      <Typography variant="body2">
          TOTAL TIME
      </Typography>
    </div>
  );
};

export default EditTaskTotalTimeComponent;
