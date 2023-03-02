import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function  SelectCatagory() {
  return (
    <View style ={styles.container}>
      <Text>Select Catagory</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
       flex:1,
       justifycontent:'center',
       alignItems:'center',
    },

});

