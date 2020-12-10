import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Link } from "react-router-native";
import theme from './theme';
import Text from './Text';
import { useQuery } from '@apollo/client';
import { AUTHORISED_USER } from '../graphql/queries';
import { useApolloClient } from '@apollo/client';
import AuthStorageContext from '../contexts/AuthStorageContext';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: "#24292e",
    height: 50,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  buttons: {
    marginTop: 10,
  },
  menues: {
    paddingLeft:10,
    paddingRight: 10,
    color: 'white',
    fontSize: 14,
    fontWeight: theme.fontWeights.bold,
    fontFamily: theme.fonts.main,
  }
});

const AppBar = () => {
  const authStorage = useContext(AuthStorageContext);
  const apolloClient = useApolloClient();
  const [userAuthorised, setUserAuthorised] = useState(false);
  const result = useQuery(AUTHORISED_USER);

  useEffect(() => {
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

  const signOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
    console.log('user signed out!');
    console.log('resetStore called');
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to="/" component={TouchableOpacity} activeOpacity={0.8}>
          <Text style={styles.menues} >Repositories</Text>
        </Link>
        {
          !userAuthorised &&
          <Link to="/SignIn" component={TouchableOpacity} activeOpacity={0.8}>
            <Text style={styles.menues} >Sign in</Text>
          </Link>
        }
        {
          userAuthorised &&
          <Link to="/CreateReview" component={TouchableOpacity} activeOpacity={0.8}>
            <Text style={styles.menues} >Creative a review</Text>
          </Link>
        }
        {
          userAuthorised &&
          <TouchableOpacity onPress={signOut}>
            <Text style={styles.menues} >Sign out</Text>
          </TouchableOpacity>
        }
      </ScrollView>
    </View>
  );
};

export default AppBar;