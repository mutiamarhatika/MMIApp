import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MyTabs from './navigation/BottomTabs';
import Routes from './navigation/RouteStack';
import firebase from '@react-native-firebase/app';

const App = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp({
      apiKey: 'AIzaSyAlslGI_aT-ukUyAVf0I3BG8qCyHHIUZJk',
      projectId: 'rismmmi',
      storageBucket: 'rismmmi.appspot.com',
      messagingSenderId: '764082382646',
      appId: '1:764082382646:android:d348d2fa08c4547190f597',
      databaseURL:
        'https://rismmmi-default-rtdb.asia-southeast1.firebasedatabase.app',
    });
  }

  return (
    <NavigationContainer>
      {/* <MyTabs/> */}
      <Routes />
    </NavigationContainer>
  );
};

export default App;
