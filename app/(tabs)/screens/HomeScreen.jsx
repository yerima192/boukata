import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Animated,
  StatusBar,
  FlatList,
  TextInput,
  ImageBackground,
  Platform,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  MaterialIcons,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
  Feather,
  AntDesign,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Footer from "../../components/Footer";
import Test from "../../TestScreen/TestAcces";
import Commitments from "../../components/Commitments";
import Products from "../../components/Products";

const { width, height } = Dimensions.get("window");

// App Theme Constants
const COLORS = {
  primary: "#F57C00", // Orange for Boukata-Ta
  primaryLight: "#FFB74D",
  primaryDark: "#E65100",
  secondary: "#1E3A8A",
  secondaryLight: "#3B579D",
  secondaryDark: "#0F2361",
  tertiary: "#FFCC80", // Light orange
  white: "#FFFFFF",
  black: "#000000",
  gray: "#F5F5F5",
  darkGray: "#757575",
  lightGray: "#E0E0E0",
  success: "#4CAF50", // Green for positive messages
  error: "#F44336",
  background: "#FAFAFA",
};

const FONTS = {
  regular: {
    fontFamily: "System",
    fontWeight: "400",
  },
  medium: {
    fontFamily: "System",
    fontWeight: "500",
  },
  semiBold: {
    fontFamily: "System",
    fontWeight: "600",
  },
  bold: {
    fontFamily: "System",
    fontWeight: "700",
  },
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
  large: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
};

// Top boutiques
const topStores = [
  {
    id: "b1",
    name: "Fashion Factory",
    image: "https://via.placeholder.com/100/F57C00/FFFFFF?text=FF",
    rating: 4.8,
  },
  {
    id: "b2",
    name: "Sidibe",
    image: "https://via.placeholder.com/100/1E3A8A/FFFFFF?text=S",
    rating: 4.5,
  },
  {
    id: "b3",
    name: "Targui Store",
    image: "https://via.placeholder.com/100/4CAF50/FFFFFF?text=TS",
    rating: 4.7,
  },
  {
    id: "b4",
    name: "Marhaba Dream",
    image: "https://via.placeholder.com/100/E91E63/FFFFFF?text=MD",
    rating: 4.6,
  },
  {
    id: "b5",
    name: "NATURAH HOUSE",
    image: "https://via.placeholder.com/100/9C27B0/FFFFFF?text=NH",
    rating: 4.9,
  },
  {
    id: "b6",
    name: "Top Wear",
    image: "https://via.placeholder.com/100/2196F3/FFFFFF?text=TW",
    rating: 4.4,
  },
];

// Promotional banners
const promotions = [
  {
    id: "promo1",
    title: "Créez votre boutique en ligne",
    description:
      "Faites le premier pas vers la création de votre propre boutique et découvrez des opportunités infinies",
    ctaText: "Démarrer maintenant",
    image: "https://www.boukata-ta.com/BackgroundEraser_20250219_110003227.png",
  },
  {
    id: "promo2",
    title: "Simplifiez votre quotidien",
    description: "Tous vos produits et services préférés en un seul endroit",
    ctaText: "Découvrir",
    image: "https://www.boukata-ta.com/1736734826859.png",
  },
  {
    id: "promo3",
    title: "Livraison express",
    description: "Recevez vos commandes en un temps record",
    ctaText: "Commander",
    image:
      "https://via.placeholder.com/800x400/4CAF50/FFFFFF?text=Livraison+express",
  },
];

