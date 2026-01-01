import { useState, useRef, useEffect } from "react";
import { StyleSheet, ActivityIndicator, View, Text } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";

import Box from "./Box";
import Button from "./Button";

function LocationPicker({ pickedLocation, setPickedLocation }) {
  const mapRef = useRef(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [locationPermission, requestLocationPermission] =
    useForegroundPermissions();

  async function verifyLocationPermission() {
    if (
      !locationPermission ||
      locationPermission.status !== PermissionStatus.GRANTED
    ) {
      const permissionResponse = await requestLocationPermission();
      return permissionResponse.granted;
    }
    return true;
  }

  async function getCurrentLocation() {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const hasPermission = await verifyLocationPermission();
      if (!hasPermission) {
        setErrorMsg("Location permission not granted");
        setIsLoading(false);
        return;
      }

      const location = await getCurrentPositionAsync();
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setPickedLocation(coords);

      // Trigger zoom-in animation after small delay
      setTimeout(() => {
        if (mapRef.current) {
          mapRef.current.animateToRegion(
            {
              ...coords,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            },
            2000
          );
        }
      }, 500);
    } catch (err) {
      setErrorMsg("Failed to fetch location");
      console.errorMsg(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Box picked={!!pickedLocation}>
      {pickedLocation ? (
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: pickedLocation.latitude,
            longitude: pickedLocation.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          <Marker coordinate={pickedLocation} title="Picked Location" />
        </MapView>
      ) : isLoading ? (
        <ActivityIndicator size={32} color="#4b49ac" />
      ) : errorMsg ? (
        <View style={styles.center}>
          <Text>{errorMsg}</Text>
          <Button iconRight="refresh" onPress={getCurrentLocation} />
        </View>
      ) : (
        <Button iconLeft="locate" onPress={getCurrentLocation}>
          Current Location
        </Button>
      )}
    </Box>
  );
}

export default LocationPicker;

const styles = StyleSheet.create({
  map: {
    height: "100%",
    width: "100%",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
