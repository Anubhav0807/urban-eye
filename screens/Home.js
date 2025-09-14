import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Button from "../components/Button";
import Greeting from "../components/Greeting";

function Home({ navigation }) {
  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <Greeting />
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Button
          onPress={() => {
            navigation.navigate("ComplaintForm");
          }}
        >
          Register a complaint
        </Button>
      </View>
    </SafeAreaView>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
