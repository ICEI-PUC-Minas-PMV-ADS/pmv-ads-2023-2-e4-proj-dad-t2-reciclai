import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, Alert, View } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { getUsuario, deleteUsuario } from '../services/Usuarios.services';
import { useUser } from '../contexts/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Container from '../components/Container';
import CardPerfil from '../components/CardPerfil';
import Body from '../components/Body';
import Logo from '../components/Logo';
import ButtonDelete from '../components/ButtonDelete';
import Button from '../components/ButtonFormulario';

const PerfilUsuario = () => {
    const { setSigned, name, idUsuario, setUserId } = useUser();
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
           await AsyncStorage.removeItem('jwtToken');
            setSigned(false);
          
            Alert.alert(
              'Sucesso',
              'Usuário excluído com sucesso!',
              [{ text: 'OK', onPress: () => navigation.navigate('Login') }]
            );
          }
        } catch (error) {
          console.error('Erro ao excluir usuário:', error);

          Alert.alert(
            'Erro',
            'Não foi possível excluir o usuário. Por favor, tente novamente mais tarde.',
            [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
          );
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
            <View style={styles.container}>
                <Text style={styles.titulo}>Perfil do Usuário</Text>
                <CardPerfil>
                <Text style={styles.cardText}><Text style={{ fontWeight: 'bold' }}>Nome:</Text> {nome}</Text>
                <Text style={styles.cardText}><Text style={{ fontWeight: 'bold' }}>Email:</Text> {email}</Text>
                <Text style={styles.cardText}><Text style={{ fontWeight: 'bold' }}>Endereço:</Text> {endereco}</Text>
                <Text style={styles.cardText}><Text style={{ fontWeight: 'bold' }}>Estado:</Text> {estado}</Text>
                <Text style={styles.cardText}><Text style={{ fontWeight: 'bold' }}>Perfil: </Text>{perfil}</Text>
                <Text style={styles.cardText}><Text style={{ fontWeight: 'bold' }}>Tipo de Lixo:</Text> {tipoLixo}</Text>
                </CardPerfil>

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
                </View>
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
        fontSize: 28,
        marginBottom: 20,
        color: '#fff',
        textAlign: 'center',
    },

    cardText: {
        fontSize: 18,
        marginBottom: 10,
        color: '#333',
        

    },

});

export default PerfilUsuario;