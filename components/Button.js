import { Pressable, View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function Button({ children, onPress, iconLeft, iconRight, iconSize, style }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={[styles.container, style]}>
        {iconLeft && <Ionicons name={iconLeft} size={iconSize ?? 28} />}
        <Text style={styles.label}>{children}</Text>
        {iconRight && <Ionicons name={iconRight} size={iconSize ?? 28} />}
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
  },
  pressed: {
    opacity: 0.75,
  },
});
