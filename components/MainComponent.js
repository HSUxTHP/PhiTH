import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import AboutUs from './AboutComponent';

function HomeNavigatorScreen() {
  const HomeNavigator = createStackNavigator();
  return (
    <HomeNavigator.Navigator
      initialRouteName='Home'
      screenOptions={{
        headerStyle: { backgroundColor: '#7cc' },
        headerTintColor: '#fff',
        headerTitleStyle: { color: '#fff' },
      }}>
      <HomeNavigator.Screen name='Home' component={Home} />
    </HomeNavigator.Navigator>
  );
}

function AboutNavigatorScreen() {
  const AboutNavigator = createStackNavigator();
  return (
    <AboutNavigator.Navigator
      initialRouteName='About'
      screenOptions={{
        headerStyle: { backgroundColor: '#7cc' },
        headerTintColor: '#fff',
        headerTitleStyle: { color: '#fff' },
      }}>
      <AboutNavigator.Screen name='About' component={AboutUs} />
    </AboutNavigator.Navigator>
  );
}

function MenuNavigatorScreen() {
  const MenuNavigator = createStackNavigator();
  return (
    <MenuNavigator.Navigator
      initialRouteName='Menu'
      screenOptions={{
        headerStyle: { backgroundColor: '#7cc' },
        headerTintColor: '#fff',
        headerTitleStyle: { color: '#fff' },
      }}>
      <MenuNavigator.Screen name='Menu' component={Menu} />
      <MenuNavigator.Screen
        name='Dishdetail'
        component={Dishdetail}
        options={{ headerTitle: 'Dish Detail' }}
      />
    </MenuNavigator.Navigator>
  );
}

function ContactNavigatorScreen() {
  const ContactNavigator = createStackNavigator();
  return (
    <ContactNavigator.Navigator
      initialRouteName='Contact'
      screenOptions={{
        headerStyle: { backgroundColor: '#7cc' },
        headerTintColor: '#fff',
        headerTitleStyle: { color: '#fff' },
      }}>
      <ContactNavigator.Screen name='Contact' component={Contact} />
    </ContactNavigator.Navigator>
  );
}

function MainNavigatorScreen() {
  const MainNavigator = createDrawerNavigator();
  return (
    <MainNavigator.Navigator initialRouteName='HomeScreen'>
      <MainNavigator.Screen
        name='HomeScreen'
        component={HomeNavigatorScreen}
        options={{ title: 'Home', headerShown: false }}
      />
      <MainNavigator.Screen
        name='AboutScreen'
        component={AboutNavigatorScreen}
        options={{ title: 'About Us', headerShown: false }}
      />
      <MainNavigator.Screen
        name='MenuScreen'
        component={MenuNavigatorScreen}
        options={{ title: 'Menu', headerShown: false }}
      />
      <MainNavigator.Screen
        name='ContactScreen'
        component={ContactNavigatorScreen}
        options={{ title: 'Contact Us', headerShown: false }}
      />
    </MainNavigator.Navigator>
  );
}

class Main extends Component {
  render() {
    return (
      <NavigationContainer>
        <MainNavigatorScreen />
      </NavigationContainer>
    );
  }
}

export default Main;
