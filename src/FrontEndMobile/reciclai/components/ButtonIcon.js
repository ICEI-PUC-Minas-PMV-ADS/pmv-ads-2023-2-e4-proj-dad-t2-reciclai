import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

const ButtonIcon = (props) => {
    return  <Button
                icon={props.icon}
                onPress={props.onPress}
                theme={{ colors: {primary: '#3E2500'}}}
                style= {styles.button}>
                    {props.title}
            </Button>
};

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        margin: 15
    }
});

export default ButtonIcon;