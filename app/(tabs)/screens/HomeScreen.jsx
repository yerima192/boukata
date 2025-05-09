import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native'; 
import { SafeAreaView } from 'react-native-safe-area-context'; 
const HomeScreen = () => {
    return (
        <SafeAreaView style={styles.safeArea}>

            <ScrollView contentContainerStyle={styles.scrollViewContent}>

            </ScrollView>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FAFAFA',
    },

});
export default HomeScreen;