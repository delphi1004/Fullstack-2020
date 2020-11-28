import React from 'react';
import { FlatList, View, StyleSheet, TouchableOpacity } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useHistory } from "react-router-native";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories , onPress}) => {
  const repositoryItems = repositories
    ? repositories.edges.map(node => node.node)
    : [];

  return (
    <FlatList
      data={repositoryItems}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity onPress = {() => onPress(item)}>
            <RepositoryItem item={item} />
          </TouchableOpacity>
        );
      }}
    />
  );
};


const RepositoryList = () => {
  const { repositories } = useRepositories();
  const history = useHistory();

  const onPress = (item) =>{
    history.push(`/repository/${item.id}`);
  };

  return (
    <RepositoryListContainer repositories={repositories} onPress = {onPress}/>
  );
};

export default RepositoryList;