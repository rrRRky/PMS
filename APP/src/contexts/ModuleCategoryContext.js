import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from '../config';

const ModuleCategoryContext = createContext();

export function useModuleCategoryContext() {
  return useContext(ModuleCategoryContext);
}

export function ModuleCategoryProvider({ children }) {
  const [ModuleCategoryList, setModuleCategory] = useState([]);
  const [hasRefreshed, setHasRefreshed] = useState(false); // Track whether initial refresh has been done

  useEffect(() => {
    // Fetch space data from API
    // if (!hasRefreshed === true) {
    const userToken = localStorage.getItem('token');
    if (userToken) {
    console.log(userToken);
    axios.get(API_URL + 'MCategory', {
        headers: {
            'Authorization': `${userToken}`,
          },
        })
      .then(response => {
        setModuleCategory(response.data);
        // setHasRefreshed(true);
      })
      .catch(error => {
        console.error('Error fetching space data:', error);
      });
    }
  // }
  }, []);
  
  const contextValue = {
    ModuleCategoryList,
  };

  return (
    <ModuleCategoryContext.Provider value={contextValue}>
      {children}
    </ModuleCategoryContext.Provider>
  );
}
