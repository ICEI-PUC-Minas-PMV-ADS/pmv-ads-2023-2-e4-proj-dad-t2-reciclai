import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

const ButtonPedido = (props) => {
    return  <Button
                icon={props.icon}
                onPress={props.onPress}
                theme={props.theme}
                style= {styles.button}
                mode="elevated">
                    {props.title}
                   
            </Button>
};

const styles = StyleSheet.create({
    button: {
      position: 'absolute', 
      right: 0,
      marginTop: 80,
      marginRight: 5,
      backgroundColor:'#4660BE',
    
    }
});

export default ButtonPedido;