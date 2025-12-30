import { useContext } from "react";
import { View, Text, StyleSheet, Modal, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Button from "../components/Button";

import { UserContext } from "../store/user-context";

function ProfileMenu({ isModalVisible, onClose }) {
  const userContext = useContext(UserContext);

  async function logout() {
    onClose();
    userContext.clearUser();
    try {
      await AsyncStorage.removeItem("user");
    } catch (e) {
      console.log("Error clearing token", e);
    }
  }

  return (
    <Modal visible={isModalVisible} transparent>
      <Pressable style={styles.overlay} onPress={onClose} />
      <View style={styles.container}>
        <Text style={styles.username}>
          {titleCase(userContext.user.username)}
        </Text>
        <Button style={styles.button} iconRight="exit" onPress={logout}>
          Logout
        </Button>
      </View>
    </Modal>
  );
}

function titleCase(word) {
  if (!word) return "";
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

export default ProfileMenu;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
  },
  container: {
    position: "absolute",
    top: 72,
    right: 24,
    backgroundColor: "#7da0fa",
    borderRadius: 12,
    borderTopRightRadius: 0,
    padding: 16,
  },
  username: {
    marginHorizontal: 20,
    fontWeight: "500",
  },
  button: {
    marginTop: 8,
    paddingVertical: 4,
    justifyContent: "center",
    backgroundColor: "#f3797e",
  },
});
