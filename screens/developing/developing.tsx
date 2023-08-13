import React from 'react';
import { View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { styles } from './style';

const Developing = () => {
  return (
    <View style={styles.container}>
      <StatusBar style='light' />
      <Text style={styles.text}>
        This page is not implemented yet
      </Text>
    </View>
  );
}

export default Developing;
