import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const COLORS = {
  primary: "#010080",
  secondary: "#E7BA06",
  white: "#FFFFFF",
  background: "#FAFAFA",
  success: "#4CAF50",
  text: "#333333",
};

const OrderSuccessScreen = ({ navigation }) => {
  const scaleAnim = new Animated.Value(0);
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Icône de succès animée */}
        <Animated.View
          style={[
            styles.successIconContainer,
            {
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <LinearGradient
            colors={[COLORS.success, "#45a049"]}
            style={styles.successIcon}
          >
            <MaterialIcons name="check" size={60} color={COLORS.white} />
          </LinearGradient>
        </Animated.View>

        {/* Contenu animé */}
        <Animated.View style={[styles.textContent, { opacity: fadeAnim }]}>
          <Text style={styles.successTitle}>Commande confirmée !</Text>
          <Text style={styles.successSubtitle}>
            Votre commande a été passée avec succès
          </Text>

          <View style={styles.orderInfo}>
            <Text style={styles.orderNumber}>Commande #BT-{Date.now().toString().slice(-6)}</Text>
            <Text style={styles.orderDetails}>
              Vous recevrez un SMS de confirmation avec les détails de livraison
            </Text>
          </View>

          <View style={styles.nextSteps}>
            <Text style={styles.nextStepsTitle}>Prochaines étapes :</Text>
            <View style={styles.step}>
              <MaterialIcons name="restaurant" size={20} color={COLORS.primary} />
              <Text style={styles.stepText}>Préparation de votre commande</Text>
            </View>
            <View style={styles.step}>
              <MaterialIcons name="local-shipping" size={20} color={COLORS.primary} />
              <Text style={styles.stepText}>Livraison en cours</Text>
            </View>
            <View style={styles.step}>
              <MaterialIcons name="home" size={20} color={COLORS.primary} />
              <Text style={styles.stepText}>Livraison à votre adresse</Text>
            </View>
          </View>
        </Animated.View>
      </View>

      {/* Boutons d'action */}
      <Animated.View style={[styles.actions, { opacity: fadeAnim }]}>
        <TouchableOpacity
          style={styles.trackButton}
          onPress={() => navigation.navigate("OrderTracking")}
        >
          <Text style={styles.trackButtonText}>Suivre ma commande</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.homeButtonText}>Retour à l'accueil</Text>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  successIconContainer: {
    marginBottom: 40,
  },
  successIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: COLORS.success,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  textContent: {
    alignItems: "center",
    width: "100%",
  },
  successTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: 10,
    textAlign: "center",
  },
  successSubtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
    textAlign: "center",
    lineHeight: 24,
  },
  orderInfo: {
    backgroundColor: COLORS.white,
    borderRadius: 15,
    padding: 20,
    width: "100%",
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  orderNumber: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 10,
    textAlign: "center",
  },
  orderDetails: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    lineHeight: 20,
  },
  nextSteps: {
    width: "100%",
  },
  nextStepsTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 15,
  },
  step: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  stepText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 12,
  },
  actions: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  trackButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: "center",
    marginBottom: 15,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  trackButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  homeButton: {
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: "center",
  },
  homeButtonText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: "600",
  },
});

export default OrderSuccessScreen;