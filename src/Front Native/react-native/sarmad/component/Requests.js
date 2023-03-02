import React, { useState } from "react";
import { View,Text,StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";


const App = () => {
  const [selectedValue, setSelectedValue] = useState();
  return (
    <View style={styles.container}>
        <Text style={{backgroundColor:'#03fc2c',width:400, height:60,marginTop:0,marginBottom:40,padding:15,paddingLeft:150,justifyContent:'center'}}> On Road Help</Text>
      
      
      
      <Picker 
        selectedValue={selectedValue}
        style={{ height: 50, width:270, borderWidth:1,backgroundColor:'white',padding:30}}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
        <Picker.Item label="New Requests" value="New Requests"onPress={() => props.navigation.navigate('SelectCatagory')} />
        <Picker.Item label="Existing Requests" value="Existing Requests" />
        <Picker.Item label="History" value="History" />


      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    
    flex:1,
    alignItems: "center",
    backgroundColor:'#03f4fc',
    borderWidth:1,
    
    
}
    
    
    
});

export default App;
