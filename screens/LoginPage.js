import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";

const PageEmail = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigation = useNavigation();
    const matchUserPass = () => {
        navigation.navigate('MainPage');
    }

    const handleLogin = () => {
        // Validasi email dan password di sini
        if (email === "admin@email.com" && password === "123") {
            Alert.alert("Login Successful", "Welcome!");
            navigation.navigate('MainPage')
        } else {
            Alert.alert("Login Failed", "Incorrect email or password.");
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={setEmail}
                value={email}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                onChangeText={setPassword}
                value={password}
                secureTextEntry
            />
            <Button title="Login" onPress={handleLogin} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    input: {
        width: "80%",
        marginBottom: 20,
        padding: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
    },
});

export default PageEmail;
