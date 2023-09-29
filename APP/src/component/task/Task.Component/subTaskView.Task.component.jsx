import React, { useState } from 'react';
import { SubModal } from './subTaskModelView.Task.component';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';


export default function SubtaskViewComponent() {
  const [subtaskshowsecmodal, setShowSecModal] = useState(false);

  const openSecModal = () => {
    setShowSecModal(subtaskshowsecmodal=>!subtaskshowsecmodal);
    document.body.style.overflow = 'hidden';
  };

  return (
        <div>
          <Button className='subTaskOpenButton' variant="contained" onClick={openSecModal}> 
            <i className='fa fa-plus'></i> 
          </Button>
          <Box className="">
            <SubModal subtaskshowsecmodal={subtaskshowsecmodal} setShowSecModal={setShowSecModal} />
          </Box>
            </div>
  );
}
