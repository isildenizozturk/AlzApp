import React, { createContext, useState } from 'react';
import { Alert } from 'react-native'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import SendSMS from 'react-native-sms'

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [personTel, setPersonTel] = useState([])
    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                personTel,
                setPersonTel,
                login: async (email,password) => {
                    try {
                       await auth().signInWithEmailAndPassword(email,password); 
                    }
                    catch(e){
                        Alert.alert('Hatalı giriş','Şifre veya e-posta hatalı, lütfen tekrar deneyin.');
                    }
                },
                googleLogin: async () => {
                    try {
                    const { idToken } = await GoogleSignin.signIn();

                    // Create a Google credential with the token
                    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

                    // Sign-in the user with the credential
                    await auth().signInWithCredential(googleCredential);
                    }
                    catch(e){
                        console.log(e)
                    }
                },
                facebookLogin: async () => {
                    try {
                        // Attempt login with permissions
                        const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

                        if (result.isCancelled) {
                        throw 'User cancelled the login process';
                        }

                        // Once signed in, get the users AccesToken
                        const data = await AccessToken.getCurrentAccessToken();

                        if (!data) {
                        throw 'Something went wrong obtaining access token';
                        }

                        // Create a Firebase credential with the AccessToken
                        const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

                        // Sign-in the user with the credential
                        await auth().signInWithCredential(facebookCredential);
                        }
                    catch (e)
                    {
                        console.log(e)
                    }
                },
                resetPassword: async (email) => {
                    try
                    {
                       await auth().sendPasswordResetEmail(email)
                       Alert.alert('Lütfen e-postanızı kontrol ediniz...')
                    }
                    catch(e){
                        Alert.alert('İşlemde sıkıntı oluştu, lütfen e-postanızı doğru girdiğinizden emin olun.')
                    }
                },
                signup: async (email,password) => {
                    try{
                        await auth().createUserWithEmailAndPassword(email,password)
                        .then(() => {
                            firestore().collection('users').doc(auth().currentUser.uid)
                            .set({
                                name:'',
                                surname:'',
                                gender:'',
                                mobileno:'',
                                bloodType:'',
                                DOB:'',
                                email: email,
                                adress: '',
                                createTime: firestore.Timestamp.fromDate(new Date()),
                                userImg: null
                            })
                            .catch(error => {
                                console.log('User addition to Firestore failed.')
                            })
                            
                        })
                        .catch(error => {
                            console.log('Error in signup.')
                        })
                    }
                    catch(e){
                        console.log(e);
                    }
                },
                logout: async () => {
                    try {
                        await auth().signOut();
                    }
                    catch(e){
                        console.log(e)
                    }
                },
                sosButton: async (personTel,coordslink) => {
                Alert.alert('Acil Yardım Butonu', 'Bu buton anlık bulunduğunuz konumu İletişim Kişilerim bölümüne eklediğiniz telefon numaralarına SMS yolu ile gönderecek. \n\nOnaylıyor musunuz?',[
                {text: 'Tamam', onPress: () => Alert.alert("Cancel Pressed")},
                {text: 'Vazgeç', style:'cancel'}
          ])
                    await SendSMS.send({
                        body: 'Yardıma ihtiyacım var. Şuanki konumum \n' + coordslink,
                        recipients: personTel,
                        successTypes: ['sent', 'queued'],
                        allowAndroidSendWithoutReadPermission: true
                    }, (completed, cancelled, error) => {
                        console.log('SMS Callback: completed: ' + completed + ' cancelled: ' + cancelled + 'error: ' + error);

	});
                }
    //             sendsms: async (personTel,coordslink) => {
    //               
    //             }
            }}>
            {children}
        </AuthContext.Provider>
    )
}