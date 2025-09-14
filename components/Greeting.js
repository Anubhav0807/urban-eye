import { Text, View, StyleSheet } from "react-native";

function Greeting() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Urban Eye!</Text>
      <Text style={styles.text}>Your own complaint forum!</Text>
    </View>
  );
}

export default Greeting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
  },
});
