import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image
} from 'react-native';


const Categories = ({navigation}) => {
    return (
        
        <View style={styles.container1}>
            
             <View style={styles.container2}>
                    <View style={styles.box}>
                         <TouchableOpacity onPress={()=>navigation.navigate("MatchingGame")}
                         style={styles.inner}>
                         <Image
                           
                           source ={require('../assets/GörselLogo.png')}
                            style ={styles.Logo}/> 
                            <Text style={{fontSize: 20, fontWeight: "bold", fontStyle: 'italic', color: 'blue'}}>Görsel</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.box}>
                         <TouchableOpacity onPress={()=>navigation.navigate("Hangman",{ isDailyGame: false})}
                         style={styles.inner}>
                         <Image
                           
                           source ={require('../assets/KelimelerLogo.png')}
                            style ={styles.Logo}/> 
                            <Text style={{fontSize: 20, fontWeight: "bold", fontStyle: 'italic', color: 'green'}}>Kelimeler</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.box}>
                         <TouchableOpacity onPress={()=>navigation.navigate("VisualGame",{ isDailyGame: false})}
                         style={styles.inner}>
                         <Image
                           
                           source ={require('../assets/HafızaLogo.png')}
                            style ={styles.Logo}/> 
                            <Text style={{fontSize: 20, fontWeight: "bold", fontStyle: 'italic', color: 'purple'}}>Hafıza</Text>
                        </TouchableOpacity>
                    </View>
                   
                    <View style={styles.box}>
                         <TouchableOpacity onPress={()=>navigation.navigate("SumGame",{ isDailyGame: false})}
                         style={styles.inner}>
                         <Image
                           
                           source ={require('../assets/SayılarLogo.png')}
                            style ={styles.Logo}/> 
                            <Text style={{fontSize: 20, fontWeight: "bold", fontStyle: 'italic', color: 'red'}}>Sayılar</Text>
                        </TouchableOpacity>
                        
                    </View>
                    
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
    Logo: {
        width: 135,
        height: 135

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
    box: {
        width: '50%',
        height:'45%',
        padding: 5     
    },
    inner: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width:350, 
        height: 250,
        marginTop: 140,
        justifyContent: 'center'
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
      }
});

export default Categories;