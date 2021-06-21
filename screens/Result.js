import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, ToastAndroid, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import Colors from '../assets/Colors';
import {readScore} from '../components/scoreStorage';
import UserFormScreen from '../screens/UserFormScreen';
import Quiz from '../screens/Quiz';

const Result = ({navigation}) => {
 
    const [scoreString, setScoreString] = useState(0);
  

    let dereceString = '';

    
    
    const getScoreFromFile = async () => {
        
        const scoreString = await readScore();
        setScoreString(scoreString);

        if(scoreString == '6 out of 6'){
                return 'Şiddetli Düzey Bozukluk';
        }
        
        else if(scoreString == '5 out of 6'){
               return 'Orta Düzey Bozukluk';
        }
        
        else if(scoreString == '4 out of 6'){
            
                return 'Orta Düzey Bozukluk';
        
        }
        
        else if(scoreString == '3 out of 6'){
                return 'Orta Düzey Bozukluk';
        }
        
        else if(scoreString == '2 out of 6'){
            return'Hafif Bozukluk';
        }
        
        else if(scoreString == '1 out of 6'){
                return 'Çok Hafif Bozukluk';
        }
        
        else {
                return 'Sağlıklı';
        }


    }
    getScoreFromFile();
    

    return (
        
        <KeyboardAvoidingView>
            <TouchableWithoutFeedback>
                <ScrollView>
                    <View style={styles.Container}>
                        <Text style={styles.ContainerText}>Test sonuçlarının tıbbi kesin bir bilgi vermediğini tekrar hatırlatmak isteriz. Bu testler
                        kendinizle ilgili farkındalığınızı artırmak içindir, tek başına tanı koydurmaz. Doğru tanı
                        ve tedavi için bir uzmana başvurmanızı tavsiye ederiz. Sağlıklı günler dileriz.</Text>
                    </View>
                    {
                        (scoreString!== 'noscore' && scoreString !== null) ? <View style={styles.scoreContainer}>
                            <Text style={styles.score}>Sonuç: {scoreString}</Text>
                        </View> : null
                    }
                    
                    <View>
                        <Text style={styles.Text}> Değerlendirme : {getScoreFromFile}</Text>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate("Home")}>
                                <Text style={styles.buttonText}>Anasayfa</Text>
                        </TouchableOpacity>
                    </View>
 
                    
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}


const styles = StyleSheet.create({
    form: {
        margin: 20,
    },
    formControl: {
        width: '100%'
    },
    label: {
        marginTop: 2,
        fontSize: 18,
    },
    input: {
        marginBottom: 5,
        paddingHorizontal: 2,
        paddingVertical: 3,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
    button: {
        backgroundColor: '#b6bcff',
        padding: 12,
        paddingHorizontal: 16,
        borderRadius: 16,
        alignItems: 'center',
        marginBottom:8,
        width:'45%',
        marginLeft:120,
        marginTop:90,
    
    },
    buttonText: {
        fontSize: 20,
        fontWeight: '600',
        color: 'white',
    
    },
    Container:{
        margin: 20,
        marginBottom:10,
        backgroundColor: Colors.accent,
        padding: 15,
        borderRadius: 7,
        borderColor: Colors.primary,
        borderWidth: 2,
        minHeight: '12%'
    },
    score: {
        fontSize: 25,
        color: Colors.primary,
        marginBottom: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    scoreContainer: {
        marginTop: 50,
    },
    ContainerText:{
        fontSize: 25,
        color: 'black',
        textAlign: 'justify'
    },
    Text:{
        fontSize: 25,
        color: 'black',
        alignItems: 'center',
        padding: 12,
        marginTop: 15,

    },
    validateMessage: {
        color: 'red',
    }
});

export default Result;