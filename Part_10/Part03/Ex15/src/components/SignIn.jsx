
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
    marginTop: 15,
    alignItems: 'center'
  },
  signInButtonText: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: theme.fonts.main,
  }
});

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.inputForm}>
      <FormikTextInput name="username" placeholder="user name" style='default' />
      <FormikTextInput name="password" placeholder="password" style='default' secureTextEntry={true} />
      <TouchableOpacity style={styles.signInButton} onPress={onSubmit}>
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
      const  data  = await signIn({ username, password });
      console.log('signed in', data);
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