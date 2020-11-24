import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Constants from 'expo-constants';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#24292e",
    height: 100,
    color: 'white',
    fontSize: 16,
    fontWeight: "500",
  },

});

const AppBar = () => {
  return (
    <View>
      <TouchableWithoutFeedback>
        <Text style={styles.container} >Repositories</Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default AppBar;