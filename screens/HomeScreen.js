import { useContext, useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import api from "../api";
import { ComplaintsContext } from "../store/complaints-context";

import Button from "../components/Button";
import Greeting from "../components/Greeting";
import ComplaintList from "../components/ComplaintList";

function HomeScreen({ navigation }) {
  const complaintsContext = useContext(ComplaintsContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchComplaints();
  }, []);

  async function fetchComplaints() {
    const response = await api.get("/complaints");
    complaintsContext.setComplaints(response.data);
    setIsLoading(false);
  }

  return (
    <SafeAreaView style={styles.root} edges={["bottom"]}>
      {isLoading ? (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator size={64} color="#4b49ac" />
        </View>
      ) : (
        <View style={styles.container}>
          {complaintsContext.complaints.length > 0 ? (
            <ComplaintList />
          ) : (
            <Greeting />
          )}
          <Button
            onPress={() => {
              navigation.navigate("ComplaintForm");
            }}
            iconRight="arrow-forward-circle"
            style={styles.button}
          >
            {complaintsContext.complaints.length > 0
              ? "Add new complaint"
              : "Register a complaint"}
          </Button>
        </View>
      )}
    </SafeAreaView>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#98bdff",
  },
  container: {
    flex: 1,
    padding: 8,
  },
  button: {
    backgroundColor: "#f3797e",
    alignSelf: "center",
    marginVertical: 8,
  },
});
