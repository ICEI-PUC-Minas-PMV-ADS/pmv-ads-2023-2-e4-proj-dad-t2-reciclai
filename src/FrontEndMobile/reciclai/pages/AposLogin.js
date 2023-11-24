import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Headline } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { useUser } from "../contexts/UserContext";
import AsyncStorage from '@react-native-async-storage/async-storage';


import ButtonLogout from '../components/ButtonLogout';
import Container from '../components/Container';
import Body from '../components/Body';
import ButtonPedido from '../components/ButtonPedido';


const AposLogin = () => {
  const navigation = useNavigation();
  const { setSigned, name, idUsuario, setUserId } = useUser();
  const isFocused = useIsFocused();


  useEffect(() => {

  }, [isFocused]);




  const handleLogout = async () => {
    setSigned(false);
    setUserId(null);
    AsyncStorage.removeItem('jwtToken');

  }

  return (
    <Container>

      <Body>      
        <View style={styles.headline}>
          <Headline style={styles.headline2}>Olá, {name}!</Headline>
        </View>
        <ButtonLogout onPress={handleLogout} />



      </Body>

    </Container >
  );

}

const styles = StyleSheet.create({

  headline: {
    marginTop: 50,
    marginBottom: 30,
    marginLeft: 10,
  },
  headline2: {
    color: '#FFFFFF',
  }
});

export default AposLogin;

