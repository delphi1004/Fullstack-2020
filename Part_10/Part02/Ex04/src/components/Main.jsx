import React from 'react';
import Constants from 'expo-constants';
import {StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';

const styles = StyleSheet.create({
    container: {
        marginTop: Constants.statusBarHeight,
        flexGrow: 1,
        flexShrink: 1,
    },
    RepositoryList: {
        marginTop:10,
    }
});

const Main = () => {
    return (
        <View style={styles.container}>
            <AppBar />
            <View style={styles.RepositoryList}>
                <RepositoryList />
            </View>
        </View>
    );
};

export default Main;