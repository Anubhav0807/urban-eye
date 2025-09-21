import { Text, View, StyleSheet } from "react-native";
import BlinkingEye from "./BlinkingEye";

function Greeting() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Welcome to <Text style={styles.title}>Urban Eye</Text>!
      </Text>
      <Text style={styles.text}>Your own complaint forum!</Text>
      <BlinkingEye style={styles.image}/>
    </View>
  );
}

export default Greeting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 32,
  },
  text: {
    fontSize: 24,
  },
  title: {
    fontWeight: "bold",
  },
  image: {
    height: 94,
    width: 200,
    marginTop: 60,
  },
});
