import { useNavigation } from '@react-navigation/native';
import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const data = [
    {
        id: '1',
        image: require('../GAMBARMMI/mmi1.png'),
        color: '#EEEDEE',
        text: 'black',
        description: 'I MMI',
        description2:
            'Getaran tidak dirasakan kecuali dalam keadaan luarbiasa oleh beberapa orang',
    },
    {
        id: '2',
        image: require('../GAMBARMMI/mmi2.png'),
        color: '#DDDDD7',
        text: 'black',
        description: 'II MMI',
        description2:
            'Getaran dirasakan oleh beberapa orang, benda-benda ringan yang digantung bergoyang.',
    },
    {
        id: '3',
        image: require('../GAMBARMMI/mmi3.png'),
        color: '#6FB8D8',
        text: 'black',
        description: 'III MMI',
        description2:
            'Getaran dirasakan nyata dalam rumah. Terasa getaran seakan-akan ada truk berlalu.',
    },
    {
        id: '4',
        image: require('../GAMBARMMI/mmi4.png'),
        color: '#3863CE',
        text: 'white',
        description: 'IV MMI',
        description2:
            'Pada siang hari dirasakan oleh orang banyak dalam rumah, di luar oleh beberapa orang, gerabah pecah, jendela/pintu berderik dan dinding berbunyi.',
    },
    {
        id: '5',
        image: require('../GAMBARMMI/mmi5.png'),
        color: '#38CE4A',
        text: 'black',
        description: 'V MMI',
        description2:
            'Getaran dirasakan oleh hampir semua penduduk, orang banyak terbangun, gerabah pecah, barang-barang terpelanting, tiang-tiang dan barang besar tampak bergoyang, bandul lonceng dapat berhenti.',
    },
    {
        id: '6',
        image: require('../GAMBARMMI/mmi6.png'),
        color: '#4DB04E',
        text: 'white',
        description: 'VI MMI',
        description2:
            'Getaran dirasakan oleh semua penduduk. Kebanyakan semua terkejut dan lari keluar, plester dinding jatuh dan cerobong asap pada pabrik rusak, kerusakan ringan.',
    },
    {
        id: '7',
        image: require('../GAMBARMMI/mmi7.png'),
        color: 'yellow',
        text: 'black',
        description: 'VII MMI',
        description2:
            'Tiap-tiap orang keluar rumah. Kerusakan ringan pada rumah-rumah dengan bangunan dan konstruksi yang baik. Sedangkan pada bangunan yang konstruksinya kurang baik terjadi retak-retak bahkan hancur, cerobong asap pecah. Terasa oleh orang yang naik kendaraan.',
    },
    {
        id: '8',
        image: require('../GAMBARMMI/mmi8.png'),
        color: '#DFE26D',
        text: 'black',
        description: 'VIII MMI',
        description2:
            'Kerusakan ringan pada bangunan dengan konstruksi yang kuat. Retak-retak pada bangunan degan konstruksi kurang baik, dinding dapat lepas dari rangka rumah, cerobong asap pabrik dan monumen-monumen roboh, air menjadi keruh.',
    },
    {
        id: '9',
        image: require('../GAMBARMMI/mmi9.png'),
        color: 'orange',
        text: 'black',
        description: 'IX MMI',
        description2:
            'Kerusakan pada bangunan yang kuat, rangka-rangka rumah menjadi tidak lurus, banyak retak. Rumah tampak agak berpindah dari pondamennya. Pipa-pipa dalam rumah putus.',
    },
    {
        id: '10',
        image: require('../GAMBARMMI/mmi10.png'),
        color: '#f8981d',
        text: 'white',
        description: 'X MMI',
        description2:
            'Bangunan dari kayu yang kuat rusak,rangka rumah lepas dari pondamennya, tanah terbelah rel melengkung, tanah longsor di tiap-tiap sungai dan di tanah-tanah yang curam.',
    },
    {
        id: '11',
        image: require('../GAMBARMMI/mmi11.png'),
        color: 'pink',
        text: 'black',
        description: 'XI MMI',
        description2:
            'Bangunan-bangunan hanya sedikit yang tetap berdiri. Jembatan rusak, terjadi lembah. Pipa dalam tanah tidak dapat dipakai sama sekali, tanah terbelah, rel melengkung sekali',
    },
    {
        id: '12',
        image: require('../GAMBARMMI/mmi12.png'),
        color: 'red',
        text: 'white',
        description: 'XII MMI',
        description2:
            'Hancur sama sekali, Gelombang tampak pada permukaan tanah. Pemandangan menjadi gelap. Benda-benda terlempar ke udara.',
    },
];

