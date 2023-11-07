import React from 'react';
import { StyleSheet, Image, View } from 'react-native';


const Logo = () => {
    return <View style={styles.logo}>
        <Image style={styles.image} source={require('../assets/logo_reciclai.png')} />
    </View>

};

const styles = StyleSheet.create({
    image: {
        width: 180,
        height: 90,
        marginTop: 40,
    },
    logo: {
        alignItems: 'center',
        marginTop: 10,
    }
});

export default Logo;