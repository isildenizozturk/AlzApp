import React, {useContext, useState, useEffect} from 'react';
import { Text } from 'react-native'
import Colors from '../assets/Colors';
import UserFormScreen from '../screens/UserFormScreen'
import Quiz from '../screens/Quiz';
import Sonuc from '../screens/Result';
import HomeScreen from '../screens/HomeScreen'
import SettingsScreen from '../screens/SettingsScreen'
import ProfileScreen from '../screens/ProfileScreen'
import MedicationScreen from '../screens/MedicationScreen'

import MatchingGame from '../screens/MatchingGame'
import VisualGame from '../screens/SortTheNumbers'
import SumGame from '../screens/SumGameLast'
import Hangman from '../screens/HangmanGame';

import EmergencyPeopleScreen from '../screens/EmergencyPeopleScreen'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';
import { createDrawerNavigator,DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { AuthContext } from '../navigation/AuthProvider'
import Icon from "react-native-vector-icons/MaterialIcons";
import AntDesign from 'react-native-vector-icons/AntDesign'
import AuthProvider from '../navigation/AuthProvider'
import {FormButton} from '../components/FormButton'
import EmergencyPeople from '../screens/EmergencyPeopleScreen';

import SOSButton from '../screens/SOSButton';
import Geolocation from '@react-native-community/geolocation';
import Categories from '../screens/Categories';


const Stack = createStackNavigator()
const Drawer = createDrawerNavigator();


const CustomDrawerContent = (props) => {
  const [latitude, setLatitude] = useState()
  const [longitude, setLongitude] = useState()
  const [GMLink, setGMLink] = useState('')
  const {personTel} = useContext(AuthContext)
  const createGMLink = () => {
    const coordinates = [];
    Geolocation.getCurrentPosition((info) => {
      const currentLongitude =
      JSON.stringify(info.coords.longitude);
      console.log(currentLongitude)
      setLongitude(currentLongitude)

    //getting the Latitude from the location json
    const currentLatitude =
      JSON.stringify(info.coords.latitude);
      console.log(currentLatitude)
      setLatitude(currentLatitude)

    },)
    setGMLink('https://www.google.com/maps/search/?api=1&query=' + latitude + ',' + longitude)
  
    console.log(latitude)
    console.log(longitude)
  }

  useEffect(() => {
    createGMLink()
    }
  , [personTel])
  
    const {logout,sosButton} = useContext(AuthContext)

    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem style={{bottom: 0, position: 'absolute', width: '100%'}} icon={() => <AntDesign name='heart' size={16}></AntDesign>} label={() => <Text style={{ color: 'white' }}>Acil Yardım Butonu</Text>}
          style={{backgroundColor: '#a8323e'}} 
          onPress={() => {sosButton(personTel,GMLink);}}
        />
        <DrawerItem style={{bottom: 0, position: 'absolute', width: '100%'}} icon={() => <Icon name='logout' size={16}></Icon>} label={() => <Text style={{ color: 'grey' }}>Çıkış Yap</Text>}
          style={{backgroundColor: 'white'}} 
          onPress={() => logout()}
        />
      </DrawerContentScrollView>
    );
  }



