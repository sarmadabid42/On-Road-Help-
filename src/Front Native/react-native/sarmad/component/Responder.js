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

import { useState,useEffect } from 'react';


 const Maplive=()=> {

  
  
  
  global.lati;
global.long;
  
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
    long = curentPosition.longitude;

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
 
    }).catch((err) => {
      console.log(err);
    });
  }, []);


  

 
  
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
            <Marker coordinate={{
              latitude: parseFloat(curentPosition.latitude),
              longitude: parseFloat(curentPosition.longitude),
            }}

            />

          </MapView>
          
          
          
          

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
    height: 600,
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





