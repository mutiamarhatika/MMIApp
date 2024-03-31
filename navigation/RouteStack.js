import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

import BottomTabsScreen from '../navigation/BottomTabs'
import ShakeMapScreen from '../screens/ShakeMap';
import InfoGempaDirasakan from '../screens/InfoGempaDirasakan';

const Stack = createStackNavigator();

const Routes = () => {
    return (
        <Stack.Navigator initialRouteName="HomePage">
            <Stack.Screen name="HomePage" component={BottomTabsScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Explore" component={ShakeMapScreen} options={{ headerShown: false }} />
            <Stack.Screen name="mb" component={InfoGempaDirasakan} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

export default Routes