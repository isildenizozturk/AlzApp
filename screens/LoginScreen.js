import React,{ useState, useEffect, useRef } from 'react';
import { useContext } from 'react/cjs/react.development';
import { AuthContext } from '../navigation/AuthProvider';
import {windowHeight,windowWidth} from '../utils/Dimensions'
import InputText from '../components/InputText'
import FormButton from '../components/FormButton'
import {
    Button,
    StyleSheet,
    Text,
    TextInput,
    Touchable,
    TouchableOpacity,
    View,
    Image
  } from 'react-native';

const Login = ({navigation}) => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [isValidEmail, setIsValidEmail] = useState(true)
    const [isValidPassword, setisValidPassword] = useState(true)
    const inputElementRef = useRef(null)
    const {login, googleLogin, facebookLogin, resetPassword} = useContext(AuthContext)

    const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    const passwordReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/

    const validateMail = (email) => {
     if (emailReg.test(email) === false) {
    setIsValidEmail(false)
    }
    else{
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
            <View>
            <Image style={{'resizeMode':'contain','width':100,'height':100}} source={require('../assets/brain-logo.png')}></Image>
            </View>
            <Text style={{'fontSize':32,'fontFamily':'sans-serif-light'}}>AlzApp</Text>
            <InputText 
            labelValue={email} 
            onChangeText={(userEmail) =>{
             validateMail(userEmail)
             setEmail(userEmail)}}                    
            placeholderText="Mail..." 
            textContentType="emailAddress"></InputText>
            { !isValidEmail ?  <Text style={{'fontSize':14,'color':'red', 'alignSelf':'flex-start'}}>Hatal?? email. L??tfen kontrol edin</Text> : <Text></Text>}
            <InputText 
            labelValue={password} 
            onChangeText={(userPassword) => {
                validatePassword(userPassword)
                setPassword(userPassword)}}
            placeholderText="??ifre..." 
            textContentType="password" 
            secureTextEntry={true}>
            </InputText>

            { !isValidPassword ?  <Text style={{'fontSize':14,'color':'red', 'alignSelf':'flex-start'}}>Hatal?? ??ifre. <Text onPress={() => Alert.alert('??ifre kurallar??','1. ??ifre en az 8 karakterden olu??mal??d??r.\n2.En az 1 adet b??y??k harf ve say?? i??ermelidir.\n3.T??rk??e karakter i??ermemelidir.')}style={{'color':'navy'}}>Neden?</Text></Text> : <Text></Text>}

            <TouchableOpacity style={{'alignSelf':'flex-end'}}>
            <Text style={styles.forgotPassword} onPress={() => navigation.navigate('PasswordReset')}>??ifremi Unuttum?</Text>
            </TouchableOpacity>

            <FormButton buttonTitle="Giri?? Yap" 
            disabled={!Boolean(email && password && isValidEmail && isValidPassword)} 
            onPress={() => login(email,password)} >
            </FormButton>
            
            <FormButton buttonTitle="??ye Ol" onPress={() => navigation.navigate('Signup')} ></FormButton>

            <Text style={{'marginTop':30}}>Bu platformlara ??yelikleriniz ile de giri?? yapabilirsiniz.</Text>

            <View style={{'flexDirection':'row','padding':20}}>
            <TouchableOpacity onPress={() => facebookLogin()}>
            <Image style={styles.socialLogos} source={require('../assets/facebook-logo.png')}></Image>
            </TouchableOpacity>
            <TouchableOpacity  onPress={() => googleLogin()}>
            <Image style={styles.socialLogos} source={require('../assets/google-logo.png')}></Image>
            </TouchableOpacity>
            </View>
            <View style={{'flexDirection':'row','padding':20}}>
            <TouchableOpacity  style={styles.buttonContainer} onPress={() => navigation.navigate('Home')}>
                <Text style={styles.buttonText}>Te??his Testi</Text>
            </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop:windowHeight/20,
        alignItems:'center',
        justifyContent:'center',
        padding:"8%",
        marginBottom:120
    },
    buttonContainer: {
        marginTop: 15,
        marginBottom: 15,
        width: '70%',
        height: windowHeight / 15,
        backgroundColor: '#2e545e',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
      },
      buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffffff',
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
export default Login;