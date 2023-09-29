import React, { useRef, useEffect, useState,  useCallback } from 'react';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useStageContext } from '../../contexts/StageContext';
import AssignToComponent from './Task.Component/assignTo.Task.component';
import CreatedByComponent from './Task.Component/createdBy.Task.component';
import PriorityComponent from './Task.Component/priority.Task.component';
import WatcherComponent from './Task.Component/watchers.Task.component';
import CreatedOnComponent from './Task.Component/createdOn.Task.component';
import ScheduleOnComponent from './Task.Component/scheduleOn.Task.component';
import PeriodWithTotalTimeComponent from './Task.Component/periodWithTotalTime.Task.component';
import TaskTotalTimeComponent from './Task.Component/taskTotalTime.Task.component';
import ActivityChatComponent from './Task.Component/activityChat.Task.component';
import DynamicFormComponent from './Task.Component/dynamicForm.Task.component';
import SubtaskViewComponent from './Task.Component/subTaskView.Task.component';
import SinglePointContactComponent from './Task.Component/singlePointContact.Task.component';
// import YourComponent from './Task.Component/show.component';

const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9;
  top: 0;
  left: 0;
`;

const ModalWrapper = styled.div`
  width: 98vw;
  height: 98vh;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  display: grid;
  grid-template-columns: 1fr;
  position: relative;
  z-index: 10;
  border-radius: 10px;
`;


const ModalContent = styled.div`
    margin-bottom: 1rem;
  }

`;

const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  width: 32px;
  height: 32px;
  padding: 0;
  color:#333;
`;



