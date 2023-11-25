import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

const CardPerfil = ({ children, text }) => {
    return <View style={styles.containerCard}>{children}
        <Text style={styles.texto}>{text}</Text>
    </View>
};

const styles = StyleSheet.create({
    containerCard: {
        width: "100%",
        alignSelf: 'center',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        backgroundColor: '#fff',
    }
});

export default CardPerfil;