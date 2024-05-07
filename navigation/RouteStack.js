import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

import BottomTabsScreen from '../navigation/BottomTabs'
import ShakeMapScreen from '../screens/ShakeMap';
import MainScreen from '../screens/MainScreen'
import MMIScreen from '../screens/MmiScreen'
import InfoGempaTerkini from '../screens/InfoLain'
import FirstPage from '../screens/FirstPage';
import LoginPage from '../screens/LoginPage';
import AdminScreen from '../screens/AdminScreen';
import Data from '../screens/UserData';
import SeeMap from '../screens/maps'
import Table from '../screens/Table'
import InputData from '../screens/InputGempa'

const Stack = createStackNavigator();

const Routes = () => {
    return (
        <Stack.Navigator initialRouteName="First">
            <Stack.Screen name="MainPage" component={MainScreen} options={{ headerShown: false }} />
            <Stack.Screen name="InputPage" component={BottomTabsScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Explore" component={ShakeMapScreen} options={{ headerShown: false }} />
            <Stack.Screen name="PageInfo" component={MMIScreen} options={{ title:'Keterangan Level MMI', headerStyle:{backgroundColor:'#f8981d'}, headerTintColor:'white', headerTitleAlign:'center' }} />
            <Stack.Screen name="InfoGempa" component={InfoGempaTerkini} options={{ title: 'Info Gempa Terkini', headerStyle: { backgroundColor: '#f8981d' }, headerTintColor: 'white', headerTitleAlign: 'center' }} />
            <Stack.Screen name="First" component={FirstPage} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={LoginPage} options={{ headerShown: false }} />
            <Stack.Screen name="Admin" component={AdminScreen} options={{ headerShown: false }} />
            <Stack.Screen name="data" component={Data} options={{ headerShown: false }} />
            <Stack.Screen name="Map" component={SeeMap} options={{ title: 'Keterangan Level MMI', headerStyle: { backgroundColor: '#f8981d' }, headerTintColor: 'white', headerTitleAlign: 'center' }} />
        </Stack.Navigator>
    )
}

export default Routes