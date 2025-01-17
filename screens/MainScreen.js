import { View, Text, SafeAreaView, Image, ScrollView, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native'

const MainScreen = () => {

  const [dataGempa, setDataGempa] = useState([])
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
          waktu: new Date(latestData.waktu).toLocaleString(),
          magnitude: extractMagnitude(latestData.deskripsi),
          kedalaman: extractKedalaman(latestData.deskripsi),
          dirasakan: latestData.dirasakan,
          lokasi: extractLokasi(latestData.deskripsi)
        }] : [];
        setDataGempa(newDataGempa);
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

  // const response = await fetch('https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json');
  // const data = await response.json();

  const navigation = useNavigation();
  const handleMMIPage = () => {
    navigation.navigate('PageInfo');
  }
  const handleInputPage = () => {
    navigation.navigate('InputPage')
  }
  const handleInfoGempaTerkini = () => {
    navigation.navigate('InfoGempa')
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Komponen di atas Main Card tetap berada di luar ScrollView */}
      <View style={styles.header}>
        <View style={styles.containerHeader}>
          <View>
            <Text style={styles.title}>Selamat Datang User!</Text>
          </View>
          <View style={styles.subContainerHeader}>
            <Text style={styles.subTitle}>Aplikasi MMI</Text>
            <MaterialCommunityIcons name='account-circle' size={70} color='white' style={{ marginTop: -40, marginRight: -10 }} />
          </View>
          <TouchableOpacity activeOpacity={0.7} style={[styles.subContainerHeader, { marginTop: 25 }]} onPress={handleInfoGempaTerkini}>
            <Text style={styles.subTitle}>Informasi Gempa Saat ini</Text>
            <MaterialCommunityIcons name='chevron-right' size={20} color='white' />
          </TouchableOpacity>
        </View>
      </View>

      {/* 3 CARD ROW */}
      <View style={styles.cardOverlay}>
        <View style={styles.subCardOverlay}>
          <MaterialCommunityIcons name='pulse' size={40} color='black' />
          <Text>{dataGempa.length > 0 ? dataGempa[0].magnitude : ''}</Text>
          <Text>Magnitude</Text>
        </View>
        <View style={styles.subCardOverlay}>
          <MaterialCommunityIcons name='waveform' size={40} color='black' />
          <Text>{dataGempa.length > 0 ? dataGempa[0].kedalaman : ''}</Text>
          <Text>Kedalaman</Text>
        </View>
        <View style={styles.subCardOverlay}>
          <MaterialCommunityIcons name='map-marker-radius' size={40} color='black' />
          <Text>{dataGempa.length > 0 ? dataGempa[0].lokasi : ''}</Text>
          {/* <Text>{dataGempa.Bujur}</Text> */}
        </View>
      </View>
      {/* 3 CARD ROW END */}

      {/* Main Card di dalam ScrollView agar hanya konten di dalamnya yang dapat di-scroll */}
      <ScrollView style={{ flex: 1 }}>
        <View style={{ backgroundColor: 'white', marginBottom: 10 }}>
          {/* Konten Main Card */}
          <View style={{ marginHorizontal: 30 }}>
            {/* CARD 1 START */}
            <View style={styles.cardContent}>
              <TouchableOpacity activeOpacity={0.7} style={styles.buttonCard} onPress={handleMMIPage}>
                <Text style={styles.cardTitle}>MMI (Modified Mercalli Intensity)</Text>
                <MaterialCommunityIcons name='chevron-right' size={20} color='#f8981d' />
              </TouchableOpacity>
              <View style={styles.textCard}>
                <Image
                  source={require('../GAMBARMMI/mmicenter.png')}
                  style={styles.imageCard}
                />
                <Text style={{ textAlign: 'justify', fontSize: 13 }}>Skala Mercalli adalah satuan untuk mengukur kekuatan gempa bumi
                  yang terbagi menjadi 12 pecahan berdasarkan informasi dari
                  orang-orang yang selamat dari gempa tersebut dan juga dengan
                  melihat serta membandingkan tingkat kerusakan akibat gempa bumi
                  tersebut.</Text>
              </View>
            </View>
            {/* CARD 1 END */}

            {/* CARD 2 START */}
            <View style={styles.cardContent}>
              <TouchableOpacity activeOpacity={0.7} style={styles.buttonCard} onPress={handleInputPage}>
                <Text style={styles.cardTitle}>Laporkan Gempa</Text>
                <MaterialCommunityIcons name='chevron-right' size={20} color='#f8981d' />
              </TouchableOpacity>
              <View style={styles.textCard}>
                <View>
                  <Text style={{ textAlign: 'justify', marginLeft: 30, marginRight: 5, fontSize: 13 }}>Laporkan sekarang jika anda merasa gempa bumi atau
                    sudah melihat dampak dari gempa bumi sesuai dengan MMI</Text>
                  <TouchableOpacity activeOpacity={0.7} onPress={handleInputPage} style={{ marginLeft: 30, backgroundColor: "#f8981d", width: 140, height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
                    <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 13 }}>Laporkan Sekarang</Text>
                  </TouchableOpacity>
                </View>
                <Image
                  source={require('../GAMBARMMI/panic.png')}
                  style={styles.imageCard}
                />
              </View>
            </View>
            {/* CARD 2 END */}

            {/* CARD 3 START */}
            <View style={styles.cardContent}>
              <TouchableOpacity activeOpacity={0.7} style={styles.buttonCard} onPress={handleInfoGempaTerkini}>
                <Text style={styles.cardTitle}>Informasi Gempa Terkini</Text>
                <MaterialCommunityIcons name='chevron-right' size={20} color='#f8981d' />
              </TouchableOpacity>
              <View style={styles.textCard}>
                <Image
                  source={require('../GAMBARMMI/think.png')}
                  style={{ width: 120, height: 140, marginLeft: 0 }}
                />
                <Text style={{ textAlign: 'justify', marginRight: 5, fontSize: 13 }}>Lihat lebih detail informasi gempa terkini yang
                  meliputi kekuatan gempa, waktu terjadinya gempa, posisi gempa berada, wilayah mana yang terdampak, dan potensi dari gempa tersebut</Text>
              </View>
            </View>
            {/* CARD 3 END */}
          </View>
        </View>
      </ScrollView>
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
    elevation: 5
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
    marginTop: 10
  },
  imageCard: {
    width: 120,
    height: 140,
    resizeMode: 'contain'
  }
})

export default MainScreen
