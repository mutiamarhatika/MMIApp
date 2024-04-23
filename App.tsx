import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MyTabs from './navigation/BottomTabs';
import Routes from './navigation/RouteStack';
import firebase from '@react-native-firebase/app';

const App = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp({
      apiKey: 'AIzaSyDv45Us8BhCgbxm-f0kU5vJFIuUcLyYvDE',
      projectId: 'react-native-mmi-app',
      storageBucket: 'react-native-mmi-app.appspot.com',
      messagingSenderId: '541576186641',
      appId: '1:541576186641:web:e9f31a1350f26cb388dab0',
      databaseURL:
        'https://react-native-mmi-app-default-rtdb.asia-southeast1.firebasedatabase.app',
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
