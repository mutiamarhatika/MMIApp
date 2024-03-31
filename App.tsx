import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MyTabs from './navigation/BottomTabs';
import Routes from './navigation/RouteStack';

const App = () => {
  return (
    <NavigationContainer>
      {/* <MyTabs/> */}
      <Routes/>
    </NavigationContainer>
  );
};

export default App;
