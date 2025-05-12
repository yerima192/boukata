import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated,
  Linking,
} from "react-native";
import {
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
  FontAwesome6,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");
const isTablet = width > 768;

// Moyens de paiement
const paymentIcons = [
  { name: "Nita", image: "https://www.boukata-ta.com/1737453573362.jpg" },
  { name: "Amanata", image: "https://www.boukata-ta.com/1737453619271.jpg" },
  { name: "Zeyna", image: "https://www.boukata-ta.com/1737453648317.jpg" },
  { name: "Al Izza", image: "https://www.boukata-ta.com/1737453693041.jpg" },
  { name: "Airtel", image: "https://www.boukata-ta.com/1737453781099.jpg" },
  { name: "Zamani", image: "https://www.boukata-ta.com/1737453898534.jpg" },
  { name: "Moov Money", image: "https://www.boukata-ta.com/1737453926552.jpg" },
  {name: "Master card", image: "https://www.boukata-ta.com/1737453966600.jpg"},
  { name: "Visa", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTvw10q8UEI9-Pd4QJ5getpNSCZiuvzP0fMw&s" },
];

// Liens utiles
const usefulLinks = [
  { name: "Boutique", route: "/boutique", icon: "store" },
  { name: "Supermarché", route: "/supermarche", icon: "shopping-cart" },
  { name: "Restaurant", route: "/restaurant", icon: "utensils" },
  { name: "Hôtel", route: "/hotel", icon: "hotel" },
];

// Réseaux sociaux
const socialMedia = [
  {
    name: "facebook",
    icon: "facebook",
    url: "https://facebook.com/boukata-ta",
  },
  {
    name: "tiktok",
    icon: "tiktok",
    type: "FontAwesome6",
    url: "https://tiktok.com/@boukata-ta",
  },
  {
    name: "linkedin",
    icon: "linkedin",
    url: "https://linkedin.com/company/boukata-ta",
  },
];

// Liens vendeurs
const sellerLinks = [
  { name: "Comment devenir vendeur ?", icon: "question-circle" },
  { name: "Conditions vendeurs", icon: "file-contract" },
  { name: "Guide vendeur", icon: "book" },
  { name: "Produits éligibles", icon: "clipboard-check" },
];

// Informations légales
const legalLinks = [
  { name: "Conditions d'utilisation", icon: "file-alt" },
  { name: "Politique de confidentialité", icon: "shield-alt" },
  { name: "Politique remboursement", icon: "money-bill-wave" },
  { name: "FAQ", icon: "question" },
];

const Footer = ({ navigation }) => {
  // Animation values
  const [scrollAnim] = useState(new Animated.Value(0));
  const [isExpanded, setIsExpanded] = useState({});
  const [activeTab, setActiveTab] = useState("useful");

  // Animation pour les éléments flottants
  const [bubbleAnim] = useState(
    Array(5)
      .fill()
      .map(() => new Animated.Value(0))
  );

  useEffect(() => {
    // Animation d'apparition principale
    Animated.timing(scrollAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Animation des bulles flottantes
    const animateBubbles = () => {
      bubbleAnim.forEach((anim, index) => {
        Animated.loop(
          Animated.sequence([
            Animated.timing(anim, {
              toValue: 1,
              duration: 3000 + index * 500,
              useNativeDriver: true,
            }),
            Animated.timing(anim, {
              toValue: 0,
              duration: 3000 + index * 500,
              useNativeDriver: true,
            }),
          ])
        ).start();
      });
    };

    animateBubbles();
  }, []);

  // Fonction pour naviguer
  const navigateTo = (route) => {
    navigation.navigate(route);
  };

  // Fonction pour ouvrir un lien externe
  const openUrl = (url) => {
    Linking.openURL(url);
  };

  // Gérer l'expansion des sections
  const toggleExpand = (section) => {
    setIsExpanded((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
    setActiveTab(section);
  };

  // Bulles flottantes décoratives
  const renderBubbles = () => {
    return bubbleAnim.map((anim, index) => (
      <Animated.View
        key={index}
        style={[
          styles.bubble,
          {
            left: `${15 + index * 20}%`,
            width: 10 + index * 5,
            height: 10 + index * 5,
            opacity: anim.interpolate({
              inputRange: [0, 0.5, 1],
              outputRange: [0.2, 0.6, 0.2],
            }),
            transform: [
              {
                translateY: anim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -60],
                }),
              },
              {
                scale: anim.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [1, 1.2, 1],
                }),
              },
            ],
          },
        ]}
      />
    ));
  };

  // Diviser les méthodes de paiement en deux lignes
  const firstRowPayments = paymentIcons.slice(0, 5);
  const secondRowPayments = paymentIcons.slice(5);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: scrollAnim,
          transform: [
            {
              translateY: scrollAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [50, 0],
              }),
            },
          ],
        },
      ]}
    >
      {/* Les bulles flottantes décoratives */}
      <View style={styles.bubblesContainer}>{renderBubbles()}</View>

      {/* Section Principale avec dégradé amélioré */}
      <LinearGradient
        colors={["#0F0F98", "#010080", "#00005A"]}
        style={styles.mainContent}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        {/* Section Logo et Contact avec nouvelle disposition */}
        <View style={styles.topSection}>
          {/* Section de la marque */}
          <View style={styles.brandSection}>
            <View style={styles.logoContainer}>
              <View style={styles.logoCircle}>
                <Text style={styles.logoText}>B</Text>
              </View>
              <View style={styles.brandTextContainer}>
                <Text style={styles.brandName}>Boukata-ta</Text>
                <Text style={styles.brandSlogan}>
                  Simplifier votre quotidien !
                </Text>
              </View>
            </View>

            <Text style={styles.brandDescription}>
              Votre plateforme de commerce en ligne où qualité et service rapide
              sont notre priorité. Nous livrons dans toute la ville en un temps
              record.
            </Text>
          </View>
          {/* Nouvelle section Komipay placée en haut */}
          <View style={styles.topKomipayContainer}>
            <LinearGradient
              colors={["#010080", "#0F0F98"]}
              style={styles.komipayContent}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.komipayHeader}>
                <View style={styles.logoKomipay}>
                  <Image
                    source={{ uri: "https://www.boukata-ta.com/komipay.jpg" }}
                    style={styles.komipayLogo}
                    resizeMode="contain"
                  />
                </View>
                <View style={styles.komipayTextContainer}>
                  <Text style={styles.komipayTitle}>
                    Paiement sécurisé avec Komipay
                  </Text>
                  <Text style={styles.komipaySubtitle}>
                    Plusieurs options pour faciliter vos achats
                  </Text>
                </View>
              </View>

              {/* Affichage amélioré des méthodes de paiement */}
              <View style={styles.paymentSection}>
                {/* Première ligne de méthodes de paiement */}
                <View style={styles.paymentRow}>
                  {firstRowPayments.map((payment, index) => (
                    <View key={index} style={styles.paymentMethod}>
                      <View style={styles.paymentLogoContainer}>
                        <Image
                          source={{ uri: payment.image }}
                          style={styles.paymentLogo}
                          resizeMode="contain"
                        />
                      </View>
                    </View>
                  ))}
                </View>

                {/* Deuxième ligne de méthodes de paiement */}
                <View style={[styles.paymentRow, { justifyContent: "center" }]}>
                  {secondRowPayments.map((payment, index) => (
                    <View key={index} style={styles.paymentMethod}>
                      <View style={styles.paymentLogoContainer}>
                        <Image
                          source={{ uri: payment.image }}
                          style={styles.paymentLogo}
                          resizeMode="contain"
                        />
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            </LinearGradient>
          </View>

          {/* Nouvelle section onglets pour les liens */}
          <View style={styles.tabsSection}>
            {/* Onglets des catégories */}
            <View style={styles.tabsContainer}>
              <TouchableOpacity
                style={[styles.tab, activeTab === "useful" && styles.activeTab]}
                onPress={() => toggleExpand("useful")}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === "useful" && styles.activeTabText,
                  ]}
                >
                  Liens utiles
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.tab, activeTab === "seller" && styles.activeTab]}
                onPress={() => toggleExpand("seller")}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === "seller" && styles.activeTabText,
                  ]}
                >
                  Vendeurs
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.tab, activeTab === "legal" && styles.activeTab]}
                onPress={() => toggleExpand("legal")}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === "legal" && styles.activeTabText,
                  ]}
                >
                  Légal
                </Text>
              </TouchableOpacity>
            </View>

            {/* Contenu dynamique des onglets */}
            <View style={styles.tabContent}>
              {activeTab === "useful" && (
                <Animated.View
                  style={[styles.linksGrid, { opacity: scrollAnim }]}
                  entering={Animated.FadeIn}
                >
                  {usefulLinks.map((link, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.linkCard}
                      onPress={() => navigateTo(link.route)}
                    >
                      <View style={styles.linkIconCircle}>
                        <FontAwesome5
                          name={link.icon}
                          size={18}
                          color="#010080"
                        />
                      </View>
                      <Text style={styles.linkCardText}>{link.name}</Text>
                    </TouchableOpacity>
                  ))}
                </Animated.View>
              )}

              {activeTab === "seller" && (
                <Animated.View
                  style={[styles.linksGrid, { opacity: scrollAnim }]}
                  entering={Animated.FadeIn}
                >
                  {sellerLinks.map((link, index) => (
                    <TouchableOpacity key={index} style={styles.linkCard}>
                      <View style={styles.linkIconCircle}>
                        <FontAwesome5
                          name={link.icon}
                          size={18}
                          color="#010080"
                        />
                      </View>
                      <Text style={styles.linkCardText}>{link.name}</Text>
                    </TouchableOpacity>
                  ))}
                </Animated.View>
              )}

              {activeTab === "legal" && (
                <Animated.View
                  style={[styles.linksGrid, { opacity: scrollAnim }]}
                  entering={Animated.FadeIn}
                >
                  {legalLinks.map((link, index) => (
                    <TouchableOpacity key={index} style={styles.linkCard}>
                      <View style={styles.linkIconCircle}>
                        <FontAwesome5
                          name={link.icon}
                          size={18}
                          color="#010080"
                        />
                      </View>
                      <Text style={styles.linkCardText}>{link.name}</Text>
                    </TouchableOpacity>
                  ))}
                </Animated.View>
              )}
            </View>
          </View>
        </View>

        {/* Nouveau design des contacts */}
        <View style={styles.contactCards}>
          <TouchableOpacity
            style={styles.contactCard}
            onPress={() => Linking.openURL("mailto:contact@boukata-ta.com")}
          >
            <View style={styles.contactIconContainer}>
              <MaterialCommunityIcons
                name="email-outline"
                size={20}
                color="#E7BA06"
              />
            </View>
            <Text style={styles.contactCardText}>contact@boukata-ta.com</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.contactCard}
            onPress={() => Linking.openURL("tel:+22791239522")}
          >
            <View style={styles.contactIconContainer}>
              <MaterialCommunityIcons name="phone" size={20} color="#E7BA06" />
            </View>
            <Text style={styles.contactCardText}>+227 91 23 95 22</Text>
          </TouchableOpacity>
        </View>

        {/* Nouveau design pour la section réseaux sociaux */}
        <View style={styles.socialMediaContainer}>
          <View style={styles.socialMediaContent}>
            <Text style={styles.socialMediaTitle}>Suivez-nous</Text>
            <View style={styles.socialMediaIcons}>
              {socialMedia.map((social, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.socialMediaButton}
                  onPress={() => openUrl(social.url)}
                >
                  {social.type === "FontAwesome6" ? (
                    <FontAwesome6 name={social.icon} size={22} color="#FFF" />
                  ) : (
                    <FontAwesome name={social.icon} size={22} color="#FFF" />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </LinearGradient>

      {/* Nouvelle forme de séparation à la fin - Courbe */}
      <View style={styles.curveSeparator}>
        <View style={styles.curveInner} />
      </View>

      {/* Section du bas avec Copyright */}
      <View style={styles.copyrightSection}>
        <Text style={styles.copyrightText}>
          © {new Date().getFullYear()} Boukata-ta. Tous droits réservés.
        </Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    marginBottom: 70,
  },
    // Section principale
    mainContent: {
      paddingTop: 30,
      zIndex: 3,
    },
  // Conteneur des bulles flottantes
  bubblesContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 2,
    overflow: "hidden",
  },
  bubble: {
    position: "absolute",
    bottom: "10%",
    borderRadius: 50,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
  },

  // Section Komipay placée en haut
  topKomipayContainer: {
    zIndex: 3,
  },
  komipayContent: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  komipayHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.15)",
  },
  logoKomipay: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: "#E7BA06",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
    overflow: "hidden",
  },
  komipayLogo: {
    width: "100%",
    height: "100%",
  },
  komipayTextContainer: {
    flex: 1,
  },
  komipayTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 5,
  },
  komipaySubtitle: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.7)",
  },

  // Nouveau design amélioré pour les méthodes de paiement
  paymentSection: {
    width: "100%",
  },
  paymentRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 15,
  },
  paymentMethod: {
    alignItems: "center",
    marginHorizontal: 5,
  },
  paymentLogoContainer: {
    width: 50,
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  paymentLogo: {
    width: "100%",
    height: "100%",
  },

  // Section du haut avec nouvelle disposition
  topSection: {
    flexDirection: isTablet ? "row" : "column",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },

  // Section de la marque
  brandSection: {
    width: isTablet ? "40%" : "100%",
    marginBottom: isTablet ? 0 : 30,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  logoCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#E7BA06",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  logoText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#010080",
  },
  brandTextContainer: {
    flexDirection: "column",
  },
  brandName: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 3,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  brandSlogan: {
    fontSize: 14,
    color: "#E7BA06",
    fontStyle: "italic",
  },
  brandDescription: {
    fontSize: 14,
    lineHeight: 22,
    color: "rgba(255, 255, 255, 0.9)",
    marginBottom: 25,
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },

  // Nouveau design des cartes de contact
  contactCards: {
    flexDirection: isTablet ? "row" : "column",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  contactCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
    width: isTablet ? "48%" : "100%",
  },
  contactIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(231, 186, 6, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  contactCardText: {
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: 14,
    fontWeight: "500",
  },

  // Section des onglets
  tabsSection: {
    width: isTablet ? "55%" : "100%",
    marginTop: isTablet ? 0 : 20,
  },
  tabsContainer: {
    flexDirection: "row",
    borderBottomWidth: 2,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
    marginBottom: 20,
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginRight: 10,
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: "#E7BA06",
    marginBottom: -2,
  },
  tabText: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 16,
    fontWeight: "500",
  },
  activeTabText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },

  // Contenu des onglets
  tabContent: {
    minHeight: 200,
  },
  linksGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  linkCard: {
    width: "48%",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    alignItems: "center",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
  },
  linkIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E7BA06",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  linkCardText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "500",
    flexShrink: 1,
  },

  // Nouvelle section des réseaux sociaux
  socialMediaContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 20,
  },
  socialMediaContent: {
    alignItems: "center",
  },
  socialMediaTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 15,
    textAlign: "center",
  },
  socialMediaIcons: {
    flexDirection: "row",
    justifyContent: "center",
  },
  socialMediaButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },

  // Nouvelle forme de séparation courbe à la fin
  curveSeparator: {
    height: 50,
    width: "100%",
    overflow: "hidden",
    backgroundColor: "#00005A",
  },
  curveInner: {
    position: "absolute",
    top: -50,
    width: "150%",
    height: 100,
    borderRadius: 100,
    left: "-25%",
    backgroundColor: "#f8f9fa",
    zIndex: 1,
  },

  // Section Copyright
  copyrightSection: {
    backgroundColor: "#f8f9fa",
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  copyrightText: {
    color: "#010080",
    fontSize: 14,
    fontWeight: "500",
  },
});

export default Footer;
