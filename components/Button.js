import {
  Pressable,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

function Button({
  children,
  onPress,
  isLoading,
  iconLeft,
  iconRight,
  color,
  size,
  style,
}) {
  if (isLoading) {
    return (
      <View style={[styles.container, style]}>
        <ActivityIndicator color={color} size={size} />
      </View>
    );
  }

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={[styles.container, style]}>
        {iconLeft && (
          <Ionicons name={iconLeft} color={color} size={size ?? 28} />
        )}
        {children && (
          <Text style={[styles.label, { color: color, size: size }]}>
            {children}
          </Text>
        )}
        {iconRight && (
          <Ionicons name={iconRight} color={color} size={size ?? 28} />
        )}
      </View>
    </Pressable>
  );
}

export default Button;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 12,
  },
  label: {
    marginHorizontal: 8,
    color: "black"
  },
  pressed: {
    opacity: 0.75,
  },
});
