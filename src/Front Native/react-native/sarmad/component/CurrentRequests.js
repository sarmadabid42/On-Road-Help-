import React, { useRef, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  FlatList,
  
  
} from "react-native";

import PushNotification from "react-native-push-notification";
 PushNotification.configure({
     onNotification: function (notification) {
        console.log("NOTIFICATION:", notification,);
    
      
        
       },
       requestPermissions: Platform.OS === 'ios'
});


const HelloWorldApp = (props) => {
  const [nam, setNam] = useState('');
  const [data, setMyUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let stat="Pending";

  useEffect(()=>{
    
    createChannels();
  }, []);



  const createChannels = ()=>{
    PushNotification.createChannel({
      channelId : "test-channel",
      channelName: "Test channel"
    })

  }


  const getUserData = async () => {
      const response = await fetch(`http://192.168.56.1/OnRoadHelp1/api/help/showtorespond?id=`+global.userID);
      const data = await response.json();
      setMyUserData(data);
      setIsLoading(false);
      console.log("RES2222====>> " + JSON.stringify(data))
        async () => {
          try {
            await AsyncStorage.setItem("key", JSON.stringify(data));
            Alert.alert('Saved', 'Successful');
          } catch (error) {
            Alert.alert('Error', 'There was an error.')
          }
        }
  
  };

  useEffect(() => {
    getUserData();
  }, []);
//end
 
  return (
   

    <View style={{marginLeft:30,}}>
    <FlatList
    // data={data.filter(b => b.p_name.includes(text))             
    //  data={data.filter(b => (b.city.toUpperCase().includes(text.toUpperCase())))}
     data={data}
     numColumns={1}
    // keyExtractor={item => item.id}
   

    //keyExtractor={item => item.id}
    renderItem={({ item,index }) =>
      <View style={{
        flex:1,
        justifyContent:'center',
        height:155,
    borderColor:'grey',
    borderWidth:2, margin:5}}>
    

        {/* <Text>{item.catg}</Text> */}
        {/* <Text style={{fo20Size:20,fontWeight:"bold",color:"blue"}}>{item.First_Name} {item.Last_Name}</Text>
        <Text style={{fontSize:16,fontWeight:"bold"}}>Problem: {item.u_problem}</Text>
        <Text style={{fonSize:16,fontWeight:"bold"}}>problem catagory:{item.u_pcatagory}</Text> */}
        <Text style={{fontSize:22,fontWeight:"bold",marginLeft:10}}>Catagory: {item.u_pcatagory}</Text> 
        {/* <Text style={{fontSize:16,fontWeight:"bold"}}>Service_Type:{item.Service_Type}</Text> */}
        <Text style={{fontSize:20,fontweight:"bold",marginLeft:10}}>Problem: {item.u_problem}</Text>
        <Text style={{fontSize:20,fontweight:"bold",marginLeft:10}}>Status: {item.status}</Text>

        {/* <Text style={{fontSize:16,fontweight:"bold"}}>DateTime:{item.DateTime}</Text> */}
        <TouchableOpacity onPress={()=>props.navigation.navigate('userfeedback',{id:item.Helpid})}>
        <Text
          style={{
            padding:10,
            fontSize: 20,
            fontWeight: '500',
            color: '#ffffff',
            // marginLeft: 50,
            // marginRight: 50,
            backgroundColor: '#339FFF',
            borderWidth: 1,
            borderRadius: 10,
            //marginTop: 40,
            borderColor: '#339FFF',
            textAlign: 'center',
            marginRight:190,
            marginLeft:10,
            margin:5
            
          }}>
          Complete
        </Text>
        </TouchableOpacity>
        
      </View>
    }
    
    
  />
  
  


    </View>
)

  
};

const styles = StyleSheet.create({
  menuName: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  
  },
});

export default HelloWorldApp;

