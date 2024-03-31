import React, { useState, useEffect } from 'react';
import { Text, View, Image, StyleSheet, ScrollView } from 'react-native';

const InfoGempaDirasakan = () => {
    const [dataGempaDirasakan, setDataGempaDirasakan] = useState([]);

    useEffect(() => {
        fetch('https://data.bmkg.go.id/DataMKG/TEWS/gempadirasakan.json')
            .then(response => response.json())
            .then(json => setDataGempaDirasakan(json.Infogempa.gempa));
    }, []);

    // const tanggalFormatted = new Date(dataGempa.DateTime).toLocaleDateString();

    return (
        <ScrollView>
        <View>
            {dataGempaDirasakan.map((gempa, index) => (
                <View key={index} style={styles.card}>
                    <Text>Date&Time: {gempa.DateTime}</Text>
                    <Text>Jam: {gempa.Jam}</Text>
                    <Text>Koordinat: {gempa.Coordinates}</Text>
                    <Text>Lintang: {gempa.Lintang}</Text>
                    <Text>Bujur: {gempa.Bujur}</Text>
                    <Text>Magnitudo: {gempa.Magnitude}</Text>
                    <Text>Kedalaman: {gempa.Kedalaman}</Text>
                    <Text>Wilatag: {gempa.Wilayah}</Text>
                    <Text>Potensi: {gempa.Potensi}</Text>
                    <Text>Dirasakan: {gempa.Dirasakan}</Text>
                </View>
            ))}
        </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    card: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'grey',
        shadowColor: '#000',
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
        marginHorizontal: 20,
        marginVertical: 7
    },
})
export default InfoGempaDirasakan;
