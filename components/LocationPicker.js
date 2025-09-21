import { useState, useRef, useEffect } from "react";
import { StyleSheet, ActivityIndicator, View, Text } from "react-native";
import MapView, { UrlTile, Marker } from "react-native-maps";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";

import Box from "./Box";
import Button from "./Button";

function LocationPicker({ pickedLocation, setPickedLocation }) {
  const mapRef = useRef(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [locationPermission, requestLocationPermission] =
    useForegroundPermissions();

  useEffect(() => {
    setError(null);
    setIsLoading(null);
  }, [pickedLocation]);

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
            latitudeDelta: 30,
            longitudeDelta: 30,
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
      ) : error ? (
        <View style={styles.center}>
          <Text>{error}</Text>
        </View>
      ) : isLoading ? (
        <ActivityIndicator size={32} />
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
