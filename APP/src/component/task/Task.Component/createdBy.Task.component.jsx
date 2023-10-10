import React , {useEffect} from 'react';
import Typography from '@mui/material/Typography';

const CreatedByComponent = ({onSelectCreatedBy}) => {
  const storedUserData = localStorage.getItem('userSession');
  const userData = JSON.parse(storedUserData);
  const userId = userData.id;
  const username = userData.Name;
  useEffect(() => {
    onSelectCreatedBy(userId);
  }, [onSelectCreatedBy, userId]);


  return (
    <div className='autoOuterLayer'>
      <img loading="lazy" width="45" height="45" title="Created By" alt="Rakesh Yadav" className='border rounded-circle border-2'
        src={`https://app.jayanita.com/HRMSApp/image/UserPictures/42379.jpg`}
        srcSet={`https://app.jayanita.com/HRMSApp/image/UserPictures/42379.jpg 2x`} 
      />
      <Typography variant="body2">
        {username}
      </Typography>
      
    </div>
  );
};

export default CreatedByComponent;
