import React  from 'react'

//  const Maplive=()=> {
//   return (
//     <div>Maplive</div>
//   )
// }
// export default Maplive;



import { View, Button, TextInput, TouchableOpacity, StyleSheet, Image, Text } from 'react-native';
//import { ScrollView } from 'react-native-gesture-handler';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';

import { useState,useEffect } from 'react';


 const Maplive=({navigation,props})=> {
  const [problem, setProblem] = useState('');
  const [item,setitem] = useState('');
    
  
  
  
  
  let apikey;
  let lati, lon;
  let u_pcatagory;
  const [curentPosition, setCurentPosition] = useState({
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421, latitude: 33.6844,
    longitude: 73.0479,
  });
  const onMapPress = (e) => {
    // alert("coordinates:" + JSON.stringify(e.nativeEvent.coordinate))
    setCurentPosition({
      ...curentPosition,
      latitude: e.nativeEvent.coordinate.latitude,
      longitude: e.nativeEvent.coordinate.longitude
    })

    lati = curentPosition.latitude;
    lon = curentPosition.longitude;

  }
  const [position, setPosition] = useState({
    latitude: 33.6660103,
    longitude: 73.1531032,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  });
  useEffect(() => {
    Geolocation.getCurrentPosition((pos) => {
      const crd = pos.coords;
      setPosition({
        latitude: crd.latitude,
        longitude: crd.longitude,
        latitudeDelta: 0.0421,
        longitudeDelta: 0.0421,
      });
      Geocoder.init("AIzaSyC070RlqUc-CGgfM0FqcjI51csUqtihGl4");
      Geocoder.from(crd.latitude,crd.longitude)
    //   .then(json =>{
    //     json.results[0].address_components.forEach((value,index))=>{
    //     this.setState{{address:json.result[0].formatted_address,tempaddress:json.results[0].formatted_address}}
    //    )
    //   }
    // }

 
    }).catch((err) => {
      console.log(err);
    });
  }, []);







 
  const submit = async () => {
    try {
      
      //console.log("inside post api");
     await fetch(`http://192.168.56.1/OnRoadHelp1/api/help/HelpRequest`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',

        },

      
        body: JSON.stringify({
          u_id: global.userID,
          u_problem:problem,
            lat: curentPosition.latitude,
            lon: curentPosition.longitude,
            u_pcatagory:global.category,
            

        }),
      })
      // .then((response) => response.json())
      //   .then((responseData) => {
      //     console.log("User Id", global.userID);
      //     console.log("Problem", problem);
      //     console.log("Latitude", curentPosition.latitude);
      //     console.log("Longnitude", curentPosition.longitude);
      //     console.log('up_category', global.category);
      //     //props.navigation.navigate('Home');

      //   }).done();

        .then(response => response.json())
        .then(data => {
          if (data == 'ok') {
            alert('Service Added Sucessfully!');
            navigation.navigate('UserResponder');
          } 
          
        });
      } catch (error) {
        console.log('POST submission failed');
        console.log(error.message);
      }
    };
  
  
   
  return (
    <View>
    {/* MAP Code */}
    <Text style={{backgroundColor:'blue',fontWeight:'bold',width:'100%',fontSize:20,height:60,textAlign:"center",padding:15,marginTop:0}}>Pickup your location</Text> 
    
  
    
    <View >

<View style={styles.mapcontainer}>
          <MapView
            onPress={(e) => onMapPress(e)}
            
            style={styles.map}
            initialRegion={position}
            showsUserLocation={true}
            showsMyLocationButton={true}
            followsUserLocation={true}
            showsCompass={true}
            scrollEnabled={true}
            zoomEnabled={true}
            pitchEnabled={true}
            rotateEnabled={true}>
            <Marker title ='user' coordinate={{
              latitude: parseFloat(curentPosition.latitude),
              longitude: parseFloat(curentPosition.longitude),
            }}

            />

          </MapView>
          
          <TouchableOpacity>
         <Text
           onPress={() => submit()}
           style={{
             fontSize: 25,
             color: '#ffffff',
             paddingLeft: 25,
             paddingRight: 25,
             backgroundColor: '#339FFF',
             borderWidth: 1,
             // borderRadius: 40,
             //margin: 10,
             borderColor: '#339FFF',
             //marginBottom:225,
             marginBottom:-320,
             borderRadius:5,
             marginTop:280,
             marginRight:50,
           }}>
           submit
         </Text>
       </TouchableOpacity>
          <View style={styles.myBox}>
         <TextInput  style={styles.inputStyle}
         placeholder='Enter your Problem'
         autoCapitalize='none'
         placeholderTextColor={'black'}
         onChangeText={(problem)=>setProblem(problem)}
         />
         </View>


       </View>
      </View>
      <View style={{ backgroundColor: "red", width:100, marginLeft:50,paddin:50,margin:-80}}>
        <Text>{curentPosition.latitude}</Text>
        <Text>{curentPosition.longitude}</Text>

      </View>
    </View>

   

  );
};

const styles = StyleSheet.create({
  mapcontainer: {
    height: 500,
    width: 400,

    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  myBox:{
       flexDirection: 'row',
       height: 45,
       marginTop:0,
       marginBottom:220,
       marginLeft: 35,
       marginRight: 35,
       margin: 10,
      
     },
     inputStyle:
    {
        
        flex:1,
         paddingLeft:15,
         borderWidth:2,
         borderRadius:8,
         
        
     },

});

export default Maplive;





