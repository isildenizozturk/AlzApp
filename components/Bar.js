import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
const Bar = (props) => {
  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <Icon name='delete' color='red' size={32} style={styles.square}></Icon>
        <Text style={styles.itemText}>{props.text}</Text>
      </View>
      
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'lightgrey',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'column',
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
    height: 24,
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
  },
  itemText: {
    maxWidth: '80%',
  },
  circular: {
    width: 12,
    height: 12,
    borderColor: '#55BCF6',
    borderWidth: 2,
    borderRadius: 5,
  },
});

export default Bar;