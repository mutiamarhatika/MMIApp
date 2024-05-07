import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import OtherScreen from '../screens/InfoLain';
import MmiScreen from '../screens/MmiScreen';
import {Text, View, StyleSheet} from 'react-native';
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
      barStyle={{backgroundColor: 'black'}}
      screenOptions={{
        // headerShown: false,
        tabBarShowLabel: false,
        tabBarBackground: () => {},
      }}>
      <Tab.Screen
        name="Input Data"
        component={InputGempa}
        options={{
          headerShown: true,
          headerStyle:{backgroundColor:'#f8981d'},
          headerTintColor:'white',
          headerTitleAlign:'center',
          tabBarLabel: 'Input Gempa',
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
        name="Maps"
        component={maps}
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: '#f8981d' },
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          tabBarIcon: ({ focused, size }) => (
            <View
              style={[
                styles.mainView,
                { backgroundColor: focused ? '#f8981d' : 'white' },
              ]}>
              <MaterialCommunityIcons
                name="google-maps"
                size={size}
                style={{ color: focused ? 'white' : 'black' }}
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
      {/* <Tab.Screen
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
      /> */}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  mainView: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 47,
    height: 45,
    borderRadius: 25,
  },
});

export default MyTabs;