export const EditTaskModal = ({ showmodal, setShowModal }) => {
  const [showSecondModal, setShowSecondModal] = useState(false);
  const spaceID = localStorage.getItem('spaceID');
  const SubSpaceID = localStorage.getItem('SubSpaceID');
  const SpaceName = localStorage.getItem('SpaceName');
  const SubSpaceName = localStorage.getItem('SubSpaceName');
  const [anchorEl, setAnchorEl] = useState(null);
  const modalRef = useRef();
  const { stages } = useStageContext();
  const animation = useSpring({
    config: {
      duration: 250
    },
    opacity: showmodal ? 1 : 0,
    transform: showmodal ? `translateY(0%)` : `translateY(-100%)`
  });


  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const handleAssignToChange = (newValue) => {
    // Handle updated data from AssignToComponent
    console.log("Assign To Updated:", newValue);
  };

  const closeModal = e => {
    if (modalRef.current === e.target) {
      setShowModal(false);
      document.body.style.overflow = 'auto';
    }
  };

  const keyPress = useCallback(
    e => {
      if (e.key === 'Escape' && showmodal) {
        setShowModal(false);
        document.body.style.overflow = 'auto';
      }
    },
    [setShowModal, showmodal]
  );

  useEffect(
    () => {
      document.addEventListener('keydown', keyPress);
      return () => document.removeEventListener('keydown', keyPress);
    },
    [keyPress]
  );

  console.log(stages);
  return (
    <>
      {showmodal ? (
        <Background onClick={closeModal} ref={modalRef}>
          <animated.div style={animation}>
            <ModalWrapper showmodal={showmodal}>
              <ModalContent className='modalOuterLayer'>
                <div className='mainModalWrapper'>
                  <div className='modalwrapper rowoneWrapper modalwrapperonebgColor'>
                    <div className='modalHeaderTopWrapper ProjectBreadcum'>
                      <h4>{SpaceName} / {SubSpaceName} </h4>
                      <CloseModalButton
                        aria-label='Close modal'
                        onClick={() => {
                          setShowModal(prev => !prev);
                          document.body.style.overflow = 'auto'; 
                        }}
                      />
                    </div>
                  </div>
                  <div className='modalwrapper rowtwoWrapper modalwrappertwobgColor'>
                    <div className='modalHeadermiddleWrapper row m-0'>
                      <div className='modalHeadermiddleInnerWrapper taskTitleWrapper col-lg-2 col-12'>
                        <input type='text' className='form-control' placeholder='Enter Task Name'/>
                      </div>
                      <div className='modalHeadermiddleInnerWrapper taskStageList col-lg-10 col-12'>
                        <div className='taskStageListOuter'>
                          {/* eslint-disable jsx-a11y/anchor-is-valid */}
                          
                          {stages
                            .filter(staged => staged.isActive === true)
                            .map(staged => (
                              <a href='' type="button" key={staged.id} className="headerSingleStage completed">
                                <div className="singleStageArrow">
                                  <span>{staged.name}</span>
                                </div>
                              </a>
                            ))}
                          <a href='' type="button" className="headerSingleStage finsihStageStep">
                              <div className="singleStageArrow">
                                  <span><i className="fa fa-arrow-right"></i></span>
                              </div>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='modalwrapper rowthreeWrapper modalwrapperthreebgColor'>
                    <div className='modalHeaderbottomWrapper row m-0'>
                      <div className='modalHeaderbottomleftWrapper col-lg-3 col-md-3 col-sm-5 col-12'>
                        <div className='modalHeaderbottomleftinnerWrapper AvatarProfile'>
                          <AssignToComponent  onAssignToChange={handleAssignToChange}/>
                        </div>
                        <div className='modalHeaderbottomleftinnerWrapper AvatarProfile'>
                          <PriorityComponent/>
                        </div>
                        <div className='modalHeaderbottomleftinnerWrapper AvatarProfile'>
                          <CreatedByComponent/>
                        </div>
                      </div>
                      <div className='modalHeaderbottommiddleWrapper col-lg-7 col-md-7 col-sm-7 col col-12'>
                        <div className='modalHeaderbottommiddleinnerWrapper taskDateviewType'>
                          <CreatedOnComponent/>
                        </div>
                        <div className='modalHeaderbottommiddleinnerWrapper taskDateviewType'>
                          <ScheduleOnComponent/>
                        </div>
                        <div className='modalHeaderbottommiddleinnerWrapper taskDateviewType'>
                         <PeriodWithTotalTimeComponent/>
                        </div>
                        <div className='modalHeaderbottommiddleinnerWrapper taskDateviewType'>
                          <TaskTotalTimeComponent/>
                        </div>
                        <div className='modalHeaderbottommiddleinnerWrapper taskDateviewType'>
                          <SinglePointContactComponent/>
                        </div>
                      </div>
                      <div className='modalHeaderbottomrightWrapper  col-lg-2 col-md-2 col-sm-12 col-12'>
                        <div className='modalHeaderbottomrightinnerWrapper taskwatcherAvatar d-flex justify-content-between align-items-center'>
                            <WatcherComponent/>
                            <Box className="d-flex justify-content-center align-items-center flex-column">
                                <Avatar  style={{backgroundColor:"#1976d2"}}
                                    onClick={handleAvatarClick}
                                    alt="Avatar"
                                    aria-label="User Avatar"
                                    > 
                                    <i className="fa-solid fa-comments"  style={{color:'#ffffff'}}></i>
                                </Avatar>
                                <Popover
                                    open={Boolean(anchorEl)}
                                    anchorEl={anchorEl}
                                    onClose={handleClosePopover}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}
                                    className='myactivitypopover'
                                    >
                                    <ActivityChatComponent/>
                                </Popover>
                                <Typography variant="body1">
                                    Activity Block
                                </Typography>
                            </Box>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='modalwrapper rowfourWrapper modalwrapperfourbgColor'>
                    <div className='row m-0 p-o'>
                      <div className='modalBodyLeftOuter col-lg-6 col-12'>
                        <DynamicFormComponent/>
                      </div>
                      <div className='modalBodyMiddleOuter col-lg-6 col-12'>
                          <SubtaskViewComponent
                            showmodal={showSecondModal}
                            setShowModal={setShowSecondModal}
                          />
                      </div>
                    </div>
                  </div>
                </div>
              </ModalContent>
            </ModalWrapper>
          </animated.div>
        </Background>
      ) : null}
    </>
  );
};