// App components
export const Header = ({ onMenuPress, onSearchPress, cartItemCount = 0 }) => {
  return (
    <LinearGradient
      colors={[COLORS.secondary, COLORS.secondaryDark]}
      // colors={["#0F0F98", "#010080", "#00005A"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.header}
    >
      <View style={styles.headerTop}>
        <TouchableOpacity onPress={onMenuPress} style={styles.menuButton}>
          <MaterialIcons name="menu" size={28} color={COLORS.white} />
        </TouchableOpacity>

        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>Boukata-Ta</Text>
        </View>

        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.searchButton} onPress={onSearchPress}>
            <Ionicons name="search" size={22} color={COLORS.white} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.cartButton}>
            <MaterialIcons
              name="shopping-cart"
              size={22}
              color={COLORS.white}
            />
            {cartItemCount > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cartItemCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.searchBar} onPress={onSearchPress}>
        <Ionicons name="search" size={18} color={COLORS.darkGray} />
        <Text style={styles.searchPlaceholder}>
          Rechercher des produits, services...
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const Sidebar = ({ isOpen, onClose }) => {
  // Sidebar animation
  const slideAnimation = useRef(
    new Animated.Value(isOpen ? 0 : -width * 0.8)
  ).current;

  useEffect(() => {
    Animated.timing(slideAnimation, {
      toValue: isOpen ? 0 : -width * 0.8,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isOpen]);

  // Sidebar menu options
  const menuOptions = [
    { id: "1", title: "Accueil", icon: "home", iconType: "MaterialIcons" },
    {
      id: "2",
      title: "Supermarché",
      icon: "shopping-cart",
      iconType: "FontAwesome5",
      hasDropdown: true,
    },
    {
      id: "3",
      title: "Boutiques",
      icon: "shopping-bag",
      iconType: "FontAwesome5",
    },
    {
      id: "4",
      title: "Pharmacie",
      icon: "medical-bag",
      iconType: "MaterialCommunityIcons",
    },
    {
      id: "5",
      title: "Restaurant",
      icon: "restaurant",
      iconType: "MaterialIcons",
    },
    { id: "6", title: "Hôtel", icon: "hotel", iconType: "MaterialIcons" },
  ];

  const [expandedOption, setExpandedOption] = useState(null);

  // Dropdown toggle handler
  const toggleDropdown = (id) => {
    if (expandedOption === id) {
      setExpandedOption(null);
    } else {
      setExpandedOption(id);
    }
  };

  // Helper function to render the correct icon
  const renderIcon = (
    iconName,
    iconType,
    size = 22,
    color = COLORS.secondary
  ) => {
    switch (iconType) {
      case "MaterialIcons":
        return <MaterialIcons name={iconName} size={size} color={color} />;
      case "FontAwesome5":
        return <FontAwesome5 name={iconName} size={size} color={color} />;
      case "Ionicons":
        return <Ionicons name={iconName} size={size} color={color} />;
      case "MaterialCommunityIcons":
        return (
          <MaterialCommunityIcons name={iconName} size={size} color={color} />
        );
      case "Feather":
        return <Feather name={iconName} size={size} color={color} />;
      case "AntDesign":
        return <AntDesign name={iconName} size={size} color={color} />;
      default:
        return <MaterialIcons name={iconName} size={size} color={color} />;
    }
  };

  return (
    <>
      {isOpen && (
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={onClose}
        />
      )}

      <Animated.View
        style={[
          styles.sidebar,
          { transform: [{ translateX: slideAnimation }] },
        ]}
      >
        <LinearGradient
          colors={[COLORS.secondary, COLORS.secondaryDark]}
          style={styles.sidebarHeader}
        >
          <View style={styles.sidebarHeaderContent}>
            <View style={styles.userInfo}>
              <View style={styles.userAvatar}>
                <Feather name="user" size={22} color={COLORS.white} />
              </View>
              <View>
                <Text style={styles.userName}>Bienvenue</Text>
                <TouchableOpacity style={styles.loginButton}>
                  <Text style={styles.loginButtonText}>Se connecter</Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <AntDesign name="close" size={18} color={COLORS.white} />
            </TouchableOpacity>
          </View>
        </LinearGradient>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={styles.sidebarContent}
            showsVerticalScrollIndicator={false}
          >
            {menuOptions.map((option) => (
              <View key={option.id}>
                <TouchableOpacity
                  style={[
                    styles.menuItem,
                    expandedOption === option.id && styles.menuItemActive,
                  ]}
                  onPress={() =>
                    option.hasDropdown ? toggleDropdown(option.id) : null
                  }
                >
                  <View style={styles.menuItemIcon}>
                    {renderIcon(option.icon, option.iconType)}
                  </View>
                  <Text style={styles.menuItemText}>{option.title}</Text>
                  {option.hasDropdown && (
                    <View style={styles.dropdownIndicator}>
                      <MaterialIcons
                        name={
                          expandedOption === option.id
                            ? "keyboard-arrow-up"
                            : "keyboard-arrow-down"
                        }
                        size={24}
                        color={COLORS.darkGray}
                      />
                    </View>
                  )}
                </TouchableOpacity>

                {option.hasDropdown && expandedOption === option.id && (
                  <View style={styles.submenuContainer}>
                    <TouchableOpacity style={styles.submenuItem}>
                      <Text style={styles.submenuItemText}>Alimentation</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.submenuItem}>
                      <Text style={styles.submenuItemText}>Électronique</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.submenuItem}>
                      <Text style={styles.submenuItemText}>Mode</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            ))}
          </View>

          <View style={styles.sidebarFooter}>
            <TouchableOpacity style={styles.donateButton}>
              <AntDesign
                name="heart"
                size={16}
                color={COLORS.white}
                style={styles.donateIcon}
              />
              <Text style={styles.donateButtonText}>Faire un don</Text>
            </TouchableOpacity>

            <View style={styles.supportActions}>
              <TouchableOpacity style={styles.supportIcon}>
                <FontAwesome5
                  name="whatsapp"
                  size={22}
                  color={COLORS.success}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.supportIcon}>
                <MaterialCommunityIcons
                  name="robot"
                  size={22}
                  color={COLORS.primary}
                />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </Animated.View>
    </>
  );
};

const SearchBar = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.searchBarContainer} onPress={onPress}>
      <View style={styles.searchInputContainer}>
        <Ionicons name="search" size={18} color={COLORS.darkGray} />
        <Text style={styles.searchPlaceholder}>Rechercher des produits...</Text>
      </View>
    </TouchableOpacity>
  );
};

