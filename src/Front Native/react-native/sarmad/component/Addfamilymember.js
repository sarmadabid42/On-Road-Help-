import React, { useState } from "react";
import { View, StyleSheet,TextInput,TouchableOpacity,Text } from "react-native";
import { Picker } from "@react-native-picker/picker";


const App = (navigation) => {
  const [selectedValue, setSelectedValue] = useState("Members");
  const [relation,setRelation] = useState("");
  const [data, setMyUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let emailid;

  
  const getUserId = async () => {
    const response = await fetch(`http://192.168.56.1/OnRoadHelp1/api/help/GetMemberId?email=`+relation);
    const data = await response.json();
    setMyUserData(data);
    setIsLoading(false);
    console.log("RES2222====>> " + JSON.stringify(data))
    emailid = JSON.stringify(data[0]['id'])
    console.log("email====>> " + emailid)
    AddFamily(emailid)
      async () => {
        try {
          Alert.alert('Saved', 'Successful');
          console.log('hello id where are you');
          console.log(data[0]['id']);
          emailid = data[0]['id'];
          //responseJson[0]["loginstatus"]
        } catch (error) {
          Alert.alert('Error', 'There was an error.')
        }
      }

};



  const AddFamily = async (idd) => {
      try {
        console.log('this is all value '+global.userID+' '+selectedValue+' '+idd);
          await fetch(
              'http://192.168.56.1/OnRoadHelp1/api/help/AddFamily', {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',

                },
                body: JSON.stringify({
                  User_id: global.userID,
                    F_Relation: selectedValue,
                    Member_id: idd
                }),
              })
              .then(response => {
                  response.json()
                      .then(data => {
                        console.log('done api '+global.userID+' '+selectedValue+' '+idd);
                          alert("Family Member Added Successfully : ");
                      });
              })
      }
      catch (error) {
          console.error(error);
      }
  }

const AddFamily33 = async (idd) => {
  try {   
    console.log('this is all value '+global.userID+' '+selectedValue+' '+idd);
      await fetch('http://192.168.56.1/OnRoadHelp1/api/help/AddFamily', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',

      },
      body: JSON.stringify({
        User_id: global.userID,
          F_Relation: selectedValue,
          Member_id: parseInt(idd)
      }),
    })
    .then(response => response.json())
    .then(responseJson => {
        console.log(responseJson[0]["id"]);
       // console.log("bhai maire hai "+global.userID)
               
      });      
      
  } catch (error) {
    console.log('error ');
    console.log(error.message);
  }
};

  const Loggg = async (id)=> {
    
    try {
      console.log('this is all value '+global.userID+' '+selectedValue+' '+id);
      await fetch('http://192.168.56.1/OnRoadHelp1/api/help/AddFamily', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          User_id: global.userID,
          F_Relation: selectedValue,
          Member_id: parseInt(id)

        }),
      })
        .then(response => response.json())
        .then(data => {
          if (data == 'ok') {

            alert('Family Member is added successfully Added Sucessfully!');
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
    <View style={styles.container}>
      <Picker
        selectedValue={selectedValue}
        style={{ height: 50, width: 210,borderRadius:5,borderColor:"black",
          borderColor: "#20232a",}}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
        <Picker.Item label="Members" value="Members" />
        <Picker.Item label="Father " value="Father" />
        <Picker.Item label="Mother " value="Mother" />
        <Picker.Item label="Brother " value="Brother" />
        <Picker.Item label="Sister " value="Sister" />
        
        
      
      </Picker>
      <View style={styles.myBox}>
        <TextInput style={styles.inputStyle}
        placeholder='Relation'
        autoCapitalize='none'
        placeholderTextColor={'black'}
        onChangeText={relation=>setRelation(relation)}
        />
        </View>
        
        <TouchableOpacity onPress={() => navigation.navigate('Addfamilymember')}>
        <Text
        onPress={()=>getUserId()} 
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
            marginTop: 20,
            borderColor: '#339FFF',
            textAlign: 'center',
          }}>
          Add
        </Text>
        </TouchableOpacity>
        
      
      </View>
      
    
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop:30,
    marginLeft:50,
    marginRight:50,
    //paddingTop: 20,
    alignItems: "center",
    backgroundColor: 'white',
    

    
    
    
    
    
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
});

 export default App;
