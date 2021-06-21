import React, { Component, useEffect, useState } from 'react';
import { View, Text, TextInput,TouchableOpacity, ImageBackground, Image, Button, Modal, Keyboard, Alert, StyleSheet, ScrollView, KeyboardAvoidingView, Platform} from 'react-native';
import PushNotification from 'react-native-push-notification'
import NotifService from '../services/NotifService';
import MedicationBar from '../components/MedicationBar'
import Bar from '../components/Bar'
import InputText from '../components/InputText';
import exampleImage from '../assets/default-image.png'
import DateTimePicker from '@react-native-community/datetimepicker';
import ImagePicker from "react-native-image-crop-picker";
import Icon from 'react-native-vector-icons/MaterialIcons'

 const Medication = () => {
    const [isVisible, setIsVisible] = useState(null)
    const [medication, setMedication] = useState();
    const [medicationName, setMedicationName] = useState()
    const [medicationExp, setMedicationExp] = useState()
    const [image, setImage] = useState(false)
    const [time, setTime] = useState()
    const [timeItems, setTimeItems] = useState([])
    const [showTimePicker, setshowTimePicker] = useState(false)
    const [medicationItems, setMedicationItems] = useState([]);

    const writeTimes = (value) => {
      return ("0" + value.getHours()).slice(-2)+":"+("0" + value.getMinutes()).slice(-2)
    }

    const handleAddMedication = () => {
        Keyboard.dismiss();
        setMedicationItems([...medicationItems, medication])
        setMedication(null);
    }
    // const handleAddTime = () => {
    //   console.log("Handleaddtime ",time)
    //   console.log("Time items : ", timeItems, "Time : ", time)
    //   
    //   console.log("Time items after add : ", timeItems, "Time : ", time)
      
  //}
    const deleteTime = (index) => {
      let timeCopy = [...timeItems];
      timeCopy.splice(index, 1);
      console.log("Time copy after splice: ", timeCopy)
      setTimeItems(timeCopy)
  }
    const completeTask = (index) => {
        let itemsCopy = [...medicationItems];
        itemsCopy.splice(index, 1);
        setMedicationItems(itemsCopy)
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
            Alert.alert('Fotoğraf Değiştirme','',[
                {text: 'Fotoğraf çek', onPress:takeOnePhoto},
                {text: 'Fotoğrafı galeriden seç', onPress:selectOnePhoto},
                {text: 'Vazgeç', style:'cancel'}
              ], {cancelable: true})
        }

        const onChange = (event, selectedDate) => {
          console.log("Onchangestart ",time)
          console.log("SelectedDate", selectedDate)
          const currentTime = selectedDate;
          setshowTimePicker(false)
          setTime(currentTime)
          console.log("OnchangeEnd ",time)
          // setUserData({...userData,DOB:currentDate})
          
        };
        useEffect(() => {
          if(time != undefined){
            setTimeItems([...timeItems,time])
          }
        }, [time])
    
          const notif = new NotifService(onRegister,onNotif)

        
        useEffect(() => {
          if(medicationItems.length > 0){

          for (const prop in timeItems) {
            notif.scheduleNotif("İlaç alarmı!",medicationName + " için ilaç vaktiniz geldi." + medicationExp + " ." + writeTimes(timeItems[prop]), timeItems[prop])
          }
                    
          Alert.alert('İlacınız başarıyla eklenmiştir.')
          }
        },[medicationItems])
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
    <Modal style={styles.model} transparent={false}
       visible={isVisible}>
     <ScrollView    
          contentContainerStyle={{
          flexGrow: 1
        }}
        keyboardShouldPersistTaps='handled'>
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
         resizeMode: 'contain',borderRadius:40}} imageStyle={{borderRadius:40},{marginTop:0}} source={{uri: image ? image : exampleImageUri}}>
             <View style={{marginTop:0}}>
                 <Icon onPress={pickerSelectionAlert} name='camera-alt' size={40} style={{alignSelf:'flex-end'}}></Icon>
             </View>
          </ImageBackground>
          <View style={styles.input} >
            <InputText  onChangeText={(value) => setMedicationName(value)} placeholderText='İlaç adı...'></InputText>
            <InputText  onChangeText={(value) => setMedicationExp(value)} placeholderText='Açıklama...'></InputText>
          </View>
          <Icon style={styles.icon} onPress={() => {setshowTimePicker(true)}} name='calendar-today' size={32}></Icon>
          <View style={styles.tasksWrapper}>
          
          <View style={styles.items}>
          {   
              
              timeItems.length > 0 &&
              timeItems.map((item, index) => {
              return (
                <TouchableOpacity key={index}  onPress={() => deleteTime(index)}>
                  <Bar text={("0" + item.getHours()).slice(-2)+":"+("0" + item.getMinutes()).slice(-2)} /> 
                </TouchableOpacity>
              )
            })
          }
          
          </View>
          <TouchableOpacity onPress={() => {setIsVisible(false); setMedicationItems([...medicationItems,{ medName : medicationName, medExp : medicationExp, medTime : timeItems}]);}}>
       <View style={{...styles.addWrapper1,'alignSelf':'center','marginVertical':10}}>
            <Text style={styles.addText1}>+</Text>
          </View>
          </TouchableOpacity>
          </View>   
                      
 <Text style={{fontSize: 18, marginTop:4, fontWeight: "bold", marginLeft: 13}}></Text>
 {showTimePicker && <DateTimePicker
testID="dateTimePicker1"
value={new Date()}
show={showTimePicker}
mode='time'
display='spinner'
is24Hour={true}
onChange={onChange}
/>
 }
                              
    <View style={{
            width: 300,
            height: 300}}>
      
    </View>
  </View>
  </ScrollView>
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
            medicationItems.map((item, index) => {
              return (
                <TouchableOpacity key={index}>
                  <MedicationBar onDelete={() => completeTask(index)} medicationName={item['medName']} medicationExp={item['medExp']} medicationTime={item['medTime']}/> 
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
            <Text style={styles.addText1}>+</Text>
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
            paddingHorizontal: 10,
            backgroundColor: '#E8EAED',
          },
        items: {
          marginTop: 20,
          flexDirection: 'row',
          flexWrap: "wrap",
          justifyContent: "space-between",
          marginRight: 3,
          marginLeft: 3

  
        },
        icon:{
          marginBottom:10,
          marginTop: 20,
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
          marginTop:4,
        },
        addText: {
          fontSize:32,
          color:'black',
          alignSelf:'center'
          
        },
        addText1: {
          fontSize:32,
          color:'black',
          alignSelf:'center'
          
        },
      });


     

export default Medication