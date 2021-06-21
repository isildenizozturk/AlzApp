import React from 'react'
import {View, Text, SafeAreaView,StyleSheet,TouchableOpacity,Image} from 'react-native'
import { useContext } from 'react/cjs/react.development'
import FormButton from "../components/FormButton"
import { AuthContext } from '../navigation/AuthProvider'
import Icon from 'react-native-vector-icons/MaterialIcons'


const AppButton = ({ onPress, title }) => (
    <TouchableOpacity onPress={()=>navigation.navigate()} style={styles.appButtonContainer}>
      <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
  );

const Home = ({navigation}) => {
    const {user, logout} = useContext(AuthContext)
    return (
        <SafeAreaView style={{'flex':1}}>
        
            <View style={styles.container}>
                
                
                <Text style={styles.text}>Tekrar merhaba, günlük egzersizini yapmaya hazır mısın?</Text>

                <Image 
                    style={styles.image}
                    resizeMode = 'stretch'
                    source ={require('../assets/AlzApp.png')} 
                />
                <TouchableOpacity onPress={() => navigation.navigate("MatchingGame")} style={styles.appButtonContainer}>
                    <Text style={styles.appButtonText}>Başlat</Text>
                </TouchableOpacity>


            </View>
        
        </SafeAreaView>
    )
}
export default Home;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        

    },
    text: {
        color: 'purple',
        fontSize: 30,
        marginTop: 20,
        paddingLeft:20,
        paddingRight:20,

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
        marginTop: 10,
        width: '60%',
        height: '70%',
        borderRadius: 50, 
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#eee'

    },
    headerText: {
        fontSize: 20,
        fontWeight: "bold",

    },
    avatar: {
        width:70, 
        height: 70,

    },
    image: {
        width:370, 
        height: 270,
        marginTop: 50,
        justifyContent: 'center'
    },

    appButtonContainer: {
        width: 160,
        height: 70,
        elevation: 8,
        paddingTop:20,
        backgroundColor: "#6d6875",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginTop: 50,
      },
  
      appButtonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
      }
});