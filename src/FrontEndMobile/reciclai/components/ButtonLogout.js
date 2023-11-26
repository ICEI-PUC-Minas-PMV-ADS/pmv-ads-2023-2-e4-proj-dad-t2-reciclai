import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const ButtonLogout = (props) => {
   
    return <Button  mode="text"  onPress={props.onPress} style={styles.button}>
        <Icon name="logout" size={22} color={'#FFFFFF'}/>
    </Button>
          
  
};

const styles = StyleSheet.create({
    button: {
        position: 'absolute', 
        right: 0,
        marginRight: 5,
 
            
    }
});

export default ButtonLogout;