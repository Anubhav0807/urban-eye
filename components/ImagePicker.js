import { View, StyleSheet, Image } from "react-native";
import {
  PermissionStatus,
  useCameraPermissions,
  useMediaLibraryPermissions,
  launchCameraAsync,
  launchImageLibraryAsync,
} from "expo-image-picker";

import Button from "./Button";
import Box from "./Box";

function ImagePicker({ pickedImage, setPickedImage }) {
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [mediaPermission, requestMediaPermission] =
    useMediaLibraryPermissions();

  const imageOptions = {
    allowsEditing: true,
    aspect: [16, 9],
    quality: 0.5,
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

  function updateImage(image) {
    setPickedImage({
      uri: image.assets[0].uri,
      type: image.assets[0].mimeType,
      name: "photo.jpg",
    });
  }

  async function takeImageHandler() {
    const hasPermission = await verifyCameraPermissions();

    if (!hasPermission) {
      return;
    }

    const image = await launchCameraAsync(imageOptions);

    if (!image.canceled) {
      updateImage(image);
    }
  }

  async function uploadImageHandler() {
    const hasPermission = await verifyMediaPermissions();

    if (!hasPermission) {
      return;
    }

    const image = await launchImageLibraryAsync(imageOptions);

    if (!image.canceled) {
      updateImage(image);
    }
  }

  return (
    <Box picked={!!pickedImage}>
      {pickedImage ? (
        <Image
          source={{ uri: pickedImage.uri }}
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
    </Box>
  );
}

export default ImagePicker;

const styles = StyleSheet.create({
  image: {
    height: "100%",
    width: "100%",
  },
});
