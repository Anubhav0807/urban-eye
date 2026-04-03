# Urban Eye User App
Urban Eye is a React Native mobile application built with Expo that allows users to interact with the Urban Eye platform. The app connects to the Urban Eye backend to provide location-based features and services using Google Maps.

## Tech Stack
- React Native (Expo Managed Workflow)
- Google Maps API

## Save env variables in expo server linked with this expo project
- Command to create an env variable in eas
  ```bash
  eas env:create
  ```
- Add the following variables when prompted:
  ```bash
  EXPO_PUBLIC_BACKEND_URL=https://urban-eye-backend.onrender.com
  EXPO_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key
  ```
- Keep variable type as `String`
- Keep visibility as `Plain text`
- Select all environments and then and press enter

## Command to build for android
```bash
eas build -p android --profile preview
```