//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import Footer from "../../components/Footer";
import { SafeAreaView } from "react-native-safe-area-context";
const COLORS = { 
    background: "#FAFAFA",
}

// create a component
const MarcherScreen = () => {
  const Wrapper = Platform.OS === "android" ? SafeAreaView : View;
  return (
    <Wrapper style={styles.safeArea}>
      <View style={styles.container}>
        <Text>MarcherScreen</Text>
        <Footer />
      </View>
    </Wrapper>
  );
};

// define your styles
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
  },
});

//make this component available to the app
export default MarcherScreen;
