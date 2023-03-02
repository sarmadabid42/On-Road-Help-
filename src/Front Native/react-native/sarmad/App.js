import React, {useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './component/Home';
import Loginscreen from './component/Loginscreen';
import Map from './component/Map';
import Request from './component/Requests';
import SelectCatagory from './component/SelectCatagory';
import Service from './component/Service';
import SignUp from './component/Signup';
import Forgetpassword from './component/Forgetpassword';
import UserResponder from './component/UserResponder';
import Responder from './component/Responder';
import UserRequest from'./component/UserRequest';
import Responderservice from './component/Responderservice';
import userhelps from './component/userhelps';
import Myservices from './component/Myservices';
import CurrentRequests from './component/CurrentRequests';
import Torespond from './component/Torespond';
import userfeedback from'./component/userfeedback';
import summary from'./component/summary';
import RPfeedback from'./component/RPfeedback';
import Distancemap from './component/Distancemap';
import Task from './component/Task';
import ManageFamily from './component/ManageFamily';
import Addfamilymember from './component/Addfamilymember';
import Notification from './component/Notification';
import ResponderList from './component/ResponderList';
const Stack = createNativeStackNavigator();
export default function Login(props) {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Signup"screenOptions={{headerTitleAlign:'center'}}>
        <Stack.Screen name="Signup" component={SignUp} />
        <Stack.Screen name="Loginscreen" component={Loginscreen}options={{headerTitleAlign:'center'}} />
        <Stack.Screen name="Forgetpassword" component={Forgetpassword}options={{headerTitleAlign:'center'}} />
        <Stack.Screen name="UserResponder"  component={UserResponder}options={{headerTitleAlign:'center'}} />
        <Stack.Screen name="Service" component={Service}options={{headerTitle:'center'}} />
        <Stack.Screen name="Responder"component={Responder}options={{headerTitle:'center'}}/>
        <Stack.Screen name="Responderservice"component={Responderservice}options={{headerTitle:'center'}}/>
        <Stack.Screen name="UserRequest"component={UserRequest}options={{headerTitle:'center'}}/>
        <Stack.Screen name="userhelps"component={userhelps}options={{headerTitle:'center'}}/>
        <Stack.Screen name="Myservices"component={Myservices}options={{headerTitle:'center'}}/>
        <Stack.Screen name="CurrentRequests"component={CurrentRequests}options={{headerTitle:'center'}}/>
        <Stack.Screen name="userfeedback"component={userfeedback}options={{headerTitle:'center'}}/>
        <Stack.Screen name="RPfeedback"component={RPfeedback}options={{headerTitle:'center'}}/>
        <Stack.Screen name="Distancemap"component={Distancemap}options={{headerTitle:'center'}}/>
        <Stack.Screen name="Task"component={Task}options={{headerTitle:'center'}}/>
        <Stack.Screen name="ManageFamily"component={ManageFamily}options={{headerTitle:'center'}}/>
        <Stack.Screen name="Addfamilymember"component={Addfamilymember}options={{headerTitle:'center'}}/>
        <Stack.Screen name="Notification"component={Notification}options={{headerTitle:'center'}}/>
        <Stack.Screen name="ResponderList"component={ResponderList}options={{headerTitle:'center'}}/>

        <Stack.Screen name="summary"component={summary}options={{headerTitle:'center'}}/>

        <Stack.Screen name="SelectCatagory" component={SelectCatagory}options={{headerTitle:'center'}}/>
        <Stack.Screen name="Torespond" component={Torespond}options={{headerTitle:'center'}}/>

        
        

        
        
        <Stack.Screen
          name="Home"component={Home}
        />
        <Stack.Screen name="Map" component={Map} />
        
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Request" component={Request} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  myBackground: {
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#ffffff',

    alignItems: 'center',
  },
  myBox: {
    flexDirection: 'row',
    height: 40,
    marginTop: 10,
    marginLeft: 35,
    marginRight: 35,
    marginBottom: 0,
  },
  inputStyle: {
    color: '#000000',
    flex: 1,
    paddingLeft: 15,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#646464',
  },
  txt: {
    fontWeight: '400',
    fontSize: 12,
  },
  sign: {
    color: '#339FFF',
    fontWeight: 'bold',
    fontSize: 10,
  },
});
// import React, { useState } from "react";
// import { View, StyleSheet } from "react-native";
// import { Picker } from "@react-native-picker/picker";


