import { View, StyleSheet } from "react-native";

import Button from "./Button";

function ButtonPair({ primaryBtn, secondaryBtn, style }) {
  return (
    <View style={[styles.buttonsContainer, style]}>
      <Button
        style={[styles.button, styles.secondaryBtn]}
        onPress={secondaryBtn.action}
        isLoading={secondaryBtn.isLoading}
        color="black"
      >
        {secondaryBtn.text}
      </Button>
      <Button
        style={[styles.button, styles.primaryBtn]}
        onPress={primaryBtn.action}
        isLoading={primaryBtn.isLoading}
        color="white"
      >
        {primaryBtn.text}
      </Button>
    </View>
  );
}

export default ButtonPair;

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: "row",
    gap: 20,
  },
  button: {
    justifyContent: "center",
    width: 100,
  },
  primaryBtn: {
    backgroundColor: "#7978e9",
  },
  secondaryBtn: {
    backgroundColor: "#f3797e",
  },
});
