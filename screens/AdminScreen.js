import { View, Text, SafeAreaView, Image, ScrollView, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native'

const MainScreen = () => {

    const [dataGempa, setDataGempa] = useState([])
    useEffect(() => {
        fetch('https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json')
            .then(response => response.json())
            .then(json => setDataGempa(json.Infogempa.gempa))
    }, [])

    // const response = await fetch('https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json');
    // const data = await response.json();

    const navigation = useNavigation();
    const handleInfoGempaTerkini = () => {
        navigation.navigate('InfoGempa')
    }
    const handleTableData = () => {
        navigation.navigate('data')
    }
    const handleMap = () => {
        navigation.navigate('Map')
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            {/* Komponen di atas Main Card tetap berada di luar ScrollView */}
            <View style={styles.header}>
                <View style={styles.containerHeader}>
                    <View>
                        <Text style={styles.title}>Selamat Datang Admin!</Text>
                    </View>
                    <View style={styles.subContainerHeader}>
                        <Text style={styles.subTitle}>Aplikasi MMI</Text>
                        <MaterialCommunityIcons name='account-circle' size={70} color='white' style={{ marginTop: -40, marginRight: -10 }} />
                    </View>
                    <TouchableOpacity style={[styles.subContainerHeader, { marginTop: 25 }]} onPress={handleInfoGempaTerkini}>
                        <Text style={styles.subTitle}>Informasi Gempa Saat ini</Text>
                        <MaterialCommunityIcons name='chevron-right' size={20} color='white' />
                    </TouchableOpacity>
                </View>
            </View>

            {/* 3 CARD ROW */}
            <View style={styles.cardOverlay}>
                <View style={styles.subCardOverlay}>
                    <MaterialCommunityIcons name='pulse' size={40} color='black' />
                    <Text>{dataGempa.Magnitude}</Text>
                    <Text>Magnitude</Text>
                </View>
                <View style={styles.subCardOverlay}>
                    <MaterialCommunityIcons name='waveform' size={40} color='black' />
                    <Text>{dataGempa.Kedalaman}</Text>
                    <Text>Kedalaman</Text>
                </View>
                <View style={styles.subCardOverlay}>
                    <MaterialCommunityIcons name='map-marker-radius' size={40} color='black' />
                    <Text>{dataGempa.Lintang},</Text>
                    <Text>{dataGempa.Bujur}</Text>
                </View>
            </View>
            {/* 3 CARD ROW END */}

            {/* Main Card di dalam ScrollView agar hanya konten di dalamnya yang dapat di-scroll */}
            {/* <ScrollView style={{ flex: 1 }}> */}
            <View style={{ backgroundColor: 'white', flex: 1 }}>
                {/* Konten Main Card */}
                <View style={{ marginHorizontal: 30 }}>
                    {/* CARD 1 START */}
                    <View style={styles.cardContent}>
                        <TouchableOpacity style={styles.buttonCard} onPress={handleTableData}>
                            <Text style={styles.cardTitle}>Tabel Pembuat Keputusan</Text>
                            <MaterialCommunityIcons name='chevron-right' size={20} color='#f8981d' />
                        </TouchableOpacity>
                        <View style={styles.textCard}>
                            <Image
                                source={require('../GAMBARMMI/table.png')}
                                style={[styles.imageCard, {marginTop:-10}]}
                            />
                            <Text style={{ textAlign: 'justify', fontSize: 13 }}>Tabel ini dibuat untuk melihat semua hasil penambahan data yang
                                dilakukan user, yang kemudian akan diputuskan oleh admin data/laporan manakah yang sesuai dengan kejadian.</Text>
                        </View>
                    </View>
                    {/* CARD 1 END */}
                    {/* CARD 2 START */}
                    <View style={styles.cardContent}>
                        <TouchableOpacity style={styles.buttonCard} onPress={handleMap}>
                            <Text style={styles.cardTitle}>Lihat Detail Kejadian</Text>
                            <MaterialCommunityIcons name='chevron-right' size={20} color='#f8981d' />
                        </TouchableOpacity>
                        <View style={styles.textCard}>
                            <Image
                                source={require('../GAMBARMMI/globe.png')}
                                style={[styles.imageCard, {width:100, height:120}]}
                            />
                            <Text style={{ textAlign: 'justify', fontSize: 13 }}>Tabel ini dibuat untuk melihat semua hasil penambahan data yang
                                dilakukan user, yang kemudian akan diputuskan oleh admin data/laporan manakah yang sesuai dengan kejadian.</Text>
                        </View>
                    </View>
                    {/* CARD 2 END */}

                </View>
            </View>
            {/* </ScrollView> */}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: 'white'
    },
    containerHeader: {
        backgroundColor: '#f8981d',
        padding: 35,
        height: 200,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    },
    subTitle: {
        color: 'white'
    },
    subContainerHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    // CARD OVERLAY
    cardOverlay: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 35,
        marginTop: 0,
        backgroundColor: 'white',
        zIndex: 20
    },
    subCardOverlay: {
        width: 85,
        height: 100,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
        marginTop: -50,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3,
        elevation: 5
    },
    // CARD CONTENT
    cardContent: {
        padding: 25,
        backgroundColor: 'white',
        borderRadius: 20,
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3,
        elevation: 5,
        // height:190
    },
    buttonCard: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    cardTitle: {
        fontWeight: 'bold',
        color: '#f8981d',
        fontSize: 16
    },
    textCard: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 30,
        marginRight: 50,
        // marginTop: 10
    },
    imageCard: {
        width: 120,
        height: 140,
        resizeMode: 'contain'
    }
})

export default MainScreen
