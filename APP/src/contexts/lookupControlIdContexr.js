import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from '../config';

const ContextControlIdContext = createContext();

export function useControlIdContext() {
  return useContext(ContextControlIdContext);
}

export function ControlIDProvider({ children }) {
  const [ContextControlId, setContextControlId] = useState([]);

  useEffect(() => {
    // Fetch control data from API
    const userToken = localStorage.getItem('token');
    console.log(userToken);
    axios.get(API_URL + 'Controls', {
        headers: {
            'Authorization': `${userToken}`,
          },
        })
      .then(response => {
        setContextControlId(response.data);
      })
      .catch(error => {
        console.error('Error fetching Context data:', error);
      });
  }, []);

  const contextValue = {
    ContextControlId,
  };

  return (
    <ContextControlIdContext.Provider value={contextValue}>
      {children}
    </ContextControlIdContext.Provider>
  );
}
