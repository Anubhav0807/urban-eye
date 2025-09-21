import { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import ImagePicker from "../components/ImagePicker";
import LocationPicker from "../components/LocationPicker";
import Description from "../components/Description";
import Button from "../components/Button";

function ComplaintForm() {
  const [pickedImage, setPickedImage] = useState(null);
  const [pickedLocation, setPickedLocation] = useState(null);
  const [description, setDescription] = useState({
    title: "",
    description: "",
  });

  async function handleSubmit() {
    if (!pickedImage || !pickedLocation || !description) {
      Alert.alert("Error", "Please fill all fields before submitting!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("imageFile", pickedImage);
      formData.append("title", description.title);
      formData.append("description", description.description);
      formData.append("latitude", pickedLocation.latitude);
      formData.append("longitude", pickedLocation.longitude);

      const response = await fetch("https://httpbin.org/post", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        Alert.alert("Success", "Complaint submitted!");
      } else {
        Alert.alert("Error", `Submission failed: ${response.status}`);
      }
    } catch (error) {
      console.error("Submission error:", error);
      Alert.alert("Error", "Failed to submit complaint.");
    }
  }

  function handleReset() {
    setPickedImage(null);
    setPickedLocation(null);
    setDescription({
      title: "",
      description: "",
    });
  }

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollContent}
        enableOnAndroid={true}
      >
        <View style={styles.container}>
          <ImagePicker
            pickedImage={pickedImage}
            setPickedImage={setPickedImage}
          />
          <LocationPicker
            pickedLocation={pickedLocation}
            setPickedLocation={setPickedLocation}
          />
          <Description
            description={description}
            setDescription={setDescription}
          />
          <View style={styles.buttonsContainer}>
            <Button style={styles.button} onPress={handleReset}>
              Reset
            </Button>
            <Button style={styles.button} onPress={handleSubmit}>
              Submit
            </Button>
          </View>
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
  buttonsContainer: {
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 40,
    gap: 20,
  },
  button: {
    justifyContent: "center",
    backgroundColor: "#cecece",
    width: 100,
  },
});
