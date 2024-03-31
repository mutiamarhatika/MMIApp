import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import HomeScreen from '../screens/InfoBmkg'
import SettingsScreen from '../screens/InfoGempaDirasakan'
import OtherScreen from '../screens/InfoLain'
import MmiScreen from '../screens/MmiScreen'
import { Text, View, Image, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const Tab = createBottomTabNavigator();
// const Tab = createMaterialBottomTabNavigator();

function MyTabs() {

    return (
        <Tab.Navigator activeColor="#f8981d" inactiveColor="black" barStyle={{ backgroundColor: 'black' }} screenOptions={{ headerShown: false, tabBarShowLabel: false, tabBarBackground: () => { } }}>
            <Tab.Screen name="Info MMI" component={MmiScreen} options={{
                tabBarIcon: ({ focused, size }) => (
                    <View style={[styles.mainView, { backgroundColor: focused ? '#f8981d' : 'white', }]}>
                        <MaterialCommunityIcons name="vibrate" size={size} style={{ color: focused ? 'white' : 'black' }} />
                        <Text style={{ color: focused ? 'white' : 'black', fontSize: 10, fontWeight: 'bold' }}>First</Text>
                    </View>
                )
            }} />
            {/* <Tab.Screen name="Gempa Terkini" component={HomeScreen} options={{
                tabBarIcon: ({ focused, size }) => (
                    <View style={[styles.mainView, { backgroundColor: focused ? '#f8981d' : 'white', }]}>
                        <MaterialCommunityIcons name="history" size={size} style={{ color: focused ? 'white' : 'black' }} />
                        <Text style={{ color: focused ? 'white' : 'black', fontSize: 10, fontWeight: 'bold' }}>Second</Text>
                    </View>
                )
            }} /> */}
            <Tab.Screen name="," component={OtherScreen} options={{
                tabBarIcon: ({ focused, size }) => (
                    <View style={[styles.mainView, { backgroundColor: focused ? '#f8981d' : 'white', }]}>
                        <MaterialCommunityIcons name="earth" size={size} style={{ color: focused ? 'white' : 'black' }} />
                        <Text style={{ color: focused ? 'white' : 'black', fontSize: 10, fontWeight: 'bold' }}>Third</Text>
                    </View>
                )
            }} />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    mainView: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 55,
        height: 45,
        borderRadius: 25
    },
})

export default MyTabs