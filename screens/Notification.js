import React, {useState} from 'react';
import {Switch, View, Text} from 'react-native';

const NotificationProps= () => {
    title: String
    description: String
};

const Notification = ( { title, description} ) => {
    const [toggled, setToggled] = useState(false);
    return (
        <View style={{flexDirection:"row", marginBottom: 0, marginLeft: 13,
        borderBottomColor: '#dddddd',
        borderBottomWidth: 1,
        borderTopColor: '#dddddd',
        borderTopWidth: 1,       
        flexDirection: 'row',
        height: 70,
        }}>
            <View style={{flex: 1, justifyContent:"center"}}>
                <Text style={{fontSize: 20, fontWeight: "bold"}}>{title}</Text>
                <Text>{description}</Text>
            </View>
            <View style={{paddingHorizontal: 5, justifyContent:"center"}}>
                <Switch value = {toggled} onValueChange={setToggled}/>
            </View>
        </View>
    )
}


export default Notification;