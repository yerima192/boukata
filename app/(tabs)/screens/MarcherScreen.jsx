//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// create a component
const MarcherScreen = () => {
    return (
        <View style={styles.container}>
            <Text>MarcherScreen</Text>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E7BA06',
    },
});

//make this component available to the app
export default MarcherScreen;
