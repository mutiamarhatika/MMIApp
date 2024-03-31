import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import OtherScreen from '../screens/InfoLain';
import MmiScreen from '../screens/MmiScreen';
import {Text, View, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import InputGempa from '../screens/InputGempa';
import maps from '../screens/maps';

const Tab = createBottomTabNavigator();
// const Tab = createMaterialBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      activeColor="#f8981d"
      inactiveColor="black"
      barStyle={{backgroundColor: 'black'}}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarBackground: () => {},
      }}>
      <Tab.Screen
        name="Maps"
        component={maps}
        options={{
          tabBarIcon: ({focused, size}) => (
            <View
              style={[
                styles.mainView,
                {backgroundColor: focused ? '#f8981d' : 'white'},
              ]}>
              <MaterialCommunityIcons
                name="google-maps"
                size={size}
                style={{color: focused ? 'white' : 'black'}}
              />
              <Text
                style={{
                  color: focused ? 'white' : 'black',
                  fontSize: 10,
                  fontWeight: 'bold',
                }}>
                Maps
              </Text>
            </View>
          ),
        }}
      />
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
      <Tab.Screen
        name="Input Gempa"
        component={InputGempa}
        options={{
          tabBarIcon: ({focused, size}) => (
            <View
              style={[
                styles.mainView,
                {backgroundColor: focused ? '#f8981d' : 'white'},
              ]}>
              <MaterialCommunityIcons
                name="map-marker-plus"
                size={size}
                style={{color: focused ? 'white' : 'black'}}
              />
              <Text
                style={{
                  color: focused ? 'white' : 'black',
                  fontSize: 10,
                  fontWeight: 'bold',
                }}>
                Input
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name=","
        component={OtherScreen}
        options={{
          tabBarIcon: ({focused, size}) => (
            <View
              style={[
                styles.mainView,
                {backgroundColor: focused ? '#f8981d' : 'white'},
              ]}>
              <MaterialCommunityIcons
                name="earth"
                size={size}
                style={{color: focused ? 'white' : 'black'}}
              />
              <Text
                style={{
                  color: focused ? 'white' : 'black',
                  fontSize: 10,
                  fontWeight: 'bold',
                }}>
                Third
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
