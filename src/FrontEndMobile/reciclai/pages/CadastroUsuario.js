import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Text1 from '../components/Text';
import Text2 from '../components/Text2';
import Container from '../components/Container';
import Card from '../components/Card';
import Body from '../components/Body';
import Titulo from '../components/Titulo';
import Button1 from '../components/Button';
import ButtonIcon from '../components/ButtonIcon';
import Logo from '../components/Logo';


import { insertUsuarios } from '../services/Usuarios.services';

import { useNavigation } from '@react-navigation/native';


const CadastroUsuario = () => {

    const navigate = useNavigation();
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [endereco, setEndereco] = useState('');
    // const [estado, setEstado] = useState('');
    // const [perfil, setPerfil] = useState();
    // const [tipoLixo, setTipoLixo] = useState();
  
    
  
    useEffect(() => {
      async function postUser() {
        await insertUsuarios().then(item => {
          if (item) {
            setNome(item.nome);
            setEmail(item.email);
            setSenha(item.senha);
            setEndereco(item.endereco);
            // setEstado(item.estado);
            // setPerfil(item.perfil);
            // setTipoLixo(item.tipoLixo);
            setEstado(1);
            setPerfil(1);
            setTipoLixo(1);
  
          }
        })
      }
      postUser();
    }, []);

    const handleChangePerfil = (e) => {
        setPerfil(e.target.value);
      }
      const handleChangeTipoLixo = (e) => {
        setTipoLixo(e.target.value);
      }

      async function handleSubmit(event) {
        event.preventDefault();
       
          await insertUsuarios({
            "nome": nome,
            "email": email,
            "senha": senha,
            "endereco": endereco,
            // "estado": estado,
            // "perfil": perfil,
            // "tipoLixo": tipoLixo
          },
            navigate('/login'));
        
      }
    
    

      return (
        <Container>
            <ScrollView>
               
        <Logo />
        <Titulo title="Cadastre-se" />
        <Body>
            <Card>
                <Titulo title={"Nome: "} />                        
                <TextInput
                style={styles.textInput}
                placeholder="Nome"
                value={nome}
                onChangeText={(text) => setNome(text)}
                />
            
                <Titulo title={"Email"} />                        
                <TextInput
                style={styles.textInput}
                placeholder="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
                />

                
                <Titulo title={"Endereço"} />                        
                <TextInput
                style={styles.textInput}
                placeholder="Endereço"
                value={endereco}
                onChangeText={(text) => setEndereco(text)}
                />
            </Card>
                   
            
                <Button1
                    title="Cadastre-se"
                    onPress={handleSubmit}
                />
                        </Body>
            </ScrollView>
    </Container>
);
};

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 24,
    marginBottom: 10,
  },
  box: {
    width: '100%',
    alignItems: 'center',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    width: '90%',
    marginTop: "auto", 
  },
  itemContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  itemTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemText: {
    marginBottom: 5,
  },
  selectText: {
    color: 'blue',
  },
});

export default CadastroUsuario;