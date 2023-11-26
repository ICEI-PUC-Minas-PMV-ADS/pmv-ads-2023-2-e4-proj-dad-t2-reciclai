import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

const CardPesquisa = ({ children, text }) => {
    return <View style={styles.containerCard}>{children}
        <Text style={styles.texto}>{text}</Text>
    </View>
};

const styles = StyleSheet.create({
    containerCard: {
        width: "100%",
        alignSelf: 'center',
        borderRadius: 10,
        padding: 10,
        marginBottom:1,
        backgroundColor: '#fff',
        marginBottom:10,
    }
});

export default CardPesquisa;