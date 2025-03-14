import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import SplashScreen from '../screens/SplashScreen';
import HomeScreen from '../screens/HomeScreen';
import LudoBoardScreen from '../screens/LudoBoardScreen';
import { navigationRef } from '../helpers/NavigationUtil';

const Stack=createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName='SplashScreen' screenOptions={{headerShown: false}}>
            <Stack.Screen name='LudoBoardScreen' component={LudoBoardScreen}  options={{animation: 'fade'}}/>
            <Stack.Screen name='SplashScreen' component={SplashScreen} />
            <Stack.Screen name='HomeScreen' component={HomeScreen} options={{animation: 'fade'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation