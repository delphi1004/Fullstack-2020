import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-native';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORY, GET_REPOSITORY_REVIEW } from '../graphql/queries';
import RepositoryItem from './RepositoryItem';
import theme from './theme';
import { format } from 'date-fns';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  review: {
    display: 'flex',
    flexGrow: 1,
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
  username: {
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
});

const ReviewItem = ({ item }) => {

  return (
    <View style={styles.review}>
      <View style={styles.review}>
        <View style={styles.raitingContainer}>
          <Text style={styles.rating}>
            {item.rating}
          </Text>
        </View>

        <View style={styles.header}>
          <Text style={styles.username} >{item.user.username}</Text>
          <Text style={styles.createdAt}>{format(new Date(item.createdAt), 'dd.MM.yyyy')}</Text>
          <Text style={styles.reviewText}>{item.text}</Text>
        </View>
      </View>
    </View>
  );
};

const ItemSeparator = () => <View style={styles.separator} />;

const SingleRepository = () => {
  const { id } = useParams(id);
  const [reviews, setReviews] = useState(null);
  const [repository, setRepository] = useState(null);
  const repositoryResult = useQuery(GET_REPOSITORY, { variables: { id: id } });
  const repositoryReviewResult = useQuery(GET_REPOSITORY_REVIEW, { variables: { id: id } });

  useEffect(() => {
    if (repositoryResult.data !== undefined) {
      setRepository(repositoryResult.data.repository);
    }

    if (repositoryReviewResult.data !== undefined) {
      setReviews(repositoryReviewResult.data.repository.reviews.edges
        ? repositoryReviewResult.data.repository.reviews.edges.map(edge => edge.node)
        : null);
    }
  }, [repositoryResult.data, repositoryReviewResult.data]);

  return (
    <View>
      {reviews &&
        <FlatList
          data={reviews}
          ItemSeparatorComponent={ItemSeparator}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ReviewItem item={item} />}
          ListHeaderComponent={() => <RepositoryItem item={repository} showSingleRepository={true} />}
        />
      }
    </View>
  );
};

export default SingleRepository;