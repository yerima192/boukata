import React from "react";
import { View, StyleSheet, ScrollView, Dimensions, StatusBar, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const { width } = Dimensions.get("window");

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAFAFA" />
      <Header />
      <ScrollView 
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          {/* Section principale */}
          <View style={styles.mainContent}>
            {/* Contenu principal ici */}
            <View style={styles.section}>
              {/* Exemple: vous pouvez ajouter vos composants ici */}
            </View>
            
            {/* Autre section */}
            <View style={styles.section}>
              {/* Autre contenu ici */}
            </View>
          </View>
        </View>
        <Footer />
      <SafeAreaView edges={['bottom']}>
      </SafeAreaView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: width * 0.04, // Responsive horizontal padding
  },
  mainContent: {
    flex: 1,
    paddingVertical: 15,
  },
  section: {
    marginBottom: 20,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: Platform.OS === 'android' ? 5 : 0,
    padding: 15,
  },
});

export default HomeScreen;