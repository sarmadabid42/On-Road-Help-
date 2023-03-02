
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
export default function Forgetpassword(props){
  const [Email, setEmail] = useState('');
  const [password, setResetpassword] = useState('');
  const [cpassword, setCpassword] = useState('');
  return (
    <View style={styles.myBackground}>
      
      
      <Text style={{backgroundColor:'#339FFF',width:'100%',fontSize:20,height:60,marginBottom:0,padding:17,paddingLeft:120,justifyContent:'center'}}> On Road Help</Text>
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
          placeholder="Email"
          autoCapitalize="none"
          placeholderTextColor={'black'}
          onChangeText={Email => setEmail(Email)}
        />
      </View>
      <View style={styles.myBox}>
        <TextInput
          style={styles.inputStyle}
          placeholder="Reset Password"
          autoCapitalize="none"
          placeholderTextColor={'black'}
          //   secureTextEntry
          //   isSecure={true}
          secureTextEntry={true}
          onChangeText={password => setResetpassword(password)}
        />
      </View>
      <View style={styles.myBox}>
        <TextInput
          style={styles.inputStyle}
          placeholder="Confirm Password"
          autoCapitalize="none"
          placeholderTextColor={'black'}
          //   secureTextEntry
          //   isSecure={true}
          secureTextEntry={true}
          onChangeText={cpassword => setCpassword(cpassword)}
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
            marginBottom:225,
            marginTop:14,
            borderRadius:10,
          }}>
          Reset
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
    backgroundColor: '#F6E7D8',

    alignItems: 'center',
  },
  myBox: {
    flexDirection: 'row',
    height: 40,
    marginTop: 40,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
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
});
