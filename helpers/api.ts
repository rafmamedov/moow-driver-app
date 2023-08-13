import axios from "axios";

// Temporarily placing the API key here just in case quickly test the application //
export const KEY = 'AIzaSyAZq6Ac6vUqQ9cXpa7xlcqUiTZZa5SbtAQ';
const googleApiUrl = 'https://maps.googleapis.com/maps/api/directions/json?';
const addressUrl = 'https://nominatim.openstreetmap.org/reverse';

export const getRoute = async (
  originLat: number,
  originLng: number,
  destinationLat: number,
  destinationLng: number,
) => {
  const originParams = `origin=${originLat},${originLng}`;
  const destinationParams = `destination=${destinationLat},${destinationLng}`;
  const params = `${originParams}&${destinationParams}&key=${KEY}&alternatives=true`;

  const { data } = await axios.get(googleApiUrl + params);

  return data;
};

export const getAddress = async (lat: number, lng: number) => {
  const nominatimUrl = `${addressUrl}?lat=${lat}&lon=${lng}&format=json`;
  const { data } = await axios.get(nominatimUrl);

  return data;
};