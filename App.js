import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import NavigationRoot from "./components/NavigationRoot";

import UserContextProvider from "./store/user-context";

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar />
      <UserContextProvider>
        <NavigationRoot />
      </UserContextProvider>
    </SafeAreaProvider>
  );
}
