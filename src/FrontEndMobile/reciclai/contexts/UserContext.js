import React, { createContext, useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserContext = createContext();

export default function UserProvider({ children }) {
  const [signed, setSigned] = useState(true);
  const [user, setUser] = useState({});
  const userId =AsyncStorage.getItem('userId');
  const userPerfil =AsyncStorage.getItem('userPerfil');
  const userName =AsyncStorage.getItem('userName');
  const [name, setName] = useState('');

  function setUserName(name) {

    setName(name)

  }

  return (
    <UserContext.Provider
      value={{

        signed,
        setSigned,
        user,
        setUser,
        userId,
        userPerfil,
        userName,
        name,
        setName,
        setUserName

      }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  return context;
}