const ImageList = () => {
    // render() {
    const navigation = useNavigation()
    const handleBack = () => {
        navigation.goBack()
    }
    const handleForm = () => {
        navigation.navigate('InputPage')
    }
    return (
        <View style={styles.container}>
            {/* <View style={styles.navbar}>
                <TouchableOpacity onPress={handleBack} style={styles.buttonNav} activeOpacity={0.8}>
                    <MaterialCommunityIcons name='arrow-left-drop-circle' size={30} color='white' />
                </TouchableOpacity>
                <Text style={styles.textNav}>Keterangan Level MMI</Text>
            </View> */}
            <Swiper showsPagination={true} style={styles.wrapper} showsButtons={true}>
                {data.map(item => (
                    <View key={item.id} style={styles.slide}>
                        <View style={styles.card}>
                            <Text style={styles.title}>{item.description}</Text>
                            <View style={styles.topCard}>
                                <Image source={item.image} style={styles.image} />
                            </View>
                            <View style={[styles.bottomCard, { backgroundColor: `${item.color}` }]}>
                                <View style={{ marginTop: 20, marginLeft: 15 }}>
                                    <Text style={{ color: `${item.text}`, fontSize: 20, fontWeight: 'bold' }}>Tidak Dirasakan</Text>
                                    <Text style={{ color: `${item.text}`, fontSize: 18, marginRight: 5 }}>{item.description2}</Text>
                                </View>
                            </View>
                        </View>
                        <TouchableOpacity activeOpacity={0.8} onPress={handleForm} style={[styles.btnSubmit, { backgroundColor: `${item.color}` }]}>
                            <Text style={{ color: `${item.text}`, fontSize: 16, fontWeight: 'bold' }}>Isi Formulir</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </Swiper>
        </View>
    );
}
// }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: 'black',
        // paddingHorizontal: 20,
        // paddingTop: 20,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24,
        color: 'black',
        textAlign: 'center',
        marginTop:10
    },
    wrapper: {
        // color:'black'
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor:'red'
    },
    navbar: {
        backgroundColor: '#f8981d', 
        flexDirection: 'row', 
        height: 60, 
        alignItems: 'center', 
        borderBottomLeftRadius: 15, 
        borderBottomRightRadius: 15
    },
    buttonNav: {
        marginRight: '15%', 
        marginLeft: '5%'
    },
    textNav: {
        color: 'white', 
        fontSize: 18, 
        fontWeight: 'bold'
    },
    card: {
        backgroundColor: 'white', 
        width: '75%', 
        borderRadius: 20, 
        height: '70%', 
        shadowColor: 'black', 
        shadowOffset: { width: 0, height: 2 }, 
        shadowOpacity: 0.5, 
        elevation: 5
    },
    topCard: {
        alignItems: 'center', 
        height: '40%', 
        justifyContent: 'center'
    },
    image: {
        width: '70%', 
        height: '80%'
    },
    bottomCard: {
        height: '51%', 
        marginTop: 10, 
        borderBottomLeftRadius: 20, 
        borderBottomRightRadius: 20
    },
    btnSubmit:{
        width: '55%', 
        borderRadius: 10, 
        height: 50, 
        shadowColor: 'black', 
        shadowOffset: { width: 0, height: 2 }, 
        shadowOpacity: 0.5,
        elevation: 4, 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginTop: 30
    },
});

export default ImageList;