import React,{useState}
 from "react";
 import {SafeAreaView,FlatList,Text, View,
TouchableOpacity, Button} from 'react-native'

 function FlatListDemo ({navigation}){
   let[arr, setArr] = useState(["First Aid", "Police","Ambulance","Mechanics",]);
   let u_pcatagory;
//    const submit = async () => {
//     try {
      
//           await fetch('http://192.168.43.32/OnRoadHelp1/api/help/HelpRequest', {
//           method: 'POST',
//           headers: {
//             Accept: 'application/json',
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             u_pcatagory:u_pcatagory,
            
            console.log(arr)
            
//           }),
//         })
//           .then(response => response.json())
//           .then(data => {
//               // console.log(data)
//               if (data == 'ok') 
//               {
//               alert('submission request Successfully');
              
//             } 
//           });
//       } catch (error) {
//         console.log('POST submission failed');
//         console.log(error.message);
//       }
//     };
    return (
    <SafeAreaView>
        <FlatList 
            data={arr}
            renderItem={({item,index})=>{
                //console.log(obj)
                return (
                   <TouchableOpacity onPress={()=>{
                    global.category=item
                     navigation.navigate("Map",{item})
                    }}>
                <View style={{
                    flex:1,
                    justifyContent:'center',
                    height:100,
                borderColor:'grey',
                borderWidth:2, margin:5}}>
                <Text>{index} : {item}</Text>
                {/* <Button title="Delete" 
                onPress={()=>{
                    let temp = []
                    for(let i = 0; i < arr.length;i++){
                        if(arr[i]!= item){
                            temp.push(arr[i])
                        }
                    }
                    console.log(temp)
                    setArr(temp)
                }}/> */}
                </View>
                </TouchableOpacity>
                )
            }}
            keyExtractor={(d, index)=>
                 index.toString()
            }
        
        />
    </SafeAreaView>)
 }
 export default FlatListDemo

