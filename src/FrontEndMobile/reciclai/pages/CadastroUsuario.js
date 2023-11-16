import React, { useState, useEffect, useRef } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';


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
        <Container>

            <ScrollView>
                <Logo />

                <Body>
                    <Text style={styles.titulo} >Cadastre-se</Text>
                    <InputPedido
                        label="* Nome:"
                        value={nome}
                        onChangeText={(text) => setNomeUsuario(text)}
                    />
                    <InputPedido
                        label="* E-mail:"
                        value={email}
                        onChangeText={(text) => setEmailUsuario(text)}
                    />
                    <InputPedido
                        label="* Senha:"
                        value={senha}
                        secureTextEntry
                        onChangeText={(text) => setSenhaUsuario(text)}
                    />
                    <InputPedido
                        label="* Endereço:"
                        value={endereco}
                        onChangeText={(text) => setDescricaoUsuario(text)}
                    />


                    <Picker
                        ref={pickerRef}
                        selectedValue={perfil}
                        onValueChange={handleChangePerfil}
                        style={styles.picker}
                    >

                        <Picker.Item label="Solicitante" value={0} />
                        <Picker.Item label="Coletor" value={1} />
                    </Picker>


                </Body>
            </ScrollView>

        </Container>
    );
};

const styles = StyleSheet.create({
    titulo: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
        margin: 5,
        textAlign: 'center',

    },
    picker: {
        backgroundColor: "#EDEBEB",
        marginBottom: 10,
        borderRadius: 5,
        width: '80%',
        height: 50,
        color: '#cac4d0',
    },
});

export default CadastroUsuario;