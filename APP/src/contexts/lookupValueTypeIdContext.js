import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from '../config';

const ContextValueTypeIdContext = createContext();

export function useValueTypeIdContext() {
  return useContext(ContextValueTypeIdContext);
}

export function ValueTypeIdProvider({ children }) {
  const [ContextValueTypeId, setContextValueTypeId] = useState([]);

  useEffect(() => {
    // Fetch control data from API
    const userToken = localStorage.getItem('token');
    console.log(userToken);
    axios.get(API_URL + 'Lookup/LookupData?type=valueType', {
        headers: {
            'Authorization': `${userToken}`,
          },
        })
      .then(response => {
        setContextValueTypeId(response.data);
      })
      .catch(error => {
        console.error('Error fetching Context data:', error);
      });
  }, []);

  const contextValue = {
    ContextValueTypeId,
  };

  return (
    <ContextValueTypeIdContext.Provider value={contextValue}>
      {children}
    </ContextValueTypeIdContext.Provider>
  );
}
