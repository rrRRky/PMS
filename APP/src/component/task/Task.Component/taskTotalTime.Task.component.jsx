import React, { useState , useEffect} from 'react';
import Typography from '@mui/material/Typography';
// import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import 'react-datepicker/dist/react-datepicker.css';

const TaskTotalTimeComponent = ({onSelecthour , onSelectmin}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [hours, setHours] = useState(2);
  const [minutes, setMinutes] = useState(30);

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const handleHoursChange = (event) => {
    const newHours = parseInt(event.target.value) || 0;
    setHours(newHours);
    if (onSelecthour) {
      onSelecthour(newHours);
    }
  };

  const handleMinutesChange = (event) => {
    let newMinutes = parseInt(event.target.value) || 0;
    
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
    onSelecthour(hours);
    onSelectmin(minutes);
  }, [hours, minutes, onSelecthour, onSelectmin]);

  const formattedTime = `${String(hours).padStart(2, '0')} Hr:${String(minutes).padStart(2, '0')} Mins`;

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

export default TaskTotalTimeComponent;
