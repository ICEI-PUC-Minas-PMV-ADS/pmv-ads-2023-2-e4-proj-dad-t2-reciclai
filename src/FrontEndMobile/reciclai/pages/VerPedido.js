import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { getPedidos, updatePedidos } from '../services/Pedidos.services';
import { getUsuario } from '../services/Usuarios.services';
import { useNavigation } from '@react-navigation/native';


import Text1 from '../components/Text';
import Text2 from '../components/Text2';
import Container from '../components/Container';
import Card from '../components/Card';
import Body from '../components/Body';
import Titulo from '../components/Titulo';
import ButtonIcon from '../components/ButtonIcon';
import ButtonGoBack from '../components/ButtonGoBack';
import Logo from '../components/Logo';


const VerPedido = ({ route }) => {
    const { item } = route.params ? route.params : {};
    const navigation = useNavigation();
    const [id, setId] = useState('');
    const [nomeSolicitante, setNomeSolicitante] = useState('');
    const [dataColeta, setDataColeta] = useState('');
    const [endereco, setEndereco] = useState('');
    const [lixoPerigoso, setLixoPerigoso] = useState();
    const [descricao, setDescricao] = useState();
    const [tipoLixo, setTipoLixo] = useState();
    const [status, setStatus] = useState();
    const [quantidadeLixo, setQuantidadeLixo] = useState();

    const Status =
        [
            'Processando',
            'Pedido Aceito',
            'Pedido Cancelado'
        ];

    const TipoLixo =
        [
            'Eletrodomestico',
            'Eletroportateis',
            'Monitores',
            'Iluminação',
            'Fios e cabos',
            'Pilhas e baterias',
            'TI e telecomunicações',
            'Painéis Fotovoltaicos'
        ];

    const isFocused = useIsFocused();

    useEffect(() => {
        fetchPedidos();
        editarPedido();
    }, [isFocused])

    async function fetchPedidos() {

        const res = await getPedidos(item.id)
        setId(res.id)
        setNomeSolicitante(res.nomeSolicitante)
        setDataColeta(res.dataColeta)
        setEndereco(res.endereco)
        setLixoPerigoso(res.lixoPerigoso)
        setDescricao(res.descricao)
        setTipoLixo(res.tipoLixo)
        setStatus(res.status)
        setQuantidadeLixo(res.qtdLixo)

    };

    async function editarPedido() {
        await updatePedidos(item.id).then(res => {
            if (item) {
                setId(res.id)
                setNomeSolicitante(res.nomeSolicitante)
                setDataColeta(res.dataColeta)
                setEndereco(res.endereco)
                setLixoPerigoso(res.lixoPerigoso)
                setDescricao(res.descricao)
                setTipoLixo(res.tipoLixo)
                setStatus(res.status)
                setQuantidadeLixo(res.qtdLixo)
            }
        })
    }

    // async function postEmail(email){
    //     await enviarEmail({
    //       "email": email,
    //       "perfil": 1
    //     });
    //   }

    async function handleAceitar(event) {
        event.preventDefault();
        if (item.id) {
            await updatePedidos({
                "id": item.id,
                "idSolicitante": item.idSolicitante,
                "idColetor": item.idColetor,
                "nomeSolicitante": item.nomeSolicitante,
                "dataColeta": item.dataColeta,
                "endereco": item.endereco,
                "lixoPerigoso": item.lixoPerigoso,
                "descricao": item.descricao,
                "tipoLixo": item.tipoLixo,
                "qtdLixo": item.quantidadeLixo,
                "status": 1,
            });

            // const idEmail = item.idSolicitante;
            // const sendEmail = await getUsuario(idEmail);
            // const emailSolicitante = sendEmail.email;

            // postEmail(emailSolicitante);
        }
    }

    async function handleCancelar(event) {
        event.preventDefault();
        if (item.id) {
            await updatePedidos({
                "id": item.id,
                "idSolicitante": item.idSolicitante,
                "idColetor": item.idColetor,
                "nomeSolicitante": item.nomeSolicitante,
                "dataColeta": item.dataColeta,
                "endereco": item.endereco,
                "lixoPerigoso": item.lixoPerigoso,
                "descricao": item.descricao,
                "tipoLixo": item.tipoLixo,
                "qtdLixo": item.quantidadeLixo,
                "status": 2,
            });

            // await enviarEmail({
            //     "email": emailSolicitante(),
            //     "perfil": 1
            // });
        }
    }


    return (
        <Container>
            <ScrollView>

                <Logo />

                <Body>
                    <Card>

                        <Titulo title={"Número do pedido: " + id} />

                        <ButtonGoBack
                            onPress={() => navigation.navigate('Histórico')} />

                        <Text1 title="Nome: " />
                        <Text2 name={nomeSolicitante} />

                        <Text1 title="Endereço: " />
                        <Text2 name={endereco} />

                        <Text1 title="Descrição:" />
                        <Text2 name={descricao} />

                        <Text1 title="Data da Coleta: " />
                        <Text2 name={dataColeta} />

                        <Text1 title="Tipo de Descarte: " />
                        <Text2 name={TipoLixo[tipoLixo]} />

                        <Text1 title="Quantidade: " />
                        <Text2 name={quantidadeLixo} />

                        <Text1 title="Status: " />
                        <Text2 name={Status[status]} />

                        <View style={styles.button}>

                            <ButtonIcon onPress={handleAceitar} icon="check" title="Aceitar" theme={{ colors: { primary: '#24926D' } }} />
                            <ButtonIcon onPress={handleCancelar} icon="trash-can" title="Cancelar" theme={{ colors: { primary: '#a51b0b' } }} />

                        </View>

                    </Card>


                </Body>
            </ScrollView>
        </Container>
    );
}

const styles = StyleSheet.create({
    button: {
        flex: 1,
        justifyContent: "center",
        flexDirection: "row"
    },
    logo: {
        alignItems: 'center',
        marginTop: 10,
    }
}
);



export default VerPedido;