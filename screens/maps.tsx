import React, {useEffect, useState} from 'react';

import {View, StyleSheet, PermissionsAndroid} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import firebase from '@react-native-firebase/database';

interface MarkerData {
  id: string;
  coordinate: {
    latitude: number;
    longitude: number;
  };
  tipeMMI: string;
  namaPengirim: string;
  location: string;
  imageURL: string;
}

const Maps = () => {
  const [markers, setMarkers] = useState<MarkerData[]>([]);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
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

  const getLocation = async () => {
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
      await response.json();
    } catch (error) {
      console.error('Error getting current location: ', error);
    }
  };

  useEffect(() => {
    const unsubscribe = firebase()
      .ref('data')
      .on('value', snapshot => {
        try {
          const data = snapshot.val();
          const markersArray = Object.entries(data).map(
            ([key, value]: [string, any]) => ({
              id: key,
              coordinate: value.coordinate,
              tipeMMI: value.tipeMMI,
              namaPengirim: value.namaPengirim,
              location: value.location,
              imageURL: value.imageURL,
            }),
          );
          setMarkers(markersArray);
        } catch (error) {
          console.error('Error fetching marker data:', error);
        }
      });

    unsubscribe;
  }, []);

  useEffect(() => {
    const checkPermission = async () => {
      const permissionGranted = await requestLocationPermission();
      if (permissionGranted) {
        getLocation();
      } else {
        console.log('request permission not granted');
      }
    };
    checkPermission();
  }, []);

  return (
    <View>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        showsMyLocationButton={true}
        showsCompass={true}
        initialRegion={{
          latitude: -7.6760598,
          longitude: 110.7080488,
          latitudeDelta: 4.521,
          longitudeDelta: 4.231,
        }}>
        {markers.map(marker => (
          <Marker
            key={marker.id}
            coordinate={{
              latitude: marker.coordinate.latitude,
              longitude: marker.coordinate.longitude,
            }}
            title={marker.tipeMMI}
            description={marker.namaPengirim}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  elevatedCard: {
    width: 'auto',
    height: 200,
    elevation: 4,
    margin: 20,
    borderRadius: 20,
    shadowColor: '#000000',
    backgroundColor: '#FFFFFF',
  },
  cardTitle: {
    fontSize: 18,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default Maps;
