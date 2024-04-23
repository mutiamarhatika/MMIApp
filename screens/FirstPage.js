import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

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
            <View style={{ alignItems: 'center', justifyContent: 'center', height: '70%', marginHorizontal: 20 }}>
                <Text style={[styles.title, { padding: 20 }]}>Yuk Kenali Dirimu Dulu</Text>
                <Image source={require('../GAMBARMMI/fist.png')} style={{ width: 300, height: 300 }} />
                <Text style={{ color: 'black', fontWeight: 'bold', marginLeft: 30, marginRight: 30, textAlign: 'center' }}>Note: Jika anda adalah admin maka klik tombol admin, jika anda bukan admin maka klik tombol user</Text>
            </View>
            <View style={{ alignItems: "center", gap: 10, marginTop:50 }}>
                <TouchableOpacity onPress={adminPress} style={{ width: '70%', backgroundColor: '#f8981d', alignItems: 'center', justifyContent: 'center', height: 40, borderRadius: 10 }}>
                    <Text style={styles.buttonText}>Admin</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={userPress} style={{ width: '70%', backgroundColor: '#f8981d', alignItems: 'center', justifyContent: 'center', height: 40, borderRadius: 10 }}>
                    <Text style={styles.buttonText}>User</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const handleLogin = (type) => {
    // Handle login based on the type (admin or user)
    console.log("Logging in as", type);
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    navBar: {
        backgroundColor: "#4CAF50",
        padding: 15,
        alignItems: "center",
    },
    title: {
        color: "black",
        fontSize: 24,
        fontWeight: "bold",
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
