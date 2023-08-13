import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  navBar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 74,
    backgroundColor: '#171717',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  container: {
    paddingTop: 16,
    paddingBottom: 23,
    paddingHorizontal: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pressed: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressedActive: {
    transform: [{ translateY: -10 }],
    backgroundColor: '#171717',
  },
  homeIndicator: {
    position: 'absolute',
    bottom: 8,
    left: '50%',
    transform: [{translateX: -67}]
  },
});
