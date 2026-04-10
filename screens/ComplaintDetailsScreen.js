import { useRef, useState, useEffect, useLayoutEffect } from "react";
import { View, ScrollView, StyleSheet, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { reverseGeocode } from "../utils";

function ComplaintDetailsScreen({ navigation, route }) {
  const { complaint } = route.params;

  const mapRef = useRef(null);
  const [address, setAddress] = useState("");

  useEffect(() => {
    async function getAddress() {
      const result = await reverseGeocode(
        complaint.latitude,
        complaint.longitude,
      );
      setAddress(result);
    }

    getAddress();
  }, []);

  useEffect(() => {
    const coords = {
      latitude: complaint.latitude,
      longitude: complaint.longitude,
    };

    const timer = setTimeout(() => {
      if (mapRef.current) {
        mapRef.current.animateToRegion(
          {
            ...coords,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          },
          2000,
        );
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [complaint]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: complaint.title || "Untitled",
    });
  }, [navigation, complaint]);

  return (
    <SafeAreaView style={styles.root} edges={["bottom"]}>
      <ScrollView>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: complaint.finalImageUri ?? complaint.imageUri,
            }}
            style={styles.image}
          />
        </View>

        <View style={styles.textContainer}>
          <Text>{complaint.description}</Text>
          <Text style={{ marginVertical: 16 }}>
            <Text style={{ fontWeight: "bold" }}>Category: </Text>
            {complaint.category || "Uncategorized"}
          </Text>
          <Text>
            <Text style={{ fontWeight: "bold" }}>Status: </Text>
            {complaint.status || "Unspecified"}
          </Text>
        </View>

        <View style={styles.locationContainer}>
          <View style={styles.mapContainer}>
            <MapView
              ref={mapRef}
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              initialRegion={{
                latitude: complaint.latitude,
                longitude: complaint.longitude,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
              }}
            >
              <Marker
                coordinate={{
                  latitude: complaint.latitude,
                  longitude: complaint.longitude,
                }}
                title={complaint.title}
              />
            </MapView>
          </View>
          {address && (
            <Text style={styles.location}>
              <Text style={{ fontWeight: "bold" }}>Location: </Text>
              {address}
            </Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default ComplaintDetailsScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#98bdff",
  },
  imageContainer: {
    alignItems: "center",
    margin: 12,
  },
  image: {
    height: 200,
    width: "100%",
    resizeMode: "cover",
    borderRadius: 8,
  },
  textContainer: {
    margin: 16,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  status: {
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  locationContainer: {
    alignItems: "center",
    margin: 16,
  },
  mapContainer: {
    bottom: 0,
    width: "100%",
    height: 200,
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "#fff",
    elevation: 5,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  location: {
    margin: 10,
  },
});