const HeroBanner = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-rotation for banners
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % promotions.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <View style={styles.heroBannerContainer}>
      <FlatList
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        data={promotions}
        keyExtractor={(item) => item.id}
        onMomentumScrollEnd={(event) => {
          const slideIndex = Math.floor(
            event.nativeEvent.contentOffset.x /
              event.nativeEvent.layoutMeasurement.width
          );
          setActiveIndex(slideIndex);
        }}
        renderItem={({ item }) => (
          <View style={styles.heroBannerSlide}>
            <ImageBackground
              source={{ uri: item.image }}
              style={styles.heroBannerImage}
              imageStyle={{ borderRadius: 12 }}
              resizeMode="cover"
            >
              <LinearGradient
                colors={["transparent", "rgba(0,0,0,0.7)"]}
                style={styles.heroBannerOverlay}
              >
                <View style={styles.heroBannerContent}>
                  <Text style={styles.heroBannerTitle}>{item.title}</Text>
                  <Text style={styles.heroBannerDescription}>
                    {item.description}
                  </Text>
                  <TouchableOpacity style={styles.heroBannerButton}>
                    <Text style={styles.heroBannerButtonText}>
                      {item.ctaText}
                    </Text>
                    <MaterialIcons
                      name="arrow-forward"
                      size={16}
                      color={COLORS.white}
                      style={{ marginLeft: 4 }}
                    />
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </ImageBackground>
          </View>
        )}
      />

      <View style={styles.paginationContainer}>
        {promotions.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              activeIndex === index && styles.paginationActiveDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const TopStoresList = () => {
  return (
    <View style={styles.storeSection}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Top Boutiques</Text>
        <TouchableOpacity style={styles.viewAllButton}>
          <Text style={styles.viewAllText}>Voir tout</Text>
          <MaterialIcons
            name="arrow-forward"
            size={14}
            color={COLORS.primary}
          />
        </TouchableOpacity>
      </View>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={topStores}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.storeCard}>
            <Image source={{ uri: item.image }} style={styles.storeImage} />
            <Text style={styles.storeName} numberOfLines={1}>
              {item.name}
            </Text>
            <View style={styles.ratingContainer}>
              <AntDesign name="star" size={12} color="#FFD700" />
              <Text style={styles.ratingText}>{item.rating}</Text>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.storeList}
      />
    </View>
  );
};

const CreateStorePromo = () => {
  return (
    <TouchableOpacity style={styles.createStorePromo}>
      <LinearGradient
        colors={[COLORS.secondary, COLORS.secondaryDark]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.createStoreGradient}
      >
        <View style={styles.createStoreContent}>
          <View style={styles.createStoreTextContent}>
            <Text style={styles.createStoreTitle}>
              Voulez-vous lancer votre boutique en ligne aujourd'hui ?
            </Text>
            <Text style={styles.createStoreDesc}>
              Faites le premier pas vers la création de votre propre boutique en
              ligne et découvrez des opportunités infinies pour votre
              entreprise.
            </Text>
            <TouchableOpacity style={styles.createStoreButton}>
              <Text style={styles.createStoreButtonText}>
                Créer ma boutique
              </Text>
              <MaterialIcons
                name="arrow-forward"
                size={16}
                color={COLORS.white}
                style={{ marginLeft: 8 }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.createStoreImageContainer}>
            <MaterialCommunityIcons
              name="store"
              size={60}
              color="rgba(255,255,255,0.3)"
            />
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};
// Main application component
const HomeScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [cartItems, setCartItems] = useState(3); // Example counter for cart
  const [searchActive, setSearchActive] = useState(false);
  const Wrapper = Platform.OS === "android" ? SafeAreaView : View;

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <Wrapper style={styles.safeArea}>
      <StatusBar
        backgroundColor={COLORS.secondary}
        barStyle={Platform.OS === "ios" ? "dark-content" : "light-content"}
      />

      <Header
        onMenuPress={() => setSidebarOpen(true)}
        cartItemCount={cartItems}
        onSearchPress={() => setSearchActive(true)}
      />

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[COLORS.primary]}
          />
        }
      >
        <HeroBanner />
        <Test />
        {/* je veux ça pour les boutique en ligne <TopStoresList /> */}
        <CreateStorePromo />
        <Products />
        {/* <Commitments /> */}
        <Footer />
      </ScrollView>
    </Wrapper>
  );
};

