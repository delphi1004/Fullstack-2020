import React from 'react';
import Constants from 'expo-constants';
import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import SignIn from './SignIn';
import AppBar from './AppBar';
import { Route, Switch, Redirect } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: '#e1e4e8',
    fontFamily:'Cochin',
  },
  RepositoryList: {
    marginTop: 0,
  },
  SignIn:{
    marginTop: 0,
  }
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Switch>
        <Route path="/" exact>
          <RepositoryList style={styles.RepositoryList} />
        </Route>
        <Route path="/SignIn" exact>
          <SignIn style={styles.SignIn} />
        </Route>
        <Redirect to="/" />
      </Switch>
    </View>
  );
};

export default Main;