// const App = () => {
//   const [selectedValue, setSelectedValue] = useState("Select catagory");
//   return (
//     <View style={styles.container}>
//       <Picker
//         selectedValue={selectedValue}
//         style={{ height: 50, width: 210,borderRadius:5,borderColor:"black",
//           borderColor: "#20232a",}}
//         onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
//       >
//         <Picker.Item label="Select catagory" value="Select catagory" />
//         <Picker.Item label="food item " value="food item" />
//         <Picker.Item label="first aid " value="first aid" />
//         <Picker.Item label="Mechanical issue " value="Mechanical issue" />
//         <Picker.Item label="Electrical issues " value="Electrial issues" />

//       </Picker>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     marginTop:30,
//     marginLeft:50,
//     marginRight:50,

//     //paddingTop: 20,
//     alignItems: "center",
//     backgroundColor: 'white',
//     borderWidth: 4,
//     borderColor: "black",
    
    
    
    
    
//   }
// });

//  export default App;

//  Geocode
//  import React, { useState } from 'react';
//  import { View,TouchableOpacity,Text } from 'react-native';
//  function app(){
//  const [color,setColor] = useState();
//  const changeColor = ()=>{
  
//   setColor("red");
//  }
//   return(
// <View>

// <TouchableOpacity>
//         <Text
//           onPress={() => changeColor()}
//           style={{
//             fontSize: 25,
//             color: '#ffffff',
//             paddingLeft: 40,
//             paddingRight: 30,
//             backgroundColor: '#339FFF',
//             borderWidth: 2,
//             // borderRadius: 40,
//             marginLeft:-20,
            
//             height:50,
//             width:230,
//             borderColor: '#339FFF',
//             marginBottom:225,
//             marginTop:25,
//             borderRadius:10,
//           }}>
//           Addservice
//         </Text>
//       </TouchableOpacity>
      
//       </View>
//   );
//  }
 
//  export default app;

// import React, { useState } from "react";
// import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";

