import React, { useRef, useEffect, useState,  useCallback } from 'react';
import { useSpring, animated } from 'react-spring';
import { useParams , useNavigate  } from 'react-router-dom';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import Box from '@mui/material/Box';
import API_URL from '../../config';
import Typography from '@mui/material/Typography';
import { useStageContext } from '../../contexts/StageContext';
import AssignToComponent from './Task.Component/assignTo.Task.component';
import CreatedByComponent from './Task.Component/createdBy.Task.component';
import PriorityComponent from './Task.Component/priority.Task.component';
import WatcherComponent from './Task.Component/watchers.Task.component';
import CreatedOnComponent from './Task.Component/createdOn.Task.component';
import ScheduleOnComponent from './Task.Component/scheduleOn.Task.component';
import PeriodWithTotalTimeComponent from './Task.Component/periodWithTotalTime.Task.component';
import EditTaskTotalTimeComponent from './Task.Component/EdittaskTotalTime.Task.component';
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



export const EditTaskModal = ({ showmodal, setShowModal, updateGridData, TaskRowID , handleOpenModal}) => {

  const [TVData, setTVData] = useState({
    id:'',
    name: '',
    spaceListId: '',
    stageId: '',
    assignTo: '',
    priorityId: '',
    startDate: '',
    endDate: '',
    scheduleTime: '',
    totalMints: '',
    watchers: '',
    spoc: '',
    createdBy: '',
    createdOn: '',
    isActive: false, 
  });
  const [TaskHeaderData, setTaskHeaderData] = useState(null);
  const [showSecondModal, setShowSecondModal] = useState(false);
  const spaceID = localStorage.getItem('spaceID');
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [mytaskId, setMyTaskId] = useState(null);
  const SubSpaceID = localStorage.getItem('SubSpaceID');
  const SpaceName = localStorage.getItem('SpaceName');
  const SubSpaceName = localStorage.getItem('SubSpaceName');
  const [anchorEl, setAnchorEl] = useState(null);
  const modalRef = useRef();
  const navigate = useNavigate();
  const { stages } = useStageContext();
  const animation = useSpring({
    config: {
      duration: 250
    },
    opacity: showmodal ? 1 : 0,
    transform: showmodal ? `translateY(0%)` : `translateY(-100%)`
  });


    // Define a state to track whether all data is ready
    const [isDataReady, setIsDataReady] = useState(false);


 

  const currentStage = stages?.[0]; // If stages is undefined, currentStage will be undefined
  console.log('currentStage', currentStage);

  // Check if currentStage is defined before accessing its properties
  const stageId = currentStage?.id;
  const stageRank = currentStage?.inOrder;
  console.log('Stage ID:', stageId);

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const ActiveStage = stages?.find(staged => staged.inOrder === stageRank); // Find the active stage
  console.log('Find the active stage:', ActiveStage);
  const ActiveStageId = ActiveStage?.inOrder;
  console.log('Active Stage ID:', ActiveStageId);

  const handleClosePopover = () => {
    setAnchorEl(null);
  };



  const [TaskName, setTaskName] = useState('');
  const [assignToData, setAssignToData] = useState(null);
  const [priorityData, setPriorityData] = useState(null);
  const [createdByData, setCreatedByData] = useState(null);
  const [createdOnData, setCreatedOnData] = useState(null);
  const [scheduleOnData, setScheduleOnData] = useState(null);
  const [singlePointContactData, setSinglePointContactData] = useState(null);
  const [periodstartDateData, setPeriodstartDateData] = useState(null);
  const [periodendDateData, setPeriodendDateData] = useState(null);
  const [taskTotalHourTimeData, setTaskTotalHourTimeData] = useState(null);
  const [taskTotalMinTimeData, setTaskTotalMinTimeData] = useState(null);
  const [watchersData, setWatchersData] = useState(null);

// console.log(periodData.startDate ,periodData.endDate );
  // const handleAssignToChange = (newValue) => {
  //   console.log('Assign To Updated:', newValue);
  //   setAssignToData(newValue);
  // };

  const handleTaskNameChange = (event) => {
    setTaskName(event.target.value);
  };

  const handleAssignToChange = (newValue) => {
    // Handle updated data from AssignToComponent
    console.log("Assign To Updated:", newValue.id , newValue.name);
    setAssignToData(newValue);
  };

  const handlePeriodstartDateChange = (startDate) => {
    console.log(startDate);
    const formattedStartDate = startDate.toISOString();
    setPeriodstartDateData(formattedStartDate);
    console.log(periodstartDateData);
  };

  const handlePeriodendDateChange = (endDate) => {
    console.log(endDate);
    const formattedEndDate = endDate.toISOString();
    setPeriodendDateData(formattedEndDate);
    console.log(periodendDateData);
  };

  const handlePriorityChange = (newValuePriority) => {
    // Handle updated data from PriorityComponent
    console.log('Priority Updated:', newValuePriority.id);
    setPriorityData(newValuePriority.id);
  };

  const handleCreatedByChange = (userId) => {
    // Handle updated data from CreatedByComponent
    console.log('Created By Updated:', userId);
    setCreatedByData(userId);
  };

  const handleCreatedOnChange = (formattedDate) => {
    // Handle updated data from CreatedOnComponent
    console.log('Created On Updated:', formattedDate);
    setCreatedOnData(formattedDate);
  };

  const handleScheduleOnChange = (scheduleOnData) => {
    // Handle updated data from ScheduleOnComponent
    console.log('Schedule On Updated:', scheduleOnData);
    setScheduleOnData(scheduleOnData);
  };

  const handleSinglePointContactChange = (newValueSPOC) => {
    console.log('single point of contact:', newValueSPOC);
    // Perform further actions with startDate and endDate here.
    setSinglePointContactData(newValueSPOC);
  };

  const handleTaskTotalTimeHourChange = (newHours) => {
    // Handle updated data from TaskTotalTimeComponent
    console.log('Task Total Time Updated:', newHours);
    setTaskTotalHourTimeData(newHours);
  };
  const handleTaskTotalTimeMinChange = (newMinutes) => {
    // Handle updated data from TaskTotalTimeComponent
    console.log('Task Total Time Updated:', newMinutes);
    setTaskTotalMinTimeData(newMinutes);
  };

  const handleWatchersChange = (commaSeparatedValues) => {
    // Handle updated data from WatcherComponent
    console.log('Watchers Updated:', commaSeparatedValues);
    setWatchersData(commaSeparatedValues);
  };


  const closeModal = e => {
    if (modalRef.current === e.target) {
      setShowModal(false);
      document.body.style.overflow = 'auto';
    }
    // Refresh AG-Grid in TaskViewComponent
    updateGridData();
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


  useEffect(() => {
    const storedUserData = localStorage.getItem('userSession');
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      const userToken = userData.token;
      console.log('Fetching task details for TaskRowID:', TaskRowID);

      const fetchTaskHeaderDataDetails = async () => {
        try {
          const response = await fetch(`${API_URL}PrjktTask`, {
            headers: {
              Authorization: userToken,
            },
          });
          console.log('fetch task detail for edit ',`${API_URL}PrjktTask`);
          console.log('fetch task details:', response);
          if (!response.ok) {
            throw new Error('Failed to fetch control details');
          }
    
          const responseData = await response.json();
          console.log('fetch task details:', responseData);
    
          if (!responseData || responseData.length === 0) {
            console.error('No task data found for the given ID');
            return;
          }
    
          const TaskHeaderData = responseData.find(TaskHeaderData => TaskHeaderData.id === parseInt(TaskRowID, 10));
          console.log('TaskHeaderData task data for edit :', TaskHeaderData);
    
          setTaskName(TaskHeaderData.taskName);
          setAssignToData(TaskHeaderData.AssignTo);
          setPriorityData(TaskHeaderData.PriorityId);
          setCreatedByData(TaskHeaderData.createdBy);
          setCreatedOnData(TaskHeaderData.createdOn);
          setScheduleOnData(TaskHeaderData.scheduleTime);
          setSinglePointContactData(TaskHeaderData.SPOC);
          setPeriodstartDateData(TaskHeaderData.StartDate);
          setPeriodendDateData(TaskHeaderData.EndDate);
          setTaskTotalHourTimeData(TaskHeaderData.name);
          setTaskTotalMinTimeData(TaskHeaderData.name);
          setWatchersData(TaskHeaderData.Watchers);
          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching control details:', error);
        }
      };

      fetchTaskHeaderDataDetails();
    }
  }, [TaskRowID]);



  console.log('TaskRowID ...........................' , TaskRowID)


console.log('my all data response here will show','    ',[TaskRowID, TaskName, assignToData, priorityData, periodstartDateData, 
  periodendDateData, scheduleOnData, watchersData, singlePointContactData, 
  createdByData, createdOnData, stageId, updateGridData, SubSpaceID, 
  taskTotalHourTimeData, taskTotalMinTimeData]);


  useEffect(
    () => {
      document.addEventListener('keydown', keyPress);
      return () => document.removeEventListener('keydown', keyPress);
    },
    [keyPress]
  );

  useEffect(() => {
    const saveData = async () => {
      try {
        // Your existing data preparation logic
        const storedUserData = localStorage.getItem('userSession');
        const userData = JSON.parse(storedUserData);
        const userToken = userData.token;

        console.log('fetch task detail for edit ',TaskRowID);
        const payloadCatID = {
          id: TaskRowID,
          name: TaskName,
          spaceListId: SubSpaceID,
          stageId: stageId,
          assignTo: assignToData,
          priorityId: priorityData,
          startDate: periodstartDateData,
          endDate: periodendDateData,
          scheduleTime: scheduleOnData,
          totalMints: taskTotalHourTimeData * 60 + taskTotalMinTimeData,
          watchers: watchersData,
          spoc: singlePointContactData,
          updatedBy: createdByData,
          updatedOn: createdOnData,
          isActive: true,
        };
        console.log('fetch payloadCatID detail for edit ' , payloadCatID);
        const response = await fetch(`${API_URL}PrjktTask/UpdatePrjTaskH`, {
          method: 'POST',
          headers: {
            'Authorization': userToken,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payloadCatID),
        });
        const responseData = await response.json();
        const projectId = responseData.SaveData.ProjectTaskHeaderId;
        setMyTaskId(projectId);

        if (response.status === 200) {
          console.log('Task Edited successfully');
        } else {
          console.error('Failed to Edited Task');
          console.log(payloadCatID);
        }
      } catch (error) {
        console.error('Error updating data:', error);

        if (error.response) {
          alert(error.response.data.error);
        }
      }
    };

    saveData();
  }, [TaskRowID, TaskName, assignToData, priorityData, periodstartDateData, 
    periodendDateData, scheduleOnData, watchersData, singlePointContactData, 
    createdByData, createdOnData, stageId, SubSpaceID, 
    taskTotalHourTimeData, taskTotalMinTimeData]);
  return (
    <>
      {showmodal  ? (
        <Background onClick={closeModal} ref={modalRef}>
          <animated.div style={animation}>
            <ModalWrapper showmodal={showmodal}>
              <ModalContent className='modalOuterLayer'>
                <div className='mainModalWrapper'>
                  <div className='modalwrapper rowoneWrapper modalwrapperonebgColor'>
                    <div className='modalHeaderTopWrapper ProjectBreadcum'>
                      <h4>
                        <span> {SpaceName} / {SubSpaceName} </span> 
                      </h4> 
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
                        <input type='text' name="TaskName" id="TaskName" className='form-control'  
                        value={TaskName || ''} onChange={handleTaskNameChange} 
                        placeholder='Enter Task Name'/>
                      </div>
                      <div className='modalHeadermiddleInnerWrapper taskStageList col-lg-10 col-12'>
                        <div className='taskStageListOuter'>
                          {/* eslint-disable jsx-a11y/anchor-is-valid */}
                          
                          {stages.map(staged => {
                            let stageClass = '';

                            if (staged.inOrder === ActiveStageId) {
                              stageClass = 'currentStage';
                            } else if (staged.inOrder < ActiveStageId) {
                              stageClass = 'completedStage';
                            } else {
                              stageClass = 'remainingStage';
                            }

                            return (
                              <a href='' type="button" key={staged.id} className={`headerSingleStage ${stageClass}`}>
                                <div className="singleStageArrow">
                                  <span>{staged.name}</span>
                                </div>
                              </a>
                            );
                          })}
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
                          <AssignToComponent  onAssignToChange={handleAssignToChange} 
                          initialValue={assignToData ? assignToData : null} />
                        </div>
                        <div className='modalHeaderbottomleftinnerWrapper AvatarProfile'>
                          <PriorityComponent onSelectPriority={handlePriorityChange} 
                          initialValue={priorityData ? priorityData : null} />
                        </div>
                        <div className='modalHeaderbottomleftinnerWrapper AvatarProfile'>
                          <CreatedByComponent onSelectCreatedBy={handleCreatedByChange}/>
                        </div>
                      </div>
                      <div className='modalHeaderbottommiddleWrapper col-lg-7 col-md-7 col-sm-7 col col-12'>
                        <div className='modalHeaderbottommiddleinnerWrapper taskDateviewType'>
                          <CreatedOnComponent onSelectCreatedOn={handleCreatedOnChange}/>
                        </div>
                        <div className='modalHeaderbottommiddleinnerWrapper taskDateviewType'>
                          <ScheduleOnComponent onSelectSechudule={handleScheduleOnChange} 
                          initialValue={scheduleOnData ? scheduleOnData : null}/>
                        </div>
                        <div className='modalHeaderbottommiddleinnerWrapper taskDateviewType'>
                         <PeriodWithTotalTimeComponent onPeriodstartDateChange={handlePeriodstartDateChange} 
                         onPeriodendDateChange={handlePeriodendDateChange} 
                         initialStartValue={periodstartDateData ? periodstartDateData : null} 
                         initialEndValue={periodendDateData ? periodendDateData : null} />
                        </div>
                        <div className='modalHeaderbottommiddleinnerWrapper taskDateviewType'>
                          <EditTaskTotalTimeComponent onSelecthour={handleTaskTotalTimeHourChange} 
                          onSelectmin={handleTaskTotalTimeMinChange}  
                          initialHourValue={taskTotalHourTimeData ? taskTotalHourTimeData : null} 
                          initialMinValue={taskTotalMinTimeData ? taskTotalMinTimeData : null} />
                        </div>
                        <div className='modalHeaderbottommiddleinnerWrapper taskDateviewType'>
                          <SinglePointContactComponent onSelectSPOC={handleSinglePointContactChange} 
                          initialValue={singlePointContactData ? singlePointContactData : null}/>
                        </div>
                      </div>
                      <div className='modalHeaderbottomrightWrapper  col-lg-2 col-md-2 col-sm-12 col-12'>
                        <div className='modalHeaderbottomrightinnerWrapper taskwatcherAvatar d-flex justify-content-between align-items-center'>
                          <WatcherComponent onSelectWatchers={handleWatchersChange}  
                          initialValue={watchersData ? [watchersData] : []}/>
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
                        <DynamicFormComponent stageId={stageId} mytaskId={mytaskId}/>
                      </div>
                      <div className='modalBodyMiddleOuter col-lg-6 col-12'>
                          <SubtaskViewComponent
                            showmodal={showSecondModal}
                            setShowModal={setShowSecondModal}
                            mytaskId={mytaskId}
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
