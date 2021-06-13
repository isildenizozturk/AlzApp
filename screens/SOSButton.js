import React from 'react'
import { View, Text, useContext } from 'react-native'
import { AuthContext } from '../navigation/AuthProvider'
import Icon from 'react-native-vector-icons/'

export default function SOSButton() {
    const sosButton = () => {
        Alert.alert('SOS Butonu', 'Bu buton anlık bulunduğunuz konumu İletişim Kişilerim bölümüne eklediğiniz telefon numaralarına SMS yolu ile gönderecek. Onaylıyor musunuz?')
    }
    return (
        <View>
            {sosButton()}
        </View>
    )
}
