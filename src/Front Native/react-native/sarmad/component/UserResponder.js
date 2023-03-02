import * as React from 'react';
import {
  StyleSheet,
  View,
  
  Text,
  TouchableOpacity,
} from 'react-native';
import { FAB } from 'react-native-paper';

const UserResponder = ({navigation }) => (
  <View>
    {/*<ImageBackground
      style={{width: '100%', height: '100%'}}
source={require('../Assets/Requests.jpg')}>*/}
      <Text style={{backgroundColor:'#339FFF',width:'100%',fontSize:20,height:60,marginBottom:0,padding:17,paddingLeft:80,justifyContent:'center'}}> Welcome to On Road Help</Text>
      {/*<FAB
    style={styles.fab}
    small
    icon="plus"
    onPress={() => navigation.navigate('Service')}
/>*/}
      <TouchableOpacity onPress={() => navigation.navigate('Service')}>
        <Text
          style={{
            padding:15,
            fontSize: 20,
            fontWeight: '500',
            color: '#ffffff',
            marginLeft: 50,
            marginRight: 50,
            backgroundColor: '#339FFF',
            borderWidth: 1,
            borderRadius: 40,
            marginTop: 80,
            borderColor: '#339FFF',
            textAlign: 'center',
          }}>
          My Services
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('UserRequest')}>
        <Text
          style={{
            padding:15,
            fontSize: 20,
            fontWeight: '500',
            color: '#ffffff',
            marginLeft: 50,
            marginRight: 50,
            backgroundColor: '#339FFF',
            borderWidth: 1,
            borderRadius: 40,
            marginTop: 40,
            borderColor: '#339FFF',
            textAlign: 'center',
          }}>
          To respond
        </Text>
      </TouchableOpacity>
      {/* <TouchableOpacity onPress={() => navigation.navigate('')}>
        <Text
          style={{
            padding:15,
            fontSize: 20,
            fontWeight: '500',
            color: '#ffffff',
            marginLeft: 50,
            marginRight: 50,
            backgroundColor: '#339FFF',
            borderWidth: 1,
            borderRadius: 40,
            marginTop: 40,
            borderColor: '#339FFF',
            textAlign: 'center',
          }}>
          summary
        </Text>
      </TouchableOpacity> */}
      <TouchableOpacity onPress={() => navigation.navigate('Loginscreen')}>
        <Text
          style={{
            padding:15,
            fontSize: 20,
            fontWeight: '500',
            color: '#ffffff',
            marginLeft: 50,
            marginRight: 50,
            backgroundColor: '#339FFF',
            borderWidth: 1,
            borderRadius: 40,
            marginTop: 40,
            borderColor: '#339FFF',
            textAlign: 'center',
          }}>
          Logout
        </Text>
      </TouchableOpacity>
      {/*<TouchableOpacity onPress={() => navigation.navigate('')}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: '500',
            color: '#ffffff',
            marginLeft: 50,
            marginRight: 50,
            backgroundColor: '#339FFF',
            borderWidth: 1,
            borderRadius: 40,
            marginTop: 70,
            borderColor: '#339FFF',
            textAlign: 'center',
          }}>
          History
        </Text>
        </TouchableOpacity>*/}
    
  </View>
);

{/*const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});*/}

export default UserResponder;