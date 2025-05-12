import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import TabLayout from "./app/(tabs)/_layout";
import SplashScreen from "./app/SplashScreen";
import { useEffect, useState } from "react";

export default function App() {
  const [isSplashVisible, setSplashVisible] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setSplashVisible(false);
    }, 3000); // 3 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <NavigationContainer style={styles.container}>
      {isSplashVisible ? <SplashScreen /> : <TabLayout />}
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
