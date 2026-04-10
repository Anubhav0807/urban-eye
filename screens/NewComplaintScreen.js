import { useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet, Alert, Keyboard } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import ImagePicker from "../components/ImagePicker";
import LocationPicker from "../components/LocationPicker";
import Description from "../components/Description";
import ButtonPair from "../components/ButtonPair";

import { ComplaintsContext } from "../store/complaints-context";
import { UserContext } from "../store/user-context";

import { uploadImage } from "../utils";
import api from "../api";

function NewComplaintScreen() {
  const complaintsContext = useContext(ComplaintsContext);
  const userContext = useContext(UserContext);

  const navigation = useNavigation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pickedImage, setPickedImage] = useState(null);
  const [pickedLocation, setPickedLocation] = useState(null);
  const [description, setDescription] = useState({
    title: "",
    description: "",
  });

  async function handleSubmit() {
    Keyboard.dismiss();

    if (
      !pickedImage ||
      !pickedLocation ||
      !description.title ||
      !description.description
    ) {
      Alert.alert("Error", "Please fill all fields before submitting!");
      return;
    }

    try {
      setIsSubmitting(true);

      const uploaded = await uploadImage(pickedImage.uri);

      if (uploaded == null) {
        Alert.alert(
          "Submission Failed",
          "Something went wrong during uploading the image.",
        );
        return;
      }

      const payload = {
        title: description.title,
        description: description.description,
        latitude: pickedLocation.latitude,
        longitude: pickedLocation.longitude,
        imageUri: uploaded.secure_url,
        publicId: uploaded.public_id,
      };

      const response = await api.post("/complaint", payload, {
        headers: {
          Authorization: `Bearer ${userContext.user.token}`,
        },
      });

      const newComplaint = response.data;

      Alert.alert("Success", "Complaint submitted!", [
        {
          text: "OK",
          onPress: () => {
            complaintsContext.addComplaint({
              id: newComplaint.id,
              imageUri: uploaded.secure_url,
              title: description.title,
              description: description.description,
              category: newComplaint.category,
              latitude: pickedLocation.latitude,
              longitude: pickedLocation.longitude,
              status: newComplaint.status,
            });
            navigation.goBack();
          },
        },
      ]);
    } catch (error) {
      if (error.response?.status === 401) {
        Alert.alert(
          "Submission Failed",
          "Your session has expired. Please login again.",
          [
            {
              text: "OK",
              onPress: () => {
                userContext.clearUser();
              },
            },
          ],
        );
      } else {
        Alert.alert(
          "Submission Failed",
          "Something went wrong. Make sure you are connected to the internet.",
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleReset() {
    Keyboard.dismiss();
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
        keyboardShouldPersistTaps="handled"
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
          <ButtonPair
            style={styles.buttonPair}
            primaryBtn={{
              text: "Submit",
              action: handleSubmit,
              isLoading: isSubmitting,
            }}
            secondaryBtn={{ text: "Reset", action: handleReset }}
          />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

export default NewComplaintScreen;

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
  buttonPair: {
    marginTop: 12,
    marginBottom: 32,
  },
});
