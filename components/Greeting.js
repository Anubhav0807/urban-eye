import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  RefreshControl,
} from "react-native";
import BlinkingEye from "./BlinkingEye";

function Greeting({ refreshing, onRefresh }) {
  return (
    <ScrollView
      style={{ flex: 1 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.container}>
        <Text style={styles.text}>
          Welcome to <Text style={styles.title}>Urban Eye</Text>!
        </Text>
        <Text style={styles.text}>Your own complaint forum!</Text>
        <BlinkingEye style={styles.image} />
      </View>
    </ScrollView>
  );
}

export default Greeting;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: 152,
  },
  text: {
    fontSize: 24,
    textAlign: "center"
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
