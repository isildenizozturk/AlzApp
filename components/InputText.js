import React from 'react';
import {View, TextInput, StyleSheet, Alert} from 'react-native';
import {windowHeight, windowWidth} from '../utils/Dimensions';



const InputText = ({labelValue, placeholderText, iconType, ...props}) => {



  return (
    <View style={styles.inputContainer}>
      <TextInput
        value={labelValue}
        style={styles.input}
        numberOfLines={1}
        placeholder={placeholderText}
        
        {...props}
      />

    </View>
  );
};

export default InputText;

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 5,
    marginBottom: 5,
    width: '100%',
    height: windowHeight / 15,
    borderColor: '#ccc',
    borderRadius: 3,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  input: {
    padding: 10,
    flex: 1,
    color: '#333',
    fontSize:16,
    fontFamily: 'Helvetica',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputField: {
    padding: 10,
    marginTop: 5,
    marginBottom: 10,
    width: windowWidth / 1.5,
    height: windowHeight / 15,
    borderRadius: 8,
    borderWidth: 1,
  },
});