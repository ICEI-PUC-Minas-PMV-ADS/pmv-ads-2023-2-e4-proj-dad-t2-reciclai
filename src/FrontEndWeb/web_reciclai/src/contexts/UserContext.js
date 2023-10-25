import React, { createContext, useState, useContext } from 'react';

export const UserContext = createContext();

export default function UserProvider({ children }) {
  const [signed, setSigned] = useState(false);
  const [user, setUser] = useState({});
  const userId = localStorage.getItem('userId');

  return (
    <UserContext.Provider
      value={{
        signed,
        setSigned,
        user,
        setUser,
        userId

      }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  return context;
}
