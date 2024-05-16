import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableHighlight } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
// import moment from 'moment';

const App = () => {
  const [dataGempa, setDataGempa] = useState([]);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const navigation = useNavigation();
  const handleNextPress = () => {
    navigation.navigate('Explore');
  }

  // useEffect(() => {
  //   fetch('https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json')
  //     .then(response => response.json())
  //     .then(json => {
  //       const gempaData = json.Infogempa.gempa;
  //       setDataGempa(gempaData);
  //       if (gempaData.Coordinates) {
  //         const [lat, lng] = gempaData.Coordinates.split(',');
  //         // console.log(latitude)
  //         // console.log(longitude)
  //         setLatitude(parseFloat(lat));
  //         setLongitude(parseFloat(lng));
  //       }
  //     });
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://react-native-mmi-app-default-rtdb.asia-southeast1.firebasedatabase.app/user-input.json');
        if (!response.ok) {
          throw new Error('Gagal mengambil data');
        }
        const json = await response.json();
        // Mengubah objek ke dalam array agar dapat diolah
        const dataArray = Object.entries(json).map(([id, data]) => ({ id, ...data }));
        // Mengambil data terbaru (data yang terakhir setelah diurutkan)
        const latestData = dataArray.length > 0 ? dataArray[dataArray.length - 1] : null;
        // Mengubah data terbaru ke format yang sesuai dengan state dataGempa
        const newDataGempa = latestData ? [{
          id: latestData.id,
          waktu: latestData.waktu,
          magnitude: extractMagnitude(latestData.deskripsi),
          kedalaman: extractKedalaman(latestData.deskripsi),
          dirasakan: latestData.dirasakan,
          lokasi: extractLokasi(latestData.deskripsi),
          wilayah: extractWilayah(latestData.deskripsi)
        }] : [];
        setDataGempa(newDataGempa);

        // Set latitude dan longitude berdasarkan lokasi gempa terbaru
        if (latestData) {
          const lokasi = extractLokasi(latestData.deskripsi);
          const [latitude, longitude] = lokasi.split(', ');
          setLatitude(parseFloat(latitude));
          setLongitude(parseFloat(longitude));
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    // Panggil fetchData saat komponen pertama kali dimuat
    fetchData();
  }, []);

  const extractMagnitude = (deskripsi) => {
    // Mencari teks yang diawali dengan "Mag:" dan diakhiri dengan "SR,"
    const regex = /Mag:(.*?)(?= SR)/;
    const match = deskripsi.match(regex);
    return match ? match[1].trim() : '';
  };

  const extractKedalaman = (deskripsi) => {
    // Mencari teks yang diawali dengan "Kedalaman:" dan diakhiri dengan "Km"
    const regex = /Kedalaman:(.*?)(?= Km)/;
    const match = deskripsi.match(regex);
    return match ? match[1].trim() : '';
  };

  const extractLokasi = (deskripsi) => {
    // Mencari teks yang mengandung koordinat lintang dan bujur
    const regex = /Lok:(\d+\.\d+)\s+LS,\s*(\d+\.\d+)\s+BT/;
    const match = deskripsi.match(regex);
    // Jika ada kecocokan, ambil nilai lintang dan bujur
    if (match && match.length === 3) {
      const lintang = match[1].trim();
      const bujur = match[2].trim();
      return `${lintang}, ${bujur}`;
    } else {
      return 'N/A';
    }
  };

  const extractWilayah = (deskripsi) => {
    const regex = /\(([^)]+)\)/; // Ekstrak teks yang berada di antara tanda kurung
    const match = deskripsi.match(regex);
    return match ? match[1] : 'N/A'; // Ambil hasil yang cocok, atau kembalikan 'N/A' jika tidak ada yang cocok
  };

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
                  <Text style={[styles.textIconTop]}>{dataGempa.length > 0 ? dataGempa[0].magnitude : ''}</Text>
                </View>
                <Text style={{ marginTop: -5, fontWeight: 'bold', color: 'black' }}>Magnitudo</Text>
              </View>
              <View style={{ alignItems: 'center' }}>
                <View style={styles.wrapIconTop}>
                  <MaterialCommunityIcons name="waveform" style={[styles.iconTop, { color: 'green' }]} />
                  <Text style={[styles.textIconTop]}>{dataGempa.length > 0 ? dataGempa[0].kedalaman : ''}</Text>
                </View>
                <Text style={{ marginTop: -5, fontWeight: 'bold', color: 'black' }}>Kedalaman</Text>
              </View>
              <View style={{ alignItems: 'center', }}>
                <View style={styles.wrapIconTop}>
                  <MaterialCommunityIcons name="map-marker-radius" style={[styles.iconTop, { color: '#f8981d', fontSize: 30 }]} />
                  <Text style={[styles.textIconTop, { fontSize: 14 }]}>{dataGempa.length > 0 ? dataGempa[0].lokasi : ''},</Text>
                </View>
                {/* <Text style={{ marginTop: -5, fontWeight: 'bold', color: 'black' }}>{gempaData.Bujur}</Text> */}
              </View>
            </View>

            <View style={styles.tidakBerpotensi}>
              <Text style={{ color: 'black', fontWeight: 'bold', textAlign: 'center', fontSize: 12 }}>Potensi</Text>
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
                  <Text style={styles.textIconBot}>{dataGempa.length > 0 ? dataGempa[0].waktu : 'N/A'}</Text>
                </View>
              </View>
            </View>

            <View style={styles.subContainerBotCard}>
              <View style={{ flexDirection: 'row' }}>
                <MaterialCommunityIcons name="target" style={styles.iconBot} />
                <View style={{ marginLeft: 10 }}>
                  <Text>Lokasi Gempa :</Text>
                  <Text style={[styles.textIconBot, { marginRight: 10 }]}>{dataGempa.length > 0 ? dataGempa[0].wilayah : 'N/A'}</Text>
                </View>
              </View>
            </View>

            <View style={styles.subContainerBotCard}>
              <View style={{ flexDirection: 'row' }}>
                <MaterialCommunityIcons name="map-marker-distance" style={styles.iconBot} />
                <View style={{ marginLeft: 10 }}>
                  <Text>Koordinat :</Text>
                  <Text style={styles.textIconBot}>{dataGempa.length > 0 ? dataGempa[0].lokasi : ''}</Text>
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
    marginTop: -300,
  },
  overlay1: {
    // ...StyleSheet.absoluteFillObject,
    backgroundColor: 'red', // Memastikan latar belakang transparan untuk menampilkan MapView
    paddingTop: 7, // Atur sesuai kebutuhan untuk mengatur posisi informasi gempa di atas MapView
    marginTop: 100,
    width: 30,
    height: 30,
    alignItems: 'center',
    marginLeft: -300,

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