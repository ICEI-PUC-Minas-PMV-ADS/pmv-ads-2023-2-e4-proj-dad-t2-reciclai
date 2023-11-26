import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, ScrollView, View, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import InputPedido from '../components/inputPedido';
import Logo from '../components/Logo';
import Container from '../components/Container';
import BtnLogin from '../components/BtnLogin'
import Body from '../components/Body';
import { login } from "../services/Auth.services";
import { useUser } from '../contexts/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';



const Login = () => {
  const navigation = useNavigation();
  const { setSigned, setUserId, setUserName, setUser, setUserPerfil } = useUser();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    try {
      const res = await login({
        email: email,
        senha: senha,
      });


      if (res && res.jwtToken) {
        setSigned(true);
        AsyncStorage.setItem('jwtToken', res.jwtToken)
        setUser(res);
        setUserId(res.userId);
        setUserName(res.userName);
        setUserPerfil(res.userPerfil);
      } else {
        Alert.alert('Atenção, Usuário ou senha inválidos!');
      }
    }
    catch (error) {
      console.error('Login failed:', error);
      if (error.response) {
        console.log('Server response:', error.response.data);
      }
    }
  };

  return (
    <Container >
      <Logo />
      <Body >
        <ScrollView>
          <Text style={styles.title}>Login</Text>
          <View style={styles.card}>
            <InputPedido
              label="E-mail:"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            <InputPedido
              label="Senha:"
              value={senha}
              secureTextEntry
              onChangeText={(text) => setSenha(text)}
            />
            <BtnLogin
              title="Login"
              onPress={handleLogin}>
            </BtnLogin>
            <BtnLogin
              title="Cadastre-se"
              onPress={() => navigation.navigate('CadastroUsuario')}>
            </BtnLogin>
          </View>
        </ScrollView>
      </Body>

    </Container>
  );
};

const styles = StyleSheet.create({

  title: {
    marginTop: 40,
    marginBottom: 25,
    fontSize: 35,
    textAlign: 'center',
    color: 'white',
  },
  card: {
    alignItems: 'center',

  },

  texto: {
    fontSize: 18,
    textAlign: 'center',
    color: 'white'
  },
});

export default Login;