import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator
 } from "@react-navigation/native-stack";
 import Loginscreen from './Loginscreen';
 import Requests from './Requests'
import Signup from "./Signup";
import Home from "./Home";
import Service from "./Service";
import Map from "./Map";
 const Stack  = createNativeStackNavigator()
 export default function MainFile(){
     return( 
     <NavigationContainer>
         <Stack.Navigator initialRouteName="Signup">
         <Stack.Screen name="Signup"  component={Signup}/>
         <Stack.Screen name="Loginscreen" component={Loginscreen}/>
         <Stack.Screen name="Home" component={Home}/>
         <Stack.Screen name="Service" component={Service}/>
         <Stack.Screen name="Map" component={Map}/>
            </Stack.Navigator>  
     </NavigationContainer>
 
     )
 }
