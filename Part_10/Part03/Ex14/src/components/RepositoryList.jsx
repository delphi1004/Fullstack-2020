import React, { useEffect, useState } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import { GET_REPOSITORIES } from '../graphql/queries';
import { useQuery } from '@apollo/client';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const convertToRespositories = (node) => {
  return {
    id: node.id,
    ownerAvatarUrl: node.ownerAvatarUrl,
    fullName: node.fullName,
    description: node.description,
    languageButton: node.languageButton,
    language: node.language,
    stargazersCount: node.stargazersCount,
    forksCount: node.forksCount,
    reviewCount: node.reviewCount,
    ratingAverage: node.ratingAverage
  };
};

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const [repositories, setRepositories] = useState();
  const result = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
    variables: { orderDirection: 'ASC', first: 10 },
  });

  useEffect(() => {
    if (result.data !== undefined) {
      setRepositories(result.data.repositories.edges.map(node => convertToRespositories(node.node)));
    }
  }, [result.data]);

  return (
    <FlatList
      data={repositories}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={(item) => item.id}
      renderItem={RepositoryItem}
    />
  );
};

export default RepositoryList;