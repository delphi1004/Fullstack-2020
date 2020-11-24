/* eslint-disable no-unused-vars */
import React from 'react';
import { TextInput as NativeTextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({

  default: {
    width:300,
    height:40,
    marginTop:15,
    borderWidth: 0.5,
    borderColor: 'grey',
    borderStyle: 'solid',
    borderRadius: 3
  }
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = styles[style];
  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;