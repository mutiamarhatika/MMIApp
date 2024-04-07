import { View, Text, SafeAreaView, Image, ScrollView } from 'react-native'
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
      <View style={{ backgroundColor: 'white' }}>
        <View style={{ backgroundColor: '#f8981d', padding: 35, height: 200, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}>
          <View>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>Selamat Datang Pengguna!</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ marginTop: 0, color: 'white' }}>Alexander Graham Bell</Text>
            <MaterialCommunityIcons name='account-circle' size={70} color='white' style={{ marginTop: -40, marginRight: -10 }} />
          </View>
          <TouchableOpacity style={{ marginTop: 25, justifyContent: 'space-between', flexDirection: 'row' }} onPress={handleInfoGempaTerkini}>
            <Text style={{ color: 'white' }}>Informasi Gempa Saat ini</Text>
            <MaterialCommunityIcons name='chevron-right' size={20} color='white' />
          </TouchableOpacity>
        </View>
      </View>

      {/* 3 CARD ROW */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 35, marginTop: 0, backgroundColor: 'white', zIndex: 20 }}>
        <View style={{
          width: 85, height: 100, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', zIndex: 10, marginTop: -50, borderRadius: 10, shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3, elevation: 5
        }}>
          <MaterialCommunityIcons name='pulse' size={40} color='black' />
          <Text>{dataGempa.Magnitude}</Text>
          <Text>Magnitude</Text>
        </View>
        <View style={{
          width: 85, height: 100, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', zIndex: 10, marginTop: -50, borderRadius: 10, shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3, elevation: 5
        }}>
          <MaterialCommunityIcons name='waveform' size={40} color='black' />
          <Text>{dataGempa.Kedalaman}</Text>
          <Text>Kedalaman</Text>
        </View>
        <View style={{
          width: 85, height: 100, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', zIndex: 10, marginTop: -50, borderRadius: 10, shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3, elevation: 5
        }}>
          <MaterialCommunityIcons name='map-marker-radius' size={40} color='black' />
          <Text>{dataGempa.Lintang},</Text>
          <Text>{dataGempa.Bujur}</Text>
        </View>
      </View>
      {/* 3 CARD ROW END */}

      {/* Main Card di dalam ScrollView agar hanya konten di dalamnya yang dapat di-scroll */}
      <ScrollView style={{ flex: 1 }}>
        <View style={{ backgroundColor: 'white', marginBottom: 10 }}>
          {/* Konten Main Card */}
          <View style={{ marginHorizontal: 30 }}>
            {/* CARD 1 START */}
            <View style={{ padding: 25, backgroundColor: 'white', borderRadius: 20, marginTop: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3, elevation: 5 }}>
              <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between' }} onPress={handleMMIPage}>
                <Text style={{ fontWeight: 'bold', color: '#f8981d', fontSize: 16 }}>MMI (Modified Mercalli Index)</Text>
                <MaterialCommunityIcons name='chevron-right' size={20} color='#f8981d' />
              </TouchableOpacity>
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: 30, marginRight: 50, marginTop: 10 }}>
                <Image
                  source={require('../GAMBARMMI/mmicenter.png')}
                  style={{ width: 100, height: 140, resizeMode: 'contain', marginLeft: 0 }}
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
            <View style={{ padding: 25, backgroundColor: 'white', borderRadius: 20, marginTop: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3, elevation: 5 }}>
              <TouchableOpacity onPress={handleInputPage} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#f8981d' }}>Laporkan Gempa</Text>
                <MaterialCommunityIcons name='chevron-right' size={20} color='#f8981d' />
              </TouchableOpacity>
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: 30, marginRight: 50, marginTop: 10 }}>
                <View>
                  <Text style={{ textAlign: 'justify', marginLeft: 30, marginRight: 5, fontSize: 13 }}>Laporkan sekarang jika anda merasa gempa bumi atau
                    sudah melihat dampak dari gempa bumi sesuai dengan MMI</Text>
                  <TouchableOpacity onPress={handleInputPage} style={{ marginLeft: 30, backgroundColor: "#f8981d", width: 140, height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
                    <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 13 }}>Laporkan Sekarang</Text>
                  </TouchableOpacity>
                </View>
                <Image
                  source={require('../GAMBARMMI/panic.png')}
                  style={{ width: 120, height: 140, resizeMode:'contain' }}
                />
              </View>
            </View>
            {/* CARD 2 END */}

            {/* CARD 3 START */}
            <View style={{ padding: 25, backgroundColor: 'white', borderRadius: 20, marginTop: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3, elevation: 5 }}>
              <TouchableOpacity onPress={handleInfoGempaTerkini} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#f8981d' }}>Informasi Gempa Terkini</Text>
                <MaterialCommunityIcons name='chevron-right' size={20} color='#f8981d' />
              </TouchableOpacity>
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: 30, marginRight: 50, marginTop: 10 }}>
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

export default MainScreen
