import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { FontAwesome, FontAwesome5, MaterialCommunityIcons, FontAwesome6 } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const Footer = () => {
  return (
    <ScrollView>
      <View style={styles.footerContainer}>
        {/* Section des logos de paiement */}
        <View style={styles.paymentSection}>
          <View style={styles.paymentLogosContainer}>
            <View style={styles.paymentLogo}>
              <FontAwesome name="cc-visa" size={24} color="white" />
            </View>
            <View style={styles.paymentLogo}>
              <FontAwesome name="cc-mastercard" size={24} color="white" />
            </View>
            <View style={styles.paymentLogo}>
              <FontAwesome name="cc-paypal" size={24} color="white" />
            </View>
            <View style={styles.paymentLogo}>
              <FontAwesome name="cc-stripe" size={24} color="white" />
            </View>
            <View style={styles.paymentLogo}>
              <FontAwesome name="credit-card" size={24} color="white" />
            </View>
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
          <View style={styles.column}>
            <Text style={styles.columnTitle}>À propos</Text>
            <Text style={styles.link}>Découvrez notre plateforme de commerce en ligne, où qualité et service rapide sont notre priorité.</Text>
          </View>

          {/* Colonne 2 : Liens utiles */}
          <View style={styles.column}>
            <Text style={styles.columnTitle}>Liens utiles</Text>
            <Text style={styles.link}>Boutique</Text>
            <Text style={styles.link}>Supermarché</Text>
            <Text style={styles.link}>Restaurant</Text>
            <Text style={styles.link}>Hôtel</Text>
          </View>

          {/* Colonne 3 : Contact */}
          <View style={styles.column}>
            <Text style={styles.columnTitle}>Contact</Text>
            <Text style={styles.link}>
              <MaterialCommunityIcons name="email-outline" size={16} /> contact@boukata-ta.com
            </Text>
            <Text style={styles.link}>
              <MaterialCommunityIcons name="phone" size={16} /> +33 1 23 45 67 89
            </Text>
            <Text style={styles.link}>
              <MaterialCommunityIcons name="map-marker" size={16} /> Paris, France
            </Text>
          </View>

          {/* Colonne 4 : Réseaux sociaux */}
          <View style={styles.column}>
            <Text style={styles.columnTitle}>Suivez-nous</Text>
            <View style={styles.socialIconsContainer}>
              <View style={styles.socialIcon}>
                <FontAwesome name="facebook" size={24} color="#010080" />
              </View>
              <View style={styles.socialIcon}>
                <FontAwesome6 name="tiktok" size={24} color="#010080" />
              </View>
              <View style={styles.socialIcon}>
                <FontAwesome name="linkedin" size={24} color="#010080" />
              </View>
            </View>
          </View>
        </View>

        {/* Copyright */}
        <View style={styles.copyright}>
          <Text style={styles.copyrightText}>© 2025 Boukata-ta. Tous droits réservés.</Text>
        </View>
        
      </View>
    </ScrollView>
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
  paymentLogosContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 15,
  },
  paymentLogo: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
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
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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
    marginBottom: 8,
  },
  socialIconsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 5,
  },
  socialIcon: {
    backgroundColor: '#E7BA06',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  copyright: {
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingTop: 15,
    alignItems: 'center',
  },
  copyrightText: {
    fontSize: 12,
    color: '#707070',
  },
});

export default Footer;