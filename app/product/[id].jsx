import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  Dimensions,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useCart } from "../context/CartContext";
import { useLocalSearchParams, useRouter } from "expo-router";

const { width } = Dimensions.get("window");

const COLORS = {
  primary: "#010080",
  secondary: "#E7BA06",
  white: "#FFFFFF",
  background: "#FAFAFA",
  gray: "#8A8A8A",
  lightGray: "#F5F5F5",
  text: "#333333",
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

// Données de produits simulées
const productsData = {
  "1": {
    id: "1",
    name: "iPhone 15 Pro Max",
    price: 1299.99,
    discount: 15,
    image: "https://images.pexels.com/photos/592750/pexels-photo-592750.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Électronique",
    isPromo: true,
    description: "Le dernier iPhone avec des performances exceptionnelles et un appareil photo professionnel.",
    rating: 4.8,
    reviews: 125,
    inStock: true,
    features: ["128GB de stockage", "Appareil photo 48MP", "Écran Super Retina XDR", "Puce A17 Pro"]
  },
  "2": {
    id: "2",
    name: "Samsung Galaxy S24",
    price: 999.99,
    discount: 20,
    image: "https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Électronique",
    isPromo: true,
    description: "Smartphone Android haut de gamme avec intelligence artificielle intégrée.",
    rating: 4.6,
    reviews: 89,
    inStock: true,
    features: ["256GB de stockage", "Écran Dynamic AMOLED", "Batterie 4000mAh", "5G"]
  }
};

const ProductDetailScreen = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const product = productsData[id] || productsData["1"];

  const productImages = [
    product.image,
    product.image,
    product.image,
  ];

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    Alert.alert(
      "Produit ajouté",
      `${quantity} x ${product.name} ajouté(s) au panier`,
      [{ text: "OK" }]
    );
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push("/checkout");
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <MaterialIcons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Détails du produit</Text>
        
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => setIsFavorite(!isFavorite)}
        >
          <AntDesign
            name={isFavorite ? "heart" : "hearto"}
            size={24}
            color={isFavorite ? COLORS.error : COLORS.text}
          />
        </TouchableOpacity>
      </SafeAreaView>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageSection}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(event) => {
              const index = Math.floor(
                event.nativeEvent.contentOffset.x / width
              );
              setSelectedImageIndex(index);
            }}
          >
            {productImages.map((image, index) => (
              <Image
                key={index}
                source={{ uri: image }}
                style={styles.productImage}
              />
            ))}
          </ScrollView>
          
          <View style={styles.imageIndicators}>
            {productImages.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.indicator,
                  selectedImageIndex === index && styles.activeIndicator,
                ]}
              />
            ))}
          </View>

          {product.isPromo && (
            <View style={styles.promoBadge}>
              <Text style={styles.promoBadgeText}>-{product.discount}%</Text>
            </View>
          )}
        </View>

        <View style={styles.productInfo}>
          <Text style={styles.productName}>{product.name}</Text>
          
          <View style={styles.priceContainer}>
            <Text style={styles.currentPrice}>
              {product.price.toFixed(2)} FCFA
            </Text>
            {product.isPromo && (
              <Text style={styles.originalPrice}>
                {(product.price / (1 - product.discount / 100)).toFixed(2)} FCFA
              </Text>
            )}
          </View>

          <View style={styles.ratingContainer}>
            <View style={styles.stars}>
              {[1, 2, 3, 4, 5].map((star) => (
                <AntDesign
                  key={star}
                  name="star"
                  size={16}
                  color={star <= Math.floor(product.rating) ? "#FFD700" : COLORS.lightGray}
                />
              ))}
            </View>
            <Text style={styles.ratingText}>{product.rating} ({product.reviews} avis)</Text>
          </View>

          <View style={styles.descriptionSection}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>
              {product.description}
            </Text>
          </View>

          <View style={styles.featuresSection}>
            <Text style={styles.sectionTitle}>Caractéristiques</Text>
            <View style={styles.featureItem}>
              <Text style={styles.featureLabel}>Catégorie:</Text>
              <Text style={styles.featureValue}>{product.category}</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureLabel}>Disponibilité:</Text>
              <Text style={[styles.featureValue, { color: product.inStock ? COLORS.success : COLORS.error }]}>
                {product.inStock ? "En stock" : "Rupture de stock"}
              </Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureLabel}>Livraison:</Text>
              <Text style={styles.featureValue}>24-48h</Text>
            </View>
            
            {product.features && (
              <View style={styles.featuresList}>
                {product.features.map((feature, index) => (
                  <View key={index} style={styles.featureTag}>
                    <Text style={styles.featureTagText}>{feature}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>

          <View style={styles.quantitySection}>
            <Text style={styles.sectionTitle}>Quantité</Text>
            <View style={styles.quantitySelector}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <MaterialIcons name="remove" size={20} color={COLORS.primary} />
              </TouchableOpacity>
              
              <Text style={styles.quantityText}>{quantity}</Text>
              
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => setQuantity(quantity + 1)}
              >
                <MaterialIcons name="add" size={20} color={COLORS.primary} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={handleAddToCart}
        >
          <MaterialIcons name="add-shopping-cart" size={20} color={COLORS.primary} />
          <Text style={styles.addToCartText}>Ajouter au panier</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.buyNowButton}
          onPress={handleBuyNow}
        >
          <Text style={styles.buyNowText}>Acheter maintenant</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: COLORS.white,
    ...SHADOWS.small,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.text,
  },
  favoriteButton: {
    padding: 5,
  },
  imageSection: {
    position: "relative",
    height: 300,
  },
  productImage: {
    width: width,
    height: 300,
    resizeMode: "cover",
  },
  imageIndicators: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.5)",
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: COLORS.white,
  },
  promoBadge: {
    position: "absolute",
    top: 20,
    left: 20,
    backgroundColor: COLORS.error,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  promoBadgeText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: "bold",
  },
  productInfo: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: -25,
    paddingTop: 25,
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  productName: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: 10,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  currentPrice: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.primary,
    marginRight: 10,
  },
  originalPrice: {
    fontSize: 16,
    color: COLORS.gray,
    textDecorationLine: "line-through",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  stars: {
    flexDirection: "row",
    marginRight: 10,
  },
  ratingText: {
    fontSize: 14,
    color: COLORS.gray,
  },
  descriptionSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: COLORS.gray,
    lineHeight: 22,
  },
  featuresSection: {
    marginBottom: 20,
  },
  featureItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  featureLabel: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: "500",
  },
  featureValue: {
    fontSize: 14,
    color: COLORS.gray,
  },
  featuresList: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  featureTag: {
    backgroundColor: COLORS.lightGray,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    marginRight: 8,
    marginBottom: 8,
  },
  featureTagText: {
    fontSize: 12,
    color: COLORS.text,
  },
  quantitySection: {
    marginBottom: 20,
  },
  quantitySelector: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
  },
  quantityButton: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.lightGray,
  },
  quantityText: {
    marginHorizontal: 20,
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.text,
  },
  actionButtons: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: COLORS.white,
    ...SHADOWS.medium,
  },
  addToCartButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: COLORS.primary,
    marginRight: 10,
  },
  addToCartText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 8,
  },
  buyNowButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    borderRadius: 25,
    backgroundColor: COLORS.primary,
    marginLeft: 10,
  },
  buyNowText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "600",
  },
});

export default ProductDetailScreen;