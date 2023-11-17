import React from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';

const InputPedido = (props) => {
  return (
    <TextInput
      style={styles.input}
      mode="flat"
      textColor='grey'
      selectionColor="green"
      activeUnderlineColor="green"
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#EDEBEB",
    marginBottom: 10,
    borderRadius: 5,
    height: 50,
    width: '80%'
  },
});


export default Input;