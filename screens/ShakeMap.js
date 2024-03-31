import { useNavigation } from '@react-navigation/native'
import React, { useState, useEffect } from 'react'
import { Image, Text, TouchableHighlight, View } from 'react-native'

const ShakeMap = () => {
  const [dataGempa, setDataGempa] = useState([])
  const navigation = useNavigation()

  const handleBack = () => {
    navigation.navigate('HomePage')
  }
  useEffect(() => {
    fetch('https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json')
      .then(response => response.json())
      .then(json => setDataGempa(json.Infogempa.gempa));
  }, []);

  return (
    <View style={{backgroundColor:'white', height:'100%'}}>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Image source={{ uri: `https://data.bmkg.go.id/DataMKG/TEWS/${dataGempa.Shakemap}` }} style={{ width: '98%', height: '78%' }}></Image>
      </View>
      <View style={{ alignItems: 'center', marginTop: -50 }}>
        <TouchableHighlight onPress={handleBack} style={{ backgroundColor: '#f8981d', width: '70%', height: 40, justifyContent: 'center', borderRadius:15 }}>
          <Text style={{textAlign:'center', fontWeight:'bold', color:'white'}}>Kembali ke Beranda</Text>
        </TouchableHighlight>
      </View>
    </View>
  )
}

export default ShakeMap