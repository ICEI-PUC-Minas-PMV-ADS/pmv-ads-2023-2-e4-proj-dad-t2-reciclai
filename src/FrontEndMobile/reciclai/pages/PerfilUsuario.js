import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getUsuario, deleteUsuario } from '../services/Usuarios.services';
import Container from '../components/Container';
import Card from '../components/Card';
import Body from '../components/Body';
import Logo from '../components/Logo';
import ButtonDelete from '../components/ButtonDelete';

import Button from '../components/ButtonFormulario';

const PerfilUsuario = () => {
    const userId = '3';
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [endereco, setEndereco] = useState('');
    const [perfil, setPerfil] = useState('');
    const [tipoLixo, setTipoLixo] = useState('');
    const [estado, setEstado] = useState('');
    const navigation = useNavigation();

    const Perfil = ['Solicitante', 'Coletor'];

    const TipoLixo = [
        'Eletrodomestico',
        'Eletroportateis',
        'Monitores',
        'Iluminação',
        'Fios e cabos',
        'Pilhas e baterias',
        'TI e telecomunicações',
        'Painéis Fotovoltaicos',
    ];

    useEffect(() => {
        fetchUsuario();
    }, []);

    async function fetchUsuario() {
        try {
            const res = await getUsuario(userId);
            setNome(res.nome);
            setEmail(res.email);
            setEndereco(res.endereco);
            setPerfil(Perfil[res.perfil]);
            setTipoLixo(TipoLixo[res.tipoLixo]);
            setEstado(res.estado);
        } catch (error) {
            console.error('Erro ao buscar informações do usuário:', error);
        }
    }

    const handleEditar = () => {
        navigation.navigate('Cadastro', { userId });
    };

    async function handleExcluir() {
        try {
            await deleteUsuario(userId);
            navigation.navigate('UsuarioApagado');
        } catch (error) {
            console.error('Erro ao excluir usuário:', error);
        }
    }

    return (
        <Container>
            <Logo />
            <Body>

                <Text style={styles.titulo}>Perfil do Usuário</Text>
                <Card>
                    <Text>Nome: {nome}</Text>
                    <Text>Email: {email}</Text>
                    <Text>Endereço: {endereco}</Text>
                    <Text>Estado: {estado}</Text>
                    <Text>Perfil: {perfil}</Text>
                    <Text>Tipo de Lixo: {tipoLixo}</Text>
                </Card>

                <Button
                    title="Editar"
                    theme={{ colors: { primary: '#FFFFFF' } }}
                    onPress={() => handleEditar()}
                />

                <ButtonDelete
                    title="Excluir"
                    theme={{ colors: { primary: '#FFFFFF' } }}
                    type="outline"
                    onPress={handleExcluir}

                />



            </Body>
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titulo: {
        fontSize: 24,
        marginBottom: 10,
        color: '#fff',
        textAlign: 'center',
    },

});

export default PerfilUsuario;