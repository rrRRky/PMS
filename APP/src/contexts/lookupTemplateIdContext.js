import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from '../config';

const ContextTemplateIdContext = createContext();

export function useTemplateIdContext() {
  return useContext(ContextTemplateIdContext);
}

export function TemplateIdProvider({ children }) {
  const [ContextTemplateId, setContextTemplateId] = useState([]);

  useEffect(() => {
    // Fetch control data from API
    const userToken = localStorage.getItem('token');
    if (userToken) {
    console.log(userToken);
    axios.get(API_URL + 'Template', {
        headers: {
            'Authorization': `${userToken}`,
          },
        })
      .then(response => {
        setContextTemplateId(response.data);
      })
      .catch(error => {
        console.error('Error fetching Context data:', error);
      });
    }
  }, []);

  const contextValue = {
    ContextTemplateId,
  };

  return (
    <ContextTemplateIdContext.Provider value={contextValue}>
      {children}
    </ContextTemplateIdContext.Provider>
  );
}
