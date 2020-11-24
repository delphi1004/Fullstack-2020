/* eslint-disable no-unused-vars */
import React from 'react';
import Text from './Text';
import { TextInput, TouchableWithoutFeedback, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Formik, useField } from 'formik';
import FormikTextInput from './FormikTextInput';

const initialValues = {
  userid: '',
  password: '',
};

const styles = StyleSheet.create({
  container: {
    height: 200,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  inputForm: {
    marginTop: 20,
    alignItems: 'center'
  },
  signInButton: {
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
      <TouchableOpacity style={{ marginTop: 15 }} onPress={onSubmit}>
        <Text style={styles.signInButton}>Sign in</Text>
      </TouchableOpacity>
    </View>
  );
};

const onSubmit = (values) => {
  console.log('onSubmit ', values);
};

const SignIn = () => {
  return (
    <View style={styles.container}>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
      </Formik>
    </View>
  );
};

export default SignIn;