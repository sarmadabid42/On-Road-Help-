
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
export default function Addservice() {
  const [servicename, setserviceName] = useState('');
  const [serviceLocation, setserviceLocation] = useState('');
  const [servicetype, setserviceType] = useState('');
  return (
    <View style={styles.myBackground}>
      <Text style={{backgroundColor:'red',width:320, height:60,marginBottom:0,padding:15,paddingLeft:60,justifyContent:'center'}}>On Road Help</Text>
      <Image
        style={{width: 120, height: 120,}}
        source={require('./Assets/Logo.png')}
      />
      <View style={styles.myBox}>
        {/* <Text style={{fontSize: 20, color: '#339FFF', fontWeight: 'bold'}}>
          M EYE PRO
        </Text> */}
      </View>
      <View style={styles.myBox}>
        <TextInput
          style={styles.inputStyle}
          placeholder="ServiceName"
          autoCapitalize="none"
          onChangeText={servicename => setserviceName(servicename)}
        />
      </View>
      <View style={styles.myBox}>
        <TextInput
          style={styles.inputStyle}
          placeholder="ServiceLocation"
          autoCapitalize="none"
          //   secureTextEntry
          //   isSecure={true}
          secureTextEntry={true}
          onChangeText={serviceLocation => setserviceLocation(serviceLocation)}
        />
      </View>
      <View style={styles.myBox}>
        <TextInput
          style={styles.inputStyle}
          placeholder="ServiceType"
          autoCapitalize="none"
          //   secureTextEntry
          //   isSecure={true}
          secureTextEntry={true}
          onChangeText={servicetype => setserviceLocation(servicetype)}
        />
      </View>
      <TouchableOpacity>
        <Text
          onPress={() => navigation.navigate('Dashboard')}
          style={{
            fontSize: 25,
            color: '#ffffff',
            paddingLeft: 50,
            paddingRight: 50,
            backgroundColor: '#339FFF',
            borderWidth: 2,
            // borderRadius: 40,
            margin: 10,
            borderColor: '#339FFF',
          }}>
          Addservice
        </Text>
      </TouchableOpacity>
      {/*<Text style={styles.txt}>Don't have an Account?</Text>
      <Text style={styles.sign} 
        onPress={() => navigation.navigate('Signup')}>SignUp</Text>*/}
        </View>
  );
}
const styles = StyleSheet.create({
  myBackground: {
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#FFFFFF',

    alignItems: 'center',
  },
  myBox: {
    flexDirection: 'row',
    height: 40,
    marginTop: 10,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
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
    fontSize: 15,
  },
});
