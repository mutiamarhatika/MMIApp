import { View, Text, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import db from '@react-native-firebase/database';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const UserData = () => {
    const [userData, setUserData] = useState([]);

    const navigation = useNavigation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const snapshot = await db().ref('data').once('value');
                const data = snapshot.val();
                if (data) {
                    // Mengonversi objek Firebase menjadi array
                    const userDataArray = Object.keys(data).map(key => ({ ...data[key], key }));
                    setUserData(userDataArray);
                }
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
    }, []);


    const deleteData = async (key) => {
        Alert.alert(
            'Delete Data',
            'Are you sure you want to delete this data?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel'
                },
                {
                    text: 'OK',
                    onPress: async () => {
                        try {
                            await db().ref(`data/${key}`).remove();
                            Alert.alert('Data Deleted', 'Data has been successfully deleted');
                            // Merefresh data setelah penghapusan
                            const snapshot = await db().ref('data').once('value');
                            const data = snapshot.val();
                            if (data) {
                                // Mengonversi objek Firebase menjadi array
                                const userDataArray = Object.keys(data).map(key => ({ ...data[key], key }));
                                setUserData(userDataArray);
                            }
                        } catch (error) {
                            console.error('Error deleting data: ', error);
                            Alert.alert('Error', 'Failed to delete data');
                        }
                    }
                }
            ],
            { cancelable: false }
        );
    };


    return (
        <View>
            <View
                style={{
                    backgroundColor: '#f8981d',
                    flexDirection: 'row',
                    height: 60,
                    alignItems: 'center',
                    borderBottomLeftRadius: 15,
                    borderBottomRightRadius: 15
                }}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.goBack();
                    }}
                    style={{ marginRight: '28%', marginLeft: '5%' }}
                    activeOpacity={0.8}>
                    <MaterialCommunityIcons
                        name="arrow-left-drop-circle"
                        size={30}
                        color="white"
                    />
                </TouchableOpacity>
                <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
                    Users Data
                </Text>
            </View>
            {/* Tampilkan data yang telah disimpan */}
            {userData.map((item, index) => (
                <View key={index} style={{ marginTop: 20, alignItems: 'center' }}>
                    <View style={{ backgroundColor: 'white', width: '90%', height: 100, shadowColor: 'black', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, elevation: 5, borderRadius: 10, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
                        <View style={{ marginLeft: 25, width: '50%' }}>
                            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}>{item.namaPengirim}</Text>
                            <Text style={{ color: 'black', fontSize: 12, marginTop: 2 }}>{item.location}</Text>
                            <Text style={{ color: 'black', fontSize: 12, marginTop: 2 }}>{item.timestamp}</Text>
                        </View>
                        <View style={{ marginRight: 20, flexDirection: 'row', gap: 10, justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity activeOpacity={0.7} style={{ alignItems: 'center', justifyContent: 'center'}} onPress={() => deleteData(item.key)}>
                                <MaterialCommunityIcons name='trash-can-outline' size={30} color='red'/>
                            </TouchableOpacity>
                            <View style={{ width: 60, height: 60, borderRadius: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8981d', shadowColor: 'black', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, elevation: 10 }}>
                                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 12 }}>{item.tipeMMI}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            ))}
        </View>
    );
};

export default UserData;
