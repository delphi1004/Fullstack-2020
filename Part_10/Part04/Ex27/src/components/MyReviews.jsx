/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useQuery, useMutation } from '@apollo/client';
import { format } from 'date-fns';
import theme from './theme';
import { useHistory } from "react-router-native";
import { AUTHORISED_USER, DELETE_REVIEW } from '../graphql/queries';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  review: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'center',
    flexShrink: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 0,
    backgroundColor: 'white',
    paddingTop: 5,
    paddingBottom: 10
  },
  header: {
    width: '80%',
    alignItems: 'flex-start',
  },
  raitingContainer: {
    width: '20%',
    alignItems: 'center',
  },
  buttonContainer: {
    width: '92%',
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 20,
  },
  rating: {
    height: 50,
    width: 50,
    paddingTop: 16,
    textAlign: 'center',
    borderWidth: 1,
    borderRadius: 25,
    borderColor: '#0366d6',
    fontSize: 15,
    fontWeight: theme.fontWeights.bold,
    fontFamily: theme.fonts.main,
    color: '#0366d6'
  },
  repositoryId: {
    width: '100%',
    fontSize: 20,
    paddingBottom: 5,
    fontWeight: theme.fontWeights.bold,
    fontFamily: theme.fonts.main,
  },
  createdAt: {
    width: '100%',
    fontSize: 15,
    paddingBottom: 10,
    fontWeight: theme.fontWeights.normal,
    fontFamily: theme.fonts.main,
    color: 'gray'
  },
  reviewText: {
    paddingRight: 11,
    fontSize: 15,
    textAlign: 'justify',
    paddingBottom: 10,
    fontWeight: theme.fontWeights.normal,
    fontFamily: theme.fonts.main,
  },
  viewRepositoryButton: {
    width: '50%',
    height: 35,
    marginTop: 10,
    marginBottom: 5,
    marginRight: 10,
    backgroundColor: '#0366d6',
    borderRadius: 5,
    justifyContent: 'center',
  },
  deleteRepositoryButton: {
    width: '50%',
    height: 35,
    marginTop: 10,
    marginBottom: 5,
    backgroundColor: 'red',
    borderRadius: 5,
    justifyContent: 'center',
  },
  OpenGitHubButtonText: {
    textAlign: 'center',
    fontSize: 13,
    fontWeight: theme.fontWeights.bold,
    fontFamily: theme.fonts.main,
    color: 'white'
  },
});
const ReviewItem = ({ item, handleViewRepository, handleDeleteView }) => {

  return (
    <View style={styles.review}>
      <View style={styles.raitingContainer}>
        <Text style={styles.rating}>
          {item.rating}
        </Text>
      </View>
      <View style={styles.header}>
        <Text style={styles.repositoryId} >{item.repositoryId}</Text>
        <Text style={styles.createdAt}>{format(new Date(item.createdAt), 'dd.MM.yyyy')}</Text>
        <Text style={styles.reviewText}>{item.text}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.viewRepositoryButton} onPress={() => handleViewRepository(item.repositoryId)}>
          <Text style={styles.OpenGitHubButtonText} >View repository</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteRepositoryButton} onPress={() => handleDeleteView(item.id)}>
          <Text style={styles.OpenGitHubButtonText} >Delete review</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
  const [reviews, setReviews] = useState([]);
  const history = useHistory();
  const [mutate] = useMutation(DELETE_REVIEW);
  const { loading, data, refetch } = useQuery(AUTHORISED_USER, {
    fetchPolicy: 'cache-and-network',
    variables: {
      includeReviews: true
    }
  });

  useEffect(() => {
    if (data !== undefined) {
      if (data.authorizedUser !== null) {
        setReviews(data.authorizedUser.reviews.edges.map(edge => edge.node));
      }
    }
  }, [data]);

  if (loading) {
    return null;
  }

  const handleViewRepository = (repository) => {
    history.push(`/repository/${repository}`);
  };

  const deleteReview = async (id) => {
    try {
      await mutate({ variables: { id } });
      refetch();
      console.log(`Review ${id} deleted`);
    } catch (e) {
      console.log(e);
    }
  };

  const handleDeleteView = (id) => {

    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        {
          text: 'CANCEL',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        {
          text: 'DELETE', onPress: () => {
            deleteReview(id);
          }
        }
      ],
      { cancelable: false }
    );
  };

  return (
    <View>
      <FlatList
        data={reviews}
        ItemSeparatorComponent={ItemSeparator}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ReviewItem item={item} handleViewRepository={handleViewRepository} handleDeleteView={handleDeleteView} />}
      />
    </View>
  );
};

export default MyReviews;