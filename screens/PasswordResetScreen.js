import React,{useState, useContext} from 'react'
import { View, Text } from 'react-native'
import FormButton from '../components/FormButton'
import InputText from '../components/InputText'
import { AuthContext } from '../navigation/AuthProvider'

const PasswordReset = ({navigation}) => {
    const [email, setEmail] = useState('')
    const {resetPassword} = useContext(AuthContext)
    return(
        <View style={{'marginTop':'auto','marginBottom':'auto','marginHorizontal':10,'justifyContent':'center','alignItems':'center'}}>
        <Text style={{'fontSize':24,'marginBottom':10}}>Şifrenizi mi unuttunuz?</Text>
        <Text style={{'fontSize':18}}>Girdiğiniz e-posta addresinize bir şifre yenileme linki yollanacak.</Text>
        <InputText 
        labelValue={email}
        placeholderText="Email..."
        onChangeText={(userEmail) => setEmail(userEmail)}
        ></InputText>

            <FormButton
            buttonTitle="Yenileme linki gönder"
            onPress={() => resetPassword(email)}
            ></FormButton>
        </View>
    )

}
export default PasswordReset