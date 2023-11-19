import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const ButtonPedido = (props) => {
   
    return <Button  mode="elevated"  onPress={props.onPress} style={styles.button}>
        <Icon name="plus" size={22} color={'#FFFFFF'}/>
    </Button>
          
  
};

const styles = StyleSheet.create({
    button: {
        position: 'absolute', 
        right: 80,
        marginTop: 90,
        marginRight: 5,
        backgroundColor:'#4660BE'
            
    }
});

export default ButtonPedido;