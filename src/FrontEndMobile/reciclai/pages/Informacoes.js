import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import Button from '../components/Button';
import Container from '../components/Container';
import Logo from '../components/Logo';


const Informacoes = () => {
    const navigation = useNavigation();

    return (
        <Container>
            <Logo  />
            <ScrollView>
                <Text style={styles.titulo}>Veja como é fácil utilizar nosso App</Text>
                <View style={styles.caixa}>
                    <View style={styles.card}>
                        <Image
                            source={require('../assets/img1.png')}
                            style={styles.cardImage}
                        />
                        <View style={styles.cardContent}>
                            <Text style={styles.title}>Separe seu material</Text>
                            <Text style={styles.description}>
                                Antes de solicitar a coleta, separe e embale seu material para facilitar o trabalho do coletor
                            </Text>
                        </View>
                        <View style={styles.cardActions}>
                            {/* Your buttons or actions go here */}
                        </View>
                    </View>

                    <View style={styles.card}>
                        <Image
                            source={require('../assets/img3.jpg')}
                            style={styles.cardImage}
                        />
                        <View style={styles.cardContent}>
                            <Text style={styles.title}>Agende sua coleta</Text>
                            <Text style={styles.description}>
                                Use nosso campo de busca para escolher um coletor de sua preferência e, após isso, agende sua coleta
                            </Text>
                        </View>
                        <View style={styles.cardActions}>
                            {/* Your buttons or actions go here */}
                        </View>
                    </View>
                    <View style={styles.card}>
                        <Image
                            source={require('../assets/img2.jpg')}
                            style={styles.cardImage}
                        />
                        <View style={styles.cardContent}>
                            <Text style={styles.title}>Pedido realizado!</Text>
                            <Text style={styles.description}>
                                Depois de confirmar as informações do agendamento, basta aguardar a visita do coletor no endereço solicitado
                            </Text>
                        </View>
                        <View style={styles.cardActions}>
                            {/* Your buttons or actions go here */}
                        </View>
                    </View>
                    <View style={styles.card}>
                        <Image
                            source={require('../assets/img4.png')}
                            style={styles.cardImage}
                        />
                        <View style={styles.cardContent}>
                            <Text style={styles.title}>Resíduos perigosos</Text>
                            <Text style={styles.description}>
                            Os tipos de resíduos perigosos que aceitamos são pilhas e baterias. Os demais tipos não são aceitos por nossos coletores. Para saber mais sobre resíduos perigosos e como descartá-los corretamente, clique em saber mais.
                            </Text>
                        </View>
                        <View style={styles.cardActions}>
                            {/* Your buttons or actions go here */}
                        </View>
                    </View>
                </View>
                <Button
                title= "Voltar"
                onPress={() => navigation.goBack()}
                />
            </ScrollView>
        </Container>

    );
};

const styles = StyleSheet.create({
    titulo:{
        color:'#E5E4E2',
        fontSize: 18,
        marginLeft: 15,
        textAlign:'center',
    },
    caixa: {
        width: '90%',
        alignSelf: 'center',
        alignItems: 'stretch',
    },
    card: {
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        marginTop: 25,
        backgroundColor: '#C2E5D3',
        overflow: 'hidden',
        elevation: 2,
    },
    cardImage: {
        height: 250,
        alignSelf: 'center',
        resizeMode: 'cover',
        width: '90%',
        marginTop: 10,
    },
    cardContent: {
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
        color: 'black',
    },
    description: {
        fontSize: 18,
        color: 'black',
    },
    cardActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
    },
});

export default Informacoes;