import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Main from './screens/main/main';
import Developing from './screens/developing/developing';

type RootStackParamList = {
  Main: undefined;
  Developing: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
};

const Stack = createStackNavigator<RootStackParamList>();

export default function Navigate() {
  return (
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={Main}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name="Developing"
          component={Developing}
          options={{ headerShown: false, gestureEnabled: false, }}
        />
      </Stack.Navigator>
  );
};
