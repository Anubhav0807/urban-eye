import { useContext, useEffect } from "react";
import { View, Text, StyleSheet, Pressable, BackHandler } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Button from "../components/Button";

import { UserContext } from "../store/user-context";

function ProfileMenu({ isModalVisible, onClose }) {
  const userContext = useContext(UserContext);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    function onBackPress() {
      if (isModalVisible) {
        onClose();
        return true;
      } else {
        return false;
      }
    }

    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      onBackPress,
    );

    return () => subscription.remove();
  }, [isModalVisible]);

  if (!isModalVisible) return null;

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
    <View style={StyleSheet.absoluteFill}>
      <Pressable
        style={[styles.overlay, { paddingTop: insets.top }]}
        onPress={onClose}
      />

      <View style={[styles.container, { top: insets.top + 48 }]}>
        <Text style={styles.username}>
          {titleCase(userContext.user.username)}
        </Text>

        <Button style={styles.button} iconRight="exit" onPress={logout}>
          Logout
        </Button>
      </View>
    </View>
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
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  container: {
    position: "absolute",
    right: 42,
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
