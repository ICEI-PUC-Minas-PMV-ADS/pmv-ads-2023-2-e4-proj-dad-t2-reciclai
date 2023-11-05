import React from 'react';
import { StyleSheet, Text } from 'react-native';

const Text1 = (props) => {
  return  <Text style={styles.texto}>{props.title}{props.name}</Text>
};

const styles = StyleSheet.create({
    texto: {
        fontSize: 15,
        padding: 3,
        fontWeight: '500',
       
      }
});

export default Text1;