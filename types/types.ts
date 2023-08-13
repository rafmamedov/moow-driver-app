import { LatLng } from "react-native-maps";

export enum NavLink {
  drive = 'drive',
  messages = 'messages',
  circle = 'circle',
  user = 'user',
  moreInfo = 'moreInfo',
};

export interface Adress {
  city: string;
  country: string;
  address: string;
};

export interface CalculatedCoords {
  latitude: () => number;
  longitude: () => number;
};

export interface Route {
  distance: string;
  duration: string;
  pinCoords: LatLng | CalculatedCoords;
  routeCoords: LatLng[];
  route: google.maps.DirectionsRoute;
};
