import { useContext, useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import AuthScreen from "../screens/AuthScreen";
import HomeScreen from "../screens/HomeScreen";
import ComplaintDetailsScreen from "../screens/ComplaintDetailsScreen";
import NewComplaintScreen from "../screens/NewComplaintScreen";

import Button from "./Button";
import ProfileMenu from "./ProfileMenu";

import ComplaintsContextProvider from "../store/complaints-context";
import { UserContext } from "../store/user-context";

const Stack = createStackNavigator();

function NavigationRoot() {
  const userContext = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const loadToken = async () => {
      try {
        const user = await AsyncStorage.getItem("user");
        userContext.setUser(JSON.parse(user));
      } catch (e) {
        console.log("Error getting token", e);
      } finally {
        setIsLoading(false);
      }
    };
    loadToken();
  }, []);

  function toggleProfileMenu() {
    setIsModalVisible((curState) => !curState);
  }

  if (isLoading) {
    return <View style={styles.blankScreen} />;
  }

  if (!userContext.user) {
    return <AuthScreen />;
  }

  return (
    <ComplaintsContextProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerRight: () => (
              <>
                <Button
                  iconLeft="person-circle"
                  color="#f3797e"
                  size={36}
                  onPress={toggleProfileMenu}
                />
              </>
            ),
            headerTintColor: "white",
            headerStyle: { backgroundColor: "#4b49ac" },
          }}
        >
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{ title: "Urban Eye" }}
          />
          <Stack.Screen
            name="ComplaintDetailsScreen"
            component={ComplaintDetailsScreen}
            options={{
              animation: "scale_from_center",
            }}
          />
          <Stack.Screen
            name="NewComplaintScreen"
            component={NewComplaintScreen}
            options={{ title: "New Complain" }}
          />
        </Stack.Navigator>

        <ProfileMenu
          isModalVisible={isModalVisible}
          onClose={toggleProfileMenu}
        />
      </NavigationContainer>
    </ComplaintsContextProvider>
  );
}

export default NavigationRoot;

const styles = StyleSheet.create({
  blankScreen: {
    flex: 1,
    justifyContent: "center",
  },
});
