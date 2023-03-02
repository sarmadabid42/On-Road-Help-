import React, { useRef, useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Button,
    TouchableOpacity,
    ScrollView,
    ImageBackground,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList} from "react-native-gesture-handler";
import './Login';

const App = ({ navigation }) => {


    const [nam, setNam] = useState('');
    const [myUserData, setMyUserData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    const getUserData = async () => {
        try {
            const response = await fetch(`http://${ip}/RestaurentWebApi/api/AddMenu/allMenudata`);
            const myData = await response.json();
                    setMyUserData(myData);
                    setIsLoading(false);
                    console.log("RES2222====>> " + JSON.stringify(myData))
                    //console.log("DATA ===>> "+JSON.stringify(data))
                } catch (error) {
                    console.error(error);
                } //finally {
                //   setLoading(false);
                //}
            };
            useEffect(() => {
                getUserData();
            }, []);


    const AddNewitemsHandler = () => {
        navigation.navigate('AddNewitems')
    }
    // const [password, setPassword] = useState("");


    return (
        <View style={[styles.container, {
            // Try setting `flexDirection` to `"row"`.
            flexDirection: "column"
        }]}>
            <ScrollView>
                <View style={styles.input} >
                    <View style={styles.logSign}>
                        <Text style={styles.menuName1}>
                            <Text style={styles.menu}>Menu</Text>
                        </Text>
                    </View>
                    <View style={styles.row}>

                        <ScrollView style={{ marginTop: 20 }}>
                            {
                                myUserData && myUserData?.map((index, key) => (
                                    <View key={key}>
                                        <View
                                            style={styles.btnleft}
                                        //onPress={()=>GetSpacificPatient(index.caretakerid)}
                                        >
                                            <Image style={{ height: 100, width: 100, overflow: "hidden", borderRadius: 400 / 2, marginLeft:115,marginTop:10 }}
                                                source={{ uri: 'http://192.168.10.3/RestaurentWebApi/Assets/' + index.pic }} />
                                            <View style={styles.menuName}>
                                                <Text style={{ alignItems: "center", justifyContent: "center", marginTop: 5, color: '#ff8000', fontSize: 20, fontWeight: 'bold', }}>Food Name: {index.foodname}</Text>
                                                <Text style={styles.menuItems}>Food Type: {index.foodtype}</Text>
                                                <Text style={styles.menuItems}>Food Weight: {index.weight}</Text>
                                                <Text style={styles.menuItems}>Food Price: {index.price}</Text>
                                            </View>
                                        </View>
                                    </View>
                                ))
                            }
                        </ScrollView>
                        
                    </View>
                    <TouchableOpacity
                    onPress={AddNewitemsHandler}
                    style={styles.signupBtn}>
                        <Text style={styles.signupText}>Add New Item</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    input: {
        flex: 6,
        marginTop:-50
    },
    row: {
        flexDirection: 'row',
    },
    row1: {
        flexDirection: 'row',
        marginTop: 30,
    },
    column1: {
        flexDirection: 'column',
        marginTop: -10,
    },
    column2: {
        flexDirection: 'column'
    },
    tableDetail: {
        marginLeft: 50,
    },
    tableDetail1: {
        marginLeft: 20,
    },
    logSign: {
        marginLeft: 30,
        marginTop: 90
    },
    menu: {
        fontWeight: 'bold',
        fontSize: 27,
        color: '#E56717',
    },
    menuName1: {
        fontWeight: 'bold',
        fontSize: 27,
        marginLeft: 100,
        marginBottom:-20
    },
    menuName: {
        fontWeight: 'bold',
        fontSize: 27,
        marginLeft:100
    },
    menuShow: {
        fontWeight: 'bold',
        fontSize: 27,
        marginLeft: 120
    },
    menuItems: {
        alignItems: "center", 
        justifyContent: "center", 
        marginTop: 5, 
        fontSize: 15, 
        fontWeight: 'bold',
    },
    signup_button: {
        fontWeight: 'bold',
        fontSize: 30,
        color: '#E56717',
        marginTop: -35,
        marginLeft: 230,
    },
    addItem: {
        fontWeight: 'bold',
        fontSize: 25,
        marginLeft: 100,
        color: '#E56717'
    },
    uploadImage: {
        height: 70,
        marginTop: 20,
        marginBottom: 20,
        marginBottom: 40,
    },
    uploadImage1: {
        height: 70,
        marginTop: 20,
        marginLeft: 80,
        marginBottom: 20,
        marginBottom: 40,
    },
    signupBtn: {
        width: "70%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 40,
        marginTop: 50,
        backgroundColor: "#E56717",
    },
    signupText: {

        color: "#fff",
        fontWeight: 'bold',
        fontSize: 20,
    },
});

export default App;