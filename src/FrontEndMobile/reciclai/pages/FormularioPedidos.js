import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Picker, Text, View, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Container from '../components/Container';
import Body from '../components/Body';
import InputPedido from '../components/inputPedido';
import Logo from '../components/Logo';

import { insertPedidos, insertUsuariosPedidos } from '../services/Pedidos.services';
import Button from '../components/ButtonFormulario';

const FormularioPedidos = () => {

    const navigation = useNavigation();
    //const { item } = route.params ? route:params;

    const [nomeSolicitante, setNomeSolicitante] = useState('');
    const [dataColeta, setDataColeta] = useState('2012-12-12T12:00');
    const [endereco, setEndereco] = useState('');
    const [lixoPerigoso, setLixoPerigoso] = useState('');
    const [descricao, setDescricao] = useState('');
    const [tipoLixo, setTipoLixo] = useState('');
    const [status, setStatus] = useState('');
    const [quantidadeLixo, setQuantidadeLixo] = useState('');

    const handleChangeTipoLixo = (value) => {
        setTipoLixo(value);
    }

    const handleChangeLixoPerigoso = (value) => {
        if(value === 'true'){
            setLixoPerigoso(true);
        } else if(value === 'false'){
            setLixoPerigoso(false);
        }
    }

    // const handleQtd = (text) => {
    //     if (typeof text === 'string') {
    //         const qtd = text.replace(/[^0-9]/g, '');
    //         setQuantidadeLixo(qtd);
    //     }
    // }

    async function handleSubmit() {

        await insertPedidos({
            "idSolicitante": 1,
            "idColetor": 1,
            "nomeSolicitante": nomeSolicitante,
            "dataColeta": dataColeta,
            "endereco": endereco,
            "lixoPerigoso": lixoPerigoso,
            "descricao": descricao,
            "tipoLixo": parseInt(tipoLixo),
            "qtdLixo": quantidadeLixo,
            "status": 0,
            //}).then(res => {
            //navigation.goBack();
            //console.log(res);
        });
        //console.log(novoPedido.id);

        // await insertUsuariosPedidos({
        //     "pedidoId": novoPedido.id,
        //     "usuarioId": parseInt(userId)
        // });

        // await insertUsuariosPedidos({
        //     "pedidoId": novoPedido.id,
        //     "usuarioId": coletor
        // });

        // navigation.navigate('/buscaColetor');
    }


    return (
        <Container>

            <ScrollView>
                <Logo />

                <Body>
                    <View style={styles.container}>
                        <Text style={styles.titulo} >Formulário de pedido</Text>

                        <InputPedido
                            label="Nome:"
                            value={nomeSolicitante}
                            onChangeText={(text) => setNomeSolicitante(text)}
                            keyboardType="default"
                            required
                        />

                        <InputPedido
                            label="Data da coleta:"
                            value={dataColeta}
                            format="YYYY-MM-DD hh:mm:ss"
                            //maxLength={12}
                            onChange={e => setDataColeta(e.target.value)}
                            keyboardType="numeric"
                            required
                        />

                        <InputPedido
                            label="Endereço:"
                            value={endereco}
                            onChangeText={(text) => setEndereco(text)}
                            keyboardType="default"
                            required
                        />

                        <Picker
                            selectedValue={lixoPerigoso}
                            onValueChange={handleChangeLixoPerigoso}
                            style={styles.picker}
                        >
                            <Picker.Item label="Lixo Perigoso" />
                            <Picker.Item label="Não" value={false} />
                            <Picker.Item label="Sim" value={true} />
                        </Picker>

                        <Picker
                            selectedValue={tipoLixo}
                            onValueChange={handleChangeTipoLixo}
                            style={styles.picker}
                        >
                            <Picker.Item label="Tipo de lixo" />
                            <Picker.Item label="Eletrodoméstico" value={0} />
                            <Picker.Item label="Eletroportáteis" value={1} />
                            <Picker.Item label="Monitores" value={2} />
                            <Picker.Item label="Iluminação" value={3} />
                            <Picker.Item label="Fios e Cabos" value={4} />
                            <Picker.Item label="Pilhas e baterias" value={5} />
                            <Picker.Item label="TI e telecomunicações" value={6} />
                            <Picker.Item label="Painéis Fotovoltaicos" value={7} />
                        </Picker>

                        <InputPedido
                            type="number"
                            label="Quantidade de lixo:"
                            onChange={e => setQuantidadeLixo(e.target.value)}
                            value={quantidadeLixo}
                            keyboardType="numeric"
                            required
                        />

                        <InputPedido
                            type="text"
                            label="Descrição:"
                            onChange={e => setDescricao(e.target.value)}
                            value={descricao}
                            keyboardType="default"
                            required
                        />


                        <Button
                            title="Solicitar"
                            theme={{ colors: { primary: '#FFFFFF' }}}
                            onPress={() => handleSubmit()}
                        />

                    </View>
                </Body>
            </ScrollView>

        </Container >
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
        marginBottom: 10,
        borderRadius: 5,
        width: '80%',
        height: 50,
        color: '#cac4d0',
        fontFamily: 'sans-serif'
    },
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
});

export default FormularioPedidos;