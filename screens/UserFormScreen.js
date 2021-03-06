import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, ToastAndroid, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import Colors from '../assets/Colors';
import {readScore} from '../components/scoreStorage';
import { parse } from '@babel/core';

const UserFormScreen = (props) => {
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [nickname, setNickName] = useState('');
    const [age, setAge] = useState('');
    
    // 0 for initial // 1 for valid // 2 for invalid
    const [isfirstnamevalid, setIsFirstNameValid] = useState(0);
    const [islastnamevalid, setIsLastNameValid] = useState(0);
    const [isnicknamevalid, setIsNickNameValid] = useState(0);
    const [isagevalid, setIsAgeValid] = useState(0);
    const [isFormValid, setIsFormValid] = useState(false);

    const [scoreString, setScoreString] = useState(null);

    // Storing User to Shared 
    const savedUserToSF = async () => {
        try {Preferences
            await AsyncStorage.setItem('fname', firstname);
            await AsyncStorage.setItem('lname', lastname);
            await AsyncStorage.setItem('nname', nickname);
            await AsyncStorage.setItem('age', age);
        } catch (error) {
            console.log(error);
        }
    }

    // Retrieving User from Shared Preferences
    const getUserFromSF = async () => {
        try {
            const fname = await AsyncStorage.getItem('fname');
            const lname = await AsyncStorage.getItem('lname');
            const nname = await AsyncStorage.getItem('nname');
            const ageSF = await AsyncStorage.getItem('age');
            setFirstName(fname !== null ? fname : firstname);
            setLastName(lname !== null ? lname : lastname);
            setNickName(nname !== null ? nname : nickname);
            setAge(ageSF !== null ? ageSF : age);
            if (firstname !== null) setIsFormValid(true);
        } catch (error) {
            console.log(error);
        }
    }

    // Reading and setting score from file
    const getScoreFromFile = async () => {
        const scoreString = await readScore();
        setScoreString(scoreString);
    }

    useEffect(() => {
        getScoreFromFile();
        if (isfirstnamevalid === 1 && islastnamevalid === 1 && isnicknamevalid === 1 && isagevalid === 1) {
            setIsFormValid(true);
            savedUserToSF();
            showSubmitToast();
            console.log('valid details!');
        }
        getUserFromSF();
        
    }, [isfirstnamevalid, islastnamevalid, isnicknamevalid, isagevalid, props.route.params]) // props.route.params is used here because I want to run useEffect again when execution comes from Quiz page to this home page so getScoreFromFile method will run and will fetch and display the latest score from file. So, in Quiz app it will write score at the time of pressing 'end' and here it will again get score from file.   

    const handleSubmit = () => {
        if (firstname.trim().length > 0) {
            setIsFirstNameValid(1);
        } else {
            setIsFirstNameValid(2);

        }

        if (lastname.trim().length > 0) {
            setIsLastNameValid(1);
        } else {
            setIsLastNameValid(2);

        }

        if (nickname.trim().length > 0) {
            setIsNickNameValid(1);
        } else {
            setIsNickNameValid(2);

        }

        if (age.trim().length > 0 && parseInt(age) >= 18 && parseInt(age) <= 100) {
            setIsAgeValid(1);
        } else {
            setIsAgeValid(2);

        }
    }

    const goTOQuiz = () => {
        isFormValid ? props.navigation.navigate('Quiz') : showQuizToast();
    }

    const showSubmitToast = () => {
        ToastAndroid.show("Bilgiler Kaydedildi", ToastAndroid.SHORT);
    };

    const showQuizToast = () => {
        ToastAndroid.show("L??tfen ??nce bilgilerinizi giriniz", ToastAndroid.SHORT);
    };



    return (
        <KeyboardAvoidingView>
            <TouchableWithoutFeedback>
                <ScrollView>
                    <View style={styles.form}>
                        <View style={styles.formControl}>
                            <Text style={styles.label}>??sim</Text>
                            <TextInput style={styles.input} value={firstname} onChangeText={text => { setFirstName(text); setIsFirstNameValid(0) }} />
                            {isfirstnamevalid === 2 ? <Text style={styles.validateMessage}>L??tfen isminizi giriniz.</Text> : <Text></Text>}
                        </View>
                        <View style={styles.formControl}>
                            <Text style={styles.label}>Soyisim</Text>
                            <TextInput style={styles.input} value={lastname} onChangeText={text => { setLastName(text); setIsLastNameValid(0) }} />
                            {islastnamevalid === 2 ? <Text style={styles.validateMessage}>L??tfen soyisminizi giriniz.</Text> : <Text></Text>}
                        </View>

                        <View style={styles.formControl}>
                            <Text style={styles.label}>Ya??</Text>
                            <TextInput style={styles.input} value={age} onChangeText={text => { setAge(text); setIsAgeValid(0) }} keyboardType="numeric" />
                            {isagevalid === 2 ? <Text style={styles.validateMessage}>L??tfen ge??erli bir ya?? giriniz.</Text> : (parseInt(age) >=18 && parseInt(age) <= 100 && age.trim().length > 0 ? null : <Text>18 ile 100 aras?? bir de??er giriniz.</Text>)}
                        </View>
                    </View>
                    <View style={styles.buttonContainer}>

                        <View>
                             <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                                     <Text style={styles.buttonText}>Bilgileri kaydet</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={goTOQuiz}>
                                     <Text style={styles.buttonText}>Testi Ba??lat</Text>
                            </TouchableOpacity>
                        </View>
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
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    button: {
        backgroundColor: '#b6bcff',
        padding: 12,
        paddingHorizontal: 16,
        borderRadius: 16,
        alignItems: 'center',
        marginBottom:6,
    
    },
    buttonText: {
        fontSize: 20,
        fontWeight: '600',
        color: 'white',
    
    },
    score: {
        fontSize: 25,
        color: Colors.primary,
    },
    scoreContainer: {
        marginTop: 50,
        alignItems: 'center',
    },
    validateMessage: {
        color: 'red',
    }
});

export default UserFormScreen;