// Application styles
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 75, // Space for bottom navigation
  },

  // Header styles
  header: {
    paddingTop: Platform.OS === "ios" ? 50 : 10,
    paddingBottom: 15,
    paddingHorizontal: 16,
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  menuButton: {
    padding: 4,
  },
  logoContainer: {
    alignItems: "center",
  },
  logoText: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.white,
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchButton: {
    marginRight: 12,
    padding: 4,
  },
  cartButton: {
    padding: 4,
    position: "relative",
  },
  cartBadge: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  cartBadgeText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: "bold",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchPlaceholder: {
    color: COLORS.darkGray,
    marginLeft: 8,
    fontSize: 14,
  },

  // Sidebar styles
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 10,
  },
  sidebar: {
    position: "absolute",
    top: 0,
    left: 0,
    width: width * 0.8,
    height: "100%",
    backgroundColor: COLORS.white,
    zIndex: 20,
    ...SHADOWS.large,
  },
  sidebarHeader: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    paddingTop: 50,
  },
  sidebarHeaderContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.2)",
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  userName: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  loginButton: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  loginButtonText: {
    color: COLORS.white,
    fontSize: 12,
  },
  closeButton: {
    padding: 4,
  },
  sidebarContent: {
    flex: 1,
    paddingBottom: 80, // Pour s'assurer que le contenu ne se chevauche pas avec le footer
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  menuItemActive: {
    backgroundColor: COLORS.gray,
  },
  menuItemIcon: {
    width: 30,
    alignItems: "center",
    marginRight: 12,
  },
  menuItemText: {
    flex: 1,
    color: COLORS.secondary,
    fontSize: 15,
    ...FONTS.medium,
  },
  dropdownIndicator: {
    paddingLeft: 8,
  },
  submenuContainer: {
    backgroundColor: COLORS.gray,
    paddingLeft: 30,
  },
  submenuItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  submenuItemText: {
    color: COLORS.darkGray,
    fontSize: 14,
  },
  sidebarFooter: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
    backgroundColor: COLORS.white,
    marginTop: "auto",
  },
  donateButton: {
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  donateIcon: {
    marginRight: 8,
  },
  donateButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "600",
  },
  supportActions: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  supportIcon: {
    padding: 8,
  },

  // Search Bar Component
  searchBarContainer: {
    margin: 16,
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    ...SHADOWS.small,
  },

  // Hero Banner styles
  heroBannerContainer: {
    marginHorizontal: 16,
    marginTop: 1,
    marginBottom: 24,
  },
  heroBannerSlide: {
    width: width - 32,
    height: 180,
    borderRadius: 12,
    overflow: "hidden",
  },
  heroBannerImage: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },
  heroBannerOverlay: {
    height: "100%",
    justifyContent: "flex-end",
    padding: 16,
    borderRadius: 12,
  },
  heroBannerContent: {
    width: "70%",
  },
  heroBannerTitle: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 6,
  },
  heroBannerDescription: {
    color: COLORS.white,
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 12,
  },
  heroBannerButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 18,
    paddingVertical: 8,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
  },
  heroBannerButtonText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: "600",
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 12,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.lightGray,
    marginHorizontal: 3,
  },
  paginationActiveDot: {
    backgroundColor: COLORS.primary,
    width: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.secondary,
  },
  viewAllButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  viewAllText: {
    color: COLORS.primary,
    fontSize: 14,
    marginRight: 4,
  },
  // Top Stores Section styles
  storeSection: {
    marginBottom: 24,
  },
  storeList: {
    paddingLeft: 16,
    paddingRight: 8,
  },
  storeCard: {
    width: 100,
    marginRight: 12,
    alignItems: "center",
  },
  storeImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 8,
    backgroundColor: COLORS.lightGray,
    ...SHADOWS.small,
  },
  storeName: {
    fontSize: 13,
    color: COLORS.secondary,
    textAlign: "center",
    fontWeight: "500",
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 12,
    color: COLORS.darkGray,
    marginLeft: 4,
  },
  // Create Store Promo styles
  createStorePromo: {
    marginHorizontal: 16,
    marginVertical: 24,
    borderRadius: 12,
    overflow: "hidden",
    ...SHADOWS.medium,
  },
  createStoreGradient: {
    borderRadius: 12,
  },
  createStoreContent: {
    flexDirection: "row",
    padding: 16,
  },
  createStoreTextContent: {
    flex: 1,
    paddingRight: 12,
  },
  createStoreTitle: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  createStoreDesc: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 12,
  },
  createStoreButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
  },
  createStoreButtonText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: "600",
  },
  createStoreImageContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 80,
  },
});

export default HomeScreen;
