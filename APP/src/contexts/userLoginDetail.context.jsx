import { createContext, useContext, useState, } from 'react';

const UserLoginDetailContext = createContext();

export function useUserLoginDetailContext() {
  return useContext(UserLoginDetailContext);
}

export function UserLoginDetailProvider({ children }) {
  const [userLoginDetail, setUserLoginDetail] = useState(null); // Initialize as null

  const setLoginDetail = (loginData) => {
    setUserLoginDetail(loginData);
  };

  const contextValue = {
    userLoginDetail,
    setLoginDetail,
  };


  return (
    <UserLoginDetailContext.Provider value={contextValue}>
      {children}
    </UserLoginDetailContext.Provider>
  );
}
