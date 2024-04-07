import React, { useState, useEffect } from 'react';
import { Text, View, Image, StyleSheet, ScrollView, TouchableOpacity, TouchableHighlight, TouchableOpacityBase } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import proj4 from 'proj4';
import { useNavigation } from '@react-navigation/native';

const App = () => {
  const [gempaData, setDataGempa] = useState([]);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const navigation = useNavigation();
  const handleNextPress = () => {
    navigation.navigate('Explore');
  }

  useEffect(() => {
    fetch('https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json')
      .then(response => response.json())
      .then(json => {
        const gempaData = json.Infogempa.gempa;
        setDataGempa(gempaData);
        if (gempaData.Coordinates) {
          const [lat, lng] = gempaData.Coordinates.split(',');
          // console.log(latitude)
          // console.log(longitude)
          setLatitude(parseFloat(lat));
          setLongitude(parseFloat(lng));
        }
      });
  }, []);

  return (
    <View style={styles.container}>
      {latitude !== null && longitude !== null && (
        <MapView style={styles.map} initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 1,
          longitudeDelta: 1,
        }} provider={PROVIDER_GOOGLE} showsUserLocation={true} showsCompass={true}>
          <Marker coordinate={{ latitude: latitude, longitude: longitude }}>
            <MaterialCommunityIcons name='circle-double' size={30} color='black' />
            {/* <Image source={require('../GAMBARMMI/mark.gif')} style={{width:30, height:30}}/> */}
          </Marker>
        </MapView>
      )}
      {/* <View style={styles.overlay1}> */}
      {/* <TouchableOpacity style={styles.overlay1} onPress={handleNextPress}>
        <MaterialCommunityIcons name="map-marker-radius" />
        <Text>Peta Guncangan</Text>
      </TouchableOpacity> */}
      {/* </View> */}
      <View style={styles.overlay}>
        <ScrollView>

          {/* CARD TOP START */}
          <View style={styles.card}>
            <View>
              <Text style={styles.title}>Gempabumi M ≤ 5</Text>
            </View>
            <View style={styles.content}>
              <View style={{ alignItems: 'center' }}>
                <View style={styles.wrapIconTop}>
                  <MaterialCommunityIcons name="pulse" style={[styles.iconTop, { color: 'red' }]} />
                  <Text style={[styles.textIconTop]}>{gempaData.Magnitude}</Text>
                </View>
                <Text style={{ marginTop: -5, fontWeight: 'bold', color: 'black' }}>Magnitudo</Text>
              </View>
              <View style={{ alignItems: 'center' }}>
                <View style={styles.wrapIconTop}>
                  <MaterialCommunityIcons name="waveform" style={[styles.iconTop, { color: 'green' }]} />
                  <Text style={[styles.textIconTop]}>{gempaData.Kedalaman}</Text>
                </View>
                <Text style={{ marginTop: -5, fontWeight: 'bold', color: 'black' }}>Kedalaman</Text>
              </View>
              <View style={{ alignItems: 'center', }}>
                <View style={styles.wrapIconTop}>
                  <MaterialCommunityIcons name="map-marker-radius" style={[styles.iconTop, { color: '#f8981d', fontSize: 30 }]} />
                  <Text style={[styles.textIconTop, { fontSize: 14 }]}>{gempaData.Lintang},</Text>
                </View>
                <Text style={{ marginTop: -5, fontWeight: 'bold', color: 'black' }}>{gempaData.Bujur}</Text>
              </View>
            </View>

            <View style={styles.tidakBerpotensi}>
              <Text style={{ color: 'black', fontWeight: 'bold', textAlign: 'center', fontSize: 12 }}>{gempaData.Potensi}</Text>
            </View>
          </View>

          {/* CARD TOP END */}

          {/* CARD BOTTOM START */}
          <View style={styles.containerBotCard}>

            <View style={styles.subContainerBotCard}>
              <View style={{ flexDirection: 'row' }}>
                <MaterialCommunityIcons name="calendar-clock" style={styles.iconBot} />
                <View style={{ marginLeft: 10 }}>
                  <Text>Waktu :</Text>
                  <Text style={styles.textIconBot}>{gempaData.Tanggal}, {gempaData.Jam}</Text>
                </View>
              </View>
            </View>

            <View style={styles.subContainerBotCard}>
              <View style={{ flexDirection: 'row' }}>
                <MaterialCommunityIcons name="target" style={styles.iconBot} />
                <View style={{ marginLeft: 10 }}>
                  <Text>Lokasi Gempa :</Text>
                  <Text style={[styles.textIconBot, { marginRight: 10 }]}>{gempaData.Wilayah}</Text>
                </View>
              </View>
            </View>

            <View style={styles.subContainerBotCard}>
              <View style={{ flexDirection: 'row' }}>
                <MaterialCommunityIcons name="map-marker-distance" style={styles.iconBot} />
                <View style={{ marginLeft: 10 }}>
                  <Text>Koordinat :</Text>
                  <Text style={styles.textIconBot}>{gempaData.Coordinates}</Text>
                </View>
              </View>
            </View>
          </View>
          {/* CARD BOTTOM END */}

          {/* BUTTON LIHAT PETA */}
          <View style={{ alignItems: 'center', marginTop: 0, backgroundColor: 'white', justifyContent: 'center', padding: 10, marginHorizontal: 0, marginVertical: 5, borderRadius: 25 }}>
            <TouchableHighlight onPress={handleNextPress} style={{ backgroundColor: '#f8981d', width: 230, height: 40, borderRadius: 15 }}><Text style={{ lineHeight: 40, textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Lihat Peta</Text></TouchableHighlight>
          </View>

        </ScrollView>
      </View>
    </View>
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
    marginTop: 7,
    justifyContent: 'center',
    flexDirection: 'column',
    padding: 10,
    borderRadius: 25,
    backgroundColor: 'white',
    borderColor: 'black',
    marginHorizontal: 0,
    marginVertical: 5
  },
  title: {
    alignItems: 'center',
    fontSize: 17,
    fontWeight: 'bold',
    color: 'black'
  },
  wrapIconTop: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 60,
    flexDirection: 'row'
  },
  iconTop: {
    fontSize: 40,
    marginTop: 20
  },
  textIconTop: {
    color: '#000',
    fontSize: 16,
    marginTop: 20,
    fontWeight: 'bold'
  },
  tidakBerpotensi: {
    backgroundColor: '#beeabf',
    marginBottom: 5,
    marginTop: 15,
    borderRadius: 15,
    width: 230,
    height: 40,
    flex: 1,
    justifyContent: 'center'
  },

  // CARD BOTTOM START
  containerBotCard: {
    marginTop: 0,
    backgroundColor: 'white',
    justifyContent: 'center',
    padding: 10,
    marginVertical: 5,
    borderRadius: 25
  },
  subContainerBotCard: {
    marginRight: 10,
    marginLeft: 10,
    marginTop: 10
  },
  iconBot: {
    color: '#f8981d',
    fontSize: 25
  },
  textIconBot: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000'
  },
  // CARD BOTTOM END

  content: {
    display: 'flex',
    flexDirection: 'row',
    width: 310,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: -10
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    // width: '100%',
    // height: '100%',
    marginTop: -250,
  },
  overlay1: {
    // ...StyleSheet.absoluteFillObject,
    backgroundColor: 'red', // Memastikan latar belakang transparan untuk menampilkan MapView
    paddingTop: 7, // Atur sesuai kebutuhan untuk mengatur posisi informasi gempa di atas MapView
    marginTop: 120,
    width: 30,
    height: 30,
    alignItems: 'center',
    marginLeft: -320,

    // height:'80%'
  },
  overlay: {
    // ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent', // Memastikan latar belakang transparan untuk menampilkan MapView
    // paddingTop: 7, // Atur sesuai kebutuhan untuk mengatur posisi informasi gempa di atas MapView
    // marginTop: 180,
    // marginTop: 330,
    position: 'absolute',
    width: '90%',
    // height:'80%',
    bottom: 5,
    // alignSelf: 'center',
  },
})
export default App;