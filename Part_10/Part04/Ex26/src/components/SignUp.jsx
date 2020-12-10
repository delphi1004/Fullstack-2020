
import React from 'react';
import Text from './Text';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import FormikTextInput from './FormikTextInput';
import theme from './theme';
import useSignIn from '../hooks/useSignIn';
import { useHistory } from "react-router-native";
import { CREATE_USER } from '../graphql/queries';
import { useMutation } from '@apollo/client';

const initialValues = {
  username: '',
  password: '',
};

const styles = StyleSheet.create({
  container: {
    height: 305,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  inputForm: {
    marginTop: 20,
  },
  signUpButton: {
    height: 35,
    marginTop: 10,
    marginBottom: 5,
    backgroundColor: '#0366d6',
    borderRadius: 5,
    justifyContent: 'center',
  },
  signUpButtonText: {
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
      <FormikTextInput name="username" placeholder="user name" style='default' />
      <FormikTextInput name="password" placeholder="password" style='default' secureTextEntry textContentType="none" autoCorrect={false}/>
      <FormikTextInput name="passwordConfirm" placeholder="password confirmation" style='default' secureTextEntry textContentType="none" autoCorrect={false}/>
      <TouchableOpacity style={styles.signUpButton} onPress={onSubmit} testID="submitButton">
        <Text style={styles.signUpButtonText}>Sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

const SignUP = () => {
  const history = useHistory();
  const [signIn] = useSignIn();
  const [mutate] = useMutation(CREATE_USER);
  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .min(1, 'the minimum user name is between 1 and 30 letters')
      .max(30, 'the minimum user name is between 1 and 30 letters')
      .required('user name is required'),
    password: yup
      .string()
      .min(5, 'the minimum password is between 5 and 15 letters')
      .max(15, 'the minimum password is between 5 and 15 letters')
      .required('password is required'),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref('password'), null], "passwords must match")
      .required('Password confirm is required')
  });

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await mutate({ variables: { username, password } });
      console.log(`user ${username} created`);
      await signIn({ username, password });
      console.log(`user ${username} signed in`);
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

export default SignUP;