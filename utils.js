import axios from "axios";

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
