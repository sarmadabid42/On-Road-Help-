import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';

const HelloWorldApp = ({navigation}) =>(
    <View style={styles.container}>
    
    <FAB
    
    small
    icon="plus"
    onPress={() => navigation.navigate('Service')}

  />   
  </View>

);  
    const styles = StyleSheet.create({
        fab: {
          position: 'absolute',
          margin: 50,
          right: 0,
          bottom: 0,
        },
  
  
  
  
    });
export default HelloWorldApp;