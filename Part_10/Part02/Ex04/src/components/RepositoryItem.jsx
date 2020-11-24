import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  item: {
    flexGrow: 1,
    flexShrink: 1,
    marginTop:10,
  },
});

const RepositoryItem = ({ item }) => {
  
  return (
    <View style={styles.item}>
      <Text>Full name : {item.fullName} </Text>
      <Text>Description : {item.description} </Text>
      <Text>Language : {item.language} </Text>
      <Text>Starts : {item.stargazersCount} </Text>
      <Text>Folks : {item.forksCount} </Text>
      <Text>Reviews : {item.reviewCount} </Text>
      <Text>Rating : {item.ratingAverage} </Text>
    </View>
  );
};

export default RepositoryItem;