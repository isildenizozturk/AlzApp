import React from 'react';
import { View, Text, StyleSheet, Alert ,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'

const EPBar = ({personName,personPhone,personExp, onDelete, ...props}) => {
  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <Icon name='delete' color='red' size={32} onPress={() => onDelete()} style={styles.square}></Icon>
      </View>
      <View style={{flexDirection: 'column'}}>
        <Text style={styles.itemText}>{personName}</Text>
        <Text style={styles.itemText}>{personPhone}</Text>
        <Text style={styles.itemText}>{personExp}</Text>
      </View>
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
    maxWidth: '100%',
  },
  circular: {
    width: 12,
    height: 12,
    borderColor: '#55BCF6',
    borderWidth: 2,
    borderRadius: 5,
  },
});

export default EPBar;