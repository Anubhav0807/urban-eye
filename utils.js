import axios from "axios";
import api from "./api";

export async function reverseGeocode(lat, lng) {
  try {
    const response = await axios.get(
      "https://maps.googleapis.com/maps/api/geocode/json",
      {
        params: {
          latlng: `${lat},${lng}`,
          key: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY,
        },
      },
    );

    if (response.data.status === "OK") {
      return response.data.results?.[0]?.formatted_address || null;
    } else {
      console.log("Geocoding error:", response.data.status);
      return null;
    }
  } catch (error) {
    console.log("Axios error:", error.message);
    return null;
  }
}

export function titleCase(word) {
  if (!word) return "";
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

async function getCloudinaryConfig() {
  const response = await api.get("/cloudinary/generate-signature");
  return response.data;
}

export async function uploadImage(imageUri) {
  try {
    const config = await getCloudinaryConfig();

    const formData = new FormData();

    formData.append("file", {
      uri: imageUri,
      type: "image/jpeg",
      name: "upload.jpg",
    });

    formData.append("api_key", config.apiKey);
    formData.append("timestamp", config.timestamp);
    formData.append("signature", config.signature);
    formData.append("folder", config.folder);

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${config.cloudName}/image/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    return response.data;
  } catch (error) {
    console.log(
      "Upload error:",
      error.response?.data?.error?.message || error.message,
    );
  }
}
