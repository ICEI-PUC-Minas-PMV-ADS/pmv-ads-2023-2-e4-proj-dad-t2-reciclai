import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { MenuItem, Select } from '@mui/material';
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

    const navigation = useNavigation();
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [endereco, setEndereco] = useState('');
    const [estado, setEstado] = useState('');
    const [perfil, setPerfil] = useState();
    const [tipoLixo, setTipoLixo] = useState();
  
    
  
    useEffect(() => {
      async function postUser() {
        await insertUsuarios().then(item => {
          if (item) {
            setNome(item.nome);
            setEmail(item.email);
            setSenha(item.senha);
            setEndereco(item.endereco);
            setEstado(item.estado);
            setPerfil(item.perfil);
            setTipoLixo(item.tipoLixo);
            setEstado(item.estado);
            setPerfil(item.perfil);
            setTipoLixo(item.tipoLixo);
  
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
            "estado": estado,
            "perfil": perfil,
            "tipoLixo": tipoLixo
          },
            navigation.navigate('/login'));
        
      }
    
    

      return (
        <Container>
            <ScrollView>
               
        <Logo />
        <Titulo title="Cadastre-se" />
        <Body>
           
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

                <Titulo title={"Senha"} />                        
                <TextInput
                style={styles.textInput}
                placeholder="senha"
                secureTextEntry
                value={senha}
                onChangeText={(text) => setSenha(text)}
                />

                <Titulo title={"Endereço"} />                        
                <TextInput
                style={styles.textInput}
                placeholder="Endereço"
                value={endereco}
                onChangeText={(text) => setEndereco(text)}
                />

                <Titulo title={"Estado"} />
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={estado}
                  onChange={e => setEstado(e.target.value)}
                  label="Estado"
                >
                  <MenuItem value="Acre">Acre</MenuItem>
                  <MenuItem value="Alagoas">Alagoas</MenuItem>
                  <MenuItem value="Amapá">Amapá</MenuItem>
                  <MenuItem value="Amazonas">Amazonas</MenuItem>
                  <MenuItem value="Bahia">Bahia</MenuItem>
                  <MenuItem value="Ceará">Ceará</MenuItem>
                  <MenuItem value="Distrito Federal">Distrito Federal</MenuItem>
                  <MenuItem value="Espírito Santo">Espírito Santo</MenuItem>
                  <MenuItem value="Goiás">Goiás</MenuItem>
                  <MenuItem value="Maranhão">Maranhão</MenuItem>
                  <MenuItem value="Mato Grosso">Mato Grosso</MenuItem>
                  <MenuItem value="Mato Grosso do Sul">Mato Grosso do Sul</MenuItem>
                  <MenuItem value="Minas Gerais">Minas Gerais</MenuItem>
                  <MenuItem value="Pará">Pará</MenuItem>
                  <MenuItem value="Paraíba">Paraíba</MenuItem>
                  <MenuItem value="Paraná">Paraná</MenuItem>
                  <MenuItem value="Pernambuco">Pernambuco</MenuItem>
                  <MenuItem value="Piauí">Piauí</MenuItem>
                  <MenuItem value="Rio de Janeiro">Rio de Janeiro</MenuItem>
                  <MenuItem value="Rio Grande do Norte">Rio Grande do Norte</MenuItem>
                  <MenuItem value="Rio Grande do Sul">Rio Grande do Sul</MenuItem>
                  <MenuItem value="Rondônia">Rondônia</MenuItem>
                  <MenuItem value="Roraima">Roraima</MenuItem>
                  <MenuItem value="Santa Catarina">Santa Catarina</MenuItem>
                  <MenuItem value="São Paulo">São Paulo</MenuItem>
                  <MenuItem value="Sergipe">Sergipe</MenuItem>
                  <MenuItem value="Tocantins">Tocantins</MenuItem>
                </Select>
            
                <Titulo title={"Perfil"} />
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={perfil}
                  onChange={handleChangePerfil}
                  label="Perfil"
                >
                  <MenuItem value={0}>Solicitante</MenuItem>
                  <MenuItem value={1}>Coletor</MenuItem>
                </Select>
            
                <Titulo title={"Tipo de Lixo"} />
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={tipoLixo}
                  onChange={handleChangeTipoLixo}
                  label="Tipo de Lixo"
                >
                  <MenuItem value={0}>Eletrodoméstico</MenuItem>
                  <MenuItem value={1}>Eletroportáteis</MenuItem>
                  <MenuItem value={2}>Monitores</MenuItem>
                  <MenuItem value={3}>Iluminação</MenuItem>
                  <MenuItem value={4}>Fios e Cabos</MenuItem>
                  <MenuItem value={5}>Pilhas e baterias</MenuItem>
                  <MenuItem value={6}>TI e telecomunicações</MenuItem>
                  <MenuItem value={7}>Painéis Fotovoltaicos</MenuItem>
                </Select>


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
    fontSize: 68,
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