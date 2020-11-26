import { useMutation } from '@apollo/client';
import { SIGN_IN } from '../graphql/queries';

const useSignIn = () => {
  const [mutate, result] = useMutation(SIGN_IN);
  const signIn = ({ username, password }) => mutate({ variables: { username, password } });
  return [signIn, result];
};

export default useSignIn;