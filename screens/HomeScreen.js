import { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Alert } from "react-native";
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

  const [errorType, setErrorType] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchComplaints();
  }, []);

  async function fetchComplaints() {
    try {
      setIsLoading(true);
      setErrorType(null);
      const response = await api.get("/complaints", {
        headers: {
          Authorization: `Bearer ${userContext.user.token}`,
        },
      });
      complaintsContext.setComplaints(response.data);
    } catch (error) {
      if (error.response?.status === 401) {
        setErrorType(ErrorType.SESSION_EXPIRED);
        Alert.alert(
          "Session Expired",
          "Your session has expired. Please login again.",
          [
            {
              text: "OK",
              onPress: () => {
                userContext.clearUser();
              },
            },
          ]
        );
      } else {
        setErrorType(ErrorType.OTHER);
      }
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size={64} color="#4b49ac" />
      </View>
    );
  }

  if (errorType === ErrorType.SESSION_EXPIRED) {
    return (
      <View style={styles.center}>
        <Text>Your session has expired.</Text>
        <Text>Please login again.</Text>
      </View>
    );
  }

  if (errorType === ErrorType.OTHER) {
    return (
      <View style={styles.center}>
        <Text>Something went wrong.</Text>
        <Text>Make sure you are connected to the internet.</Text>
        <Button
          onPress={fetchComplaints}
          iconRight="refresh"
          style={styles.refreshButton}
        >
          Refresh
        </Button>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.root} edges={["bottom"]}>
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
          style={styles.newComplaintButton}
        >
          {complaintsContext.complaints.length > 0
            ? "Add new complaint"
            : "Register a complaint"}
        </Button>
      </View>
    </SafeAreaView>
  );
}

const ErrorType = {
  SESSION_EXPIRED: "SESSION_EXPIRED",
  OTHER: "OTHER",
};

export default HomeScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#98bdff",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#98bdff",
  },
  container: {
    flex: 1,
    padding: 8,
  },
  newComplaintButton: {
    backgroundColor: "#f3797e",
    alignSelf: "center",
    marginVertical: 8,
  },
  refreshButton: {
    backgroundColor: "#f3797e",
    marginTop: 16,
    padding: 8,
  },
});
