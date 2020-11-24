/* eslint-disable no-undef */
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  item: {
    display: 'flex',
    flexGrow: 1,
    flexShrink: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 0,
    backgroundColor: '#ffffff'
  },
  tinyLogo: {
    width: 50,
    height: 50,
    marginTop: 10,
    marginLeft: 12,
    borderRadius: 5,
  },
  header: {
    width: '80%',
    alignItems: 'flex-start',
  },
  imageContainer: {
    width: '20%',
    height: '57%',
  },
  footer: {
    marginTop: 15,
    marginBottom: 10,
    marginRight: '10%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    alignContent: 'center',
  },
  footerNumbersContainer: {
    width: '100%',
    paddingLeft: '10%',
    paddingRight: '10%',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  footerNumbersText: {
    width: 50,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  footerTitleContainer: {
    width: '100%',
    marginTop: 5,
    paddingLeft: '10%',
    paddingRight: '10%',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  footerTitlesText: {
    width: 50,
    textAlign: 'center',
    fontSize: 13,
    fontWeight: '400',
    color: 'gray'
  },
  fullname: {
    width: '100%',
    marginTop: 10,
    fontSize: 20,
    fontWeight: '600',
  },
  description: {
    marginTop: 7,
    marginRight: 10,
    color: 'gray',
    fontSize: 14,
    fontWeight: '300',
  },
  languageButton: {
    backgroundColor: '#0366d6',
    justifyContent: 'center',
    alignContent: 'center',
    marginTop: 7,
    height: 30,
    borderRadius: 5,
  },
  languageText: {
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 14,
    fontWeight: '500',
    color: 'white'
  }

});

const convertNumber = (data) => {
  let result = '';

  if (data >= 1000) {
    data /= 1000;
    data = Math.round(data * 10) / 10;
    result = `${data}k`;
  } else {
    result = data;
  }


  return result;
};

const RepositoryItem = ({ item }) => {

  return (
    <View style={styles.item}>
      <View style={styles.imageContainer}>
        <Image style={styles.tinyLogo} source={{ uri: item.ownerAvatarUrl }} />
      </View>

      <View style={styles.header}>
        <Text style={styles.fullname} >{item.fullName}</Text>
        <Text style={styles.description} >{item.description}</Text>
        <TouchableOpacity style={styles.languageButton}>
          <Text style={styles.languageText}>{item.language}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <View style={styles.footerNumbersContainer}>
          <Text style={styles.footerNumbersText} >{convertNumber(item.stargazersCount)}</Text>
          <Text style={styles.footerNumbersText} >{convertNumber(item.forksCount)}</Text>
          <Text style={styles.footerNumbersText} >{convertNumber(item.reviewCount)}</Text>
          <Text style={styles.footerNumbersText} >{convertNumber(item.ratingAverage)}</Text>
        </View>
        <View style={styles.footerTitleContainer}>
          <Text style={styles.footerTitlesText} >Starts</Text>
          <Text style={styles.footerTitlesText} >Forks</Text>
          <Text style={styles.footerTitlesText} >Reviews</Text>
          <Text style={styles.footerTitlesText} >Ratings</Text>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItem;