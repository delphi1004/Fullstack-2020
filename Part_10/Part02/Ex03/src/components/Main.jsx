import React from 'react';
import Constants from 'expo-constants';
import { Text, StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';

const styles = StyleSheet.create({
    container: {
        marginTop: Constants.statusBarHeight,
        flexGrow: 1,
        flexShrink: 1,
    },
    RepositoryList: {
        marginTop:30,
    }
});

const Main = () => {
    return (
        <View style={styles.container}>
            <Text >Rate Repository Application</Text>
            <View style={styles.RepositoryList}>
                <RepositoryList />
            </View>
        </View>

        // <View>
        //     
        // </View>
    );
};

export default Main;