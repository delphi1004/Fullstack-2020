
import React from 'react';
import Text from './Text';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import FormikTextInput from './FormikTextInput';
import theme from './theme';
import useSignIn from '../hooks/useSignIn';
import { useHistory } from "react-router-native";

const initialValues = {
  username: '',
  password: '',
};

const styles = StyleSheet.create({
  container: {
    height: 240,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  inputForm: {
    marginTop: 20,
  },
  signInButton: {
    height: 35,
    marginTop: 10,
    marginBottom: 5,
    backgroundColor: '#0366d6',
    borderRadius: 5,
    justifyContent: 'center',
  },
  signInButtonText: {
    textAlign: 'center',
    textAlignVertical: 'top',
    fontSize: 13,
    fontWeight: theme.fontWeights.bold,
    fontFamily: theme.fonts.main,
    color: 'white'
  }
});

export const SignInForm = ({ onSubmit }) => {

  return (
    <View style={styles.inputForm}>
      <FormikTextInput name="username" placeholder="user name" style='default' testID="usernameField" />
      <FormikTextInput name="password" placeholder="password" style='default' secureTextEntry={true} testID="passwordField" />
      <TouchableOpacity style={styles.signInButton} onPress={onSubmit} testID="submitButton">
        <Text style={styles.signInButtonText}>Sign in</Text>
      </TouchableOpacity>
    </View>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();
  const history = useHistory();
  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .required('user name is required'),
    password: yup
      .string()
      .min(4, 'the minimum password is 4 letters')
      .required('password is required'),
  });

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signIn({ username, password });
      console.log('signed in');
      history.push('/');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
      </Formik>
    </View>
  );
};

export default SignIn;