import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import ImageBox from "../components/ImageBox";
import DescriptionBox from "../components/DescriptionBox";
import Button from "../components/Button";

function ComplaintForm() {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollContent}
        enableOnAndroid={true}
      >
        <View style={styles.container}>
          <ImageBox />
          <DescriptionBox />
          <Button style={styles.button}>Submit</Button>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

export default ComplaintForm;

export const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
  container: {
    alignItems: "center",
  },
  button: {
    marginTop: 20,
    marginBottom: 40,
  },
});
