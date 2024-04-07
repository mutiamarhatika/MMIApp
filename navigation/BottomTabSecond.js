import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import OtherScreen from '../screens/InfoLain';
import MmiScreen from '../screens/MmiScreen';
import { Text, View, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import InputGempa from '../screens/InputGempa';
import maps from '../screens/maps';
import Main from '../screens/MainScreen';

const Tab = createBottomTabNavigator();
// const Tab = createMaterialBottomTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator
            activeColor="#f8981d"
            inactiveColor="black"
            barStyle={{ backgroundColor: 'black' }}
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarBackground: () => { },
            }}>
            <Tab.Screen
        name="Info MMI"
        component={MmiScreen}
        options={{
          tabBarIcon: ({focused, size}) => (
            <View
              style={[
                styles.mainView,
                {backgroundColor: focused ? '#f8981d' : 'white'},
              ]}>
              <MaterialCommunityIcons
                name="vibrate"
                size={size}
                style={{color: focused ? 'white' : 'black'}}
              />
              <Text
                style={{
                  color: focused ? 'white' : 'black',
                  fontSize: 10,
                  fontWeight: 'bold',
                }}>
                First
              </Text>
            </View>
          ),
        }}
      />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    mainView: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 55,
        height: 45,
        borderRadius: 25,
    },
});

export default MyTabs;
