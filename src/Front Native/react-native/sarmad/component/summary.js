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
        console.log("NOTIFICATION:", notification);
    
      
        
       },
       requestPermissions: Platform.OS === 'ios'
});


const HelloWorldApp = () => {
  const [nam, setNam] = useState('');
  const [data, setMyUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
 
  
  
  let stat="Pending";
  let hid;

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
      const response = await fetch(`http://192.168.56.1/OnRoadHelp1/api/Help/GetSummary?id=`+global.userID);
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

  const getSummaryByDate = async () => {
    const response = await fetch(`http://192.168.56.1/OnRoadHelp1/api/Help/GetSummary?id=`+global.userID+'&fromDate='+fromDate+'&toDate='+toDate);
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

const getSummaryByReset = async () => {
  const response = await fetch(`http://192.168.56.1/OnRoadHelp1/api/Help/ResetCount?id=`+global.userID);
  const data = await response.json();
  setMyUserData(data);
  setIsLoading(false);
  console.log("RES2222====>> " + JSON.stringify(data))
    async () => {
      try {
        await AsyncStorage.setItem("key", JSON.stringify(data));
        Alert.alert('reset', 'Successful');
      } catch (error) {
        Alert.alert('Error', 'There was an error.')
      }
    }

};

  
 

    
   

  useEffect(() => {
    getUserData();
  }, []);
//end

const [fromDate, setfromDate] = useState('')
const [toDate, settoDate] = useState('')


  return (
   

    <View style={{marginLeft:30,}}>
    
    <View>
      <View style={{flexDirection: 'row', justifyContent: "space-around"}}>
      <Text>From</Text>
      <TextInput style={styles.inputStyle}
        placeholder='YYYY-MM-DD'
        autoCapitalize='none'
        placeholderTextColor={'black'}
        onChangeText={(e)=>setfromDate(e)}
        />
        <Text>To</Text>
         <TextInput style={styles.inputStyle}
        placeholder='YYYY-MM-DD'
        autoCapitalize='none'
        placeholderTextColor={'black'}
        onChangeText={(e)=>settoDate(e)}
        />
      </View>
      <View style={{margin: 15,width:100}}>
        <Button onPress={() => getSummaryByDate()} title="Search"/>
      </View>
      <View style={{margin: 15,width:100}}>
        <Button onPress={() => getSummaryByReset()} title="Reset"/>
      </View>
    </View>

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
        height:150,
        padding:5,
        
    borderColor:'grey',
    borderWidth:2, margin:5}}>
        
  {item.count >0  }
       {/* <Text>{item.catg}</Text> */}
         
        {/* <Text style={{fontSize:16,fontWeight:"bold"}}>Problem: {item.u_problem}</Text>
        <Text style={{fonSize:16,fontWeight:"bold"}}>problem catagory:{item.u_pcatagory}</Text> */}
        <Text style={{fontSize:22,fontWeight:"bold",marginLeft:5}}>Service Type: {item.Service_Type}</Text>
        {/* <Text style={{fontSize:16,fontWeight:"bold"}}>Service_Type:{item.Service_Type}</Text> */}
        <Text style={{fontSize:20,fontweight:"bold",marginLeft:5}}>Count: {item.count}</Text>
        {/* <Text style={{fontSize:20,fontweight:"bold",marginLeft:5}}>Status: {item.status}</Text> */}
        {/* <Text style={{fontSize:16,fontweight:"bold"}}>DateTime:{item.DateTime}</Text> */}

      

        
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
  inputStyle:
    {
      width: 150,
      height: 50,
      borderWidth: 1,
      borderColor: 'red'
    },
});

export default HelloWorldApp;

