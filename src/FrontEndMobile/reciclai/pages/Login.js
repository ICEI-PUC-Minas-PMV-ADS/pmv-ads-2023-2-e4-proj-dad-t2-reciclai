import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, ScrollView, View, Alert } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import Input from '../components/input';
import Logo from '../components/Logo';
import Container from '../components/Container';
import BtnLogin from '../components/BtnLogin'
import Body from '../components/Body';
import { login } from "../services/Auth.services";
import { useUser } from '../contexts/UserContext';



const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    try {
      const res = await login({
        email: email,
        senha: senha,
      });

      console.log(res);

      if (res && res.jwtToken) {
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
            <Input style={styles.input}
              label="E-mail:"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            <Input style={styles.input}
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
            title="Registrar"
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
    marginTop: 50,
    fontSize: 35,
    textAlign: 'center',
    color: 'white',
  },

  card: {
    alignItems: 'center',

  },

  input: {
    width: '350px'
  },
  texto: {
    fontSize: '18px',
    textAlign: 'center',
    color: 'white'
  }
});

export default Login;