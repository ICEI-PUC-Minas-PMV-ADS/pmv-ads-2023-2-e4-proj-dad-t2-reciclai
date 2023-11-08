import React from 'react';
import {Text,StyleSheet, View} from 'react-native';

const Card = ({children, text}) =>{
  return <View style={styles.containerCard}>{children}
  <Text style={styles.texto}>{text}</Text>
    </View>
};

const styles = StyleSheet.create({
 containerCard:{ 
    width:"100%",
    borderRadius: 10,
    backgroundColor:"#EDEBEB",
    padding:10,
    marginVertical: 15,

  },

});

export default Card;