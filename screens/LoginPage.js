import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    Alert,
    ImageBackground,
    Dimensions,
    TouchableOpacity, // Import Dimensions
} from 'react-native';

const PageEmail = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation();

    const handleLogin = () => {
        // Validasi email dan password di sini
        if (email === 'admin@email.com' && password === '123') {
            Alert.alert('Login Successful', 'Welcome!');
            navigation.navigate('Admin');
        } else {
            Alert.alert('Login Failed', 'Incorrect email or password.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>MMInfo</Text>
            <Text style={styles.subText}>Sign in to continue</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.inputText}
                    placeholder="Email"
                    onChangeText={setEmail}
                    value={email}
                    keyboardType="email-address"
                />
                <ImageBackground
                    source={require('../GAMBARMMI/email.png')}
                    style={styles.image}
                    resizeMode="contain"
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.inputText}
                    placeholder="Password"
                    onChangeText={setPassword}
                    value={password}
                    secureTextEntry
                />
                <ImageBackground
                    source={require('../GAMBARMMI/password.png')}
                    style={styles.image}
                    resizeMode="contain"
                />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={{ width: '80%', backgroundColor: '#f8981d', alignItems: 'center', justifyContent: 'center', height: 40, borderRadius: 10 }} onPress={handleLogin}>
                    <Text style={{color:'white', fontWeight:'bold'}}>Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const windowWidth = Dimensions.get('window').width; // Get window width

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    headerText: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#f8981d',
    },
    subText: {
        fontSize: 16,
        marginBottom: 20,
        color: '#f8981d',
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#f8981d',
        borderRadius: 5,
        paddingHorizontal: 15,
    },
    inputText: {
        flex: 1,
        color: '#f8981d',
        paddingHorizontal: 10,
    },
    image: {
        width: 20,
        height: 20,
    },
    buttonContainer: {
        width: '100%',
        marginTop: 20,
        alignItems:'center'
    },
});

export default PageEmail;