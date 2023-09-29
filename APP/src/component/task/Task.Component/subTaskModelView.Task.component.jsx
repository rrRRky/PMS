import React, { useRef, useEffect, useState,  useCallback } from 'react';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import { useStageContext } from '../../../contexts/StageContext';
import AssignToComponent from './assignTo.Task.component';
import CreatedByComponent from './createdBy.Task.component';
import PriorityComponent from './priority.Task.component';
import WatcherComponent from './watchers.Task.component';
import CreatedOnComponent from './createdOn.Task.component';
import ScheduleOnComponent from './scheduleOn.Task.component';
import PeriodWithTotalTimeComponent from './periodWithTotalTime.Task.component';
import TaskTotalTimeComponent from './taskTotalTime.Task.component';
import ActivityChatComponent from './activityChat.Task.component';
import DynamicFormComponent from './dynamicForm.Task.component';
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
  position: absolute;
  top: 5px;
  right: 10px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 11;
  color:#333;
`;



export const SubModal = ({ subtaskshowsecmodal, setShowSecModal }) => {
  
  const spaceID = localStorage.getItem('spaceID');
  const SubSpaceID = localStorage.getItem('SubSpaceID');
  const SpaceName = localStorage.getItem('SpaceName');
  const SubSpaceName = localStorage.getItem('SubSpaceName');
  const modalSecRef = useRef();
  const { stages } = useStageContext();
  const animation = useSpring({
    config: {
      duration: 250
    },
    opacity: subtaskshowsecmodal ? 1 : 0,
    overflow: subtaskshowsecmodal ? 'hidden' : 'auto',
    transform: subtaskshowsecmodal ? `translateY(0%)` : `translateY(-100%)`
  });



  const SubTaskcloseSecModal = e => {
    if (modalSecRef.current === e.target) {
      setShowSecModal(false);
    }
  };

  const keyPress = useCallback(
    e => {
      if (e.key === 'Escape' && subtaskshowsecmodal) {
        setShowSecModal(false);
        document.body.style.overflow = 'auto';
        console.log('I pressed sub task');
      }
    },
    [setShowSecModal, subtaskshowsecmodal]
  );

  useEffect(
    () => {
      document.addEventListener('keydown', keyPress);
      return () => document.removeEventListener('keydown', keyPress);
    },
    [keyPress]
  );

  return (
    <>
      {subtaskshowsecmodal ? (
        <Background onClick={SubTaskcloseSecModal} ref={modalSecRef}>
          <animated.div style={animation}>
            <ModalWrapper subtaskshowsecmodal={subtaskshowsecmodal}>
              <ModalContent className='modalOuterLayer'>
                <div className='mainModalWrapper'>
                  <div className='modalwrapper rowoneWrapper modalwrapperonebgColor'>
                    <div className='modalHeaderTopWrapper ProjectBreadcum'>
                      <h4>{SpaceName} / {SubSpaceName} / Project</h4>
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
                      <div className='modalHeaderbottomleftWrapper col-lg-3 col-12'>
                        <div className='modalHeaderbottomleftinnerWrapper AvatarProfile'>
                          <AssignToComponent/>
                        </div>
                        <div className='modalHeaderbottomleftinnerWrapper AvatarProfile'>
                          <PriorityComponent/>
                        </div>
                        <div className='modalHeaderbottomleftinnerWrapper AvatarProfile'>
                          <CreatedByComponent/>
                        </div>
                      </div>
                      <div className='modalHeaderbottommiddleWrapper col-lg-6 col-12'>
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
                      </div>
                      <div className='modalHeaderbottomrightWrapper  col-lg-3 col-12'>
                        <div className='modalHeaderbottomrightinnerWrapper taskwatcherAvatar'>
                          <WatcherComponent/>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='modalwrapper rowfourWrapper modalwrapperfourbgColor'>
                    <div className='row m-0 p-o'>
                      <div className='modalBodyLeftOuter col-lg-3 col-12'>
                        <DynamicFormComponent/>
                      </div>
                      <div className='modalBodyMiddleOuter col-lg-6 col-12'>

                      </div>
                      <div className='modalBodyRightOuter col-lg-3 col-12'>
                        <ActivityChatComponent/>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <h1>Are you ready?</h1>
                <p>Get exclusive access to our next launch.</p>
                <button>Join Now</button> */}
              </ModalContent>
              {/* <CloseModalButton
                aria-label='Close modal'
                onClick={() => setShowSecModal(prev => !prev)}
              /> */}
              <CloseModalButton
                aria-label='Close modal' className='closebuttonmodalpopup' onClick={(e) => {
                  e.stopPropagation(); 
                  setShowSecModal(prev => !prev);
                }}
              />
            </ModalWrapper>
          </animated.div>
        </Background>
      ) : null}
    </>
  );
};