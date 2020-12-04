/* eslint-disable no-undef */
import React , {useEffect , useState} from 'react';
import { View, FlatList ,Text , StyleSheet} from 'react-native';
import { useQuery } from '@apollo/client';
import { format } from 'date-fns';
import theme from './theme';
import { AUTHORISED_USER } from '../graphql/queries';

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
          <Text style={styles.repositoryId} >{item.repositoryId}</Text>
          <Text style={styles.createdAt}>{format(new Date(item.createdAt), 'dd.MM.yyyy')}</Text>
          <Text style={styles.reviewText}>{item.text}</Text>
        </View>
      </View>
    </View>
  );
};

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
  const [reviews, setReviews] = useState([]);

  const result = useQuery(AUTHORISED_USER ,{
    fetchPolicy: 'cache-and-network' ,
    variables:{
      includeReviews:true
    }});

  useEffect(() => {
    if (result.data !== undefined) {
      if (result.data.authorizedUser !== null) {
        setReviews(result.data.authorizedUser.reviews.edges.map(edge => edge.node));
      } 
    }
  }, [result.data]);
  
  return (
    <View>
      <FlatList
        data={reviews}
        ItemSeparatorComponent={ItemSeparator}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ReviewItem item={item} />}
      />
    </View>
  );
};

export default MyReviews;