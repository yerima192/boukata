import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// create a component
const CompteScreen = () => {
    return (
        <View style={styles.container}>
            <Text>CompteScreen</Text>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FAFAFA',
    },
});

//make this component available to the app
export default CompteScreen;