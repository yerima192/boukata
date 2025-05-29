import React, { Component, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "./HomeScreen";
import Footer from "../../components/Footer";
import Icon from "react-native-vector-icons/FontAwesome";

const COLORS = {
  background: "#FAFAFA",
  primary: "#E7BA06", // Couleur jaune/doré
  secondary: "#010080", // Couleur bleu foncé
  white: "#FFFFFF",
  gray: "#8A8A8A",
  lightGray: "#F5F5F5",
  text: "#333333",
  purple: "#8E44AD", // Pour les titres violets
};

const CompteScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [cartItems, setCartItems] = useState(3);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchActive, setSearchActive] = useState(false);

  // États pour les formulaires
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleCreateAccount = () => {
    Alert.alert(
      "Création de compte",
      "Créez votre première commande en quelques minutes 🍕🛒\n\nVotre compte sera créé en même temps.",
      [{ text: "Compris", style: "default" }]
    );
  };

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs");
      return;
    }
    Alert.alert("Connexion", "Tentative de connexion...");
  };

  const handleForgotPassword = () => {
    Alert.alert(
      "Mot de passe oublié",
      "Un lien de réinitialisation sera envoyé à votre adresse email."
    );
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <View style={styles.safeArea}>
      <Header
        onMenuPress={() => setSidebarOpen(true)}
        cartItemCount={cartItems}
        onSearchPress={() => setSearchActive(true)}
      />

      {/* <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.sectionContainer}>
          <View style={[styles.card, styles.noAccountCard]}>
            <Text style={styles.cardTitle}>Vous n'avez pas de compte ?</Text>

            <TouchableOpacity
              style={styles.createAccountButton}
              onPress={handleCreateAccount}
            >
              <Text style={styles.createAccountText}>
                Créez votre première commande en quelques minutes
              </Text>
              <View style={styles.iconContainer}>
                <Text style={styles.emoji}>🍕</Text>
                <Text style={styles.emoji}>🛒</Text>
              </View>
            </TouchableOpacity>

            <Text style={styles.subtitleText}>
              Votre compte sera créé en même temps.
            </Text>
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <View style={[styles.card, styles.loginCard]}>
            <Text style={styles.cardTitle}>Vous avez un compte ?</Text>

            <View style={styles.inputContainer}>
              <View style={styles.labelContainer}>
                <Text style={styles.inputLabel}>Adresse mail @</Text>
              </View>
              <TextInput
                style={styles.textInput}
                value={email}
                onChangeText={setEmail}
                placeholder="Entrez votre email"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.labelContainer}>
                <Text style={styles.inputLabel}>Mot de passe</Text>
              </View>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={[styles.textInput, styles.passwordInput]}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Entrez votre mot de passe"
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <TouchableOpacity
                  style={styles.eyeButton}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Icon
                    name={showPassword ? "eye" : "eye-slash"}
                    size={20}
                    color={COLORS.gray}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.forgotPasswordContainer}>
              <Text style={styles.forgotPasswordText}>
                Mot de passe oublié ?
              </Text>
              <TouchableOpacity onPress={handleForgotPassword}>
                <Text style={styles.forgotPasswordLink}>
                  Réinitialiser mon mot de passe
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>ME CONNECTER</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView> */}
        <Footer />
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
    paddingTop: 20,
  },
  sectionContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 15,
    padding: 25,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  noAccountCard: {
    borderWidth: 2,
    borderColor: COLORS.primary,
    alignItems: "center",
  },
  loginCard: {
    borderWidth: 2,
    borderColor: COLORS.purple,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.secondary,
    textAlign: "center",
    marginBottom: 10,
  },
  createAccountButton: {
    alignItems: "center",
    marginBottom: 15,
  },
  createAccountText: {
    fontSize: 16,
    color: COLORS.text,
    textAlign: "center",
    marginBottom: 10,
  },
  iconContainer: {
    flexDirection: "row",
    gap: 10,
  },
  emoji: {
    fontSize: 24,
  },
  subtitleText: {
    fontSize: 14,
    color: COLORS.text,
    textAlign: "center",
    fontStyle: "italic",
  },
  inputContainer: {
    marginBottom: 20,
  },
  labelContainer: {
    backgroundColor: COLORS.purple,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    alignSelf: "flex-start",
  },
  inputLabel: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "600",
  },
  textInput: {
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 0,
  },
  passwordContainer: {
    position: "relative",
  },
  passwordInput: {
    paddingRight: 50,
  },
  eyeButton: {
    position: "absolute",
    right: 15,
    top: 12,
    padding: 5,
  },
  forgotPasswordContainer: {
    alignItems: "center",
    marginBottom: 25,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: COLORS.text,
    marginBottom: 5,
  },
  forgotPasswordLink: {
    fontSize: 14,
    color: COLORS.secondary,
    textDecorationLine: "underline",
  },
  loginButton: {
    backgroundColor: COLORS.purple,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  loginButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1,
  },
});

export default CompteScreen;
