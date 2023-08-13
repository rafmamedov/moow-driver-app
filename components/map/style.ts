import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    width: '100%',
    height: '100%',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  travelInfo: {
    position: 'relative',
    width: 120,
    height: 60,
  },
  markerText: {
    position: 'relative',
    top: 10,
    left: 10,
    color: 'white',
  },
  time: {
    fontSize: 14,
    fontFamily: 'Mulish_500Medium',
  },
  distance: {
    fontSize: 11,
    fontFamily: 'Mulish_300Light',
  }
});