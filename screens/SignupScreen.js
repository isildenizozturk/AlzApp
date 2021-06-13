import React,{ useState, useEffect, useContext} from 'react';
import {windowHeight,windowWidth} from '../utils/Dimensions'
import InputText from '../components/InputText'
import FormButton from '../components/FormButton'
import PasswordInfo from '../components/PasswordInfo'
import { AuthContext } from '../navigation/AuthProvider'
import {
    Button,
    StyleSheet,
    Text,
    TextInput,
    Touchable,
    TouchableOpacity,
    View,
    Image,
    Modal,
    Alert
  } from 'react-native';
const Signup = ({navigation}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const [isValidEmail, setIsValidEmail] = useState(true)
    const [isValidPassword, setisValidPassword] = useState(true)
    const {signup, googleLogin, facebookLogin} = useContext(AuthContext)

    const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    const passwordReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/

    const validateMail = (email) => {
    if (emailReg.test(email) === false) 
    {
    setIsValidEmail(false)
    }
    else
    {
    setIsValidEmail(true)
    }
}

    const validatePassword = (password) => {
        const hasUppercaseLetter = (password) => !!password.match(/[A-Z]/);
        const hasNumber = (password) => !!password.match(/[0-9]/);
        if (hasUppercaseLetter(password) && hasNumber(password) && password.length > 8 && password.length < 16)
        {
            setisValidPassword(true)
        }
        else
        {
            setisValidPassword(false)
        }
    }


    return(
        
        <View style={styles.container}>
        <Text style={{'fontSize':32,'fontFamily':'sans-serif-light'}}>Üye Olun</Text>
            <InputText labelValue={email} 
                    onChangeText={(userEmail) => { 
                        validateMail(userEmail) 
                        setEmail(userEmail)} }                  
                    placeholderText="Mail..." 
                    textContentType='emailAddress'

                    ></InputText>
             { !isValidEmail ?  <Text style={{'fontSize':14,'color':'red', 'alignSelf':'flex-start'}}>Hatalı email. Lütfen kontrol edin</Text> : <Text></Text>}
            <InputText labelValue={password} 
            onChangeText={(userPassword) => {
                validatePassword(userPassword) 
                setPassword(userPassword)}}
            placeholderText="Şifre..." textContentType="password" secureTextEntry={true} ></InputText>
            { !isValidPassword ?  <Text style={{'fontSize':14,'color':'red', 'alignSelf':'flex-start'}}>Hatalı şifre. 
            <Text onPress={() => Alert.alert('Şifre kuralları','1. Türkçe karakterler kullanılamaz.\n2. 8-16 karakter arası kullanılabilir.\n3. Şifrenizin en az bir adet büyük harf ve rakam içermesi gerekir.')}
            style={{'color':'navy'}}>Neden?</Text></Text> : <Text></Text>}
            <InputText labelValue={confirmPassword} 
            onChangeText={(userConfirmPassword) => setConfirmPassword(userConfirmPassword)}
            placeholderText="Şifreyi tekrarlayın..." textContentType="password" secureTextEntry={true} ></InputText>
            { password === confirmPassword ? <Text></Text> : <Text style={{'fontSize':14,'color':'red', 'alignSelf':'flex-start'}}>Şifreler uyuşmuyor</Text> }
            <FormButton buttonTitle="Üye Ol" disabled={!Boolean(email && password && isValidEmail && isValidPassword && password === confirmPassword)} onPress={() => signup(email,password)} ></FormButton>
            <Text style={{'marginTop':30}}>Bu platformlara üyelikleriniz ile de giriş yapabilirsiniz.</Text>
            <View style={{'flexDirection':'row','padding':20}}>
            <TouchableOpacity onPress={() => facebookLogin()}>
            <Image style={styles.socialLogos} source={require('../assets/facebook-logo.png')}></Image>
            </TouchableOpacity>
            <TouchableOpacity  onPress={() => googleLogin()}>
            <Image style={styles.socialLogos} source={require('../assets/google-logo.png')}></Image>
            </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Login')} style={{'color':'navy','alignItems':'center'}}>
            <Text style={{'color':'navy'}}>Üyeliğiniz zaten var mı?</Text>
            <Text style={{'color':'navy'}}>Giriş Yapın</Text>
            </TouchableOpacity>
            
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop:windowHeight/20,
        alignItems:'center',
        justifyContent:'center',
        padding:"8%"
    },
    // mailInput: {
    //     marginTop:5,
    //     marginBottom: 10,
    //     width: '85%',
    //     height: windowHeight / 15,
    //     fontFamily:'Verdana',
    //     borderColor: '#ccc',
    //     borderRadius: 3,
    //     borderWidth: 1,
    //     backgroundColor: '#fff',
    //     alignSelf:"center"
    // },
    // passwordInput: {
    //     marginTop:5,
    //     marginBottom: 10,
    //     width: '85%',
    //     height: windowHeight / 15,
    //     borderColor: '#ccc',
    //     borderRadius: 3,
    //     borderWidth: 1,
    //     backgroundColor: '#fff',
    //     justifyContent:"center",
    //     alignSelf:"center"
      
    // },
    // adminLoginButton:{
    //     width: "40%",
    //     alignItems: 'flex-end',

        forgotPassword: {
            color:"navy",
            alignSelf:"flex-end"
        },
        socialLogos: {       
            width: 75,
            height: 75,
            resizeMode: 'contain',
            marginHorizontal:20
            
        },
        
    // },
    // loginButton: {
    //     width:"85%",
    //     alignItems: 'flex-end'
    // }
  });
export default Signup;