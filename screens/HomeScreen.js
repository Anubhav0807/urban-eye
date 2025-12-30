import { useContext, useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Button from "../components/Button";
import Greeting from "../components/Greeting";
import ComplaintList from "../components/ComplaintList";

import { ComplaintsContext } from "../store/complaints-context";
import { UserContext } from "../store/user-context";

import api from "../api";

function HomeScreen({ navigation }) {
  const complaintsContext = useContext(ComplaintsContext);
  const userContext = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchComplaints();
  }, []);

  async function fetchComplaints() {
    const response = await api.get("/complaints", {
      headers: {
        Authorization: `Bearer ${userContext.user.token}`,
      },
    });
    complaintsContext.setComplaints(response.data);
    setIsLoading(false);
  }

  return (
    <SafeAreaView style={styles.root} edges={["bottom"]}>
      {isLoading ? (
        <View style={styles.indicatorContainer}>
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
              navigation.navigate("NewComplaintScreen");
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
  indicatorContainer: {
    flex: 1,
    justifyContent: "center",
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
