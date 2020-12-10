import React, { useState } from 'react';
import { FlatList, View, StyleSheet, TouchableOpacity } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useHistory } from "react-router-native";
import RNPickerSelect from 'react-native-picker-select';
import { Chevron } from 'react-native-shapes';
import { Searchbar } from 'react-native-paper';
import { useDebouncedCallback } from 'use-debounce';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'silver',
    color: 'black',
    backgroundColor: 'white',
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
  },
  iconContainer: {
    top: 17,
    right: 15,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories, onPress, onOrderSelected, onSearcKeyword }) => {
  const [selected, setSelected] = useState('latest');
  const [search, setSearch] = React.useState('');
  const repositoryItems = repositories
    ? repositories.edges.map(node => node.node)
    : [];
  const debounced = useDebouncedCallback(
    (value) => {
      onSearcKeyword(value);
    },
    500
  );

  const OrderingMenu = () => {
    return (
      <RNPickerSelect style={pickerSelectStyles}
        onValueChange={(value) => { setSelected(value); onOrderSelected(value); }}
        value={selected}
        placeholder={{ label: 'select sorting option', value: null, color: 'blue', }}
        items={[
          { label: 'Latest repositories', value: 'latest' },
          { label: 'Highest rated repositories', value: 'highest' },
          { label: 'Lowest rated repositories', value: 'lowest' },
        ]}
        Icon={() => {
          return <Chevron size={1.5} color="gray" />;
        }}
      />
    );
  };

  return (
    <FlatList
      data={repositoryItems}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={
        (
          <View>
            <Searchbar
              placeholder="Search"
              onChangeText={(value) => { setSearch(value); debounced.callback(value); }}
              value={search}
            />
            <OrderingMenu />
          </View>
        )
      }

      renderItem={({ item }) => {
        return (
          <TouchableOpacity onPress={() => onPress(item)}>
            <RepositoryItem item={item} />
          </TouchableOpacity>
        );
      }}
    />
  );
};

const RepositoryList = () => {
  const [orderDirection, setOrderDirection] = useState(1);
  const [orderBy, setOrderBy] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState('');
  const { repositories } = useRepositories(orderDirection, orderBy, searchKeyword);
  const history = useHistory();

  const onPress = (item) => {
    history.push(`/repository/${item.id}`);
  };

  const onSearcKeyword = (searchKeyword) => {
    setSearchKeyword(searchKeyword);
  };

  const onOrderSelected = (value) => {
    switch (value) {
      case 'latest': setOrderDirection(1); setOrderBy(0); break;
      case 'highest': setOrderDirection(1); setOrderBy(1); break;
      case 'lowest': setOrderDirection(0); setOrderBy(1); break;
    }
  };

  return (
    <RepositoryListContainer repositories={repositories} onPress={onPress} onOrderSelected={onOrderSelected} onSearcKeyword={onSearcKeyword} />
  );
};

export default RepositoryList;