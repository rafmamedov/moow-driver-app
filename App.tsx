import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  useFonts,
  Mulish_300Light,
  Mulish_500Medium,
  Mulish_700Bold,
} from '@expo-google-fonts/mulish';

import { NavBarProvider } from './context/navBarContext';
import MainStack from './navigate';
import NavBar from './components/navBar/navBar';

const App = () => {
  let [fontsLoaded, fontError] = useFonts({
    Mulish_300Light,
    Mulish_500Medium,
    Mulish_700Bold,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <NavigationContainer>
      <NavBarProvider>
        <MainStack />
        <NavBar />
      </NavBarProvider>
    </NavigationContainer>
  );
};

export default App;