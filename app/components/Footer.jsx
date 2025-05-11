import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Dimensions, TouchableOpacity, Linking } from 'react-native';
import { FontAwesome, FontAwesome5, MaterialCommunityIcons, FontAwesome6 } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

// Images des moyens de paiement (remplacez ces URLs par vos propres images)
const paymentIcons = [
  // { name: 'Visa', image: require('../assets/payments/visa.png') },
  { name: 'Visa', image: "https://www.boukata-ta.com/1737453573362.jpg" },
  { name: 'Mastercard', image: "https://www.boukata-ta.com/1737453573362.jpg" },
  { name: 'PayPal', image: "https://www.boukata-ta.com/1737453573362.jpg" },
  { name: 'Stripe', image: "https://www.boukata-ta.com/1737453573362.jpg" },
  { name: 'Mobile Money', image: "https://www.boukata-ta.com/1737453573362.jpg" },
];

// Liens utiles
const usefulLinks = [
  { name: 'Boutique', route: '/boutique' },
  { name: 'Supermarché', route: '/supermarche' },
  { name: 'Restaurant', route: '/restaurant' },
  { name: 'Hôtel', route: '/hotel' },
];

// Réseaux sociaux
const socialMedia = [
  { name: 'facebook', icon: 'facebook', url: 'https://facebook.com/boukata-ta' },
  { name: 'tiktok', icon: 'tiktok', type: 'FontAwesome6', url: 'https://tiktok.com/@boukata-ta' },
  { name: 'linkedin', icon: 'linkedin', url: 'https://linkedin.com/company/boukata-ta' },
];

