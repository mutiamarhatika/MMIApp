import React, {useEffect, useRef, useState} from 'react';

import {
  Button,
  PermissionsAndroid,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  View,
  ToastAndroid,
  Alert,
  Platform,
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import BottomSheetDialog from '../components/lokasi';
import db from '@react-native-firebase/database';
import {uuidv4} from '@firebase/util';
import {dataMMI} from '../components/dropdown.tsx';
import EditText from '../components/edittext.tsx';
import TextButton from '../components/textbutton.tsx';
import {SelectList} from 'react-native-dropdown-select-list';
import storage from '@react-native-firebase/storage';

import * as ImagePicker from 'react-native-image-picker';

const Input = () => {
  const [markerCoordinate, setMarkerCoordinate] = useState(null);
  const [, setCurrentLocation] = useState(null);
  const ref: any = useRef();
  const [location, setLocationButtonText] = useState('Lokasi');
  const [namaPengirim, setNamaPengirim] = useState('');
  const [tipeMMI, setTipeMMI] = useState<any>('');
  const [image, setImage] = useState<any>('');

  const sendDatatoFirebase = async () => {
    if (tipeMMI && namaPengirim && location && markerCoordinate) {
      try {
        if (!image) {
          db().ref('data').push({
            tipeMMI,
            namaPengirim,
            location,
            image,
            coordinate: markerCoordinate,
          });
          ToastAndroid.show('Data Terkirim', ToastAndroid.SHORT);
        } else {
          console.log(image);
          const response = await fetch(image.assets[0].uri);
          const blob = await response.blob();
          const imageName = `${uuidv4()}.jpg`;
          const storageRef = storage().ref().child(`data/images/${imageName}`);
          await storageRef.put(blob);

          const imageURL = await storageRef.getDownloadURL();

          db().ref('data').push({
            tipeMMI,
            namaPengirim,
            location,
            imageURL,
            coordinate: markerCoordinate,
          });
          ToastAndroid.show('Data Terkirim', ToastAndroid.SHORT);
        }
      } catch (error) {
        console.error('Error sending data to firebase: ', error);
        ToastAndroid.show('Gagal mengirim data', ToastAndroid.SHORT);
      }
    } else {
      console.error('Harap isi Data terlebih dahulu');
    }
  };

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      ]);

      if (
        granted['android.permission.ACCESS_FINE_LOCATION'] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        granted['android.permission.ACCESS_COARSE_LOCATION'] ===
          PermissionsAndroid.RESULTS.GRANTED
      ) {
        console.log('Location permission granted');
        return true;
      } else {
        console.log('Location permission denied');
        return false;
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  useEffect(() => {
    const checkPermission = async () => {
      const permissionGranted = await requestLocationPermission();
      if (permissionGranted) {
        await getCurrentLocation();
      } else {
        console.log('request permission not granted');
      }
    };
    checkPermission();
  }, []);

  const getCurrentLocation = async () => {
    try {
      const response = await fetch(
        'https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyChTv4I5oaxL-wnJl5FqFP5kJVah5XDoxs',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const data = await response.json();
      const {location} = data;
      setCurrentLocation(location);
    } catch (error) {
      console.error('Error getting current location: ', error);
    }
  };

  const handleLocationSelect = (data: any) => {
    setLocationButtonText(
      data.province + ' \n' + data.district + ' \n' + data.subDistrict,
    );
    console.log(data);
  };

  const handleLocationPress = () => {
    ref.current.open();
  };

  const handleMapPress = (event: any) => {
    const {coordinate} = event.nativeEvent;
    setMarkerCoordinate(coordinate);
  };

  const handlePhotoPress = React.useCallback((type: any, options: any) => {
    Alert.alert('Pilih', 'Pilih Media untuk Mengambil Foto', [
      {text: 'Batal', style: 'cancel'},
      {
        text: 'Camera',
        onPress: () => {
          ImagePicker.launchCamera(options, setImage);
        },
      },
      {
        text: 'Gallery',
        onPress: () => {
          ImagePicker.launchImageLibrary(options, setImage);
        },
      },
    ]);
  }, []);

  const handleDeletePhoto = () => {
    setImage(null);
    ToastAndroid.show('Foto dihapus', ToastAndroid.SHORT);
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          {/*Tipe MMI*/}
          <View style={[styles.elevatedCard]}>
            <Text style={styles.cardTitle}>Tipe MMI</Text>
            <Text style={styles.cardSubtitle}>
              Pilih tipe MMI sesuai dengan gempa yang Anda rasakan
            </Text>
            <View style={styles.editText}>
              <SelectList
                inputStyles={styles.cardSubtitle}
                dropdownTextStyles={styles.cardSubtitle}
                searchPlaceholder="Cari"
                placeholder="Pilih Tipe MMI"
                setSelected={(val: any) => setTipeMMI(val)}
                data={dataMMI}
                save="value"
              />
            </View>
          </View>

          {/*Data*/}
          <View style={[styles.elevatedCard]}>
            <Text style={styles.cardTitle}>Data</Text>
            <Text style={styles.cardSubtitle}>
              Masukkan data diri Anda serta foto setelah kejadian
            </Text>
            <EditText
              placeholder="Nama Pengirim"
              onChangeText={setNamaPengirim}
            />
            <TextButton text={location} onPress={handleLocationPress} />
            {actions.map(({title, type, options}) => {
              if (title === 'Select Image') {
                return (
                  <TextButton
                    key={title}
                    text="Pilih Foto (Opsional)"
                    onPress={() => handlePhotoPress(type, options)}
                  />
                );
              }
              return null; // Render nothing for other actions
            })}

            {image?.assets &&
              image?.assets.map(({uri}: {uri: string}) => (
                <View>
                  <Image source={{uri: uri}} style={styles.photo} />
                  <Button title="hapus" onPress={handleDeletePhoto} />
                </View>
              ))}
          </View>

          {/*BottomSheetDialog*/}
          <BottomSheetDialog onClose={handleLocationSelect} ref={ref} />

          {/*Atur Titik Akurat Lokasi*/}
          <View style={[styles.elevatedCard]}>
            <Text style={styles.cardTitle}>Atur Titik Akurat Lokasi</Text>
            <Text style={styles.cardSubtitle}>
              Pencet sekali untuk memilih lokasi
            </Text>

            <MapView
              style={styles.map}
              onPress={handleMapPress}
              provider={PROVIDER_GOOGLE}
              showsUserLocation={true}
              showsMyLocationButton={true}
              initialRegion={{
                latitude: -7.6760598,
                longitude: 110.7080488,
                latitudeDelta: 4.521,
                longitudeDelta: 4.231,
              }}>
              {markerCoordinate && (
                <Marker
                  coordinate={markerCoordinate}
                  title="Lokasi"
                  description="Lokasi yang dipilih"
                />
              )}
            </MapView>
          </View>
        </View>

        <Button title="Kirim" onPress={sendDatatoFirebase} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginStart: 20,
    marginEnd: 20,
    marginBottom: 20,
  },
  elevatedCard: {
    padding: 20,
    width: 'auto',
    elevation: 2,
    marginTop: 20,
    borderRadius: 20,
    shadowColor: '#000000',
    backgroundColor: '#FFFFFF',
  },
  cardTitle: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardSubtitle: {
    color: '#000000',
    fontSize: 14,
  },
  editText: {
    marginTop: 20,
    justifyContent: 'flex-end',
  },
  map: {
    marginTop: 20,
    height: 400,
  },
  button: {
    margin: 20,
  },
  photo: {
    width: 'auto',
    height: 200,
    marginTop: 20,
  },
});

interface Action {
  title: string;
  type: 'capture' | 'library';
  options: ImagePicker.CameraOptions | ImagePicker.ImageLibraryOptions;
}

const actions: Action[] = [
  {
    title: 'Take Image',
    type: 'capture',
    options: {
      saveToPhotos: true,
      mediaType: 'photo',
      includeBase64: false,
    },
  },
  {
    title: 'Select Image',
    type: 'library',
    options: {
      selectionLimit: 1,
      mediaType: 'photo',
      saveToPhotos: true,
      includeBase64: false,
    },
  },
];

if (Platform.OS === 'ios') {
  actions.push({
    title: 'Take Image',
    type: 'capture',
    options: {
      saveToPhotos: true,
      mediaType: 'photo',
      presentationStyle: 'fullScreen',
    },
  });
}

export default Input;
