import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

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
            <View style={styles.navBar}>
                <Text style={styles.title}>Login Page</Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={adminPress}
                >
                    <Text style={styles.buttonText}>Admin</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={userPress}
                >
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
        color: "#fff",
        fontSize: 20,
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
        fontSize: 18,
        fontWeight: "bold",
    },
});

export default FirstPage;
