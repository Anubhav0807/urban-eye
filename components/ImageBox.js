import { View, StyleSheet, Image } from "react-native";
import {
  PermissionStatus,
  useCameraPermissions,
  useMediaLibraryPermissions,
  launchCameraAsync,
  launchImageLibraryAsync,
} from "expo-image-picker";

import Button from "./Button";
import { useState } from "react";

function ImageBox() {
  const [pickedImage, setPickedImage] = useState();
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [mediaPermission, requestMediaPermission] =
    useMediaLibraryPermissions();

  const imageOptions = {
    allowsEditing: true,
    aspect: [16, 9],
  };

  async function verifyCameraPermissions() {
    if (cameraPermission.status !== PermissionStatus.GRANTED) {
      const permissionResponse = await requestCameraPermission();
      return permissionResponse.granted;
    }

    return true;
  }

  async function verifyMediaPermissions() {
    if (mediaPermission.status !== PermissionStatus.GRANTED) {
      const permissionResponse = await requestMediaPermission();
      return permissionResponse.granted;
    }

    return true;
  }

  async function takeImageHandler() {
    const hasPermission = await verifyCameraPermissions();

    if (!hasPermission) {
      return;
    }

    const image = await launchCameraAsync(imageOptions);

    if (!image.canceled) {
      setPickedImage(image.assets[0].uri);
    }
  }

  async function uploadImageHandler() {
    const hasPermission = await verifyMediaPermissions();

    if (!hasPermission) {
      return;
    }

    const image = await launchImageLibraryAsync(imageOptions);

    if (!image.canceled) {
      setPickedImage(image.assets[0].uri);
    }
  }

  return (
    <View style={[styles.container, pickedImage && { borderStyle: "solid" }]}>
      {pickedImage ? (
        <Image
          source={{ uri: pickedImage }}
          resizeMode="cover"
          style={styles.image}
        />
      ) : (
        <View>
          <Button iconLeft="camera" onPress={takeImageHandler}>
            Take a picture
          </Button>
          <Button iconLeft="folder" onPress={uploadImageHandler}>
            Upload an image
          </Button>
        </View>
      )}
    </View>
  );
}

export default ImageBox;

const styles = StyleSheet.create({
  container: {
    height: 158,
    width: 280,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderStyle: "dashed",
    borderRadius: 12,
    margin: 32,
    backgroundColor: "#00000011",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
});
