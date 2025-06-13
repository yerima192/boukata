import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

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

const CheckoutScreen = ({ navigation }) => {
  const { items, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  
  const [deliveryAddress, setDeliveryAddress] = useState(user?.address || "");
  const [phoneNumber, setPhoneNumber] = useState(user?.phone || "");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("mobile");
  const [selectedDeliveryOption, setSelectedDeliveryOption] = useState("delivery");
  const [notes, setNotes] = useState("");

  const deliveryFee = selectedDeliveryOption === "delivery" ? 1000 : 0;
  const total = getCartTotal() + deliveryFee;

  const paymentMethods = [
    {
      id: "mobile",
      name: "Mobile Money",
      icon: "mobile-alt",
      iconFamily: "FontAwesome5",
      description: "Orange Money, Moov Money, Airtel Money",
    },
    {
      id: "card",
      name: "Carte bancaire",
      icon: "credit-card",
      iconFamily: "FontAwesome5",
      description: "Visa, Mastercard",
    },
    {
      id: "cash",
      name: "Paiement à la livraison",
      icon: "money-bill-wave",
      iconFamily: "FontAwesome5",
      description: "Espèces uniquement",
    },
  ];

  const deliveryOptions = [
    {
      id: "delivery",
      name: "Livraison à domicile",
      icon: "local-shipping",
      iconFamily: "MaterialIcons",
      price: 1000,
      time: "30-45 min",
    },
    {
      id: "pickup",
      name: "Retrait en magasin",
      icon: "store",
      iconFamily: "MaterialIcons",
      price: 0,
      time: "15-20 min",
    },
  ];

  const handlePlaceOrder = () => {
    if (!deliveryAddress && selectedDeliveryOption === "delivery") {
      Alert.alert("Erreur", "Veuillez saisir votre adresse de livraison");
      return;
    }

    if (!phoneNumber) {
      Alert.alert("Erreur", "Veuillez saisir votre numéro de téléphone");
      return;
    }

    Alert.alert(
      "Commande confirmée",
      `Votre commande de ${total.toFixed(2)} FCFA a été confirmée.\n\nVous recevrez un SMS de confirmation.`,
      [
        {
          text: "OK",
          onPress: () => {
            clearCart();
            navigation.navigate("OrderSuccess");
          },
        },
      ]
    );
  };

  const renderIcon = (iconName, iconFamily, size = 24, color = COLORS.primary) => {
    switch (iconFamily) {
      case "MaterialIcons":
        return <MaterialIcons name={iconName} size={size} color={color} />;
      case "FontAwesome5":
        return <FontAwesome5 name={iconName} size={size} color={color} />;
      default:
        return <MaterialIcons name={iconName} size={size} color={color} />;
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <SafeAreaView style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Finaliser la commande</Text>
        <View style={styles.placeholder} />
      </SafeAreaView>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Options de livraison */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mode de livraison</Text>
          {deliveryOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.optionCard,
                selectedDeliveryOption === option.id && styles.selectedOption,
              ]}
              onPress={() => setSelectedDeliveryOption(option.id)}
            >
              <View style={styles.optionLeft}>
                {renderIcon(option.icon, option.iconFamily)}
                <View style={styles.optionInfo}>
                  <Text style={styles.optionName}>{option.name}</Text>
                  <Text style={styles.optionDetails}>
                    {option.price > 0 ? `${option.price} FCFA` : "Gratuit"} • {option.time}
                  </Text>
                </View>
              </View>
              <View style={styles.radioButton}>
                {selectedDeliveryOption === option.id && (
                  <View style={styles.radioButtonInner} />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Adresse de livraison */}
        {selectedDeliveryOption === "delivery" && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Adresse de livraison</Text>
            <TextInput
              style={styles.textInput}
              value={deliveryAddress}
              onChangeText={setDeliveryAddress}
              placeholder="Entrez votre adresse complète"
              multiline
              numberOfLines={3}
            />
          </View>
        )}

        {/* Numéro de téléphone */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Numéro de téléphone</Text>
          <TextInput
            style={styles.textInput}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholder="+227 90 00 00 00"
            keyboardType="phone-pad"
          />
        </View>

        {/* Méthodes de paiement */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mode de paiement</Text>
          {paymentMethods.map((method) => (
            <TouchableOpacity
              key={method.id}
              style={[
                styles.optionCard,
                selectedPaymentMethod === method.id && styles.selectedOption,
              ]}
              onPress={() => setSelectedPaymentMethod(method.id)}
            >
              <View style={styles.optionLeft}>
                {renderIcon(method.icon, method.iconFamily)}
                <View style={styles.optionInfo}>
                  <Text style={styles.optionName}>{method.name}</Text>
                  <Text style={styles.optionDescription}>{method.description}</Text>
                </View>
              </View>
              <View style={styles.radioButton}>
                {selectedPaymentMethod === method.id && (
                  <View style={styles.radioButtonInner} />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Notes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notes (optionnel)</Text>
          <TextInput
            style={[styles.textInput, styles.notesInput]}
            value={notes}
            onChangeText={setNotes}
            placeholder="Instructions spéciales pour la livraison..."
            multiline
            numberOfLines={3}
          />
        </View>

        {/* Résumé de la commande */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Résumé de la commande</Text>
          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Sous-total ({items.length} articles)</Text>
              <Text style={styles.summaryValue}>{getCartTotal().toFixed(2)} FCFA</Text>
            </View>
            
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Frais de livraison</Text>
              <Text style={styles.summaryValue}>
                {deliveryFee > 0 ? `${deliveryFee.toFixed(2)} FCFA` : "Gratuit"}
              </Text>
            </View>
            
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>{total.toFixed(2)} FCFA</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bouton de commande */}
      <View style={styles.footer}>
        <LinearGradient
          colors={[COLORS.primary, "#000066"]}
          style={styles.orderButton}
        >
          <TouchableOpacity
            style={styles.orderButtonContent}
            onPress={handlePlaceOrder}
          >
            <Text style={styles.orderButtonText}>
              Confirmer la commande • {total.toFixed(2)} FCFA
            </Text>
          </TouchableOpacity>
        </LinearGradient>
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
  placeholder: {
    width: 34,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginVertical: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 15,
  },
  optionCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "transparent",
    ...SHADOWS.small,
  },
  selectedOption: {
    borderColor: COLORS.primary,
    backgroundColor: "rgba(1,0,128,0.05)",
  },
  optionLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  optionInfo: {
    marginLeft: 15,
    flex: 1,
  },
  optionName: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 3,
  },
  optionDetails: {
    fontSize: 14,
    color: COLORS.gray,
  },
  optionDescription: {
    fontSize: 12,
    color: COLORS.gray,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },
  textInput: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    textAlignVertical: "top",
  },
  notesInput: {
    height: 80,
  },
  summaryCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 20,
    ...SHADOWS.small,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 14,
    color: COLORS.gray,
  },
  summaryValue: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: "500",
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
    paddingTop: 15,
    marginTop: 10,
    marginBottom: 0,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text,
  },
  totalValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: COLORS.white,
    ...SHADOWS.medium,
  },
  orderButton: {
    borderRadius: 25,
    overflow: "hidden",
  },
  orderButtonContent: {
    paddingVertical: 15,
    alignItems: "center",
  },
  orderButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CheckoutScreen;