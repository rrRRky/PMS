import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from '../config';

const ControlContext = createContext();

export function useControlContext() {
  return useContext(ControlContext);
}

export function ControlProvider({ children }) {
  const [Controls, setControls] = useState([]);

  useEffect(() => {
    // Fetch Control data from API
    const userToken = localStorage.getItem('token');
    if (userToken) {
    console.log(userToken);
    axios.get(API_URL + 'Controls', {
        headers: {
            'Authorization': `${userToken}`,
          },
        })
      .then(response => {
        setControls(response.data);
      })
      .catch(error => {
        console.error('Error fetching Control data:', error);
      });
    }
  }, []);

  const contextValue = {
    Controls,
  };

  return (
    <ControlContext.Provider value={contextValue}>
      {children}
    </ControlContext.Provider>
  );
}
