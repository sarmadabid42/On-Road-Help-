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
  Modal,
} from "react-native";

import PushNotification from "react-native-push-notification";
 PushNotification.configure({
     onNotification: function (notification) {
        console.log("NOTIFICATION:", notification);
    
      
        
       },
       requestPermissions: Platform.OS === 'ios'
});


const HelloWorldApp = (props) => {
  const [nam, setNam] = useState('');
  const [data, setMyUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState(30);
  const [intervalId, setIntervalId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    setModalVisible(true)
    setIntervalId(
      setInterval(() => {
        setCount((count) => {
          if (count === 0) {
            setModalVisible(false)
            return () => clearInterval(intervalId);
          }
          return count - 1;
        });
      }, 3000)
    );

    
  }, []);
 
  
  
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
      const response = await fetch(`http://192.168.56.1/OnRoadHelp1/api/Help/ToRespond?id=`+global.userID);
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

  //Accept Api
  const acceptApi = async (hid,stat) => {
    try {
      
      console.log("inside post api");
      console.log(hid);
      console.log(stat);
      fetch(`http://192.168.56.1/OnRoadHelp1/api/Help/RespondRequest?helpid=`+hid+'&type='+stat, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',

        },
      }).then((response) => response.json())
        //.then((responseData) => {
          //console.log('bhai jan yai id hai lai lo:', responseData);
          //props.navigation.navigate('Home');

        //}).done();
      } catch (error) {
        console.log('POST submission failed');
        console.log(error.message);
      }
    }; 
 

    
   

  useEffect(() => {
    getUserData();
  }, []);
//end
 
  return (
    

    <View style={{marginLeft:30,}}>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={{ padding: 20 }}
      >
        {/* <Text>Open Modal</Text> */}
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      ><View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ width: 250, height: 200, backgroundColor: 'white',marginBottom:90, }}>
        <Text> Time to notify your family:</Text>
        <Text> Remaining Time:{count}</Text>
        

        <TouchableOpacity
          onPress={() => setModalVisible(false)}
          style={{ padding: 20 }}
        >
          <Text>Cancel</Text>
        </TouchableOpacity>
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
        width:200,
        padding:5,
        
    borderColor:'grey',
    borderWidth:2, margin:5}}>
        
        
        {/* <Text>{item.catg}</Text> */}
        {/* <Text style={{fo20Size:20,fontWeight:"bold",color:"blue"}}>{item.First_Name} {item.Last_Name}</Text>
        <Text style={{fontSize:16,fontWeight:"bold"}}>Problem: {item.u_problem}</Text>
        <Text style={{fonSize:16,fontWeight:"bold"}}>problem catagory:{item.u_pcatagory}</Text> */}
        <Text style={{fontSize:22,fontWeight:"bold",marginLeft:5}}>Catagory: {item.u_pcatagory}</Text>
        {/* <Text style={{fontSize:16,fontWeight:"bold"}}>Service_Type:{item.Service_Type}</Text> */}
        <Text style={{fontSize:20,fontweight:"bold",marginLeft:5}}>Problem: {item.u_problem}</Text>
        <Text style={{fontSize:20,fontweight:"bold",marginLeft:5}}>Status: {item.status}</Text>
        
        {/* <Text style={{fontSize:16,fontweight:"bold"}}>DateTime:{item.DateTime}</Text> */}

      <View style={{flexDirection:"row"}}>
        
        <View style={{flexDirection: 'row'}}>
     {item.status=='Pending' ? <><TouchableOpacity onPress={() => { acceptApi(item.Helpid, 'Accept'); } }>
              <Text
                style={{
                  padding: 10,
                  fontSize: 18,
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
                  margin: 10
                }}>
                Accept
              </Text>
            </TouchableOpacity><TouchableOpacity onPress={() => acceptApi(item.Helpid, 'Reject')}>
                <Text
                  style={{
                    padding: 10,
                    fontSize: 18,
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
                    margin: 10
                  }}>
                  Reject
                </Text>
              </TouchableOpacity>
              
              </>
        :
       
    //     <TouchableOpacity onPress={()=>props.navigation.navigate('Distancemap')}>
    //     <Text
    //       style={{
    //         padding:8,
    //         fontSize: 18,
    //         fontWeight: '500',
    //         color: '#ffffff',
    //         // marginLeft: 50,
    //         // marginRight: 50,
    //         backgroundColor: '#339FFF',
    //         borderWidth: 1,
    //         borderRadius: 10,
    //         //marginTop: 40,
    //         borderColor: '#339FFF',
    //         textAlign: 'center',
    //         margin:10
    //       }}>
    //       View Map
    //     </Text>
    //     </TouchableOpacity>
        
     

<TouchableOpacity onPress={()=>props.navigation.navigate('RPfeedback',{id:item.Helpid})}>
        <Text
          style={{
            padding:8,
            fontSize: 18,
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
            margin:10
          }}>
          Feedback
        </Text>
        </TouchableOpacity>
    
        }
      
        
    
        
        </View>
        
  
  
    
      </View>

        
      </View>
    }
    
    
  />
     </View>
     </View>
     </Modal>
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

