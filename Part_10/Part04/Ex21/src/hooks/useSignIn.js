import {useContext} from 'react';
import { useMutation } from '@apollo/client';
import { SIGN_IN } from '../graphql/queries';
import AuthStorageContext from '../contexts/AuthStorageContext';
import { useApolloClient } from '@apollo/client';

const useSignIn = () => {
  const apolloClient = useApolloClient();
  const authStorage = useContext(AuthStorageContext);
  const [mutate, result] = useMutation(SIGN_IN);

  const signIn = async ({ username, password }) => {
    const {data} = await mutate({ variables: { username, password } });
    await authStorage.setAccessToken(data.authorize.accessToken);
    apolloClient.resetStore();
    console.log('access token is stored');
    return data;
  };
  return [signIn, result];
};

export default useSignIn;