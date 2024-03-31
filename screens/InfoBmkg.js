import React, { useState, useEffect } from 'react';
import { Text, View, Image, StyleSheet, ScrollView, TouchableOpacity, TouchableHighlight, TouchableOpacityBase } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MapView, { Marker } from 'react-native-maps';
import proj4 from 'proj4';

// FILE INI GA DIPAKE

const App = () => {
  const [gempaData, setDataGempa] = useState([]);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

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
    <View style={styles.mainContainer}>
      <View style={styles.subContainer}>
        <Text style={styles.title}>Info Gempa Terkini</Text>
        <View style={{ backgroundColor: "green", marginBottom: 10 }}>
          {latitude !== null && longitude !== null && (
            <MapView style={{ width: 350, height: 350 }} initialRegion={{
              latitude: latitude,
              longitude: longitude,
              latitudeDelta: 1,
              longitudeDelta: 0.1,
            }}>
              <Marker coordinate={{ latitude: latitude, longitude: longitude }} />
            </MapView>
          )}
        </View>
        <View style={{ gap: 0, backgroundColor: 'red', width: "100%" }}>
          <View style={{ gap: 2, flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={styles.button}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 1 }}>
                <MaterialCommunityIcons name="pulse" style={styles.iconGempa} />
                <Text style={styles.textIcon}>{gempaData.Magnitude}</Text>
              </View>
              <Text style={styles.subText}>Magnitude</Text>
            </View>
            <View style={styles.button}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 1 }}>
                <MaterialCommunityIcons name="waveform" style={styles.iconKedalaman} />
                <Text style={styles.textIcon}>{gempaData.Kedalaman}</Text>
              </View>
              <Text style={styles.subText}>Kedalaman</Text>
            </View>
            <View style={styles.button}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 1 }}>
                <MaterialCommunityIcons name="map-marker" style={styles.iconMarker} />
                <Text style={styles.textIcon}>{gempaData.Lintang}</Text>
              </View>
              <Text style={styles.subText}>{gempaData.Bujur}</Text>
            </View>
          </View>

          <View style={{ backgroundColor: '#fff', borderRadius: 12, marginTop: 10 }}>
            <View style={{ marginRight: 10, marginLeft: 10, marginTop: 10 }}>
              <View style={{ flexDirection: 'row' }}>
                <MaterialCommunityIcons name="calendar-clock" style={styles.iconMarker} />
                <View style={{ marginLeft: 10 }}>
                  <Text style={{ fontSize: 14 }}>Waktu :</Text>
                  <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#000' }}>{gempaData.Tanggal}, {gempaData.Jam}</Text>
                </View>
              </View>
            </View>
            <View style={{ marginRight: 10, marginLeft: 10, marginTop: 10 }}>
              <View style={{ flexDirection: 'row' }}>
                <MaterialCommunityIcons name="map-marker-radius" style={{ color: '#f8981d', fontSize: 25, marginTop: 0 }} />
                <View style={{ marginLeft: 10 }}>
                  <Text style={{ fontSize: 14 }}>Lokasi :</Text>
                  <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#000' }}>{gempaData.Wilayah}</Text>
                </View>
              </View>
            </View>
            <View style={{ alignItems: 'center' }}>
              <View style={{ backgroundColor: '#beeabf', marginTop: 20, alignItems: 'center', justifyContent: 'center', width: '70%', borderRadius: 12, height: 40 }}>
                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 13, color: 'black' }}>{gempaData.Potensi}</Text>
              </View>
            </View>
            <TouchableOpacity style={{ backgroundColor: '#f8981d', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
              <MaterialCommunityIcons name="plus-circle" style={{ color: 'white', fontSize: 25 }} />
              <Text style={{ color: 'white', fontWeight: 'bold' }}>Ikut Kontribusi</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* <TouchableOpacity style={{ backgroundColor:'#f8981d', marginTop:10}}><Text>Kontribusi</Text></TouchableOpacity> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'yellow'
  },
  subContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
    width: "95%",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    color: 'black',
    fontWeight: 'bold',
    marginTop: 10
  },
  button: {
    backgroundColor: '#fff',
    alignItems: 'center',
    width: 110,
    height: 60,
    justifyContent: 'center',
    borderRadius: 12
  },
  iconGempa: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'red'
  },
  iconKedalaman: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'green'
  },
  iconMarker: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#f8981d'
  },
  textIcon: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black'
  },
  subText: {
    color: 'black'
  }
})

export default App;