import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

const ButtonIcon2 = (props) => {
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
        width: '50%',
        alignSelf: 'center',
        margin: 15,
    }
});

export default ButtonIcon2;