import { useEffect, useLayoutEffect, useRef, useState } from "react";

import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  Animated,
  Pressable,
  BackHandler,
  useWindowDimensions,
} from "react-native";

import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import MaskedView from "@react-native-masked-view/masked-view";

import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { reverseGeocode } from "../utils";

const MAP_RADIUS = 200;
const ANIMATION_DURATION = 500;
const DELTA = 0.003;

function ComplaintDetailsScreen({ navigation, route }) {
  const { complaint } = route.params;

  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const initialOffset = height * 0.0000023;

  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const widthAnim = useRef(new Animated.Value(MAP_RADIUS)).current;
  const heightAnim = useRef(new Animated.Value(MAP_RADIUS)).current;
  const radiusAnim = useRef(new Animated.Value(MAP_RADIUS / 2)).current;
  const bottomAnim = useRef(new Animated.Value(insets.bottom)).current;

  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

  const [isExpanded, setIsExpanded] = useState(false);
  const [address, setAddress] = useState("");

  const statusColor = complaint.status === "Complete" ? "#4CAF50" : "#f3797e";

  function expandMap() {
    if (isExpanded) return;

    Animated.parallel([
      Animated.timing(widthAnim, {
        toValue: width,
        duration: ANIMATION_DURATION,
        useNativeDriver: false,
      }),
      Animated.timing(heightAnim, {
        toValue: height,
        duration: ANIMATION_DURATION,
        useNativeDriver: false,
      }),
      Animated.timing(radiusAnim, {
        toValue: 0,
        duration: ANIMATION_DURATION,
        useNativeDriver: false,
      }),
      Animated.timing(bottomAnim, {
        toValue: 0,
        duration: ANIMATION_DURATION,
        useNativeDriver: false,
      }),
    ]).start();

    if (mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: complaint.latitude,
          longitude: complaint.longitude,
          latitudeDelta: DELTA,
          longitudeDelta: DELTA,
        },
        ANIMATION_DURATION,
      );
    }

    setTimeout(() => {
      markerRef.current?.showCallout();
    }, ANIMATION_DURATION);

    setIsExpanded(true);
  }

  function collapseMap() {
    if (!isExpanded) return;

    Animated.parallel([
      Animated.timing(widthAnim, {
        toValue: MAP_RADIUS,
        duration: ANIMATION_DURATION,
        useNativeDriver: false,
      }),
      Animated.timing(heightAnim, {
        toValue: MAP_RADIUS,
        duration: ANIMATION_DURATION,
        useNativeDriver: false,
      }),
      Animated.timing(radiusAnim, {
        toValue: MAP_RADIUS / 2,
        duration: ANIMATION_DURATION,
        useNativeDriver: false,
      }),
      Animated.timing(bottomAnim, {
        toValue: insets.bottom,
        duration: ANIMATION_DURATION,
        useNativeDriver: false,
      }),
    ]).start();

    if (mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: complaint.latitude + initialOffset,
          longitude: complaint.longitude,
          latitudeDelta: DELTA,
          longitudeDelta: DELTA,
        },
        ANIMATION_DURATION,
      );
    }

    markerRef.current?.hideCallout();

    setIsExpanded(false);
  }

  function toggleMap() {
    if (isExpanded) {
      collapseMap();
    } else {
      expandMap();
    }
  }

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
    function onBackPress() {
      if (isExpanded) {
        collapseMap(); // collapse instead of leaving screen
        return true; // prevent default back behavior
      }
      return false; // allow navigation back
    }

    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      onBackPress,
    );

    return () => subscription.remove();
  }, [isExpanded]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: complaint.title,
    });
  }, [navigation, complaint]);

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={styles.root} edges={["bottom"]}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri:
                complaint.imageUri ??
                `data:${complaint.imageType};base64,${complaint.imageBase64}`,
            }}
            style={styles.image}
          />
        </View>

        <View style={styles.textContainer}>
          <ScrollView style={{ maxHeight: 100 }} scrollEnabled={!isExpanded}>
            <Text>{complaint.description}</Text>
          </ScrollView>
          <Text style={{ marginVertical: 16 }}>
            <Text style={{ fontWeight: "bold" }}>Category: </Text>
            {complaint.category}
          </Text>
          <View style={styles.statusContainer}>
            <Text style={{ fontWeight: "bold" }}>Status: </Text>
            <View style={[styles.status, { backgroundColor: statusColor }]}>
              <Text>{complaint.status}</Text>
            </View>
          </View>
          <Text style={{ marginVertical: 16 }}>
            <Text style={{ fontWeight: "bold" }}>Location: </Text>
            {address}
          </Text>
        </View>

        <AnimatedPressable
          onPress={toggleMap}
          style={{
            position: "absolute",
            bottom: insets.bottom,
            alignSelf: "center",
            width: widthAnim,
            height: heightAnim,
            borderRadius: radiusAnim,
          }}
        ></AnimatedPressable>
      </SafeAreaView>

      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <MaskedView
          style={StyleSheet.absoluteFill}
          maskElement={
            <View style={StyleSheet.absoluteFill}>
              <Animated.View
                style={{
                  position: "absolute",
                  bottom: bottomAnim,
                  alignSelf: "center",
                  width: widthAnim,
                  height: heightAnim,
                  borderRadius: radiusAnim,
                  backgroundColor: "black",
                }}
              />
            </View>
          }
        >
          <MapView
            ref={mapRef}
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            mapPadding={{ bottom: insets.bottom }}
            onMapReady={() => {
              if (mapRef.current) {
                mapRef.current.animateToRegion(
                  {
                    latitude: complaint.latitude + initialOffset,
                    longitude: complaint.longitude,
                    latitudeDelta: DELTA,
                    longitudeDelta: DELTA,
                  },
                  0,
                );
              }
            }}
          >
            <Marker
              ref={markerRef}
              coordinate={{
                latitude: complaint.latitude,
                longitude: complaint.longitude,
              }}
              title={complaint.title}
            />
          </MapView>
        </MaskedView>
      </View>
    </View>
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
  map: {
    width: "100%",
    height: "100%",
  },
});
