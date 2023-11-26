import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const ButtonGoBack = (props) => {
   
    return <Button  mode="text"  onPress={props.onPress} style={styles.button}>
        <Icon name="keyboard-backspace" size={24} color={'#4660BE'}/>
    </Button>
          
  
};

const styles = StyleSheet.create({
    button: {
        position: 'absolute', 
        left: 0,
        marginTop: 20,
        backgroundColor:'#EDEBEB'
            
    }
});

export default ButtonGoBack;