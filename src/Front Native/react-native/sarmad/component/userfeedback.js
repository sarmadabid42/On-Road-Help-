import React, {useState} from 'react';
 
// import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';

let id,rate;
 
const App = ({route}) => {
  // To set the default Star Selected
  const {id}=route.params
  console.log('Id',id)
  const [defaultRating, setDefaultRating] = useState(0);
  
  // To set the max number of Stars
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
  // console.log('defaultrating',defaultRating);
 
  // Filled Star. You can also give the path from local
  const starImageFilled =
    'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_filled.png';
  // Empty Star. You can also give the path from local
  const starImageCorner =
    'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_corner.png';
    const post = async (Helpid,rating) => {
       try{
        await fetch('http://192.168.56.1/OnRoadHelp1/api/help/AddRespRating?Helpid='+id+'&rating='+defaultRating, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',

          },
    
        })
        .then(response => response.json())
        .then(responseJson => {
          console.log("first")
            console.log(responseJson[0]["loginstatus"]);
            global.userID = responseJson[0]["id"]
           // console.log("bhai maire hai "+global.userID)
            // if (responseJson[0]["Email"] == Email) {
            //   props.navigation.navigate('Home');
              
            // } else alert('Incorrect Email' && 'Incorrect password');
                   
          });      
          
      } catch (error) {
        console.log('Email Already Used! ');
        console.log(error.message);
      }
    };
    
        
 
  const CustomRatingBar = () => {
    return (
      <View style={styles.customRatingBarStyle}>
        {maxRating.map((item, key) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              key={item}
              onPress={() => setDefaultRating(item)}>
              <Image
                style={styles.starImageStyle}
                source={
                  item <= defaultRating
                    ? {uri: starImageFilled}
                    : {uri: starImageCorner}
                }
              />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };
 
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.textStyle}>
          How was your experience with us
        </Text>
        <Text style={styles.textStyleSmall}>
          Please Rate Us
        </Text>
        {/* View to hold our Stars */}
        <CustomRatingBar />
        <Text style={styles.textStyle}>
          {/* To show the rating selected */}
          {defaultRating} / {Math.max.apply(null, maxRating)}
        </Text>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.buttonStyle}
          onPress={() => post(id,defaultRating)}>
          
          
          {/* Clicking on button will show the rating as an alert */}
          <Text style={styles.buttonTextStyle}>
            post
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
 
export default App;
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    justifyContent: 'center',
    textAlign: 'center',
  },
  titleText: {
    padding: 8,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  textStyle: {
    textAlign: 'center',
    fontSize: 23,
    color: '#000',
    marginTop: 15,
  },
  textStyleSmall: {
    textAlign: 'center',
    fontSize: 16,
    color: '#000',
    marginTop: 15,
  },
  buttonStyle: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 30,
    padding: 15,
    backgroundColor: '#8ad24e',
  },
  buttonTextStyle: {
    color: '#fff',
    textAlign: 'center',
  },
  customRatingBarStyle: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 30,
  },
  starImageStyle: {
    width: 40,
    height: 40,
    resizeMode: 'cover',
  },
});






