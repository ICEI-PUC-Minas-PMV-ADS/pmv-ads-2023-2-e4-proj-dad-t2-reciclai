import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

const BtnNew = (props) => {
    return  <Button
    mode="contained"
    onPress={props.onPress}
    style={styles.button}>
      {props.title}
    </Button>
};

const styles = StyleSheet.create({
    button: {
      backgroundColor: '#4660BE',
      width: 135,
      
    }
});

export default BtnNew;