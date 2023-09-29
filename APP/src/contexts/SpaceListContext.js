import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from '../config';

const SpaceListContext = createContext();

export function useSpaceListContext() {
  return useContext(SpaceListContext);
}

export function SpaceListProvider({ children }) {
  const [spacesList, setSpacesList] = useState([]);

  useEffect(() => {
    // Fetch space data from API
    const userToken = localStorage.getItem('token');
    if (userToken) {
    console.log(userToken);
    axios.get(API_URL + 'SpaceLists', {
        headers: {
            'Authorization': `${userToken}`,
          },
        })
      .then(response => {
        setSpacesList(response.data);
      })
      .catch(error => {
        console.error('Error fetching space data:', error);
      });
    }
  }, []);

  console.log(spacesList );
  const contextValue = {
    spacesList,
  };

  return (
    <SpaceListContext.Provider value={contextValue}>
      {children}
    </SpaceListContext.Provider>
  );
}
