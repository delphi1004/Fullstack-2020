/* eslint-disable no-unused-vars */
import React from 'react';
import Text from './Text';
import { TextInput, TouchableWithoutFeedback, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Formik, useField } from 'formik';
import * as yup from 'yup';
import FormikTextInput from './FormikTextInput';

const initialValues = {
  userid: '',
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
    marginTop: 15 ,
    alignItems: 'center' 
  },
  signInButtonText: {
    fontSize: 16,
    fontWeight: '500',
  }
});

const SignInForm = ({ onSubmit }) => {
  const [useridField, useridMeta, useridHelpers] = useField('userid');
  const [passwordField, passwordMeta, passwordHelpers] = useField('password');

  return (
    <View style={styles.inputForm}>
      <FormikTextInput name="userid" placeholder="user id" style='default' />
      <FormikTextInput name="password" placeholder="password" style='default' secureTextEntry={true} />
      <TouchableOpacity style={styles.signInButton} onPress={onSubmit}>
        <Text style={styles.signInButtonText}>Sign in</Text>
      </TouchableOpacity>
    </View>
  );
};

const onSubmit = (values) => {
  console.log('onSubmit ', values);
};

const SignIn = () => {

  const validationSchema = yup.object().shape({
    userid: yup
      .string()
      .min(3, 'the minimum user name is 3 letters')
      .required('user name is required'),
    password: yup
      .string()
      .min(4, 'the minimum password is 4 letters')
      .required('password is required'),
  });

  return (
    <View style={styles.container}>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
      </Formik>
    </View>
  );
};

export default SignIn;