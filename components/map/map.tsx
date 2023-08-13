import React, { FC, useEffect, useRef, useState } from 'react';
import MapView, { Callout, LatLng, Marker, Polyline } from 'react-native-maps';
import { View, Text } from 'react-native';
import MapViewDirections from 'react-native-maps-directions';
import { getCompassDirection } from 'geolib';
import * as Location from 'expo-location'
import { styles } from './style';
import { ModalIcon } from '../../assets/icons/modalIcon';
import { RouteMarker } from '../../assets/icons/routeMarker';
import { LocationMarker } from '../../assets/icons/locationMarker';
import { KEY, getRoute } from '../../helpers/api';
import { getRoutesDetails, getPinCoords, getRouteCoords } from '../../helpers/utils';
import { Route } from '../../types/types';
import {
  compassDirectionToDegrees,
  customMapStyle,
  initialRegion,
  pitch,
  zoom,
} from '../../helpers/constants';

type Props = {
  origin: LatLng | null;
  isRouteSelected: boolean;
  activeRoute: Route | null;
  destination: LatLng | null;
  currentLocation: LatLng | null;
  setActiveRoute: React.Dispatch<React.SetStateAction<Route | null>>;
  setCurrentLocation: React.Dispatch<React.SetStateAction<LatLng | null>>;
}

const Map: FC<Props> = ({
  origin,
  destination,
  activeRoute,
  setActiveRoute,
  isRouteSelected,
  currentLocation,
  setCurrentLocation,
}) => {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [possibleRoutes, setPossibleRoutes] = useState<Route[]>([]);
  const [subscription, setSubscription] = useState<Location.LocationSubscription | null>(null);
  const mapRef = useRef<MapView | null>(null);

  const getDirection = async () => {
    if (origin && destination) {
      const response: google.maps.DirectionsResult = await getRoute(
        origin.latitude,
        origin.longitude,
        destination.latitude,
        destination.longitude,
        );

      if (response.routes.length > 0) {
        const routes = response.routes;
        setPossibleRoutes(getRoutesDetails(routes));
      }
    }
  };

  const startNavigation = () => {
    if (activeRoute && currentLocation && origin && isRouteSelected) {
      const { latitude, longitude } = currentLocation;
      const degrees = getCompassDirection(
        [longitude, latitude],
        [origin?.longitude, origin?.latitude]
      );

      const heading = compassDirectionToDegrees[degrees];

      if (mapRef.current) {
        mapRef.current.animateCamera({
          center: { latitude, longitude },
          pitch,
          heading,
          zoom,
        });
      }
    }
  };

  const handleLocationChange = (newLocation: Location.LocationObject) => {
    const coords = {
      latitude: newLocation.coords.latitude,
      longitude: newLocation.coords.longitude,
    };

    setLocation(newLocation);
    setCurrentLocation(coords);
    startNavigation();
  };

  const startLocationTracking = async () => {
    const newSubscription = await Location.watchPositionAsync({
        accuracy: Location.LocationAccuracy.High,
        timeInterval: 1000,
      },
      handleLocationChange,
    );
  
    setSubscription(newSubscription);
  };

  const handleRouteSelect = (route: google.maps.DirectionsRoute) => {
    if (route.legs[0].distance && route.legs[0].duration) {
      const details = {
        distance: route.legs[0].distance.text,
        duration: route.legs[0].duration.text,
        pinCoords: getPinCoords(route),
        routeCoords: getRouteCoords(route),
        route,
      };
  
      setActiveRoute(details);
    }
  };

  useEffect(() => {
    const getPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        console.log('Please grant location permissions');

        return;
      }

      let fetchedCurrentLocation = await Location.getCurrentPositionAsync({});
      setLocation(fetchedCurrentLocation);

      const { latitude, longitude } = fetchedCurrentLocation.coords;

      if (mapRef.current) {
        mapRef.current.animateCamera({
          center: { latitude, longitude },
          zoom: 15,
        });
      }

      startLocationTracking();
    }

    getPermissions();
  }, []);

  useEffect(() => {
    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, []);

  useEffect(() => {
    startNavigation();
  }, [location, isRouteSelected]);

  useEffect(() => {
    if (isRouteSelected) return;
    setPossibleRoutes([]);
  }, [isRouteSelected]);

  useEffect(() => {
    setActiveRoute(null);

    if (origin && destination) {
      getDirection();

      if (mapRef) {
        mapRef?.current?.fitToSuppliedMarkers(['origin', 'destination'], {
          edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        })
      }
    }
  }, [origin, destination]);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider="google"
        initialRegion={initialRegion}
        customMapStyle={customMapStyle}
      >
        {origin && (
          <Marker
            identifier='origin'
            coordinate={origin}
          >
            <RouteMarker />
            <Callout>
              <Text>Точка загрузки</Text>
            </Callout>
          </Marker>
        )}

        {destination && (
          <Marker
            identifier='destination'
            coordinate={destination}
          >
            <RouteMarker />
            <Callout>
              <Text>Місце призначення</Text>
            </Callout>
          </Marker>
        )}

        {(currentLocation && activeRoute) && (
          <Marker coordinate={currentLocation}>
            <LocationMarker />
            <Callout style={{ width: 70 }}>
              <Text>Я зараз тут</Text>
            </Callout>
          </Marker>
        )}

        {(possibleRoutes && !activeRoute) && (
          possibleRoutes.map((route, index) => (
            <Marker
              key={`alt-route-${index}`}
              coordinate={route.pinCoords as LatLng}
              anchor={{x: 0.5, y: 1}}
              onPress={() => handleRouteSelect(route.route)}
            >
              <View style={styles.travelInfo}>
                <ModalIcon />
                <Text style={[styles.markerText, styles.time]}>
                  {route.duration}
                </Text>
                <Text style={[styles.markerText, styles.distance]}>
                  {route.distance}
                </Text>
              </View>
            </Marker>
          ))
        )}

        {activeRoute && (
          <Marker
            coordinate={activeRoute.pinCoords as LatLng}
            anchor={{x: 0.5, y: 1}}
          >
            <View style={styles.travelInfo}>
              <ModalIcon />
              <Text style={[styles.markerText, styles.time]}>
                {activeRoute.duration}
              </Text>
              <Text style={[styles.markerText, styles.distance]}>
                {activeRoute.distance}
              </Text>
            </View>
          </Marker>
        )}

        {(origin && currentLocation && activeRoute) && (
          <MapViewDirections
            origin={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
            }}
            destination={origin}
            apikey={KEY}
            strokeColor="#B1ABF2"
            strokeWidth={5}
          />
        )}

        {activeRoute ? (
          <Polyline
            coordinates={activeRoute.routeCoords}
            strokeColor="#665CD1"
            strokeWidth={7}
          />
        ) : (
          possibleRoutes.map((route, index) => (
            <Polyline
              key={`alt-route-${index}`}
              coordinates={route.routeCoords}
              strokeColor={index === 0 ? '#665CD1' : '#848385'}
              strokeWidth={index === 0 ? 6 : 3}
            />
          ))
        )}
      </MapView>
    </View>
  );
}

export default Map;