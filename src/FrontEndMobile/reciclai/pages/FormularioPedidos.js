import React, { useState, useEffect, useRef } from 'react';
import { ScrollView, StyleSheet, Text, View, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import RNDateTimePicker, {  DateTimePickerAndroid } from '@react-native-community/datetimepicker';

import Container from '../components/Container';
import Body from '../components/Body';
import InputPedido from '../components/inputPedido';
import Logo from '../components/Logo';

import { insertPedidos, insertUsuariosPedidos } from '../services/Pedidos.services';
import Button from '../components/ButtonFormulario';

const FormularioPedidos = () => {

    const pickerRef = useRef();

    function open() {
        pickerRef.current.focus();
    }

    function close() {
        pickerRef.current.blur();
    }

    const navigation = useNavigation();
    //const { item } = route.params ? route:params;

    const [nomeSolicitante, setNomeSolicitante] = useState('');
    const [dataColeta, setDataColeta] = useState('');
    const [Aux1Coleta, setAux1Coleta] = useState(new Date());
    const [Aux2Coleta, setAux2Coleta] = useState(new Date());
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
        if (value === 'true') {
            setLixoPerigoso(true);
        } else if (value === 'false') {
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
            "dataColeta": Aux1Coleta + Aux2Coleta,
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

                        {/* <InputPedido
                            label="Data da coleta:"
                            value={dataColeta}
                            format="YYYY-MM-DD hh:mm:ss"
                            //maxLength={12}
                            onChange={e => setDataColeta(e.target.value)}
                            keyboardType="numeric"
                            required
                        /> */}

                        <View>
                        <Text style={styles.textLableInput}>Data da coleta</Text>
                        {/* O datePicker funciona nativamente apenas no Ios
                        para android é preciso modificações */}
                        {Platform.OS === 'android' ? (
                            <TouchableOpacity
                                onPress={() =>
                                    DateTimePickerAndroid.open({
                                        mode: 'date',
                                        value: Aux1Coleta,
                                        onChange: (event, date) =>
                                            event.type === 'set' ? setAux1Coleta(date) : null,
                                    })
                                }
                            >
                                <View style={styles.textInput}>
                                    <Text>{Aux1Coleta.toLocaleDateString('pt-BR', {timeZone: 'UTC'})}</Text>
                                </View>
                            </TouchableOpacity>
                        ) : (
                            <RNDateTimePicker
                                mode="date"
                                value={Aux1Coleta}
                                style={{height: 50 }}
                                onChange={(event, date) => setAux1Coleta(date)}
                            />
                        )}
                        <Text style={styles.textLableInput}>Horário da coleta</Text>
                        {/* O datePicker funciona nativamente apenas no Ios
                        para android é preciso modificações */}
                        {Platform.OS === 'android' ? (
                            <TouchableOpacity
                                onPress={() =>
                                    DateTimePickerAndroid.open({
                                        mode: 'time',
                                        is24Hour: true,
                                        value: Aux2Coleta,
                                        onChange: (event, date) =>
                                            event.type === 'set' ? setAux2Coleta(date) : null,
                                    })
                                }
                            >
                                <View style={styles.textInput}>
                                    <Text>{Aux2Coleta.toLocaleTimeString('pt-BR', {timeZone: 'UTC'})}</Text>
                                </View>
                            </TouchableOpacity>
                        ) : (
                            <RNDateTimePicker
                                mode="time"
                                value={Aux2Coleta}
                                style={{ height: 50 }}
                                onChange={(event, date) => setAux2Coleta(date)}
                            />
                        )}
                        </View>


                        <InputPedido
                            label="Endereço:"
                            value={endereco}
                            onChangeText={(text) => setEndereco(text)}
                            keyboardType="default"
                            required
                        />

                        <Picker
                            ref={pickerRef}
                            selectedValue={lixoPerigoso}
                            onValueChange={handleChangeLixoPerigoso}
                            style={styles.picker}
                            itemStyle={{fontSize:16, height:50, textAlign:'left', marginLeft: -13}}
                        >
                            <Picker.Item label="Lixo Perigoso" />
                            <Picker.Item label="Não" value={false} />
                            <Picker.Item label="Sim" value={true} />
                        </Picker>

                        <Picker
                            ref={pickerRef}
                            mode='dialog'
                            numberOfLines={1}
                            selectedValue={tipoLixo}
                            onValueChange={handleChangeTipoLixo}
                            style={styles.picker}
                            itemStyle={{fontSize:16, height:50, textAlign:'left', marginLeft: -13}}
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
                            onChange={e => setQuantidadeLixo(e.target.value > 0 ? e.target.value.replace(/[^a-zA-Z0-9]/g, "") : 0)}
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
                            theme={{ colors: { primary: '#FFFFFF' } }}
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
        //height: 50,
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
});

export default FormularioPedidos;