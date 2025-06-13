import React, { useState } from "react";
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
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "./HomeScreen";
import Footer from "../../components/Footer";
import Icon from "react-native-vector-icons/FontAwesome";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";

const COLORS = {
  background: "#FAFAFA",
  primary: "#E7BA06",
  secondary: "#010080",
  white: "#FFFFFF",
  gray: "#8A8A8A",
  lightGray: "#F5F5F5",
  text: "#333333",
  purple: "#8E44AD",
  success: "#4CAF50",
  error: "#F44336",
};

const SHADOWS = {
  small: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  medium: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 4,
  },
};

const CompteScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);

  // États pour les formulaires
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { user, isAuthenticated, login, register, logout, updateProfile } = useAuth();
  const { getCartItemsCount, clearCart } = useCart();

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const handleLogin = async () => {
    if (!loginData.email || !loginData.password) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs");
      return;
    }

    const result = await login(loginData.email, loginData.password);
    if (result.success) {
      Alert.alert("Succès", "Connexion réussie !");
      setShowLoginForm(false);
      setLoginData({ email: "", password: "" });
    } else {
      Alert.alert("Erreur", result.error || "Erreur de connexion");
    }
  };

  const handleRegister = async () => {
    if (!registerData.name || !registerData.email || !registerData.password) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs obligatoires");
      return;
    }

    if (registerData.password !== registerData.confirmPassword) {
      Alert.alert("Erreur", "Les mots de passe ne correspondent pas");
      return;
    }

    const result = await register(registerData);
    if (result.success) {
      Alert.alert("Succès", "Compte créé avec succès !");
      setShowRegisterForm(false);
      setRegisterData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
      });
    } else {
      Alert.alert("Erreur", result.error || "Erreur lors de la création du compte");
    }
  };

  const handleLogout = () => {
    Alert.alert(
      "Déconnexion",
      "Voulez-vous vraiment vous déconnecter ?",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Déconnecter",
          onPress: () => {
            logout();
            clearCart();
            Alert.alert("Succès", "Vous avez été déconnecté");
          },
        },
      ]
    );
  };

  const menuItems = [
    {
      id: "orders",
      title: "Mes commandes",
      icon: "shopping-bag",
      iconFamily: "MaterialIcons",
      onPress: () => Alert.alert("Mes commandes", "Fonctionnalité en cours de développement"),
    },
    {
      id: "addresses",
      title: "Mes adresses",
      icon: "location-on",
      iconFamily: "MaterialIcons",
      onPress: () => Alert.alert("Mes adresses", "Fonctionnalité en cours de développement"),
    },
    {
      id: "payment",
      title: "Moyens de paiement",
      icon: "payment",
      iconFamily: "MaterialIcons",
      onPress: () => Alert.alert("Paiement", "Fonctionnalité en cours de développement"),
    },
    {
      id: "favorites",
      title: "Mes favoris",
      icon: "favorite",
      iconFamily: "MaterialIcons",
      onPress: () => Alert.alert("Favoris", "Fonctionnalité en cours de développement"),
    },
    {
      id: "notifications",
      title: "Notifications",
      icon: "notifications",
      iconFamily: "MaterialIcons",
      onPress: () => Alert.alert("Notifications", "Fonctionnalité en cours de développement"),
    },
    {
      id: "help",
      title: "Aide & Support",
      icon: "help",
      iconFamily: "MaterialIcons",
      onPress: () => Alert.alert("Aide", "Contactez-nous à support@boukata-ta.com"),
    },
  ];

  const renderIcon = (iconName, iconFamily) => {
    switch (iconFamily) {
      case "MaterialIcons":
        return <MaterialIcons name={iconName} size={24} color={COLORS.secondary} />;
      case "AntDesign":
        return <AntDesign name={iconName} size={24} color={COLORS.secondary} />;
      default:
        return <Icon name={iconName} size={24} color={COLORS.secondary} />;
    }
  };

  const LoginForm = () => (
    <View style={[styles.card, styles.loginCard]}>
      <View style={styles.formHeader}>
        <Text style={styles.cardTitle}>Connexion</Text>
        <TouchableOpacity onPress={() => setShowLoginForm(false)}>
          <MaterialIcons name="close" size={24} color={COLORS.gray} />
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.labelContainer}>
          <Text style={styles.inputLabel}>Adresse mail @</Text>
        </View>
        <TextInput
          style={styles.textInput}
          value={loginData.email}
          onChangeText={(text) => setLoginData({ ...loginData, email: text })}
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
            value={loginData.password}
            onChangeText={(text) => setLoginData({ ...loginData, password: text })}
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

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>SE CONNECTER</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.switchFormButton}
        onPress={() => {
          setShowLoginForm(false);
          setShowRegisterForm(true);
        }}
      >
        <Text style={styles.switchFormText}>
          Pas de compte ? Créer un compte
        </Text>
      </TouchableOpacity>
    </View>
  );

  const RegisterForm = () => (
    <View style={[styles.card, styles.loginCard]}>
      <View style={styles.formHeader}>
        <Text style={styles.cardTitle}>Créer un compte</Text>
        <TouchableOpacity onPress={() => setShowRegisterForm(false)}>
          <MaterialIcons name="close" size={24} color={COLORS.gray} />
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.labelContainer}>
          <Text style={styles.inputLabel}>Nom complet *</Text>
        </View>
        <TextInput
          style={styles.textInput}
          value={registerData.name}
          onChangeText={(text) => setRegisterData({ ...registerData, name: text })}
          placeholder="Entrez votre nom complet"
          autoCapitalize="words"
        />
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.labelContainer}>
          <Text style={styles.inputLabel}>Adresse mail * @</Text>
        </View>
        <TextInput
          style={styles.textInput}
          value={registerData.email}
          onChangeText={(text) => setRegisterData({ ...registerData, email: text })}
          placeholder="Entrez votre email"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.labelContainer}>
          <Text style={styles.inputLabel}>Téléphone</Text>
        </View>
        <TextInput
          style={styles.textInput}
          value={registerData.phone}
          onChangeText={(text) => setRegisterData({ ...registerData, phone: text })}
          placeholder="+227 90 00 00 00"
          keyboardType="phone-pad"
        />
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.labelContainer}>
          <Text style={styles.inputLabel}>Mot de passe *</Text>
        </View>
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.textInput, styles.passwordInput]}
            value={registerData.password}
            onChangeText={(text) => setRegisterData({ ...registerData, password: text })}
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

      <View style={styles.inputContainer}>
        <View style={styles.labelContainer}>
          <Text style={styles.inputLabel}>Confirmer le mot de passe *</Text>
        </View>
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.textInput, styles.passwordInput]}
            value={registerData.confirmPassword}
            onChangeText={(text) => setRegisterData({ ...registerData, confirmPassword: text })}
            placeholder="Confirmez votre mot de passe"
            secureTextEntry={!showConfirmPassword}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TouchableOpacity
            style={styles.eyeButton}
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            <Icon
              name={showConfirmPassword ? "eye" : "eye-slash"}
              size={20}
              color={COLORS.gray}
            />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleRegister}>
        <Text style={styles.loginButtonText}>CRÉER MON COMPTE</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.switchFormButton}
        onPress={() => {
          setShowRegisterForm(false);
          setShowLoginForm(true);
        }}
      >
        <Text style={styles.switchFormText}>
          Déjà un compte ? Se connecter
        </Text>
      </TouchableOpacity>
    </View>
  );

  const UserProfile = () => (
    <View style={styles.profileSection}>
      <LinearGradient
        colors={[COLORS.secondary, "#000066"]}
        style={styles.profileHeader}
      >
        <View style={styles.profileInfo}>
          <View style={styles.avatarContainer}>
            <MaterialIcons name="person" size={40} color={COLORS.white} />
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user?.name}</Text>
            <Text style={styles.userEmail}>{user?.email}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => setShowEditProfile(true)}
        >
          <MaterialIcons name="edit" size={20} color={COLORS.white} />
        </TouchableOpacity>
      </LinearGradient>

      <View style={styles.menuContainer}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.menuItem}
            onPress={item.onPress}
          >
            <View style={styles.menuItemLeft}>
              {renderIcon(item.icon, item.iconFamily)}
              <Text style={styles.menuItemText}>{item.title}</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color={COLORS.gray} />
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <MaterialIcons name="logout" size={24} color={COLORS.error} />
          <Text style={styles.logoutText}>Déconnexion</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const GuestView = () => (
    <>
      <View style={styles.sectionContainer}>
        <View style={[styles.card, styles.noAccountCard]}>
          <Text style={styles.cardTitle}>Vous n'avez pas de compte ?</Text>

          <TouchableOpacity
            style={styles.createAccountButton}
            onPress={() => setShowRegisterForm(true)}
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
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => setShowLoginForm(true)}
          >
            <Text style={styles.loginButtonText}>SE CONNECTER</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );

  return (
    <View style={styles.safeArea}>
      <Header
        onMenuPress={() => setSidebarOpen(true)}
        cartItemCount={getCartItemsCount()}
        onSearchPress={() => setSearchActive(true)}
      />

      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {showLoginForm && <LoginForm />}
        {showRegisterForm && <RegisterForm />}
        
        {!showLoginForm && !showRegisterForm && (
          <>
            {isAuthenticated ? <UserProfile /> : <GuestView />}
          </>
        )}
        
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
    ...SHADOWS.medium,
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
  formHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.secondary,
    textAlign: "center",
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
  loginButton: {
    backgroundColor: COLORS.purple,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
    ...SHADOWS.small,
  },
  loginButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  switchFormButton: {
    alignItems: "center",
  },
  switchFormText: {
    color: COLORS.secondary,
    fontSize: 14,
    textDecorationLine: "underline",
  },
  profileSection: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  profileHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  userEmail: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 14,
  },
  editButton: {
    padding: 10,
  },
  menuContainer: {
    backgroundColor: COLORS.white,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    ...SHADOWS.medium,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuItemText: {
    marginLeft: 15,
    fontSize: 16,
    color: COLORS.text,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  logoutText: {
    marginLeft: 15,
    fontSize: 16,
    color: COLORS.error,
    fontWeight: "500",
  },
});

export default CompteScreen;