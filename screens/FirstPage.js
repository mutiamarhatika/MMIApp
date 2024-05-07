import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const FirstPage = () => {
    const navigation = useNavigation();
    const userPress = () => {
        navigation.navigate("MainPage");
    }
    const adminPress = () => {
        navigation.navigate('Login')
    }
    return (
        <View style={styles.container}>
            <View style={{ alignItems: 'center', justifyContent: 'center', height: '80%', marginHorizontal: 20, marginTop: "8%" }}>
                <View style={{marginHorizontal:20, marginBottom:30}}>
                    <Text style={[styles.title, { padding: 20 }]}>Segera Laporkan Apa Yang Kamu Rasakan</Text> 
                    <Text style={{textAlign: 'center', fontSize:13 }}>Ayo ikut berkontribusi bersama kami dalam pelaporan gempa yang anda rasakan</Text>
                </View>
                <View style={{ width: "100%", height: "70%", marginHorizontal: 20, justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={require('../GAMBARMMI/fist.png')} style={{ width: "95%", height: "95%" }} />
                </View>
            </View>
            <View style={{ alignItems: 'center', marginHorizontal: 40, marginTop:10 }}>
                <TouchableOpacity activeOpacity={0.8} onPress={userPress} style={{ width: 60, backgroundColor: '#f8981d', alignItems: 'center', justifyContent: 'center', height: 60, borderRadius: 50 }}>
                    <MaterialCommunityIcons
                        name="arrow-right-thin"
                        size={40}
                        color="white"
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

// const handleLogin = (type) => {
//     // Handle login based on the type (admin or user)
//     console.log("Logging in as", type);
// };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    title: {
        color: "black",
        fontSize: 24,
        fontWeight: "bold",
        textAlign:'center'
    },
    buttonContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        backgroundColor: "#4CAF50",
        paddingVertical: 15,
        paddingHorizontal: 40,
        marginVertical: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default FirstPage;
