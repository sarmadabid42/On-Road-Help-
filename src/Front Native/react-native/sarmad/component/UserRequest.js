
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
      const response = await fetch(`http://192.168.56.1/OnRoadHelp1/api/Help/AllHelpRequest`);
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
        height:100,
    borderColor:'grey',
    borderWidth:2, margin:5}}>
    

        {/* <Image source={{ uri: item.p_image }}
          resizeMode='stretch'
          resizeMethod='resize'
          style={{ width: 350, height: 200 }}
        /> */}
        {/* <TouchableOpacity
          onPress={() => navigation.navigate("Map", { longitude: item.longitude, latitude: item.latitude })}
        >
          <View style={{ flexDirection: 'row' }}>
            <Icon name='map-marker-alt' color={'red'} size={20} />

            <Text style={{ marginLeft: 10 }}>{item.p_name}</Text>
          </View>
        </TouchableOpacity> */}


        {/* <TouchableOpacity onPress={() => navigation.navigate('Rating', { storeKro:item.p_name })}>
          <View style={{ flexDirection: 'column', alignItems: 'center', marginTop: '-70%' }}>
            <Icon name='star' color={'red'} size={20} />

          </View>
        </TouchableOpacity> */}





        {/* <Text>{item.catg}</Text> */}
        <Text style={{fontSize:20,fontWeight:"bold",color:"blue"}}>{item.First_Name} {item.Last_Name}</Text>
        <Text style={{fontSize:16,fontWeight:"bold"}}>Problem: {item.u_problem}</Text>
        <Text style={{fontSize:16,fontWeight:"bold"}}>problem catagory:{item.u_pcatagory}</Text>
        
        
        
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
