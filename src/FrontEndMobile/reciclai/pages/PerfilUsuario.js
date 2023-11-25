import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, Alert } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { getUsuario, deleteUsuario } from '../services/Usuarios.services';
import { useUser } from '../contexts/UserContext';

import Container from '../components/Container';
import Card from '../components/Card';
import Body from '../components/Body';
import Logo from '../components/Logo';
import ButtonDelete from '../components/ButtonDelete';
import Button from '../components/ButtonFormulario';

const PerfilUsuario = () => {
    const {  idUsuario } = useUser();
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [endereco, setEndereco] = useState('');
    const [perfil, setPerfil] = useState('');
    const [senha, setSenha] = useState('');
    const [tipoLixo, setTipoLixo] = useState('');
    const [estado, setEstado] = useState('');
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [item, setItem] = useState('');
    const Perfis = ['Solicitante', 'Coletor'];

    const TiposDeLixo = [
        'Eletrodoméstico',
        'Eletroportáteis',
        'Monitores',
        'Iluminação',
        'Fios e cabos',
        'Pilhas e baterias',
        'TI e telecomunicações',
        'Painéis Fotovoltaicos',
    ];

    useEffect(() => {
        fetchUsuario();
    }, [isFocused]);

    async function fetchUsuario() {
        try {
            const res = await getUsuario(idUsuario);
            setNome(res.nome);
            setEmail(res.email);
            setSenha(res.senha);
            setEndereco(res.endereco);
            setPerfil(Perfis[res.perfil]);
            setTipoLixo(TiposDeLixo[res.tipoLixo]);
            setEstado(res.estado);
            setItem(res);
        } catch (error) {
            console.error('Erro ao buscar informações do usuário:', error);
        }
    }

const handleEditar = () => {
  
        navigation.navigate('CadastroUsuario', { item });
};

    async function handleExcluir() {
        try {
            const confirmacao = await mostrarMensagemConfirmacao('Tem certeza que deseja excluir o usuário?');
            if (confirmacao) {
                await deleteUsuario(idUsuario);
                navigation.navigate('/');
            }
        } catch (error) {
            console.error('Erro ao excluir usuário:', error);
        }
    }

    const mostrarMensagemConfirmacao = (mensagem) =>
        new Promise((resolve) => {
            Alert.alert(
                'Confirmação',
                mensagem,
                [
                    { text: 'Cancelar', onPress: () => resolve(false), style: 'cancel' },
                    { text: 'Confirmar', onPress: () => resolve(true) },
                ],
                { cancelable: false }
            );
        });

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
                    onPress={handleEditar}
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