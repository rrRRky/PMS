import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from '../config';

const LookupControltypeContext = createContext();

export function useControltypeContext() {
  return useContext(LookupControltypeContext);
}

export function ControlTypeProvider({ children }) {
  const [LookupcontrolType, setLookupcontrolType] = useState([]);

  useEffect(() => {
    // Fetch Lookup data from API
    const userToken = localStorage.getItem('token');
    console.log(userToken);
    axios.get(API_URL + 'Lookup/LookupData?type=CTRL', {
        headers: {
            'Authorization': `${userToken}`,
          },
        })
      .then(response => {
        setLookupcontrolType(response.data);
      })
      .catch(error => {
        console.error('Error fetching Lookup data:', error);
      });
  }, []);

  const contextValue = {
    LookupcontrolType,
  };

  return (
    <LookupControltypeContext.Provider value={contextValue}>
      {children}
    </LookupControltypeContext.Provider>
  );
}
