import React,{useState, useContext, useEffect} from 'react';
import DropDownPicker from 'react-native-dropdown-picker'
import DateTimePicker from '@react-native-community/datetimepicker';
import ImagePicker from "react-native-image-crop-picker";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    TextInput,
    ImageBackground,
    Alert,
    Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { LoginButton } from 'react-native-fbsdk';
import { AuthContext } from '../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore'
import moment from 'moment'
import { set } from 'react-native-reanimated';


const Profile = ({navigation}) => {

    const {user, logout} = useContext(AuthContext)
    const [userData, setUserData] = useState(null)
    const [DOBDate, setDOBDate] = useState(new Date())
    const [image, setImage] = useState()
    const [isEditing, setisEditing] = useState(false)
    const [openGender, setOpenGender] = useState(false);
    const [openBloodType, setOpenBloodType] = useState(false);
    const [genderValue, setgenderValue] = useState(null);
    const [gender, setGender] = useState([
    {label: 'Erkek', value: 'Erkek'},
    {label: 'Kadın', value: 'Kadın'},
    {label: 'Diğer', value: 'Diğer'},
  ]);
  const [bloodTypeValue, setBloodTypeValue] = useState(null);
  const [bloodType, setBloodType] = useState([
    {label: '0Rh+', value: '0Rh+'},
    {label: '0Rh-', value: '0Rh-'},
    {label: 'ARh+', value: 'ARh+'},
    {label: 'ARh-', value: 'ARh-'},
    {label: 'BRh+', value: 'BRh+'},
    {label: 'BRh-', value: 'BRh-'},
    {label: 'ABRh+', value: 'ABRh+'},
    {label: 'ABh-', value: 'ABh-'}
  ]);
  const [date, setDate] = useState(new Date('1990-01-01'))
  const [showDateTimePicker, setshowDateTimePicker] = useState(false)
  const getUser = async() => {
      const currentUser = await firestore()
      .collection('users')
      .doc(user.uid)
      .get()
      .then((documentSnapshot) => {
          if( documentSnapshot.exists ) {
              console.log('User Data', documentSnapshot.data())
              setUserData(documentSnapshot.data())
              if ( userData.DOB.seconds !== '0' ){
                   setDOBDate(userData.DOB.toDate())
              }
          }
      })
  }

  const handleUpdate = async() => {
    //   let imgUrl = await uploadImage()
    // if ( imgUrl === null && userData.imgUrl) {
    //     imgUrl = userData.imgUrl
    // }
    firestore().collection('users').doc(user.uid).update
    ({
        name: userData.name,
        surname: userData.surname,
        mobileno: userData.mobileno,
        gender: userData.gender,
        bloodType: userData.bloodType,
        adress: userData.adress,
        DOB: userData.DOB,
        //imgUrl: userData.imgUrl
    
    })
    .then(() => {
        console.log('User Updated!')
        Alert.alert('Profiliniz güncellendi!')
    })
  }
  useEffect(() => {
      getUser();
  }, [])

  const selectOnePhoto = () => {
    ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true
      }).then(image => {
        console.log(image);
        const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path
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
            const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path
            setImage(imageUri)
          });
      }

      const uploadImage = async () => {
        const uploadUri = image;
        let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
        
        const storageRef = storage().ref(`photos/${filename}`);
        const task = storageRef.putFile(uploadUri);

        // Set transferred state
        task.on('state_changed', (taskSnapshot) => {
        console.log(
            `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
        );

        setTransferred(
            Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
            100,
      );
    });
        try {
            await task;
      
            const url = await storageRef.getDownloadURL();
      
            setUploading(false);
            setImage(null);
      
            // Alert.alert(
            //   'Image uploaded!',
            //   'Your image has been uploaded to the Firebase Cloud Storage Successfully!',
            // );
            return url;
      
          } catch (e) {
            console.log(e);
            return null;
          }
      }
    const pickerSelectionAlert = () => {
        Alert.alert('Fotoğraf Değiştirme','',[
            {text: 'Fotoğraf çek', onPress:takeOnePhoto},
            {text: 'Fotoğrafı galeriden seç', onPress:selectOnePhoto},
            {text: 'Vazgeç', style:'cancel'}
          ], {cancelable: true})
    }
    const extractDate = () => {
        if (userData){
            const day=DOBDate.getDate()
            const month=DOBDate.getMonth() + 1
            const year=DOBDate.getFullYear()
            
            return day + "/" + month + "/" + year;
        }
    }

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || DOBDate;
    setshowDateTimePicker(false)
    setDate(currentDate);
    setUserData({...userData,DOB:currentDate})
    
  };


    return (
         isEditing ? <View style={styles.container1}>
         <ImageBackground 
         style={{width: 150,
         height: 150,
         resizeMode: 'contain',borderRadius:40}} imageStyle={{borderRadius:40}} source={require('../assets/default-image.png')}>
             <View>
                 <Icon onPress={pickerSelectionAlert} name='camera' size={40} style={{alignSelf:'flex-end'}}></Icon>
             </View>
         </ImageBackground>
         <View style={styles.container2}>
         <TouchableOpacity onPress={() => {handleUpdate(); setisEditing(false);}} style={styles.header2}>
                         <Text style={{fontSize: 19, fontWeight: "bold", textDecorationLine: 'underline'}}>Profili Kaydet</Text>

                     </TouchableOpacity>
                     <View style={styles.infoBox2Wrapper}>
                         <View style={{ width: '100%',
                         flexDirection: 'row',
                         alignSelf: "center"}}>
                             <Text style={{fontSize: 18, fontWeight: "bold", marginTop:12, marginLeft: 13}}>Ad: </Text>     
                         <TextInput onChangeText={(text) => setUserData({...userData, name:text})} value={userData ? userData.name : ''} style={{fontSize: 20}}/>
                         </View>
                         
                         
                     </View>
                     <View style={styles.infoBox2Wrapper}>
                         <View style={{ width: '100%',
                         flexDirection: 'row'}}>
                             <Text style={{fontSize: 18, fontWeight: "bold", marginTop:12,marginLeft: 13}}>Soyad: </Text>
                             <TextInput onChangeText={(text) => setUserData({...userData, surname:text})} value={userData ? userData.surname : ''} style={{fontSize: 20}}/>
                             
                         </View>
                         
                         
                     </View>
                     
                     <View style={styles.infoBoxWrapper}>
                         <View style={styles.infoBox}>
                             <Text style={{fontSize: 18, fontWeight: "bold", marginTop:12, marginLeft: 13}}>Cinsiyet: </Text>
                             <DropDownPicker onChangeValue={(value) => setUserData({...userData, gender:value})}
                                            listMode='MODAL' 
                                            style={{width:90}}
                                            dropDownDirection="BOTTOM"
                                            placeholder=""
                                            open={openGender}
                                            value={genderValue}
                                            items={gender}
                                            setOpen={setOpenGender}
                                            setValue={setgenderValue}
                                            setItems={setGender}                             
                            ></DropDownPicker>
                             
                         </View>
                         <View
                         style={{borderRightColor: '#dddddd', borderRightWidth: 1}}></View>
                         <View style={styles.infoBox}>
                             <Text style={{marginLeft: 7, marginTop:12, fontSize: 18, fontWeight: "bold"}}>Kan Grubu: </Text>
                             <DropDownPicker listMode='MODAL' 
                                            onChangeValue={(value) => setUserData({...userData,bloodType:value})}
                                            dropDownDirection="BOTTOM"
                                            placeholder=""
                                            open={openBloodType}
                                            value={bloodTypeValue}
                                            items={bloodType}
                                            setOpen={setOpenBloodType}
                                            setValue={setBloodTypeValue}
                                            setItems={setBloodType}
                                            zIndex={3000}
                                            zIndexInverse={1000}
                                            
                                            childrenContainerStyle={{
                                                height: 1030,
                                                z_index: 300
                                            }}
                                            style={{
                                                backgroundColor: '#fafafa',
                                                z_index: 300,
                                                position: 'relative',
                                                height:50,
                                                width:90
                                            }}
                                            
              ></DropDownPicker>
                         </View>

                     </View>
                     <View style={styles.infoBox2Wrapper}>
                         <View style={{ width: '100%',
                         flexDirection: 'row',
                         alignSelf: "center"}}>
                             <Text style={{fontSize: 18, marginTop:4, fontWeight: "bold", marginLeft: 13}}>Doğum Tarihi: </Text>
                             <Icon onPress={() => setshowDateTimePicker(true)} name='calendar-today' size={32}></Icon>
                             
                             <Text style={{fontSize: 18, marginTop:4, fontWeight: "bold", marginLeft: 13}}>{date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}</Text>
                             {showDateTimePicker && <DateTimePicker
                            testID="dateTimePicker"
                            value={userData ? DOBDate : date}
                            show={showDateTimePicker}
                            mode='date'
                            display='calendar'
                            is24Hour={true}
                            onChange={onChange}
                            />
                            }
                            
                            
        
                             
                         </View>
                         
                     </View>
                     <View style={styles.infoBox2Wrapper}>
                         <View style={{ width: '100%',
                         flexDirection: 'row',
                         alignSelf: "center"}}>
                             <Text style={{fontSize: 18, fontWeight: "bold", marginTop:12, marginLeft: 13}}>Adres: </Text>
                             <TextInput onChangeText={(text) => setUserData({...userData, adress:text})} value={userData ? userData.adress : ''} style={{fontSize: 20}}/>
                             
                         </View>
                         
                     </View>
                     <TouchableOpacity  style={styles.infoBoxWrapper2}>
                         <View style={styles.infoBoxWrapper2,{ width: '100%',
                         flexDirection: 'row',
                         alignSelf: "center",}}>
                             <Text style={{fontSize: 24, fontWeight: "bold", marginLeft: 13, alignSelf: "center"}}>İlaçlarım </Text>
                             
                             <Icon style={{width:42, height:42, marginLeft: 185, marginTop:10}} name='arrow-forward' size={32}></Icon>
                            
                         </View>
                     </TouchableOpacity>
                     <TouchableOpacity style={styles.infoBoxWrapper3}>
                         <View style={{ width: '100%',
                         flexDirection: 'row',
                         alignSelf: "center",}}>
                             <Text style={{fontSize: 24, fontWeight: "bold", marginLeft: 13, alignSelf: "center"}}>İletişim Kişilerim </Text>
                             <Icon style={{width:42, height:42, marginLeft: 100, marginTop: 10}} name='arrow-forward' size={32}></Icon>
                             
                         </View>
                     </TouchableOpacity>

                 
                 
         </View>
        
       </View> :
        <View style={styles.container1}>
            <Image style={{width: 150,
            height: 150,
            resizeMode: 'contain',borderRadius:40}}source={require('../assets/default-image.png')}></Image>
            <View style={styles.container2}>
                        
                        <TouchableOpacity onPress={() => setisEditing(true)} style={styles.header2}>
                            <Text style={{fontSize: 19, fontWeight: "bold", textDecorationLine: 'underline'}}>Profili Düzenle</Text>

                        </TouchableOpacity>
                        <View style={styles.infoBox2Wrapper}>
                            <View style={{ width: '100%',
                            flexDirection: 'row',
                            alignSelf: "center"}}>
                                <Text style={{fontSize: 20, fontWeight: "bold", marginLeft: 13}}>Ad: </Text>
                                <Text style={{fontSize: 20}}>{userData ? userData.name : ''}  </Text>
                                
                            </View>
                            
                            
                        </View>
                        <View style={styles.infoBox2Wrapper}>
                            <View style={{ width: '100%',
                            flexDirection: 'row',
                            alignSelf: "center"}}>
                                <Text style={{fontSize: 20, fontWeight: "bold", marginLeft: 13}}>Soyad: </Text>
                                <Text style={{fontSize: 20}}>{userData ? userData.surname : ''}</Text>
                                
                            </View>
                            
                            
                        </View>
                        
                        
                        <View style={styles.infoBoxWrapper}>
                            <View style={styles.infoBox}>
                                <Text style={{fontSize: 20, fontWeight: "bold", marginLeft: 13}}>Cinsiyet: </Text>
                                <Text style={{fontSize: 20}}>{userData ? userData.gender : ''}</Text>
                                
                            </View>
                            <View
                            style={{borderRightColor: '#dddddd', borderRightWidth: 1}}></View>
                            <View style={styles.infoBox}>
                                <Text style={{marginLeft: 7, fontSize: 20, fontWeight: "bold"}}>Kan Grubu: </Text>
                                <Text style={{fontSize: 20}}>{userData ? userData.bloodType : ''}</Text>
                            </View>

                        </View>
                        <View style={styles.infoBox2Wrapper}>
                            <View style={{ width: '100%',
                            flexDirection: 'row',
                            alignSelf: "center"}}>
                                <Text style={{fontSize: 20, fontWeight: "bold", marginLeft: 13}}>Doğum Yılı: </Text>
                                <Text style={{fontSize: 20}}>{userData ? moment(userData.DOB).format('DD/MM/YYYY') : ''}</Text>
                                
                            </View>
                            
                        </View>
                        <View style={styles.infoBox2Wrapper}>
                            <View style={{ width: '100%',
                            flexDirection: 'row',
                            alignSelf: "center"}}>
                                <Text style={{fontSize: 20, fontWeight: "bold", marginLeft: 13}}>Adres: </Text>
                                <Text style={{fontSize: 20}}>{userData ? userData.adress : ''}</Text>
                                
                            </View>
                            
                        </View>
                        <TouchableOpacity onPress={() => navigation.navigate('Medication')} style={styles.infoBoxWrapper2}>
                            <View style={{ width: '100%',
                            flexDirection: 'row',
                            alignSelf: "center",}}>
                                <Text style={{fontSize: 24, fontWeight: "bold", marginLeft: 13, alignSelf: "center"}}>İlaçlarım </Text>
                                
                                <Icon style={{width:42, height:42, marginLeft: 185, marginTop:10}} name='arrow-forward' size={32}></Icon>
                               
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('EmergencyPeople')} style={styles.infoBoxWrapper3}>
                            <View style={{ width: '100%',
                            flexDirection: 'row',
                            alignSelf: "center",}}>
                                <Text style={{fontSize: 24, fontWeight: "bold", marginLeft: 13, alignSelf: "center"}}>İletişim Kişilerim </Text>
                                <Icon style={{width:42, height:42, marginLeft: 100, marginTop: 10}} name='arrow-forward' size={32}></Icon>
                                
                            </View>
                        </TouchableOpacity>

                    
                    
            </View>
           
          </View>
    
        
          
    );
};

const styles = StyleSheet.create({
    container1: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        
    },
    container2: {
        width: '100%',
        height:'85%',
        padding: 15,
        flexDirection: 'row',
        flexWrap: 'wrap'

    },
    header2: {
        marginTop: 5,
        marginLeft:58,
        width: '70%',
        height: '8%',
        borderRadius: 60, 
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#add8e6',
    },

    text: {
        color: 'purple',
        fontSize: 25,
        marginTop: 20

    },
    menu: {
        width:30,
        height: 30,
        opacity: 0.9,
        margin: 5,
        marginLeft: 2,
        marginTop:20,

    },
    ayarlarLogo: {
        opacity: 0.9,
        margin: 5,
        marginRight: 2,
        marginTop:35,
    },
    header: {
        flexDirection: 'row',
        marginLeft: 70,
        marginTop: 10,
        width: '60%',
        height: '70%',
        borderRadius: 50, 
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#eee'

    },
    headerText: {
        fontSize: 25,
        fontWeight: "bold",

    },
    avatar: {
        width:80, 
        height: 80,

    },

    appButtonContainer: {
        width: 160,
        height: 50,
        elevation: 8,
        backgroundColor: "#33ABA0",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginTop: 45
      },
      appButtonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
      },
      infoBoxWrapper: {
        borderBottomColor: '#dddddd',
        borderBottomWidth: 1,
        borderTopColor: '#dddddd',
        borderTopWidth: 0,
        flexDirection: 'row',
        height: 50,
        marginTop: 0
        
    },
    infoBox2Wrapper: {
        borderBottomColor: '#dddddd',
        borderBottomWidth: 1,
        borderTopColor: '#dddddd',
        borderTopWidth: 0,
        flexDirection: 'row',
        height: 50,
        marginTop: 0
        
    },
    infoBox:{
        width: '50%',
        flexDirection: 'row',
        alignSelf: "center",

    },
    infoBoxWrapper2: {
        borderBottomColor: '#696969',
        borderBottomWidth: 1,
        borderTopColor: '#696969',
        borderTopWidth: 1,
        flexDirection: 'row',
        height: 60,
        marginTop: 30,
        backgroundColor: '#b0e0e6',

    },
    infoBoxWrapper3: {
        borderBottomColor: '#696969',
        borderBottomWidth: 1,
        borderTopColor: '#696969',
        borderTopWidth: 1,
        flexDirection: 'row',
        height: 60,
        marginTop: 0,
        backgroundColor: '#b0e0e6'
    }
});

export default Profile;