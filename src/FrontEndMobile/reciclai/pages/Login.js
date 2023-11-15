import React, { useState, useEffect } from 'react';
import { Text, TextInput, ScrollView } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import Input from '../components/input';
import Container from '../components/Container';
import Body from '../components/Body';
import { Button } from 'react-native-paper';
import {login} from "../services/Auth.services";
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
          // ... (your existing code)
        } else {
          alert('Atenção, Usuário ou senha inválidos!');
        }
      } catch (error) {
        console.error('Login failed:', error);
        if (error.response) {
          console.log('Server response:', error.response.data);
        }
        // Handle the error appropriately, e.g., show an error message to the user.
      }
    };

    return (
        <Container>
            <Body>
                <ScrollView>
                    <Text>Login</Text>
                    <Input
                        label="E-mail"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                    />
                    <Input
                        label="Senha:"
                        value={senha}
                        secureTextEntry
                        onChangeText={(text) => setSenha(text)}
                    />
                    <Button mode="elevated" onPress={handleLogin}>
                        Login
                    </Button>
                </ScrollView>
            </Body>

        </Container>
    );
};
export default Login;