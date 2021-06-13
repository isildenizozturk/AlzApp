import React from 'react'
import {View, Text, SafeAreaView} from 'react-native'
import { useContext } from 'react/cjs/react.development'
import FormButton from "../components/FormButton"
import { AuthContext } from '../navigation/AuthProvider'
import Icon from 'react-native-vector-icons/MaterialIcons'



const Home = ({navigation}) => {
    const {user, logout} = useContext(AuthContext)
    return (
        <View>
            <SafeAreaView style={{'flex':1}}>
            
            </SafeAreaView>
            <Text>WELCOME</Text>
            <FormButton buttonTitle='Logout' onPress={() => logout() }></FormButton>
        </View>
    )
}
export default Home;