import React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { Text } from 'react-native-paper';


const Titulo = (props) => {
  return   <Text style={styles.textTitulo}>{props.title}{props.name}</Text>
          
};

const styles = StyleSheet.create({
    textTitulo: {
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
        marginTop:15,
    }
});

export default Titulo;