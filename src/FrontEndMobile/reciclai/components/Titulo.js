import React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { Headline } from 'react-native-paper';


const Titulo = (props) => {
  return   <Headline style={styles.textTitulo}>{props.title}{props.name}</Headline>
          
};

const styles = StyleSheet.create({
    textTitulo: {
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        marginTop:15,
        color: '#FFFFFF',
    }
});

export default Titulo;