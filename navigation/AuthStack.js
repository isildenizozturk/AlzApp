import 'react-native-gesture-handler';
import React,{ useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-community/async-storage'
import OnboardingScreen from '../screens/OnboardingScreen'
import LoginScreen from '../screens/LoginScreen'
import SignupScreen from '../screens/SignupScreen'
import PasswordResetScreen from '../screens/PasswordResetScreen'



const AuthStack = () => {
const Stack = createStackNavigator()

const [isFirstLaunch, setIsFirstLaunch] = React.useState(null);
let routeName;

  useEffect(() => {
  AsyncStorage.getItem('alreadyLaunched').then(value => {
    if (value == null) {
      AsyncStorage.setItem('alreadyLaunched',"true");
      setIsFirstLaunch(true)
    }
    else {
      setIsFirstLaunch(false);
    }
 })

 GoogleSignin.configure({
   webClientId: '47337173931-eo0mgkh3jrk8cg8874vhleve1luoogi1.apps.googleusercontent.com',
 });

  },[])

  if ( isFirstLaunch == null)
  {
  return null;
  }
  else if ( isFirstLaunch == true )
  {
    routeName= 'Onboarding';
  }
  else
  {
      routeName = 'Login';
  }

  return (
    
      <Stack.Navigator initialRouteName={routeName}>
        <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{header:() => null}}>
        </Stack.Screen>
        <Stack.Screen name="Login" component={LoginScreen} options={{header:() => null}}></Stack.Screen>
        <Stack.Screen name="Signup" component={SignupScreen} options={({navigation}) => ({
        'title':'',
         
          
        })}></Stack.Screen>
        <Stack.Screen name="PasswordReset" component={PasswordResetScreen} options={({navigation}) => ({
        'title':'',
         
          
        })}></Stack.Screen>
      </Stack.Navigator>
    
  )
}
export default AuthStack;