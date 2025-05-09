import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  Platform
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Vous devrez installer ces icônes:
// npm install react-native-vector-icons
// puis: npx react-native link react-native-vector-icons
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const Footer = () => {
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState('home');
  
  // Animation pour l'indicateur
  const slideAnim = React.useRef(new Animated.Value(0)).current;
  
  const handleTabPress = (tabName) => {
    setSelectedTab(tabName);
    
    // Définir la position de l'animation selon l'onglet
    let toValue = 0;
    switch(tabName) {
      case 'home':
        toValue = 0;
        break;
      case 'categories':
        toValue = width / 5;
        break;
      case 'cart':
        toValue = (width / 5) * 2;
        break;
      case 'favorites':
        toValue = (width / 5) * 3;
        break;
      case 'profile':
        toValue = (width / 5) * 4;
        break;
    }
    
    // Animer le déplacement de l'indicateur
    Animated.spring(slideAnim, {
      toValue: toValue,
      friction: 8,
      tension: 100,
      useNativeDriver: true,
    }).start();
    
    // Naviguer vers l'écran approprié
    // navigation.navigate(tabName);
    console.log(`Navigating to: ${tabName}`);
  };
  
  // Badge de notification pour le panier
  const cartItemCount = 3; // Sera dynamique dans une vraie app
  
  // Rendre chaque élément de tab
  const renderTabItem = (iconName, activeIconName, tabName, label, badgeCount = null) => {
    const isActive = selectedTab === tabName;
    
    return (
      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => handleTabPress(tabName)}
        activeOpacity={0.7}
      >
        <View style={styles.tabIconContainer}>
          <Icon
            name={isActive ? activeIconName : iconName}
            size={24}
            color={isActive ? '#E7BA06' : '#FFFFFF'}
          />
          
          {badgeCount !== null && badgeCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{badgeCount > 9 ? '9+' : badgeCount}</Text>
            </View>
          )}
        </View>
        
        <Text style={[
          styles.tabLabel,
          {color: isActive ? '#E7BA06' : '#FFFFFF'}
        ]}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  };
  
  return (
    <View style={styles.container}>
      {/* Un design attrayant avec une ligne légèrement incurvée en haut */}
      <View style={styles.topCurve} />
      
      {/* Indicateur animé qui se déplace sous l'onglet actif */}
      <Animated.View
        style={[
          styles.activeIndicator,
          {transform: [{translateX: slideAnim}]}
        ]}
      />
      
      {/* Contenu du footer avec les onglets */}
      <View style={styles.tabsContainer}>
        {renderTabItem('home-outline', 'home', 'home', 'Accueil')}
        {renderTabItem('grid-outline', 'grid', 'categories', 'Catégories')}
        {renderTabItem('cart-outline', 'cart', 'cart', 'Panier', cartItemCount)}
        {renderTabItem('heart-outline', 'heart', 'favorites', 'Favoris')}
        {renderTabItem('person-outline', 'person', 'profile', 'Compte')}
      </View>
    </View>
  );
};

// Définition des styles
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 70,
    backgroundColor: '#010080', // Bleu foncé
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    paddingBottom: Platform.OS === 'ios' ? 20 : 0, // Ajustement pour iOS
  },
  topCurve: {
    position: 'absolute',
    top: -1,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(231, 186, 6, 0.3)', // Jaune doré transparent
  },
  activeIndicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width / 5,
    height: 3,
    backgroundColor: '#E7BA06', // Jaune doré
    borderRadius: 3,
  },
  tabsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  tabItem: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIconContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 10,
    marginTop: 4,
    fontWeight: '500',
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -8,
    backgroundColor: '#E7BA06', // Jaune doré
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#010080', // Bordure bleue
  },
  badgeText: {
    color: '#010080', // Texte bleu
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default Footer;