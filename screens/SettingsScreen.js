import React from "react";
import { StyleSheet,
    Text,
    View,
    TouchableOpacity,
    SafeAreaView,
    Image} from 'react-native';
import Notification from "./Notification";
import Icon from 'react-native-vector-icons/MaterialIcons'
import { AuthContext } from '../navigation/AuthProvider';

const Settings = ({navigation}) => {

    return (
        
        <SafeAreaView style={styles.container1}>

        <View style={{marginTop:-30}} >
           <View style={styles.infoBoxWrapper1}>
               <Text style={styles.settings2}>HESAP</Text>

            </View>   
                <TouchableOpacity >
                    <View style={styles.infoBoxWrapper}>
                        <Text style={styles.settings}>Şifre Değiştir </Text>
                        <Icon style={{width:40, height:40, marginLeft: 220, marginTop: 12}} name='arrow-forward' size={32}></Icon>        
                    </View>
                </TouchableOpacity>
                <TouchableOpacity >
                    <View style={styles.infoBoxWrapper}>
                        <Text style={styles.settings}>Dil Değiştir </Text>
                        <Icon style={{width:40, height:40, marginLeft: 240, marginTop: 12}} name='arrow-forward' size={32}></Icon>        
                    </View>
                </TouchableOpacity>
                <TouchableOpacity >
                    <View style={styles.infoBoxWrapper}>
                        <Text style={styles.settings}>Hesabımı Sil </Text>
                   </View>
                </TouchableOpacity>
            <View style={styles.infoBoxWrapper2}>
               <Text style={styles.settings2}>BİLDİRİM</Text>

            </View>   
            <View >
                <Notification 
                    title="Günlük Egzersiz"
                    description="Günlük egzersizleriniz için hatırlatma bildirimi"
                />               
                    <Notification 
                    title="İlaç Saati"
                    description="Almanız gereken ilaçlar için hatırlatma bildirimi"
                />        
            </View>
            <View style={styles.infoBoxWrapper2}>
               <Text style={styles.settings2}>KONUM</Text>

            </View> 
            <View>
            <Notification 
                    title="Konum Bilgisi"
                    description="Uygulama konumunuza erişebilsin mi?"
                />     
            </View>
      


            </View>
        <View>

        </View>
    
      </SafeAreaView>
    );
};
export default Settings;

const styles = StyleSheet.create({
    container1: {
        flex: 1,
        backgroundColor: 'white',
        
    },
    infoBoxWrapper: {
        borderBottomColor: '#dddddd',
        borderBottomWidth: 1,
        borderTopColor: '#dddddd',
        borderTopWidth: 1,
        flexDirection: 'row',
        height: 60,
        marginTop: 0
        
    },
    infoBoxWrapper1: {
        borderBottomColor: '#dddddd',
        borderBottomWidth: 1,
        borderTopColor: '#dddddd',
        borderTopWidth: 1,
        marginTop: 70,
        flexDirection: 'row',
        height: 60,
        
  
    },
    infoBoxWrapper2: {
        borderBottomColor: '#dddddd',
        borderBottomWidth: 1,
        borderTopColor: '#dddddd',
        borderTopWidth: 1,
        marginTop: 10,
        flexDirection: 'row',
        height: 60,
  
    },


    settings: {
        fontSize: 20,
        color: 'black',
        justifyContent: 'center',
        alignSelf: "center",
        marginLeft: 10,
        fontWeight: 'bold',

    },
    settings2: {
        fontSize: 20,
        color: 'grey',
        justifyContent: 'center',
        alignSelf: "center",
        marginLeft: 10

    },
    options: {
        fontSize: 20,
        fontWeight: "bold",
        marginLeft: 10
        
    },

    menu: {
        width:30,
        height: 30,
        opacity: 0.9,
        margin: 5,
        marginLeft: 2,
        marginTop:20,

    },

    header: {
        flexDirection: 'row',
        marginLeft: 60,
        marginTop: 20,
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
        marginLeft: 15

    },
    avatar: {
        width:80, 
        height: 80,
        marginLeft:0

    },

});