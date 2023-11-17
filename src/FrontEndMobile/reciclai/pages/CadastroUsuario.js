import React, { useState, useEffect, useRef } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { Picker, Estado } from '@react-native-picker/picker';


import Container from '../components/Container';
import Body from '../components/Body';
import InputPedido from '../components/inputPedido';
import Logo from '../components/Logo';

import { insertUsuarios } from '../services/Usuarios.services';
import { useNavigation } from '@react-navigation/native';


const CadastroUsuario = () => {
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
        async function postUser() {
            await insertUsuarios().then((item) => {
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
            });
        }
        postUser();
    }, []);

    const handleChangePerfil = (e) => {
        setPerfil(e.target.value);
    };
    const handleChangeTipoLixo = (e) => {
        setTipoLixo(e.target.value);
    };
    const handleChangeEstado = (e) => {
        setEstado(e.target.value);
    };

    async function handleSubmit(event) {
        event.preventDefault();

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
            navigation.navigate("/login")
        );
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
                    <InputPedido
                        label="* Senha:"
                        value={senha}
                        secureTextEntry
                        onChangeText={(text) => setSenha(text)}
                        keyboardType="default"
                        required
                        style={styles.textLableInput}
                    />
                    <InputPedido
                        label="* Endereço:"
                        value={endereco}
                        onChangeText={(text) => setEndereco(text)}
                        keyboardType="default"
                        required
                        style={styles.textLableInput}
                    />


                        <Picker
                            ref={pickerRef}
                            mode='dialog'
                            numberOfLines={1}
                            selectedValue={estado}
                            onValueChange={handleChangeEstado}
                            style={styles.picker}
                            itemStyle={styles.pickerItem}
                        >
                        <Picker.Item label="* Estado" />
                        <Picker.Item label="Acre" value={0} />
                        <Picker.Item label="Alagoas" value={1} />
                        <Picker.Item label="Amapá" value={2} />
                        <Picker.Item label="Amazonas" value={3} />
                        <Picker.Item label="Bahia" value={4} />
                        <Picker.Item label="Ceará" value={5} />
                        <Picker.Item label="Distrito Federal" value={6} />
                        <Picker.Item label="Espírito Santo" value={7} />
                        <Picker.Item label="Goiás" value={8} />
                        <Picker.Item label="Maranhão" value={9} />
                        <Picker.Item label="Mato Grosso" value={10} />
                        <Picker.Item label="Mato Grosso do Sul" value={11} />
                        <Picker.Item label="Minas Gerais" value={12} />
                        <Picker.Item label="Pará" value={13} />
                        <Picker.Item label="Paraíba" value={14} />
                        <Picker.Item label="Paraná" value={15} />
                        <Picker.Item label="Pernambuco" value={16} />
                        <Picker.Item label="Piauí" value={17} />
                        <Picker.Item label="Rio de Janeiro" value={18} />
                        <Picker.Item label="Rio Grande do Norte" value={19} />
                        <Picker.Item label="Rio Grande do Sul" value={20} />
                        <Picker.Item label="Rondônia" value={21} />
                        <Picker.Item label="Roraima" value={22} />
                        <Picker.Item label="Santa Catarina" value={23} />
                        <Picker.Item label="São Paulo" value={24} />
                        <Picker.Item label="Sergipe" value={25} />
                        <Picker.Item label="Tocantins" value={26} />
                        </Picker>
                    
                    <Picker
                        ref={pickerRef}
                        selectedValue={perfil}
                        onValueChange={handleChangePerfil}
                        style={styles.picker}
                        itemStyle={styles.pickerItem}
                    >
                         <Picker.Item label="* Perfil" value={0} />
                        <Picker.Item label="Solicitante" value={1} />
                        <Picker.Item label="Coletor" value={2} />
                    </Picker>

                    <Picker
                            ref={pickerRef}
                            mode='dialog'
                            numberOfLines={1}
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

                        <Picker
                            ref={pickerRef}
                            mode='dialog'
                            numberOfLines={1}
                            selectedValue={estado}
                            onValueChange={handleChangeEstado}
                            style={styles.picker}
                            itemStyle={styles.pickerItem}
                        >
                        <Picker.Item label="* Estado" />
                        <Picker.Item label="Acre" value={0} />
                        <Picker.Item label="Alagoas" value={1} />
                        <Picker.Item label="Amapá" value={2} />
                        <Picker.Item label="Amazonas" value={3} />
                        <Picker.Item label="Bahia" value={4} />
                        <Picker.Item label="Ceará" value={5} />
                        <Picker.Item label="Distrito Federal" value={6} />
                        <Picker.Item label="Espírito Santo" value={7} />
                        <Picker.Item label="Goiás" value={8} />
                        <Picker.Item label="Maranhão" value={9} />
                        <Picker.Item label="Mato Grosso" value={10} />
                        <Picker.Item label="Mato Grosso do Sul" value={11} />
                        <Picker.Item label="Minas Gerais" value={12} />
                        <Picker.Item label="Pará" value={13} />
                        <Picker.Item label="Paraíba" value={14} />
                        <Picker.Item label="Paraná" value={15} />
                        <Picker.Item label="Pernambuco" value={16} />
                        <Picker.Item label="Piauí" value={17} />
                        <Picker.Item label="Rio de Janeiro" value={18} />
                        <Picker.Item label="Rio Grande do Norte" value={19} />
                        <Picker.Item label="Rio Grande do Sul" value={20} />
                        <Picker.Item label="Rondônia" value={21} />
                        <Picker.Item label="Roraima" value={22} />
                        <Picker.Item label="Santa Catarina" value={23} />
                        <Picker.Item label="São Paulo" value={24} />
                        <Picker.Item label="Sergipe" value={25} />
                        <Picker.Item label="Tocantins" value={26} />
                        </Picker>
                        
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