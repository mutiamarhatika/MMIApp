import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

import BottomTabsScreen from '../navigation/BottomTabs'
import BottomTabSecond from '../navigation/BottomTabSecond'
import ShakeMapScreen from '../screens/ShakeMap';
import InfoGempaDirasakan from '../screens/InfoGempaDirasakan';
import MainScreen from '../screens/MainScreen'
import MMIScreen from '../screens/MmiScreen'
import InfoGempaTerkini from '../screens/InfoLain'
import FirstPage from '../screens/FirstPage';
import LoginPage from '../screens/LoginPage';
import AdminScreen from '../screens/AdminScreen';
import TabelScreen from '../screens/TabelScreen';
import SeeMap from '../screens/maps'

const Stack = createStackNavigator();

const Routes = () => {
    return (
        <Stack.Navigator initialRouteName="First">
            <Stack.Screen name="MainPage" component={MainScreen} options={{ headerShown: false }} />
            <Stack.Screen name="InputPage" component={BottomTabsScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Explore" component={ShakeMapScreen} options={{ headerShown: false }} />
            <Stack.Screen name="PageInfo" component={MMIScreen} options={{ headerShown: false }} />
            <Stack.Screen name="InfoGempa" component={InfoGempaTerkini} options={{ headerShown: false }} />
            <Stack.Screen name="First" component={FirstPage} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={LoginPage} options={{ headerShown: false }} />
            <Stack.Screen name="Admin" component={AdminScreen} options={{ headerShown: false }} />
            <Stack.Screen name="TabelData" component={TabelScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Map" component={SeeMap} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

export default Routes