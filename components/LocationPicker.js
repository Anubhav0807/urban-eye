import { useState, useRef, useEffect } from "react";
import { StyleSheet, ActivityIndicator, View, Text, Alert } from "react-native";
import MapView, { UrlTile, Marker } from "react-native-maps";
import {
  getCurrentPositionAsync,
  getForegroundPermissionsAsync,
  requestForegroundPermissionsAsync,
  PermissionStatus,
} from "expo-location";

import Box from "./Box";
import Button from "./Button";

function LocationPicker({ pickedLocation, setPickedLocation }) {
  const mapRef = useRef(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setError(null);
    setIsLoading(false);
  }, [pickedLocation]);

  async function verifyLocationPermission() {
    try {
      // Check existing permission
      let { status } = await getForegroundPermissionsAsync();

      // Ask again only if not already granted
      if (status !== PermissionStatus.GRANTED) {
        const permissionResponse = await requestForegroundPermissionsAsync();
        status = permissionResponse.status;
      }

      // Final check
      if (status !== PermissionStatus.GRANTED) {
        Alert.alert(
          "Permission denied",
          "Location permission is required to fetch your current location."
        );
        return false;
      }

      return true;
    } catch (err) {
      console.error("Permission error:", err);
      return false;
    }
  }

  async function getCurrentLocation() {
    setIsLoading(true);
    try {
      const hasPermission = await verifyLocationPermission();
      if (!hasPermission) {
        setError("Location permission not granted");
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
      setError("Failed to fetch location");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Box picked={!!pickedLocation}>
      {pickedLocation ? (
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: pickedLocation.latitude,
            longitude: pickedLocation.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          <UrlTile
            urlTemplate="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            maximumZ={19}
            flipY={false}
            subdomains={["a", "b", "c"]}
          />
          <Marker coordinate={pickedLocation} title="Picked Location" />
        </MapView>
      ) : isLoading ? (
        <ActivityIndicator size={32} />
      ) : error ? (
        <View style={styles.center}>
          <Text>{error}</Text>
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
