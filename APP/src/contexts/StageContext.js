import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from '../config';

const StageContext = createContext();

export function useStageContext() {
  return useContext(StageContext);
}

export function StageProvider({ children }) {
  const [stages, setstages] = useState([]);

  useEffect(() => {
    // Fetch stage data from API
    const userToken = localStorage.getItem('token');
    if (userToken) {
    console.log(userToken);
    axios.get(API_URL + 'Stages', {
        headers: {
            'Authorization': `${userToken}`,
          },
        })
      .then(response => {
        setstages(response.data);
      })
      .catch(error => {
        console.error('Error fetching stage data:', error);
      });
    }
  }, []);

  const contextValue = {
    stages,
  };

  return (
    <StageContext.Provider value={contextValue}>
      {children}
    </StageContext.Provider>
  );
}
