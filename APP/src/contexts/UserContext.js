import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from '../config';

const UserContext = createContext();

export function useUserContext() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [Users, setUsers] = useState([]);
  useEffect(() => {
    
    const userToken = localStorage.getItem('token');
    if (userToken) {
    console.log(userToken);
    axios.get(API_URL + 'Users', {
        headers: {
            'Authorization': `${userToken}`,
          },
        })
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching User data:', error);
      });
    }
  }, []);

  const contextValue = {
    Users,
  };
  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
}
