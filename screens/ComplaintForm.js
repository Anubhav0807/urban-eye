import { useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import api from "../api";
import { ComplaintsContext } from "../store/complaints-context";

import ImagePicker from "../components/ImagePicker";
import LocationPicker from "../components/LocationPicker";
import Description from "../components/Description";
import Button from "../components/Button";

function ComplaintForm() {
  const complaintsContext = useContext(ComplaintsContext);
  const navigation = useNavigation();
  const [isSubmitting, setIsSubmitting] = useState(false);
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

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("imageFile", pickedImage);
      formData.append("title", description.title);
      formData.append("description", description.description);
      formData.append("latitude", pickedLocation.latitude);
      formData.append("longitude", pickedLocation.longitude);

      const response = await api.post("/complaint", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const newComplaint = response.data;

      Alert.alert("Success", "Complaint submitted!", [
        {
          text: "OK",
          onPress: () => {
            complaintsContext.addComplaint({
              id: newComplaint.id,
              imageUri: pickedImage.uri,
              title: description.title,
              description: description.description,
              category: newComplaint.category,
              latitude: pickedLocation.latitude,
              longitude: pickedLocation.longitude,
            });
            navigation.goBack();
          },
        },
      ]);
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
    <SafeAreaView style={styles.root} edges={["bottom"]}>
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
            <Button
              style={[styles.button, styles.resetBtn]}
              onPress={handleReset}
            >
              Reset
            </Button>
            <Button
              style={[styles.button, styles.submitBtn]}
              onPress={handleSubmit}
              color="white"
              isLoading={isSubmitting}
            >
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
  root: {
    flex: 1,
    backgroundColor: "#98bdff",
  },
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
    width: 100,
  },
  submitBtn: {
    backgroundColor: "#7978e9",
  },
  resetBtn: {
    backgroundColor: "#f3797e",
  },
});