const Footer = ({ navigation }) => {
  // Fonction pour naviguer
  const navigateTo = (route) => {
    navigation.navigate(route);
  };

  // Fonction pour ouvrir un lien externe
  const openUrl = (url) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.footerContainer}>
      {/* Section des logos de paiement */}
      <View style={styles.paymentSection}>
        <Text style={styles.paymentTitle}>Moyens de paiement acceptés</Text>
        <View style={styles.paymentLogosContainer}>
          {paymentIcons.map((payment, index) => (
            <View key={index} style={styles.paymentLogo}>
              <Image 
                source={payment.image} 
                style={styles.paymentImage} 
                resizeMode="contain"
              />
            </View>
          ))}
        </View>
      </View>

      {/* Section centrale blanche chevauchée */}
      <View style={styles.komipaySection}>
        <View style={styles.komipayContent}>
          <View style={styles.logoContainer}>
            <FontAwesome5 name="shield-alt" size={36} color="#010080" />
          </View>
          <Text style={styles.komipayText}>Paiement sécurisé et fiable par Komipay !</Text>
        </View>
      </View>

      {/* Séparateur */}
      <View style={styles.separator} />

      {/* Section titre et sous-titre */}
      <View style={styles.brandSection}>
        <Text style={styles.brandTitle}>Boukata-ta</Text>
        <Text style={styles.brandSubtitle}>Simplifier votre quotidien !</Text>
      </View>

      {/* Grille de liens responsive */}
      <View style={styles.linksGrid}>
        {/* Colonne 1 : À propos */}
        <View style={[styles.column, styles.aboutColumn]}>
          <Text style={styles.columnTitle}>À propos</Text>
          <Text style={styles.link}>Découvrez notre plateforme de commerce en ligne, où qualité et service rapide sont notre priorité. Nous livrons dans toute la ville en un temps record.</Text>
        </View>

        {/* Colonne 2 : Liens utiles */}
        <View style={styles.column}>
          <Text style={styles.columnTitle}>Liens utiles</Text>
          {usefulLinks.map((link, index) => (
            <TouchableOpacity key={index} onPress={() => navigateTo(link.route)}>
              <Text style={styles.linkButton}>
                <FontAwesome5 name="angle-right" size={14} color="#E7BA06" /> {link.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Colonne 3 : Contact */}
        <View style={styles.column}>
          <Text style={styles.columnTitle}>Contact</Text>
          <TouchableOpacity onPress={() => Linking.openURL('mailto:contact@boukata-ta.com')}>
            <Text style={styles.contactLink}>
              <MaterialCommunityIcons name="email-outline" size={16} color="#010080" /> contact@boukata-ta.com
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('tel:+22791239522')}>
            <Text style={styles.contactLink}>
              <MaterialCommunityIcons name="phone" size={16} color="#010080" /> +227 91 23 95 22
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigateTo('Contact')}>
            <View style={styles.contactButton}>
              <Text style={styles.contactButtonText}>Nous contacter</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Colonne 4 : Réseaux sociaux */}
        <View style={styles.column}>
          <Text style={styles.columnTitle}>Suivez-nous</Text>
          <View style={styles.socialIconsContainer}>
            {socialMedia.map((social, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.socialIcon} 
                onPress={() => openUrl(social.url)}
              >
                {social.type === 'FontAwesome6' ? (
                  <FontAwesome6 name={social.icon} size={24} color="#010080" />
                ) : (
                  <FontAwesome name={social.icon} size={24} color="#010080" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      {/* Copyright avec année dynamique */}
      <View style={styles.copyright}>
        <Text style={styles.copyrightText}>
          © {new Date().getFullYear()} Boukata-ta. Tous droits réservés.
        </Text>
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    width: '100%',
    backgroundColor: '#f8f9fa',
    paddingBottom: 10,
  },
  paymentSection: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 20,
    alignItems: 'center',
  },
  paymentTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  paymentLogosContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 15,
  },
  paymentLogo: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
    width: 60,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  paymentImage: {
    width: '100%',
    height: '100%',
  },
  komipaySection: {
    alignItems: 'center',
    marginTop: -25,
    paddingHorizontal: 20,
  },
  komipayContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
    width: '100%',
    maxWidth: 500,
  },
  logoContainer: {
    backgroundColor: '#E7BA06',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  komipayText: {
    fontSize: 16,
    flex: 1,
    color: '#010080',
    fontWeight: 'bold',
  },
  separator: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 25,
    marginHorizontal: 20,
  },
  brandSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  brandTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#010080',
    marginBottom: 5,
  },
  brandSubtitle: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#E7BA06',
  },
  linksGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingHorizontal: 15,
    marginBottom: 30,
  },
  column: {
    width: width < 768 ? '45%' : '22%',
    marginBottom: 20,
    paddingHorizontal: 5,
  },
  aboutColumn: {
    width: width < 768 ? '95%' : '22%',
  },
  columnTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#010080',
    marginBottom: 15,
    paddingBottom: 5,
    borderBottomWidth: 2,
    borderBottomColor: '#E7BA06',
    width: '75%',
  },
  link: {
    fontSize: 14,
    color: '#505050',
    marginBottom: 12,
    lineHeight: 20,
  },
  linkButton: {
    fontSize: 14,
    color: '#505050',
    marginBottom: 12,
    paddingVertical: 3,
  },
  contactLink: {
    fontSize: 14,
    color: '#505050',
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  learnMoreButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#010080',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 15,
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  learnMoreText: {
    color: '#010080',
    fontSize: 14,
    fontWeight: '500',
  },
  contactButton: {
    backgroundColor: '#010080',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 15,
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  contactButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  socialIconsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 5,
    marginBottom: 15,
  },
  socialIcon: {
    backgroundColor: '#E7BA06',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  newsletterButton: {
    backgroundColor: 'rgba(1, 0, 128, 0.1)',
    borderWidth: 1,
    borderColor: '#010080',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 10,
    alignSelf: 'flex-start',
  },
  newsletterButtonText: {
    color: '#010080',
    fontSize: 13,
    fontWeight: '500',
  },
  copyright: {
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingTop: 15,
    paddingBottom: 5,
    alignItems: 'center',
  },
  copyrightText: {
    fontSize: 12,
    color: '#707070',
  },
  
  // Media queries pour la responsivité
  '@media (max-width: 768px)': {
    linksGrid: {
      flexDirection: 'column',
    },
    column: {
      width: '100%',
      marginBottom: 25,
    },
  },
});

export default Footer;