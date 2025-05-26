import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const COLORS = {
  primary: "#010080", // Dark Blue
  secondary: "#FFD700", // Golden Yellow
  white: "#FFFFFF",
  background: "#FAFAFA",
  error: "#F44336", // Keep for promo/discount red
  success: "#4CAF50",
  darkGray: "#757575",
};

const SHADOWS = {
  medium: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 4,
  },
  small: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
};

// Données des produits
const productsData = [
  {
    id: "1",
    name: "iPhone 15 Pro Max",
    price: 1299.99,
    discount: 15,
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400",
    category: "promo",
    isPromo: true,
  },
  {
    id: "2",
    name: "Samsung Galaxy S24",
    price: 999.99,
    discount: 20,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400",
    category: "promo",
    isPromo: true,
  },
  {
    id: "3",
    name: "Pizza Margherita",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400",
    category: "alimentation",
  },
  {
    id: "4",
    name: "Burger Premium",
    price: 15.5,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400",
    category: "alimentation",
  },
  {
    id: "5",
    name: "Salade César",
    price: 9.99,
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400",
    category: "alimentation",
  },
  {
    id: "6",
    name: "Collier Perles",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400",
    category: "bijoux",
  },
  {
    id: "7",
    name: "Boucles d'oreilles Or",
    price: 125.0,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400",
    category: "bijoux",
  },
  {
    id: "8",
    name: "Bracelet Argent",
    price: 65.99,
    image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400",
    category: "bijoux",
  },
  {
    id: "9",
    name: "Montre Connectée",
    price: 299.99,
    discount: 10,
    image: "https://images.unsplash.com/photo-1523275335684-c519a7ee1ac5?w=400",
    category: "promo",
    isPromo: true,
  },
  {
    id: "10",
    name: "Casque Audio",
    price: 150.0,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06f2e0?w=400",
    category: "promo",
    isPromo: true,
  },
];

// Configuration des tags
const TAGS_CONFIG = [
  {
    id: "promo",
    title: "EN PROMO",
    icon: "local-offer",
    category: "promo",
  },
  {
    id: "alimentation",
    title: "TOP ALIMENTATION",
    icon: "fastfood",
    category: "alimentation",
  },
  {
    id: "bijoux",
    title: "BIJOUX DU QUOTIDIEN",
    icon: "local-mall",
    category: "bijoux",
  },
];

const Products = () => {
  // Fonction pour filtrer les produits par catégorie
  const getProductsByCategory = (category) => {
    return productsData.filter((product) => product.category === category);
  };

  // Composant Tag
  const TagButton = ({ tag }) => (
    <View style={styles.tagContainer}>
      <View style={styles.tagButton}>
        <MaterialIcons name={tag.icon} size={16} color={COLORS.primary} />
        <Text style={styles.tagText}>{tag.title}</Text>
      </View>
    </View>
  );

  // Composant Carte Produit
  const ProductCard = ({ item }) => (
    <TouchableOpacity style={styles.productCard}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.productImage} />

        {item.isPromo && (
          <View style={styles.promoBadge}>
            <Text style={styles.promoBadgeText}>-{item.discount}%</Text>
          </View>
        )}

        <TouchableOpacity style={styles.favoriteButton}>
          <AntDesign name="heart" size={14} color={COLORS.error} />
        </TouchableOpacity>
      </View>

      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={2}>
          {item.name}
        </Text>
        <Text style={styles.productPrice}>{item.price.toFixed(2)} FCFA</Text>

        <TouchableOpacity style={styles.addButton}>
          <MaterialIcons
            name="add-shopping-cart"
            size={14}
            color={COLORS.white}
          />
          <Text style={styles.addButtonText}>Ajouter</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  // Composant Section (Tag + Produits)
  const ProductSection = ({ tag }) => {
    const products = getProductsByCategory(tag.category);

    return (
      <View style={styles.section}>
        <TagButton tag={tag} />

        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          numColumns={2} // Display 2 columns
          showsVerticalScrollIndicator={false} // Hide FlatList's own scrollbar
          renderItem={({ item }) => <ProductCard item={item} />}
          contentContainerStyle={styles.productsGridContainer}
          columnWrapperStyle={styles.row} 
          scrollEnabled={false} 
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nos Produits</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {TAGS_CONFIG.map((tag) => (
          <ProductSection key={tag.id} tag={tag} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  header: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.primary,
  },

  section: {
    marginBottom: 24,
  },

  tagContainer: {
    paddingHorizontal: 16,
    marginBottom: 12,
  },

  tagButton: {
    backgroundColor: COLORS.secondary, // Using the new secondary color for tags
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignSelf: "flex-start",
    width: "100%",
    ...SHADOWS.medium,
  },

  tagText: {
    color: COLORS.primary, // Text color for the tag
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 8,
  },

  productsGridContainer: {
    // No horizontal padding here, handled by row and productCard margin
  },

  row: {
    flex: 1,
    justifyContent: "space-between",
    marginBottom: 12, // Spacing between rows
    paddingHorizontal: 16, // Apply horizontal padding per row
  },

  productCard: {
    width: (width - 48) / 2, // (screen width - 16*2 padding - 16 gap) / 2 = (width - 48) / 2
    backgroundColor: COLORS.white,
    borderRadius: 12,
    overflow: "hidden",
    ...SHADOWS.small,
  },

  imageContainer: {
    position: "relative",
    height: 120,
  },

  productImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  promoBadge: {
    position: "absolute",
    top: 6,
    left: 6,
    backgroundColor: COLORS.error,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 8,
  },

  promoBadgeText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: "bold",
  },

  favoriteButton: {
    position: "absolute",
    top: 6,
    right: 6,
    backgroundColor: COLORS.white,
    width: 26,
    height: 26,
    borderRadius: 13,
    justifyContent: "center",
    alignItems: "center",
    ...SHADOWS.small,
  },

  productInfo: {
    padding: 10,
  },

  productName: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.primary, // Using the new primary color
    marginBottom: 4,
    lineHeight: 16,
  },

  productPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.error, // Keeping original color for price, as it stands out well for value
    marginBottom: 8,
  },

  addButton: {
    backgroundColor: COLORS.primary, // Using the new primary color
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
    borderRadius: 6,
  },

  addButtonText: {
    color: COLORS.white,
    fontSize: 11,
    fontWeight: "600",
    marginLeft: 4,
  },
});

export default Products;