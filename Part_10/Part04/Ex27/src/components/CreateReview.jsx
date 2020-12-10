
import React from 'react';
import Text from './Text';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import FormikTextInput from './FormikTextInput';
import theme from './theme';
import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/queries';
import { useHistory } from "react-router-native";

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: '',
};

const styles = StyleSheet.create({
  container: {
    height: 360,
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
  createReviewButton: {
    height: 35,
    marginTop: 10,
    marginBottom: 5,
    backgroundColor: '#0366d6',
    borderRadius: 5,
    justifyContent: 'center',
  },
  createReviewButtonText: {
    textAlign: 'center',
    textAlignVertical: 'top',
    fontSize: 13,
    fontWeight: theme.fontWeights.bold,
    fontFamily: theme.fonts.main,
    color: 'white'
  }
});

export const CreateReviewForm = ({ onSubmit }) => {

  return (
    <View style={styles.inputForm}>
      <FormikTextInput name="ownerName" placeholder="Repository owner name" style='default' />
      <FormikTextInput name="repositoryName" placeholder="Repository name" style='default' />
      <FormikTextInput name="rating" placeholder="Rating between 0 and 100 " style='default' />
      <FormikTextInput name="text" placeholder="Review" multiline={true} style='default' />
      <TouchableOpacity style={styles.createReviewButton} onPress={onSubmit}>
        <Text style={styles.createReviewButtonText}>Create a eview</Text>
      </TouchableOpacity>
    </View>
  );
};

const CreateReview = () => {
  const history = useHistory();
  const [mutate] = useMutation(CREATE_REVIEW);
  const validationSchema = yup.object().shape({
    ownerName: yup
      .string()
      .required('repository owner name is required'),
    repositoryName: yup
      .string()
      .required('repository name is required'),
    rating: yup
      .number()
      .min(0, 'rating is between 0 and 100')
      .max(100, 'rating is between 0 and 100')
      .required('rating is required'),
  });

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text } = values;

    try {
      const { data } = await mutate({ variables: { ownerName, repositoryName, rating:parseInt(rating), text } });
      const id = data.createReview.repository.fullName.replace('/','.');
      history.push(`/repository/${id}`);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ handleSubmit }) => <CreateReviewForm onSubmit={handleSubmit} />}
      </Formik>
    </View>
  );
};

export default CreateReview;