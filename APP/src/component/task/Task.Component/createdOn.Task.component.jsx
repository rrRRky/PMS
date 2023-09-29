import React, { useEffect } from 'react';
import Typography from '@mui/material/Typography';

const CreatedOnComponent = ({ onSelectCreatedOn }) => {
 
    const formatDate = (currentTime) => {
      if (!currentTime) {
        return "Not Updated"; // Default value for blank date
      }
      const date = new Date(currentTime);
      const options = {
        day: "2-digit",
        month: "short",
        year: "numeric",
      };
      const formattedDate = date.toLocaleDateString("en-US", options);

      return formattedDate;
    };
    useEffect(() => {
    const currentTime = new Date();
    const formattedDate = formatDate(currentTime);
    onSelectCreatedOn(formattedDate);
  }, [onSelectCreatedOn]);

  return (
    <div className='autoOuterLayer'>
      <Typography variant="body1">
      {formatDate(new Date())}
      </Typography>
      <Typography variant="body2">
        CREATED ON
      </Typography>
    </div>
  );
};

export default CreatedOnComponent;
