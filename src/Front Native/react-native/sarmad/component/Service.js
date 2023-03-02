
import React, {useState,useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  
  ImageBackground
  
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import MapView,{PROVIDER_GOOGLE,Marker} from 'react-native-maps';
import Geocoder from 'react-native-geocoding';

export default function Addservice({navigation}) {
  const [servicename, setserviceName] = useState('');
  //const [serviceLocation, setserviceLocation] = useState('');
  const [servicetype, setserviceType] = useState('');
  const [lat, setLat] = useState('');
  const [long, setLong] = useState('');
  const [DateTime, setDateTime] = useState('');
  const [count,setCount] = useState('');
  
  let lati,lon;
  
  

  
  const [curentPosition,setCurentPosition] = useState({
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
  


  const Addservice = async ()=> {
    
    try {
      await fetch('http://192.168.56.1/OnRoadHelp1/api/Help/AddService', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Service_Name: servicename,
         // Service_Location:serviceLocation
          Service_Type: servicetype,
          lat: curentPosition.latitude,
          lon: curentPosition.longitude,
          urid: global.userID,
          DateTime: Date(),
          //count:count,

        }),
      })
        .then(response => response.json())
        .then(data => {
          if (data == 'ok') {
            console.log('latitude',lat); 
            console.log('longnitude',lon);
            console.log('datetime ',Date());

            alert('Service Added Sucessfully!');
            navigation.navigate('Home');
          } 
          else alert('Something went problem! Error');
        });
    } catch (error) {
      console.log('POST submission failed');
      console.log(error.message);
    }
  };

  return (
    

    <View style={styles.myBackground}>
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

       {/* <ImageBackground
      style={{width: 80, height: 90,marginLeft:70,}}
      source={require('../Assets/map.png')}> */}
      
      
      {/* <Text style={{backgroundColor:'#339FFF',width:'100%',fontSize:20,height:60,marginBottom:10,padding:17,paddingLeft:120,justifyContent:'center'}}>Welcome On Road Help</Text> */}
      {/* <Image
        style={{width: 120, height: 120,}}
        source={require('./Assets/Logo.png')}
      /> */}
      <View style={styles.myBox}>
        {/* <Text style={{fontSize: 20, color: '#339FFF', fontWeight: 'bold'}}>
          M EYE PRO
        </Text> */}
      </View>
      <View style={styles.myBox}>
        <TextInput
          style={styles.inputStyle}
          placeholder="Service Name"
          autoCapitalize="none"
          placeholderTextColor={'black'}
          onChangeText={servicename => setserviceName(servicename)}
        />
      </View>
      {/* <View style={styles.myBox}>
        <TextInput
          style={styles.inputStyle}
          placeholder="Service Location"
          autoCapitalize="none"
          placeholderTextColor={'black'}
          //   secureTextEntry
          //   isSecure={true}
          
          onChangeText={serviceLocation => setserviceLocation(serviceLocation)}
        />
      </View> */}
      {/* <Text style={{fontSize:20,padding:10,color:'#339FFF',marginRight:200,}}onPress={()=>navigation.navigate('Responder')}>Select location</Text> */}
      {/* <Text style={{fontSize:20,padding:10,color:'#339FFF',marginRight:217,}}onPress={()=>navigation.navigate('Responderservice')}>View service</Text> */}
      <View style ={styles.contianer}>
      {/* <ImageBackground onPress ={()=>navigation.navigate('Responder')}
      style={{width: 50, height: 50,marginLeft:10,marginTop:-50}}
      source={require('../Assets/map.png')}> */}
    
      <View style={styles.myBox1}>
        <TextInput
          style={styles.inputStyle}
          placeholder="Service Type"
          autoCapitalize="none"
          placeholderTextColor={'black'}
          //   secureTextEntry
          //   isSecure={true}
          
          onChangeText={servicetype => setserviceType(servicetype)}
        />
      </View>
      {/* <View style={styles.myBox2}>
        <TextInput
          style={styles.inputStyle}
          placeholder="Date"
          autoCapitalize="none"
          placeholderTextColor={'black'}
          //   secureTextEntry
          //   isSecure={true}
          
          onChangeText={DateTime => setDateTime(DateTime)}
        />
      </View>
      <View style={styles.myBox3}>
        <TextInput
          style={styles.inputStyle}
          placeholder="count"
          autoCapitalize="none"
          placeholderTextColor={'black'}
          //   secureTextEntry
          //   isSecure={true}
          
          onChangeText={count => setCount(count)}
        />
      </View> */}
      <TouchableOpacity>
        <Text
          onPress={() => Addservice()}
          style={{
            fontSize: 25,
            color: '#ffffff',
            paddingLeft: 40,
            paddingRight: 10,
            backgroundColor: '#339FFF',
            borderWidth: 2,
            paddingTop:5,
            // borderRadius: 40,
            marginLeft:80,
            
            height:50,
            width:230,
            borderColor: '#339FFF',
            marginBottom:-400,
            marginTop:170,
            borderRadius:10,
          }}>
          Addservice
        </Text>
      </TouchableOpacity>
      
      </View>
      {/*<Text style={styles.txt}>Don't have an Account?</Text>
      <Text style={styles.sign} 
        onPress={() => navigation.navigate('Signup')}>SignUp</Text>*/}
        
        </View>
        </View>
        <View style={{ backgroundColor: "red", width:100, marginLeft:50,paddin:50,marginBottom:110}}>
        <Text>{curentPosition.latitude}</Text>
        <Text>{curentPosition.longitude}</Text>

      </View>
        
        </View>
        
      
  );
}
const styles = StyleSheet.create({
  myBackground: {
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#F6E7D8',

    alignItems: 'center',
  },
  mapcontainer: {
    height: 400,
    width: 400,
    marginBottom:-50,
    marginTop:-163,

    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  myBox: {
    flexDirection: 'row',
    height: 40,
    marginTop:40,
    marginLeft:40,
    marginRight:40,
    marginBottom:-105,
    margin:30,
    
    
    
  },
  myBox1: {
    flexDirection: 'row',
    width:320,
    height:40,
    marginTop: 10,
    marginLeft:35,
    marginRight:35,
    marginBottom:-100,
    margin:30,
    
  },
  inputStyle: {
    color: '#000000',
    flex: 1,
    paddingLeft: 15,
    borderWidth: 2,
    borderRadius: 10,
    //borderColor: '#646464',
    
    
  },
  txt: {
    fontWeight: '400',
    fontSize: 12,
    
  },
  sign: {
    color: '#339FFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
  myBox2: {
    flexDirection: 'row',
    width:320,
    height:40,
    marginTop:150,
    marginLeft:-135,
    marginRight:3
    
  },
  myBox3: {
    flexDirection: 'row',
    width:320,
    height:40,
    marginTop:150,
    marginLeft:-135,
    marginRight:3
    
  },
});
