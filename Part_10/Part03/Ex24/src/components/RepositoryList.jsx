import React, { useState } from 'react';
import { FlatList, View, StyleSheet, TouchableOpacity } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useHistory } from "react-router-native";
import RNPickerSelect from 'react-native-picker-select';
import { Chevron } from 'react-native-shapes';
import { Searchbar } from 'react-native-paper';

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
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  iconContainer: {
    top: 17,
    right: 15,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export class RepositoryListContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: 'latest',
      search: ''
    };
  }

  OrderingMenu = () => {
    return (
      <View>
        <Searchbar
          placeholder="Search"
          onChangeText={(value) => { this.setState({ search: value }); }}
          value={this.state.search}
        />
        {/* <RNPickerSelect style={pickerSelectStyles}
          onValueChange={(value) => { this.setState({ selected: value }); this.props.onOrderSelected(value); }}
          value={this.state.selected}
          placeholder={{ label: 'select sorting option', value: null, color: 'blue', }}
          items={[
            { label: 'Latest repositories', value: 'latest' },
            { label: 'Highest rated repositories', value: 'highest' },
            { label: 'Lowest rated repositories', value: 'lowest' },
          ]}
          Icon={() => {
            return <Chevron size={1.5} color="gray" />;
          }}
        /> */}
      </View>
    );
  }

  render() {
    const repositoryItems = this.props.repositories
      ? this.props.repositories.edges.map(node => node.node)
      : [];
    return (
      <FlatList
        data={repositoryItems}
        ItemSeparatorComponent={ItemSeparator}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={() => <this.OrderingMenu />}
        // renderItem={({ item }) => {
        //   return (
        //     <TouchableOpacity onPress={() => this.props.onPress(item)}>
        //       <RepositoryItem item={item} />
        //     </TouchableOpacity>
        //   );
        // }}
      />
    );
  }












}


// export const RepositoryListContainer = ({ repositories, onPress, onOrderSelected }) => {
//   const [selected, setSelected] = useState('latest');
//   const [search, setSearch] = React.useState('');
//   const repositoryItems = repositories
//     ? repositories.edges.map(node => node.node)
//     : [];

//   const OrderingMenu = () => {
//     return (
//       <View>
//         <Searchbar
//           placeholder="Search"
//           onChangeText={(value) => { setSearch(value);}}
//           value={search}
//         />
//         <RNPickerSelect style={pickerSelectStyles}
//           onValueChange={(value) => { setSelected(value); onOrderSelected(value); }}
//           value={selected}
//           placeholder={{ label: 'select sorting option', value: null, color: 'blue', }}
//           items={[
//             { label: 'Latest repositories', value: 'latest' },
//             { label: 'Highest rated repositories', value: 'highest' },
//             { label: 'Lowest rated repositories', value: 'lowest' },
//           ]}
//           Icon={() => {
//             return <Chevron size={1.5} color="gray" />;
//           }}
//         />
//       </View>
//     );
//   };

//   return (
//     <FlatList
//       data={repositoryItems}
//       ItemSeparatorComponent={ItemSeparator}
//       keyExtractor={(item) => item.id}
//       ListHeaderComponent={() => <OrderingMenu />}
//       renderItem={({ item }) => {
//         return (
//           <TouchableOpacity onPress={() => onPress(item)}>
//             <RepositoryItem item={item} />
//           </TouchableOpacity>
//         );
//       }}
//     />
//   );
// };

const RepositoryList = () => {
  const [orderDirection, setOrderDirection] = useState(1);
  const [orderBy, setOrderBy] = useState(0);
  const { repositories } = useRepositories(orderDirection, orderBy);
  const history = useHistory();

  const onPress = (item) => {
    history.push(`/repository/${item.id}`);
  };

  const onOrderSelected = (value) => {
    switch (value) {
      case 'latest': setOrderDirection(1); setOrderBy(0); break;
      case 'highest': setOrderDirection(1); setOrderBy(1); break;
      case 'lowest': setOrderDirection(0); setOrderBy(1); break;
    }
  };

  return (
    <RepositoryListContainer repositories={repositories} onPress={onPress} onOrderSelected={onOrderSelected} />
  );
};

export default RepositoryList;