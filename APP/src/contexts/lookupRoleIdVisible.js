import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from '../config';

const ContextRoleIdContext = createContext();

export function useRoleIdContext() {
  return useContext(ContextRoleIdContext);
}

export function RoleIdProvider({ children }) {
  const [ContextRoleId, setContextRoleId] = useState([]);

  useEffect(() => {
    // Fetch control data from API
    const userToken = localStorage.getItem('token');
    if (userToken) {
    console.log(userToken);
    axios.get(API_URL + 'Roles', {
        headers: {
            'Authorization': `${userToken}`,
          },
        })
      .then(response => {
        setContextRoleId(response.data);
      })
      .catch(error => {
        console.error('Error fetching Context data:', error);
      });
    }
  }, []);

  const contextValue = {
    ContextRoleId,
  };

  return (
    <ContextRoleIdContext.Provider value={contextValue}>
      {children}
    </ContextRoleIdContext.Provider>
  );
}
