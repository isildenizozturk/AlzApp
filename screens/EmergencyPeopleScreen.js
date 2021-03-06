import React, { Component, useEffect, useState, useContext } from 'react';
import { View, Text, TextInput,TouchableOpacity, ImageBackground, Image, Button, Modal, Keyboard, Alert, StyleSheet, ScrollView, KeyboardAvoidingView} from 'react-native';
import PushNotification from 'react-native-push-notification'
import NotifService from '../services/NotifService';
import MedicationBar from '../components/MedicationBar'
import EPBar from '../components/EPBar'
import InputText from '../components/InputText';
import PhoneInput from 'react-phone-number-input'
import exampleImage from '../assets/default-image.png'
import ImagePicker from "react-native-image-crop-picker";
import Icon from 'react-native-vector-icons/MaterialIcons'
import { AuthContext } from '../navigation/AuthProvider'
 const EmergencyPeople = () => {
    const [isVisible, setIsVisible] = useState(null)
    const [person, setPerson] = useState();
    const [personName, setPersonName] = useState()
    const [personExp, setPersonExp] = useState()
    const [personPhone, setPersonPhone] = useState()
    const [image, setImage] = useState(false)
    const [personItems, setPersonItems] = useState([]);
    const {personTel,setPersonTel} = useContext(AuthContext)

    const handleAddMedication = () => {
        Keyboard.dismiss();
        setMedicationItems([...medicationItems, medication])
        setMedication(null);
    }
    const deletePerson = (index) => {
        let itemsCopy = [...personItems];
        itemsCopy.splice(index, 1);
        setPersonItems(itemsCopy)
      }

      const exampleImageUri = Image.resolveAssetSource(exampleImage).uri
    
      const selectOnePhoto = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
          }).then(image => {
            console.log(image);
            const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
            setImage(imageUri)
          });
        }
        const takeOnePhoto = () => {
          ImagePicker.openCamera({
              width: 300,
              height: 400,
              cropping: true,
            }).then(image => {
              console.log(image);
              const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
              setImage(imageUri)
            });
        }
    
        const pickerSelectionAlert = () => {
            Alert.alert('Foto??raf De??i??tirme','',[
                {text: 'Foto??raf ??ek', onPress:takeOnePhoto},
                {text: 'Foto??raf?? galeriden se??', onPress:selectOnePhoto},
                {text: 'Vazge??', style:'cancel'}
              ], {cancelable: true})
        }

        // useEffect(() => {
        //   if(time != undefined){
        //     setTimeItems([...timeItems,time])
        //   }
        // }, [time])
    
          const notif = new NotifService(onRegister,onNotif)

        
        // useEffect(() => {
        //   if(personItems.length > 0){

        //   for (const prop in timeItems) {
        //     notif.scheduleNotif("??la?? alarm??!",medicationName + " i??in ila?? vaktiniz geldi." + medicationExp + " ." + writeTimes(timeItems[prop]), timeItems[prop])
        //   }
                    
        //   Alert.alert('Kurdum notifikasyonu karde??????.')
        //   }
        // },[medicationItems])
  const onRegister = (token) => {
    this.setState({registerToken: token.token, fcmRegistered: true});
  }

  const onNotif = (notif) => {
    Alert.alert(notif.title, notif.message);
  }

  const handlePerm = (perms) => {
    Alert.alert('Permissions', JSON.stringify(perms));
  }

  

  
  return (
    <View style={styles.container}>
    <Modal transparent={false}
       visible={isVisible}>
       
  <View style={{...styles.tasksWrapper,
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'}}>  
          <TouchableOpacity onPress={() => setIsVisible(false)}>
       <View style={{...styles.addWrapper,'alignSelf':'center','marginVertical':10}}>
            <Text style={styles.addText}>x</Text>
          </View>
          </TouchableOpacity>  
          <ImageBackground 
         style={{width: 150,
         height: 150,
         resizeMode: 'contain',borderRadius:40}} imageStyle={{borderRadius:40}} source={{uri: image ? image : exampleImageUri}}>
             <View>
                 <Icon onPress={pickerSelectionAlert} name='camera-alt' size={40} style={{alignSelf:'flex-end'}}></Icon>
             </View>
         </ImageBackground>
          <View style={styles.input}>
          <InputText onChangeText={(value) => setPersonName(value)} placeholderText='Ki??i ad??...'></InputText>
          <InputText maxLength={11} textContentType='telephoneNumber' keyboardType={'phone-pad'} onChangeText={(value) => setPersonPhone(value)} placeholderText='Telefon...'></InputText>
          <InputText onChangeText={(value) => setPersonExp(value)} placeholderText='A????klama...'></InputText>
          </View>
         <View style={styles.tasksWrapper}>
          
          <TouchableOpacity onPress={() => {setIsVisible(false); setPersonItems([...personItems,{ personName : personName, personPhone : personPhone, personExp : personExp}]); setPersonTel([...personTel, personPhone])}}>
       <View style={{...styles.addWrapper1,'marginVertical':10}}>
            <Text style={styles.addText}>+</Text>
          </View>
          </TouchableOpacity>
          </View>   
                      

                              
    <View style={{
            width: 300,
            height: 300}}>
      
    </View>
  </View>
</Modal>
      {/* Added this scroll view to enable scrolling when list gets longer than the page */}
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1
        }}
        keyboardShouldPersistTaps='handled'
      >

      {/* Today's Tasks */}
      <View style={styles.tasksWrapper}>
        <View style={styles.items}>
          {/* This is where the tasks will go! */}
          {
            personItems.map((item, index) => {
              return (
                <TouchableOpacity style={{flexDirection: 'column'}} key={index}>
                  <EPBar onDelete={() => deletePerson(index)} personName={item['personName']} personPhone={item['personPhone']} personExp={item['personExp']}/> 
                </TouchableOpacity>
              )
            })
          }
        </View>
      </View>
        
      </ScrollView>

      {/* Write a task */}
      {/* Uses a keyboard avoiding view which ensures the keyboard does not cover the items on screen */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TouchableOpacity onPress={() => setIsVisible(true)}>
          <View style={styles.addWrapper1}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      
    </View>
    
  );
        }
    const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: '#E8EAED',
        },
        tasksWrapper: {
            paddingHorizontal: 20,
          },
        items: {
          marginTop: 30,
        },
        writeTaskWrapper: {
          position: 'absolute',
          bottom: 60,
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center'
        },

        input: {
          paddingVertical: 20,
          paddingHorizontal: 20,
          backgroundColor: '#FFF',
          borderColor: '#C0C0C0',
          borderWidth: 1,
          width: 350,
          marginTop:30,

        },
        addWrapper: {
          width: 60,
          height: 60,
          backgroundColor: '#FFF',
          borderRadius: 60,
          justifyContent: 'center',
          alignItems: 'center',
          borderColor: '#C0C0C0',
          borderWidth: 1,
          marginTop:140,
        },
        addWrapper1: {
          width: 60,
          height: 60,
          backgroundColor: '#FFF',
          borderRadius: 60,
          justifyContent: 'center',
          alignItems: 'center',
          borderColor: '#C0C0C0',
          borderWidth: 1,
          marginTop:40,
        },
        addText: {
          
          fontSize:32,
          alignSelf:'center'
        },
      });


     

export default EmergencyPeople