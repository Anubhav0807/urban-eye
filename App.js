import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./screens/HomeScreen";
import ComplaintForm from "./screens/ComplaintForm";

import Button from "./components/Button";
import ProfileMenu from "./components/ProfileMenu";

const Stack = createStackNavigator();

export default function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  function toggleProfileMenu() {
    setIsModalVisible((curState) => !curState);
  }

  return (
    <>
      <StatusBar />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerRight: () => (
              <>
                <Button
                  iconLeft="person-circle"
                  iconSize={36}
                  onPress={toggleProfileMenu}
                />
                <ProfileMenu
                  isModalVisible={isModalVisible}
                  onClose={toggleProfileMenu}
                />
              </>
            ),
            headerStyle: { backgroundColor: "cyan" },
          }}
        >
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{ title: "Urban Eye" }}
          />
          <Stack.Screen
            name="ComplaintForm"
            component={ComplaintForm}
            options={{ title: "New Complain" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
