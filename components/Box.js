import { View, StyleSheet } from "react-native";

function Box({ children, picked }) {
  return (
    <View style={[styles.container, picked && { borderStyle: "solid" }]}>
      {children}
    </View>
  );
}

export default Box;

const styles = StyleSheet.create({
  container: {
    height: 158,
    width: 280,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderStyle: "dashed",
    borderRadius: 12,
    marginVertical: 16,
    backgroundColor: "#00000011",
    overflow: "hidden",
  },
});
