import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from "react-router-native";
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: "#24292e",
    height: 50,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  buttons: {
    marginTop: 10,
  },
  menues: {
    width: 100,
    color: 'white',
    fontSize: 14,
    fontWeight: "500",
  }
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <Link to="/" component={TouchableOpacity} activeOpacity={0.8}>
        <Text style={styles.menues} >Repositories</Text>
      </Link>
      <Link to="/SignIn" component={TouchableOpacity} activeOpacity={0.8}>
        <Text style={styles.menues} >Sign in</Text>
      </Link>
    </View>
  );
};

export default AppBar;