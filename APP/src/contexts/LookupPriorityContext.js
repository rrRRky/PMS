import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from '../config';

const LookupPriorityContext = createContext();

export function usePriorityContext() {
  return useContext(LookupPriorityContext);
}

export function PriorityProvider({ children }) {
  const [LookupPriority, setLookupPriority] = useState([]);

  useEffect(() => {
    // Fetch Lookup data from API
    const userToken = localStorage.getItem('token');
    if (userToken) {
    console.log(userToken);
    axios.get(API_URL + 'Lookup/LookupData?type=PRYT', {
        headers: {
            'Authorization': `${userToken}`,
          },
        })
      .then(response => {
        setLookupPriority(response.data);
      })
      .catch(error => {
        console.error('Error fetching Lookup data:', error);
      });
    }
  }, []);

  const contextValue = {
    LookupPriority,
  };

  return (
    <LookupPriorityContext.Provider value={contextValue}>
      {children}
    </LookupPriorityContext.Provider>
  );
}
