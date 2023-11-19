import React, { createContext, useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserContext = createContext();

export default function UserProvider({ children }) {
  const [signed, setSigned] = useState(false);
  const [user, setUser] = useState({});
  const [name, setName] = useState('');
  const [idUsuario, setIdUsuario] = useState();

  function setUserName(name) {

    setName(name)

  }

  function setUserId(idUsuario) {

    setIdUsuario(idUsuario)

  }


  return (
    <UserContext.Provider
      value={{

        signed,
        setSigned,
        user,
        setUser,
        name,
        setName,
        setUserName, 
        idUsuario,
        setIdUsuario,
        setUserId

      }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  return context;
}
