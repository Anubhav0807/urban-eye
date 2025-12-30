import { useContext, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  ImageBackground,
  Alert,
  Keyboard,
  useWindowDimensions,
} from "react-native";

import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";

import ButtonPair from "../components/ButtonPair";
import { inputStyle } from "../components/sharedStyles";

import { UserContext } from "../store/user-context";

import api from "../api";

function AuthScreen() {
  const insets = useSafeAreaInsets(); // Make sure to wrape the App in <SafeAreaProvider>
  const { height, width } = useWindowDimensions();

  const cardRef = useRef(null);
  const [cardPos, setCardPos] = useState({ x: 0, y: 0 });

  const userContext = useContext(UserContext);
  const [isLoggingOn, setIsLoggingOn] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function loginHandler() {
    Keyboard.dismiss();
    setIsLoggingOn(true);
    const response = await api.post("/auth/login", {
      username: username,
      password: password,
    });
    setIsLoggingOn(false);

    const user = { username: username, token: response.data };
    userContext.setUser(user);
    try {
      await AsyncStorage.setItem("user", JSON.stringify(user));
    } catch (e) {
      console.log("Error storing token:", e);
    }
  }

  async function signupHandler() {
    Keyboard.dismiss();
    setIsSigningUp(true);
    await api.post("/auth/signup", {
      username: username,
      password: password,
    });
    setIsSigningUp(false);

    Alert.alert(
      "Signup Successful",
      "Your account has been created, you may login now."
    );
  }

  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/skyscrapers.jpg")}
    >
      <SafeAreaView style={styles.root} edges={["bottom"]}>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          enableOnAndroid={true}
        >
          <View
            ref={cardRef}
            style={styles.card}
            onLayout={() => {
              cardRef.current?.measureInWindow((x, y) => {
                setCardPos({ x: -x, y: -(y + insets.top) });
              });
            }}
          >
            <ImageBackground
              source={require("../assets/skyscrapers.jpg")}
              imageStyle={{
                height: height,
                width: width,
                position: "absolute",
                top: cardPos.y,
                left: cardPos.x,
              }}
              blurRadius={10}
            >
              <View style={styles.container}>
                <View style={styles.header}>
                  <Text style={styles.title}>Urban Eye</Text>
                  <Text>Your eyes Our service</Text>
                </View>
                <TextInput
                  style={inputStyle}
                  placeholder="Username"
                  value={username}
                  onChangeText={setUsername}
                  cursorColor="black"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <TextInput
                  style={inputStyle}
                  placeholder="Password"
                  value={password}
                  onChangeText={setPassword}
                  cursorColor="black"
                  autoCapitalize="none"
                  autoCorrect={false}
                  secureTextEntry={true}
                />
                <ButtonPair
                  style={styles.buttonPair}
                  primaryBtn={{
                    text: "Login",
                    action: loginHandler,
                    isLoading: isLoggingOn,
                  }}
                  secondaryBtn={{
                    text: "Signup",
                    action: signupHandler,
                    isLoading: isSigningUp,
                  }}
                />
              </View>
            </ImageBackground>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

export default AuthScreen;

export const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
  card: {
    borderRadius: 12,
    overflow: "hidden",
  },
  container: {
    alignItems: "center",
    padding: 16,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  header: {
    marginBottom: 16,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "500",
  },
  buttonPair: {
    marginTop: 10,
  },
});