// const App = () => {
//   const [modalVisible, setModalVisible] = useState(false);
//   return (
//     <View style={styles.centeredView}>
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => {
//           Alert.alert("Modal has been closed.");
//           setModalVisible(!modalVisible);
//         }}
//       >
//         <View style={styles.centeredView}>
//           <View style={styles.modalView}>
//             <Text style={styles.modalText}>Hello World!</Text>
//             <Pressable
//               style={[styles.button, styles.buttonClose]}
//               onPress={() => setModalVisible(!modalVisible)}
//             >
//               <Text style={styles.textStyle}>Hide Modal</Text>
//             </Pressable>
//           </View>
//         </View>
//       </Modal>
//       <Pressable
//         style={[styles.button, styles.buttonOpen]}
//         onPress={() => setModalVisible(true)}
//       >
//         <Text style={styles.textStyle}>Show Modal</Text>
//       </Pressable>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   centeredView: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 22
//   },
//   modalView: {
//     margin: 20,
//     backgroundColor: "white",
//     borderRadius: 20,
//     padding: 35,
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5
//   },
//   button: {
//     borderRadius: 20,
//     padding: 10,
//     elevation: 2
//   },
//   buttonOpen: {
//     backgroundColor: "#F194FF",
//   },
//   buttonClose: {
//     backgroundColor: "#2196F3",
//   },
//   textStyle: {
//     color: "white",
//     fontWeight: "bold",
//     textAlign: "center"
//   },
//   modalText: {
//     marginBottom: 15,
//     textAlign: "center"
//   }
// });

// export default App;
// import React from 'react';
// import { TouchableHighlight, View, Text, StyleSheet } from 'react-native';

// export default function Button() {

//   var [ isPress, setIsPress ] = React.useState(false);

//   var touchProps = {
//     activeOpacity: 1,
//     underlayColor: 'green',                               // <-- "backgroundColor" will be always overwritten by "underlayColor"
//     style: isPress ? styles.btnPress : styles.btnNormal, // <-- but you can still apply other style changes
//     onHideUnderlay: () => setIsPress(false),
//     onShowUnderlay: () => setIsPress(true),
//     onPress: () => console.log('HELLO'),                 // <-- "onPress" is apparently required
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableHighlight {...touchProps}>
//         <Text>Click here</Text>
//       </TouchableHighlight>
//     </View>
//   );
// }

// var styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   btnNormal: {
//     borderColor: 'blue',
//     borderWidth: 1,
//     borderRadius: 10,
//     height: 30,
//     width: 100,
//   },
//   btnPress: {
//     borderColor: 'blue',
//     borderWidth: 1,
//     height: 30,
//     width: 100,
//   }
// });
// import * as React from 'react';
// import { Button, View, TouchableOpacity, Text } from 'react-native';


// export default function App() {
//   return (
//     <View style={{ padding: 30 }}>
//       <Button title="Login Android" color="#1E6738" />
//       <TouchableOpacity style={{ backgroundColor: '#1E6738' }}>
//         <Text style={{ color: '#fff', textAlign: 'center' }}>Login iOS</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }
// import React,{useState}
//  from "react";
//  import {SafeAreaView,FlatList,Text, View,
//  Button} from 'react-native'

//  function FlatListDemo ({navigation}){
//    let[arr, setArr] = useState(["Bus", "Car","Flower","","Moon",]);
//    let u_pcatagory;
// //    const submit = async () => {
// //     try {
      
// //           await fetch('http://192.168.43.32/OnRoadHelp1/api/help/HelpRequest', {
// //           method: 'POST',
// //           headers: {
// //             Accept: 'application/json',
// //             'Content-Type': 'application/json',
// //           },
// //           body: JSON.stringify({
// //             u_pcatagory:u_pcatagory,
            
//             console.log(arr)
            
// //           }),
// //         })
// //           .then(response => response.json())
// //           .then(data => {
// //               // console.log(data)
// //               if (data == 'ok') 
// //               {
// //               alert('submission request Successfully');
              
// //             } 
// //           });
// //       } catch (error) {
// //         console.log('POST submission failed');
// //         console.log(error.message);
// //       }
// //     };
//     return (
//     <SafeAreaView>
//         <FlatList 
//             data={arr}
//             renderItem={({item,index})=>{
//                 //console.log(obj)
//                 return (
//                   //  <TouchableOpacity onPress={()=>{
//                   //   global.category=item
//                   //    navigation.navigate("Map",{item})
//                   //   }}>
//                 <View style={{
//                     flex:1,
//                     justifyContent:'center',
//                     height:100,
//                 borderColor:'grey',
//                 borderWidth:2, margin:5}}>
//                 <Text>{index} : {item}</Text>
//                 {/* <Button title="Delete" 
//                 onPress={()=>{
//                     let temp = []
//                     for(let i = 0; i < arr.length;i++){
//                         if(arr[i]!= item){
//                             temp.push(arr[i])
//                         }
//                     }
//                     console.log(temp)
//                     setArr(temp)
//                 }}/> */}
//                 </View>
                
//                 )
//             }}
//             keyExtractor={(d, index)=>
//                  index.toString()
//             }
        
//         />
//     </SafeAreaView>)
//  }
//  export default FlatListDemo




 
 
 
  





