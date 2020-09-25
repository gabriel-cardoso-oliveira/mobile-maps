import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from './pages/Dashboard';
import Profile from './pages/Profile';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const HomeStack = createStackNavigator();
const ProfileStack = createStackNavigator();

const HomeStackScreen = ({ navigation }) => (
  <HomeStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#3e3e3e',
      },
      headerTintColor: '#FFF',
      headerTitleStyle: {
        fontWeight: 'bold',
        alignSelf: 'center',
      },
    }}
  >
    <HomeStack.Screen
      name="Home"
      component={Home}
      options={{
        title: 'Home',
        headerRight: () => (
          <Icon.Button
            name="menu"
            size={28}
            backgroundColor="#3e3e3e"
            color="#FFF"
            onPress={() => navigation.openDrawer()}
          />
        ),
      }}
    />
  </HomeStack.Navigator>
);

const ProfileStackScreen = ({ navigation }) => (
  <ProfileStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#3e3e3e',
      },
      headerTintColor: '#FFF',
      headerTitleStyle: {
        fontWeight: 'bold',
        alignSelf: 'center',
      },
    }}
  >
    <ProfileStack.Screen
      name="Meu Perfil"
      component={Profile}
      options={{
        title: 'Meu Perfil',
        headerRight: () => (
          <Icon.Button
            name="menu"
            size={28}
            backgroundColor="#3e3e3e"
            color="#FFF"
            onPress={() => navigation.openDrawer()}
          />
        ),
      }}
    />
  </ProfileStack.Navigator>
);

export default function Navigation() {
  const signed = useSelector((state) => state.auth.signed);

  return (
    <NavigationContainer>
      {signed ? (
        <Drawer.Navigator
          initialRouteName="Home"
          statusBarAnimation="slide"
          drawerPosition="right"
          drawerStyle={{
            backgroundColor: '#595959',
            paddingVertical: 20,
          }}
          drawerContentOptions={{
            activeBackgroundColor: '#FFF',
            inactiveTintColor: '#FFF',
          }}
        >
          <Drawer.Screen
            name="Home"
            component={HomeStackScreen}
            options={{
              drawerIcon: ({ focused }) => (
                <Icon
                  color={focused ? '#595959' : '#FFF'}
                  name="home"
                  size={26}
                />
              ),
              drawerLabel: ({ focused }) => (
                <Text style={{ color: focused ? '#595959' : '#FFF' }}>
                  Home
                </Text>
              ),
            }}
          />
          <Drawer.Screen
            name="Meu Perfil"
            component={ProfileStackScreen}
            options={{
              drawerIcon: ({ focused }) => (
                <Icon
                  color={focused ? '#595959' : '#FFF'}
                  name="person"
                  size={26}
                />
              ),
              drawerLabel: ({ focused }) => (
                <Text style={{ color: focused ? '#595959' : '#FFF' }}>
                  Meu Perfil
                </Text>
              ),
            }}
          />
        </Drawer.Navigator>
      ) : (
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
