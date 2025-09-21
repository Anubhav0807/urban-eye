import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Button from "../components/Button";
import Greeting from "../components/Greeting";

function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <Greeting />
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Button
          onPress={() => {
            navigation.navigate("ComplaintForm");
          }}
          iconRight="arrow-forward-circle"
          style={styles.button}
        >
          Register a complaint
        </Button>
      </View>
    </SafeAreaView>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#cecece",
  },
});
