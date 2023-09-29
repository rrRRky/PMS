import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';


const ActivityChatComponent = ({ userId }) => {
  // State to manage comments
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  // Sample recent activities data
  const recentActivities = [
    { Activityid:1, userId: 1, text: 'User A posted a photo.', time: '2 hours ago' },
    { Activityid:2, userId: 2, text: 'User B liked a post.', time: '3 hours ago' },
    { Activityid:3, userId: 2, text: 'User A posted a photo.', time: '2 hours ago' },
    { Activityid:4, userId: 1, text: 'User B liked a post.', time: '3 hours ago' },
    { Activityid:5, userId: 2, text: 'User A posted a photo.', time: '2 hours ago' },
  ];

  const commentBoxs = [
    { commentID:1, userId: 1, user: 'Rakeshy',  text: 'stage one has been done.', time: '5 hours ago' },
    { commentID:2, userId: 2, user: 'DeepakR', text: 'stage Two has been done.', time: '4 hours ago' },
    { commentID:3, userId: 2, user: 'DeepakR', text: 'stage Three has been done.', time: '1 hours ago' },
    { commentID:4, userId: 1, user: 'Rakeshy', text: 'stage Four has been done.', time: '30 mins ago' },
    { commentID:5, userId: 2, user: 'DeepakR', text: 'stage Five has been done.', time: '10 mins ago' },
    { commentID:6, userId: 1, user: 'Rakeshy', text: 'stage Six has been done.', time: 'just now' },
  ];
console.log(commentBoxs.commentID);
  // Function to add a new comment
  const addComment = () => {
    if (newComment.trim() !== '') {
      setComments([
        ...comments,
        { text: newComment, user: userId === 1 ? 'You' : 'User', time: getCurrentTime() },
      ]);
      setNewComment('');
    }
  };

  // Function to get the current time
  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    return `${hours}:${minutes}`;
  };

  return (
    <div className="col-md-12">
      <div className="content">
        <div className="contact-profile">
          <h2 className="">Activity Feed</h2>
        </div>
        <div className="messages activity-feed">
          {comments.map((comment) => (
            <div
              key={comment.commentID}
              id={comment.commentID}
              className={`comment ${comment.userId === 1 ? 'comment-right' : 'comment-left'}`}
            >
              <div className="comment-content">
                <div className="user-comment-info">
                  <span>{comment.text}</span>   
                  <span className='commentTiming'><i>{comment.time}</i> {comment.user}</span> 
                </div>  
                <Avatar className='usercommentAvatar' alt="user" aria-label="User Avatar" >
                  <i className="fa-solid fa-user"  style={{color:'#ffffff'}}></i>
                </Avatar>
              </div>
            </div>
            ))} 
          {commentBoxs.map((comment) => (
            <div
              key={comment.commentID}
              id={comment.commentID}
              className={`comment ${comment.userId === 1 ? 'comment-right' : 'comment-left'}`}
            >
              <div className="comment-content">
                <div className="user-comment-info">
                  <span>{comment.text}</span>   
                  <span className='commentTiming'><i>{comment.time}</i> {comment.user}</span> 
                </div>  
                <Avatar className='usercommentAvatar' alt="user" aria-label="User Avatar" >
                  <i className="fa-solid fa-user"  style={{color:'#ffffff'}}></i>
                </Avatar>
              </div>
            </div>
          ))}
          {recentActivities.map((activity) => (
            <div key={activity.Activityid} id={activity.userId} className="activity">
              {activity.text}
              <span className="activity-info">{activity.time}</span>
            </div>
          ))}
        </div>
        <div className="message-input comment-input">
            <div className='wrap'>
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="form-control"
                />
                <Button onClick={addComment} variant="contained" className="">
                    <i className='fa fa-paper-plane'></i>
                </Button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityChatComponent;
