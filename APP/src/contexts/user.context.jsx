import React, { createContext, useContext, useReducer } from "react";

// Placeholder for the AuthReducer and initialState
const AuthReducer = (state, action) => {
  // Your authentication-related logic here
  switch (action.type) {
    // Handle different action types and update the state accordingly
    default:
      return state;
  }
};

const initialState = {
  // Your initial authentication state
};

const AuthStateContext = createContext();
const AuthDispatchContext = createContext();

export function useAuthState() {
  const context = useContext(AuthStateContext);
  if (context === undefined) {
    throw new Error("useAuthState must be used within an AuthProvider");
  }
  return context;
}

export function useAuthDispatch() {
  const context = useContext(AuthDispatchContext);
  if (context === undefined) {
    throw new Error("useAuthDispatch must be used within an AuthProvider");
  }
  return context;
}

export const AuthProvider = ({ children }) => {
  const [user, dispatch] = useReducer(AuthReducer, initialState);

  return (
    <AuthStateContext.Provider value={user}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};
