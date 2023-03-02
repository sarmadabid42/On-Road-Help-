import React from "react";
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from "react-native"

export default function Signup()
{
    
    return(
        <View style={styles.myBackground}>
    
    <Text style={{backgroundColor:'red',width:250, height:50,marginBottom:20,padding:10,paddingLeft:20,justifyContent:'center'}}>Welcome to on road help</Text>

        <Text style={{fontSize:20,color:'#000000',fontWeight:'bold'}}>Register</Text>
        {/* </View> */}
        <View style={styles.myBox}>
        <TextInput style={styles.inputStyle}
        placeholder='First Name'
        autoCapitalize='none'
        onChangeText={(fname)=>setName(fname)}
        />
        </View>
        <View style={styles.myBox}>
        <TextInput style={styles.inputStyle}
        placeholder='Last Name'
        autoCapitalize='none'
        onChangeText={(lname)=>setName(lname)}
        />
        </View>
        <View style={styles.myBox}>
        <TextInput style={styles.inputStyle}
        placeholder='Email'
        autoCapitalize='none'
        onChangeText={(email)=>setName(email)}
        />
        </View>
        <View style={styles.myBox}>
        <TextInput style={styles.inputStyle}
        placeholder='Password'
        autoCapitalize='none'
        onChangeText={(password)=>setName(password)}
        />
        </View>
        <View style={styles.myBox}>
        <TextInput style={styles.inputStyle}
        placeholder='Confirm Password'
        autoCapitalize='none'
        onChangeText={(cpassword)=>setName(cpassword)}
        />
        </View>
        <TouchableOpacity onPress={()=>alert(name+password)}>
                <Text style={{fontSize:20,
                fontWeight:'500',
                color:'#ffffff',
                paddingLeft:30,
                paddingRight:30,
                backgroundColor:'#339FFF',
                borderWidth:2,
                // borderRadius:40,
                margin:10,
                borderColor:'#339FFF',
                }}>Register
                </Text>
            </TouchableOpacity>
            <Text style={styles.txt}>Already Account?</Text>
      <Text style={styles.sign} 
      onPress={() => navigation.navigate('Signup')}>Login</Text>
        
        </View>
    );
}
const styles=StyleSheet.create({
    myBackground:
    {
        justifyContent:"center",
        flex:1,
        backgroundColor:"#EEEEEE",
        
        alignItems:"center",
    },
    myBox:
    {
        flexDirection:'row',
        height:40,
        marginTop:10,
        backgroundColor:"#FFFFFF",
        // marginLeft:35,
        // marginRight:35,
        // margin:10,
    },
    inputStyle:
    {
        color:'#000000',
        flex:1,
        paddingLeft:15,
        borderWidth:1,
        borderRadius:8,
        borderColor:'#646464',
    },
    sign: {
      color: '#339FFF',
      fontWeight: 'bold',
      fontSize: 15,
    },
})