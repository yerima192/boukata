import React, { Component, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from "react-native";
import Footer from "../../components/Footer";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome";
import { Header } from "./HomeScreen";

const COLORS = {
  background: "#FAFAFA",
  primary: "#E7BA06", // Couleur jaune/doré
  secondary: "#010080", // Couleur bleu foncé
  white: "#FFFFFF",
  gray: "#8A8A8A",
  lightGray: "#F5F5F5",
  text: "#333333",
};

const MarcherScreen = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [cartItems, setCartItems] = useState(3);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchActive, setSearchActive] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const deliveryOptions = [
    {
      id: 1,
      icon: "bicycle",
      title: "À livrer :",
      description: "Un livreur professionnel de Boukata-ta vous livre",
      color: COLORS.primary,
    },
    {
      id: 2,
      icon: "cutlery",
      title: "Sur place :",
      description: "Mangez sur place si c'est un\nrestaurant",
      color: COLORS.secondary,
    },
    {
      id: 3,
      icon: "car",
      title: "À emporter (DRIVE) :",
      description: "Récupérez votre commande vous\nmême chez le vendeur",
      color: COLORS.primary,
    },
  ];

  return (
    <View style={styles.safeArea}>
      <Header
        onMenuPress={() => setSidebarOpen(true)}
        cartItemCount={cartItems}
        onSearchPress={() => setSearchActive(true)}
      />

      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header avec actualisation */}
        <View style={styles.header}>
          <Text style={styles.updateText}>
            Cet écran se met à jour chaque minute
          </Text>
          <TouchableOpacity style={styles.refreshButton} onPress={onRefresh}>
            <Icon name="refresh" size={16} color={COLORS.secondary} />
            <Text style={styles.refreshText}>Actualiser manuellement</Text>
          </TouchableOpacity>
        </View>

        {/* Contenu principal */}
        <View style={styles.mainContent}>
          {/* Message de connexion */}
          <View style={styles.connectionCard}>
            <Text style={styles.connectionTitle}>
              Vous n'êtes pas connecté à votre compte
            </Text>
            <Text style={styles.connectionSubtitle}>
              Rendez-vous sur l'onglet Mon compte en bas à droite.
            </Text>

            {/* Icône panier */}
            <View style={styles.cartIconContainer}>
              <Icon name="shopping-basket" size={40} color={COLORS.gray} />
            </View>

            {/* Instructions */}
            <Text style={styles.instructionText}>
              Commandez chez un vendeur et choisissez une des options :
            </Text>

            {/* Options de livraison */}
            <View style={styles.deliveryOptions}>
              {deliveryOptions.map((option) => (
                <TouchableOpacity key={option.id} style={styles.deliveryOption}>
                  <View
                    style={[
                      styles.optionIcon,
                      { backgroundColor: option.color },
                    ]}
                  >
                    <Icon name={option.icon} size={20} color={COLORS.white} />
                  </View>
                  <View style={styles.optionContent}>
                    <Text style={[styles.optionTitle, { color: option.color }]}>
                      {option.title}
                    </Text>
                    <Text style={styles.optionDescription}>
                      {option.description}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
        <Footer />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingBottom: 75,
    paddingTop: Platform.OS === "android" ? 32 : 0,

  },
  container: {
    flex: 1,
  },
  header: {
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  updateText: {
    fontSize: 14,
    color: COLORS.gray,
    marginBottom: 10,
  },
  refreshButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  refreshText: {
    fontSize: 14,
    color: COLORS.secondary,
    marginLeft: 8,
    fontWeight: "500",
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  connectionCard: {
    backgroundColor: COLORS.white,
    borderRadius: 15,
    padding: 30,
    marginBottom: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    borderWidth: 2,
    borderColor: COLORS.secondary,
  },
  connectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.secondary,
    textAlign: "center",
    marginBottom: 10,
  },
  connectionSubtitle: {
    fontSize: 14,
    color: COLORS.gray,
    textAlign: "center",
    marginBottom: 30,
  },
  cartIconContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  instructionText: {
    fontSize: 16,
    color: COLORS.text,
    textAlign: "center",
    marginBottom: 30,
    fontWeight: "500",
  },
  deliveryOptions: {
    gap: 20,
  },
  deliveryOption: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: COLORS.lightGray,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  optionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  optionDescription: {
    fontSize: 14,
    color: COLORS.text,
    lineHeight: 20,
  },
});

export default MarcherScreen;
