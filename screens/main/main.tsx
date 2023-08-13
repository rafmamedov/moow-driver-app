import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LatLng } from 'react-native-maps';
import RouteInfo from '../../components/routeInfo/routeInfo';
import Map from '../../components/map/map';
import Select from '../../components/select/select';
import Button from '../../components/button/button';
import { Route } from '../../types/types';

const Main = () => {
  const [origin, setOrigin] = useState<LatLng | null>(null);
  const [destination, setDestination] = useState<LatLng | null>(null);
  const [activeRoute, setActiveRoute] = useState<Route | null>(null);
  const [isRouteSelected, setIsRouteSelected] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<LatLng | null>(null);

  const resetRoutes = () => {
    setOrigin(null);
    setDestination(null);
    setActiveRoute(null);
    setIsRouteSelected(false);
  };

  return (
    <SafeAreaView style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      backgroundColor: activeRoute ? '#0F0F0F' : '#FFF',
    }}>
      <StatusBar style={activeRoute ? 'light' : 'dark'} animated />
      {activeRoute
        ? (
          <RouteInfo
            origin={origin}
            destination={destination}
            currentLocation={currentLocation}
            duration={activeRoute.duration}
            isSelected={isRouteSelected}
          />
        ) : (
          <Select
            setOrigin={setOrigin}
            setDestination={setDestination}
          />
        )}

        <Map
          origin={origin}
          destination={destination}
          activeRoute={activeRoute}
          setActiveRoute={setActiveRoute}
          isRouteSelected={isRouteSelected}
          currentLocation={currentLocation}
          setCurrentLocation={setCurrentLocation}
        />

        {activeRoute && (
          <Button
            isSelected={isRouteSelected}
            resetRoutes={resetRoutes}
            onSelect={setIsRouteSelected}
          />
        )}
      </SafeAreaView>
  );
};

export default Main;
