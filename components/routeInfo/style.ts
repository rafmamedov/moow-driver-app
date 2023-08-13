import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  routeInfo: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    height: 160,
    width: '100%',
    flex: 0,
    backgroundColor: '#0F0F0F',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Mulish_700Bold',
    color: '#665CD1',
  },
  info: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  routeDetails: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    gap: 10,
  },
  origin: {
    marginBottom: 4,
  },
  address: {
    maxWidth: 130,
  },
  country: {
    fontSize: 16,
    fontFamily: 'Mulish_500Medium',
    color: '#EBEBEB',
  },
  street: {
    fontSize: 14,
    color: '#7E7E7E',
  },
  date: {
    textAlign: 'right',
    fontSize: 11,
    fontFamily: 'Mulish_500Medium',
    color: '#EBEBEB',
  },
  time: {
    textAlign: 'right',
    fontSize: 14,
    fontFamily: 'Mulish_700Bold',
    color: '#665CD1',
  }
});
