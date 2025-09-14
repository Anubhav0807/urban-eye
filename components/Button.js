import { Pressable, View, Text, StyleSheet } from "react-native";

function Button({ children, onPress, style }) {
  return (
    <View style={style}>
      <Pressable onPress={onPress}>
        <View style={styles.button}>
          <Text>{children}</Text>
        </View>
      </Pressable>
    </View>
  );
}

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#cecece",
    padding: 12,
    borderRadius: 12,
  },
});
