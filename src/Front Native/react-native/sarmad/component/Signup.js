import { useNavigation } from "@react-navigation/native";
import React,{useState} from "react";
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity,} from "react-native"
import { RadioButton } from 'react-native-paper';





useNavigation
export default function Signup(props)
{
    const [firstname,setFirstName] = useState('');
    const [Lastname ,setLastname] = useState('');
    const [Email, setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [cpassword,setCpassword] = useState('');
    const [value, setValue] = React.useState('User');

    
    
    const Signup = async () => {
      try {
        if( firstname == '' || Lastname  == '' || Email == ''|| password  == ''|| cpassword == ''){
          alert("Please Enter All required Fields.");
          return;
        }                    
       
        await fetch('http://192.168.0.102/OnRoadHelp1/api/help/adduser', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              First_Name:firstname,
              Last_Name:Lastname,
              Email: Email,
              Password: password,
              cpassword: cpassword,
              loginstatus:value.toString()
            }),
          })
            .then(response => response.json())
            .then(data => {
                // console.log(data)
                if (data == 'ok') 
                {
                alert('Register Successfully');
                props.navigation.navigate('Loginscreen');
              } else alert('Incorrect Email or password');
            });
        } catch (error) {
          console.log('POST submission failed');
          console.log(error.message);
        }
      };
    
      

    return(
      
      
    
    
      

        <View style={styles.myBackground}>
          {/* <ImageBackground
        style={{width: '100%', height: '100%',marginBottom:25,marginTop:24}}
    source={require('../Assets/image1.jpg')}>*/}
        {/*<Image style={{width:100,height:100}}
        source={require('../Assets/Images/cctv.png')}
    />*/}
        {/*<View style={styles.myBox}>
        <Text style={{fontSize:20,color:'#339FFF',fontWeight:'bold'}}>M EYE PRO</Text>
    </View>*/}
        <Text style={{fontSize:20,fontWeight:"bold",color:'#180A0A',}}>Create An Account</Text>
        <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
      <View style={{flexDirection:'row',marginTop:15}}>
        <Text>User</Text>
        <View style={{marginLeft:5,marginTop:-7}}>
        <RadioButton value="User" />
        </View> 
        <View style={{flexDirection:'row'}}>
        <Text>Responder</Text>
        <View style={{marginLeft:5,marginTop:-7}}>
        <RadioButton value="Responder" />
      </View>
      </View>
      </View>
     
      </RadioButton.Group>
     
        {/* <RadioButtonRN activecolor={'red'} deactivecolor={'#606161'}
        boxActiveBGcolor={'#D1D1D1'} boxDeactiveBGcolor={'#D1D1D1'}
        textcolor={'#606161'} data={options}
        style={{flexDirection: "row"}}
        selectedBtn={(e)=> console.log(e)}
        /> */}



               <View style={styles.myBox}>
        <TextInput  style={styles.inputStyle}
        placeholder='First Name'
        autoCapitalize='none'
        placeholderTextColor={'black'}
        onChangeText={(Firstname)=>setFirstName(Firstname)}
        />
        </View>
        <View style={styles.myBox}>
        <TextInput style={styles.inputStyle}
        placeholder='Last Name'
        placeholderTextColor={'black'}
        autoCapitalize='none'

        onChangeText={(Lastname)=>setLastname(Lastname)}
        />
        </View>
        <View style={styles.myBox}>
        <TextInput style={styles.inputStyle}
        placeholder='Email'
        autoCapitalize='none'
        placeholderTextColor={'black'}
        onChangeText={(email)=>setEmail(email)}
        />
        </View>
        <View style={styles.myBox}>
        <TextInput style={styles.inputStyle}
        placeholder='Password'
        autoCapitalize='none'
        placeholderTextColor={'black'}
        secureTextEntry={true}
        onChangeText={(password)=>setPassword(password)}
        />
        </View> 
        <View style={styles.myBox}>
        <TextInput style={styles.inputStyle}
        placeholder='Confirm Password'
        autoCapitalize='none'
        placeholderTextColor={'black'}
        secureTextEntry={true}
        onChangeText={(cpassword)=>setCpassword(cpassword)}
        />
        </View>
        <TouchableOpacity  onPress={()=>Signup()}>
                <Text
                style={{
                fontSize:20,
                fontWeight:'500',
                
                textAlign:'center',
                paddingLeft:80,
                paddingRight:80,
                color:'#ffffff',
               // marginTop:50,
              //  paddingLeft:100,
               // paddingRight:100,
                backgroundColor:'#4D77FF',
                borderWidth:2,
                borderRadius:10,
                marginTop:12,
                borderColor:'#339FFF',
                }}>SignUp
                </Text>
            </TouchableOpacity>
            <Text style={styles.txt}> Already a member ?</Text>
            <Text style={styles.sign}
            onPress={()=>props.navigation.navigate('Loginscreen')}>Login</Text>
            
          </View>
        
         
    
    
    );
}
const styles=StyleSheet.create({
    myBackground:
    {
        justifyContent:"center",
        flex:1,
        backgroundColor:"EEEBDD",
        
        alignItems:"center",
        //marginBottom:300,
    },
    myBox:
    {
        flexDirection:'row',
        height:40,
        marginTop:40,
        marginLeft:35,
        marginRight:35,
        margin:10,
    },
    inputStyle:
    {
        
        flex:1,
        paddingLeft:15,
        borderWidth:2,
        borderRadius:8,
        
    },
    sign:{
        
        marginLeft:40,
        fontWeight: 'bold',
        color: '#339FFF',
        fontSize:20,
    },
    txt:{
            marginLeft:40,
            marginTop:10,
            fontWeight:'bold',
        },
    
        
    
})