const AppStack = () => {
    return (
    // <Stack.Navigator>
    //     <Stack.Screen name='Home' component={HomeScreen}></Stack.Screen>
    // </Stack.Navigator>
      



    <Drawer.Navigator screenOptions={{headerShown:true}} drawerContent={props => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name='DailyGamesNavigator' component={DailyGamesNavigator} options={{headerTitle:'Ana Menü',title:'Ana Menü' ,drawerIcon: () => <Icon name='home' size={16}></Icon>}}>
        
        </Drawer.Screen>

        <Drawer.Screen name='GamesNavigator' component={GamesNavigator} options={{headerTitle:'Kategoriler',title:'Kategoriler' ,drawerIcon: () => <Icon name='category' size={16}></Icon>}}>
        </Drawer.Screen>

        <Drawer.Screen name='Profile' component={ProfileScreen} options={{headerTitle:'Profil',title:'Profil', drawerIcon: () => <Icon name='person' size={16}></Icon>}}>
        </Drawer.Screen>

        <Drawer.Screen name='Settings' component={SettingsScreen} options={{headerTitle:'Ayarlar',title:'Ayarlar', drawerIcon: () => <Icon name='settings' size={16}></Icon>}}>
        </Drawer.Screen>

        <Drawer.Screen name='Medication' component={MedicationScreen} options={{headerTitle:'İlaçlarım',title:'İlaçlarım', drawerIcon: () => <AntDesign name='medicinebox' size={16}></AntDesign>}}>
        </Drawer.Screen>

        <Drawer.Screen name='EmergencyPeople' component={EmergencyPeopleScreen} options={{headerTitle:'İletişim Kişilerim',title:'İletişim Kişilerim', drawerIcon: () => <Icon name='local-phone' size={16}></Icon>}}>
        </Drawer.Screen>


        {/* <Drawer.Screen name='Lokasyon' component={LocationScreen}></Drawer.Screen>
        <Drawer.Screen name='Ayarlar' component={SettingsScreen}></Drawer.Screen> */}
    </Drawer.Navigator>
    )




}

export default AppStack;

const QuizNavigator = () => {
  return (
      <>
          <NavigationContainer>
              <Stack.Navigator screenOptions={{
                  headerStyle: {
                      backgroundColor: Colors.primary
                  },
                  headerTintColor: 'white',
              }}>
                  
                  <Stack.Screen
                      name="Home"
                      component={UserFormScreen}
                      options={{
                          title: "Profil",
                      }}
                  />
          
                  <Stack.Screen
                      name="Quiz"
                      component={Quiz}
                      options={{
                          title: "Teşhis Testi",
                      }}
                  />
                  <Stack.Screen
                      name="Results"
                      component={Results}
                      options={{
                          title: "Sonuçlar",
                      }}
                  />
              
              </Stack.Navigator>
          </NavigationContainer>
      </>
  );
}

const GamesNavigator = ({navigation}) => {
  return (
      <>
          
              <Stack.Navigator screenOptions={{
                      headerShown: false
                      }}> 

                  <Stack.Screen
                      name="Categories"
                      component={Categories}
                      options={{title:''}}
                  />

                  <Stack.Screen
                      name="Hangman"
                      component={Hangman}
                      options={{
                          title: "Adam Asmaca",
                      }}
                  />
          
                  <Stack.Screen
                      name="MatchingGame"
                      component={MatchingGame}
                      options={{
                          title: "Eşleştirme Oyunu",
                      }}
                  />
                  <Stack.Screen
                      name="VisualGame"
                      component={VisualGame}
                      options={{
                          title: "Numaraları Sırala",
                      }}
                  />
                  <Stack.Screen
                      name="SumGame"
                      component={SumGame}
                      options={{
                          title: "Toplama Oyunu",
                      }}
                  />
              
              </Stack.Navigator>
      </>
  );
}

const DailyGamesNavigator = ({navigation}) => {
  return (
      <>
          
              <Stack.Navigator screenOptions={{
                      headerShown: false
                      }}> 

                  <Stack.Screen
                      name="Home"
                      component={HomeScreen}
                      options={{title:''}}
                  />

                  <Stack.Screen
                      name="Hangman"
                      component={Hangman}
                      options={{
                          title: "Adam Asmaca",
                      }}
                  />
          
                  <Stack.Screen
                      name="MatchingGame"
                      component={MatchingGame}
                      options={{
                          title: "Eşleştirme Oyunu",
                      }}
                  />
                  <Stack.Screen
                      name="VisualGame"
                      component={VisualGame}
                      options={{
                          title: "Numaraları Sırala",
                      }}
                  />
                  <Stack.Screen
                      name="SumGame"
                      component={SumGame}
                      options={{
                          title: "Toplama Oyunu",
                      }}
                  />
              
              </Stack.Navigator>
      </>
  );
}