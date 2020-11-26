import React, { useState, useEffect } from 'react';
import Constants from 'expo-constants';
import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import SignIn from './SignIn';
import AppBar from './AppBar';
import { useQuery } from '@apollo/client';
import { Route, Switch, Redirect } from 'react-router-native';
import { AUTHORISED_USER } from '../graphql/queries';

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: '#e1e4e8',
    fontFamily: 'Cochin',
  },
  RepositoryList: {
    marginTop: 0,
  },
  SignIn: {
    marginTop: 0,
  }
});

const Main = () => {
  const [userAuthorised, setUserAuthorised] = useState(false);
  const result = useQuery(AUTHORISED_USER);

  useEffect(() => {
    console.log('useEffect');
    if (result.data !== undefined) {
      if (result.data.authorizedUser !== null) {
        setUserAuthorised(true);
        console.log(`User '${result.data.authorizedUser.username}' is authorised`);
      } else {
        console.log('User is not authorised ', result.data);
        setUserAuthorised(false);
      }
    }
  }, [result.data]);

  return (
    <View style={styles.container}>
      <AppBar userAuthorised={userAuthorised} />
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