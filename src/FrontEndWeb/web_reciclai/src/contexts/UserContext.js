import React, { createContext, useState, useContext } from 'react';

export const UserContext = createContext();

export default function UserProvider({ children }) {
  const [signed, setSigned] = useState(false);
  const [user, setUser] = useState({});


  return (
    <UserContext.Provider
      value={{
        signed,
        setSigned,
        user,
        setUser,

      }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  return context;
}
