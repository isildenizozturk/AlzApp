<script src="http://localhost:8097"></script>
import React from 'react';
import { View, Text, StyleSheet, Alert ,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'

const MedicationBar = ({medicationName,medicationExp,medicationTime, onDelete, ...props}) => {
  const writeTimes = (value) => {
    return <Text>{("0" + value.getHours()).slice(-2)+":"+("0" + value.getMinutes()).slice(-2)}</Text>
  }
  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <Icon name='delete' color='red' size={32} onPress={() => onDelete()} style={styles.square}></Icon>
        
         
      </View>
      <Text style={styles.itemText}>{medicationName}</Text>
        <Text style={styles.itemText}>{medicationExp}</Text>
        {medicationTime.map(value => <Text>{writeTimes(value)}</Text>) }
      <View style={styles.circular}></View>
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#FFF',
    padding: 30,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    width:'98%',
  
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  square: {
    width: 30,
    height: 26,
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15, 
  },
  itemText: {
    maxWidth: '80%',
    marginRight: 30
  },
  circular: {
    width: 12,
    height: 12,
    borderColor: '#55BCF6',
    borderWidth: 2,
    borderRadius: 5,
  },
});

export default MedicationBar;