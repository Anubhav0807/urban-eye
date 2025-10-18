import "dotenv/config";

export default {
  expo: {
    name: "urban-eye",
    slug: "urban-eye",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    splash: {
      image: "./assets/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.anubhav0807.urbaneye",
      config: {
        googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      edgeToEdgeEnabled: true,
      permissions: [
        "ACCESS_FINE_LOCATION",
        "ACCESS_COARSE_LOCATION",
        "CAMERA",
        "READ_EXTERNAL_STORAGE",
        "WRITE_EXTERNAL_STORAGE",
        "INTERNET",
      ],
      package: "com.anubhav0807.urbaneye",
      config: {
        googleMaps: {
          apiKey: process.env.GOOGLE_MAPS_API_KEY,
        },
      },
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    plugins: [
      [
        "expo-image-picker",
        {
          photosPermission:
            "We need access to your photos so you can attach images to your complaints.",
          cameraPermission:
            "We need access to your camera so you can take photos to include with your complaints.",
        },
      ],
      [
        "expo-location",
        {
          locationWhenInUsePermission:
            "We need access to your location to show it on the map.",
        },
      ],
    ],
    extra: {
      eas: {
        projectId: "4435c7a1-d215-4920-bcb0-0e8e7b7e907f",
      },
    },
  },
};
