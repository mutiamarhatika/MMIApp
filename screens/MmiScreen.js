import React, { Component } from 'react';
import { View, FlatList, Image, Text, StyleSheet, TextInput } from 'react-native';

const data = [
    {
        id: '1',
        image: require('../GAMBARMMI/mmi1.png'),
        description: 'I MMI',
        description2:
            'Getaran tidak dirasakan kecuali dalam keadaan luarbiasa oleh beberapa orang',
    },
    {
        id: '2',
        image: require('../GAMBARMMI/mmi2.png'),
        description: 'II MMI',
        description2:
            'Getaran dirasakan oleh beberapa orang, benda-benda ringan yang digantung bergoyang.',
    },
    {
        id: '3',
        image: require('../GAMBARMMI/mmi3.png'),
        description: 'III MMI',
        description2:
            'Getaran dirasakan nyata dalam rumah. Terasa getaran seakan-akan ada truk berlalu.',
    },
    {
        id: '4',
        image: require('../GAMBARMMI/mmi4.png'),
        description: 'IV MMI',
        description2:
            'Pada siang hari dirasakan oleh orang banyak dalam rumah, di luar oleh beberapa orang, gerabah pecah, jendela/pintu berderik dan dinding berbunyi.',
    },
    {
        id: '5',
        image: require('../GAMBARMMI/mmi5.png'),
        description: 'V MMI',
        description2:
            'Getaran dirasakan oleh hampir semua penduduk, orang banyak terbangun, gerabah pecah, barang-barang terpelanting, tiang-tiang dan barang besar tampak bergoyang, bandul lonceng dapat berhenti.',
    },
    {
        id: '6',
        image: require('../GAMBARMMI/mmi6.png'),
        description: 'VI MMI',
        description2:
            'Getaran dirasakan oleh semua penduduk. Kebanyakan semua terkejut dan lari keluar, plester dinding jatuh dan cerobong asap pada pabrik rusak, kerusakan ringan.',
    },
    {
        id: '7',
        image: require('../GAMBARMMI/mmi7.png'),
        description: 'VII MMI',
        description2:
            'Tiap-tiap orang keluar rumah. Kerusakan ringan pada rumah-rumah dengan bangunan dan konstruksi yang baik. Sedangkan pada bangunan yang konstruksinya kurang baik terjadi retak-retak bahkan hancur, cerobong asap pecah. Terasa oleh orang yang naik kendaraan.',
    },
    {
        id: '8',
        image: require('../GAMBARMMI/mmi8.png'),
        description: 'VIII MMI',
        description2:
            'Kerusakan ringan pada bangunan dengan konstruksi yang kuat. Retak-retak pada bangunan degan konstruksi kurang baik, dinding dapat lepas dari rangka rumah, cerobong asap pabrik dan monumen-monumen roboh, air menjadi keruh.',
    },
    {
        id: '9',
        image: require('../GAMBARMMI/mmi9.png'),
        description: 'IX MMI',
        description2:
            'Kerusakan pada bangunan yang kuat, rangka-rangka rumah menjadi tidak lurus, banyak retak. Rumah tampak agak berpindah dari pondamennya. Pipa-pipa dalam rumah putus.',
    },
    {
        id: '10',
        image: require('../GAMBARMMI/mmi10.png'),
        description: 'X MMI',
        description2:
            'Bangunan dari kayu yang kuat rusak,rangka rumah lepas dari pondamennya, tanah terbelah rel melengkung, tanah longsor di tiap-tiap sungai dan di tanah-tanah yang curam.',
    },
    {
        id: '11',
        image: require('../GAMBARMMI/mmi11.png'),
        description: 'XI MMI',
        description2:
            'Bangunan-bangunan hanya sedikit yang tetap berdiri. Jembatan rusak, terjadi lembah. Pipa dalam tanah tidak dapat dipakai sama sekali, tanah terbelah, rel melengkung sekali',
    },
    {
        id: '12',
        image: require('../GAMBARMMI/mmi12.png'),
        description: 'XII MMI',
        description2:
            'Hancur sama sekali, Gelombang tampak pada permukaan tanah. Pemandangan menjadi gelap. Benda-benda terlempar ke udara.',
    },
];

class ImageList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            data: data,
        };
    }

    searchFilterFunction = text => {
        this.setState({ text }, () => {
            this.search();
        });
    };

    search = () => {
        const { text } = this.state;
        let dataSearch = data.filter(
            item =>
                item.description2.toLowerCase().includes(text.toLowerCase()) ||
                item.description.toLowerCase().includes(text.toLowerCase()),
        );

        this.setState({
            dataSearch: dataSearch,
        });
    };
    render() {
        const { text, dataSearch } = this.state;
        const dataSource = text ? dataSearch : data;

        return (
            <View style={styles.container}>

                <View style={{ flexDirection: "row", backgroundColor:'#D2E9E9', borderRadius:20, marginBottom:20, marginHorizontal:20}}>
                    <View style={{alignItems:'center', width:"25%", justifyContent:'center'}}>
                        <Image
                            source={require('../GAMBARMMI/mmicenter.png')}
                            style={{ width: 100, height: 140, resizeMode: 'contain', marginLeft:0}}
                        />
                    </View>
                    <View style={{alignItems:'center', width:"75%", marginRight:20, justifyContent:'center'}}>
                        <Text style={{ fontWeight: 'bold', fontSize:15 }}>Modified Mercalli Intensity</Text>
                        <Text style={{textAlign:'justify', fontSize:13}}>Skala Mercalli adalah satuan untuk mengukur kekuatan gempa bumi
                            yang terbagi menjadi 12 pecahan berdasarkan informasi dari
                            orang-orang yang selamat dari gempa tersebut dan juga dengan
                            melihat serta membandingkan tingkat kerusakan akibat gempa bumi
                            tersebut.</Text>
                    </View>
                </View>

                <View
                    style={{
                        backgroundColor: '#89B5AF',
                        height: 500,
                        borderRadius: 20,
                        widht: 500,
                        marginHorizontal:10
                    }}>
                    <FlatList
                        data={dataSource}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <View style={styles.itemContainer}>
                                <Image source={item.image} style={styles.image} />
                                <View>
                                    <Text style={styles.description1}>{item.description}</Text>
                                    <Text style={styles.description}>{item.description2}</Text>
                                </View>
                            </View>
                        )}
                    />
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    itemContainer: {
        width: 400,
        flexDirection: 'row',
        borderColor: 'black',
        borderwidht: 10,
        // backgroundColor: '#89B5AF',
        marginTop: 20,
        borderRadius: 10,
    },
    image: {
        width: 120,
        height: 120,
        resizeMode: 'cover',
    },
    description1: {
        textAlign: 'justify',
        // marginTop: 10,
        marginLeft: 10,
        marginRight: 150,
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white',
    },
    description: {
        textAlign: 'justify',
        marginTop: 10,
        marginLeft: 10,
        marginRight: 150,
        fontSize: 12,
        color: 'white',
    },
});

export default ImageList;
