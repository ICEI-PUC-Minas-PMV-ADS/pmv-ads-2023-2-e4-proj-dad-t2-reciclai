import React, { useState, useEffect, useRef } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { Picker, Estado } from '@react-native-picker/picker';


import Container from '../components/Container';
import Body from '../components/Body';
import InputPedido from '../components/inputPedido';
import Logo from '../components/Logo';

import { insertUsuarios, updateUsuarios } from '../services/Usuarios.services';
import { useNavigation } from '@react-navigation/native';

import Button from '../components/ButtonFormulario';



const CadastroUsuario =  ({ route }) => {
    
    const  { item }  = route.params ? route.params : {};
    const navigation = useNavigation();
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [endereco, setEndereco] = useState("");
    const [estado, setEstado] = useState("");
    const [perfil, setPerfil] = useState();
    const [tipoLixo, setTipoLixo] = useState();
    const pickerRef = useRef();    

    function open() {
        pickerRef.current.focus();
    }

    function close() {
        pickerRef.current.blur();
    }

    useEffect(() => { 
                if (item) {                    
                    setNome(item.nome);
                    setEmail(item.email);                   
                    setEndereco(item.endereco);
                    setEstado(item.estado);
                    setPerfil(item.perfil);
                    setTipoLixo(item.tipoLixo);                    
                }

            }, [item]);
    
    
    const handleChangeEstado=(itemValue, itemIndex) =>setEstado(itemValue);
    const handleChangePerfil=(itemValue, itemIndex) =>setPerfil(parseInt(itemValue));
    const handleChangeTipoLixo=(itemValue, itemIndex) =>setTipoLixo(parseInt(itemValue));

    async function handleCadastrarOuEditar(event) {
        
        if(item) {
            await updateUsuarios(
                {    
                    id: item.id,                
                    nome: item.nome,
                    email: item.email,                    
                    endereco: item.endereco,
                    estado: item.estado,
                    perfil: item.perfil,
                    tipoLixo: item.tipoLixo
                },
                navigation.navigate("PerfilUsuario")
            );
        }
        else {
            await insertUsuarios(
                {
                    nome: nome,
                    email: email,
                    senha: senha,
                    endereco: endereco,
                    estado: estado,
                    perfil: perfil,
                    tipoLixo: tipoLixo,
                },
                navigation.navigate("Login")
            );
        }
    }

    function handleVoltar() {        
        navigation.goBack();
    }

    return (
        <Container  style={styles.container}>

            <ScrollView>
                <Logo />

                <Body>
                    <Text style={styles.titulo} >Cadastre-se</Text>
                    <InputPedido
                        label="* Nome:"
                        value={nome}
                        onChangeText={(text) => setNome(text)}
                        keyboardType="default"
                        required
                        style={styles.textLableInput}
                    />
                    <InputPedido
                        label="* E-mail:"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        keyboardType="default"
                        required
                        style={styles.textLableInput}
                    />
                    {item
                    ? <div/>
                    :<InputPedido
                    label= "* Senha:"
                    value={senha}
                    secureTextEntry
                    onChangeText={(text) => setSenha(text)}
                    keyboardType="default"
                    required
                    style={styles.textLableInput}
                    />}
                    
                    <InputPedido
                        label="* Endereço:"
                        value={endereco}
                        onChangeText={(text) => setEndereco(text)}
                        keyboardType="default"
                        required
                        style={styles.textLableInput}
                    />


                        <Picker                           
                            selectedValue={estado}
                            onValueChange={handleChangeEstado}
                            style={styles.picker}
                            itemStyle={styles.pickerItem}
                        >
                        <Picker.Item label="* Estado" />
                        <Picker.Item label="Acre" value={"Acre"} />
                        <Picker.Item label="Alagoas" value={"Alagoas"} />
                        <Picker.Item label="Amapá" value={"Amapá"} />
                        <Picker.Item label="Amazonas" value={"Amazonas"} />
                        <Picker.Item label="Bahia" value={"Bahia"} />
                        <Picker.Item label="Ceará" value={"Ceará"} />
                        <Picker.Item label="Distrito Federal" value={"Distrito Federal"} />
                        <Picker.Item label="Espírito Santo" value={"Espírito Santo"} />
                        <Picker.Item label="Goiás" value={"Goiás"} />
                        <Picker.Item label="Maranhão" value={"Maranhão"} />
                        <Picker.Item label="Mato Grosso" value={"Mato Grosso"} />
                        <Picker.Item label="Mato Grosso do Sul" value={"Mato Grosso do Sul"} />
                        <Picker.Item label="Minas Gerais" value={"Minas Gerais"} />
                        <Picker.Item label="Pará" value={"Pará"} />
                        <Picker.Item label="Paraíba" value={"Paraíba"} />
                        <Picker.Item label="Paraná" value={"Paraná"} />
                        <Picker.Item label="Pernambuco" value={"Pernambuco"} />
                        <Picker.Item label="Piauí" value={"Piauí"} />
                        <Picker.Item label="Rio de Janeiro" value={"Rio de Janeiro"} />
                        <Picker.Item label="Rio Grande do Norte" value={"Rio Grande do Norte"} />
                        <Picker.Item label="Rio Grande do Sul" value={"Rio Grande do Sul"} />
                        <Picker.Item label="Rondônia" value={"Rondônia"} />
                        <Picker.Item label="Roraima" value={"Roraima"} />
                        <Picker.Item label="Santa Catarina" value={"Santa Catarina"} />
                        <Picker.Item label="São Paulo" value={"São Paulo"} />
                        <Picker.Item label="Sergipe" value={"Sergipe"} />
                        <Picker.Item label="Tocantins" value={"Tocantins"} />
                        </Picker>
                    
                    <Picker
                        selectedValue={perfil}
                        onValueChange={handleChangePerfil}
                        style={styles.picker}
                        itemStyle={styles.pickerItem}
                    >
                         <Picker.Item label="* Perfil" />
                        <Picker.Item label="Solicitante" value={0} />
                        <Picker.Item label="Coletor" value={1} />
                    </Picker>

                    <Picker
                            selectedValue={tipoLixo}
                            onValueChange={handleChangeTipoLixo}
                            style={styles.picker}
                            itemStyle={styles.pickerItem}
                        >
                            <Picker.Item label="* Tipo de lixo" />
                            <Picker.Item label="Eletrodoméstico" value={0} />
                            <Picker.Item label="Eletroportáteis" value={1} />
                            <Picker.Item label="Monitores" value={2} />
                            <Picker.Item label="Iluminação" value={3} />
                            <Picker.Item label="Fios e Cabos" value={4} />
                            <Picker.Item label="Pilhas e baterias" value={5} />
                            <Picker.Item label="TI e telecomunicações" value={6} />
                            <Picker.Item label="Painéis Fotovoltaicos" value={7} />
                        </Picker>                     
                        
                        {item 
                        ? <Button
                            title="Editar"
                            theme={{ colors: { primary: '#FFFFFF' } }}
                            onPress={() => handleCadastrarOuEditar()}
                        />
                        :<Button
                        title="Cadastrar"
                        theme={{ colors: { primary: '#FFFFFF' } }}
                        onPress={() => handleCadastrarOuEditar()}
                    />
                        }
                        <Button
                            title="Voltar"
                            theme={{ colors: { primary: '#FFFFFF' } }}
                            onPress={() => handleVoltar()}
                        />
                        
                </Body>
                
            </ScrollView>

        </Container>
    );
};

const styles = StyleSheet.create({
    titulo: {
        fontSize: 24,
        marginBottom: 40,
        color: '#fff',
        textAlign: 'center',
    },
    picker: {
        backgroundColor: "#EDEBEB",
        // marginBottom: 10,
        height: 56,
        fontSize: 16,
        fontWeight: '400',
        marginVertical: 8,
        color: '#6d6c6d',
    },
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    textLableInput: {
        fontSize: 16,
        fontWeight: '400',
        marginVertical: 8,
    },
    pickerItem:{
        fontSize: 16,
        fontWeight: '400',
        marginVertical: 8,
         textAlign:'left', 
}
});

export default CadastroUsuario;