import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from '../config';

const SpaceContext = createContext();

export function useSpaceContext() {
  return useContext(SpaceContext);
}

export function SpaceProvider({ children }) {
  const [spaces, setSpaces] = useState([]);

  useEffect(() => {
    // Fetch space data from API
    const userToken = localStorage.getItem('token');
    if (userToken) {
    console.log(userToken);
    axios.get(API_URL + 'Spaces', {
        headers: {
            'Authorization': `${userToken}`,
          },
        })
      .then(response => {
        setSpaces(response.data);
      })
      .catch(error => {
        console.error('Error fetching space data:', error);
      });
    }
  }, []);

  const contextValue = {
    spaces,
  };

  return (
    <SpaceContext.Provider value={contextValue}>
      {children}
    </SpaceContext.Provider>
  );
}
