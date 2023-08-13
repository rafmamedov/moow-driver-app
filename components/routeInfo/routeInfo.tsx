import React, { FC, useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import { LatLng } from 'react-native-maps';
import { styles } from './style';
import { Adress } from '../../types/types';
import { departureDate, departureTime } from '../../helpers/constants';
import { calculateArrivalDateTime } from '../../helpers/utils';
import { getAddress } from '../../helpers/api';
import ToOrigin from '../toOrigin/toOrigin';

type Props = {
  duration: string;
  isSelected: boolean;
  origin: LatLng | null;
  destination: LatLng | null;
  currentLocation: LatLng | null;
}

const RouteInfo: FC<Props> = ({
  origin,
  duration,
  isSelected,
  destination,
  currentLocation,
}) => {
  const [originInfo, setOriginInfo] = useState<Adress | null>(null);
  const [destinationInfo, setDestinationInfo] = useState<Adress | null>(null);
  const [locationInfo, setLocationInfo] = useState<Adress | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { date, time } = calculateArrivalDateTime(departureDate, departureTime, duration);

  const getCurrentLocationInfo = async () => {
    if (!currentLocation) return;
    const { latitude, longitude } = currentLocation;
    const { address } = await getAddress(latitude, longitude);
    const addressData = {
      city: address.city,
      country: address.country,
      address: `${address.road}, ${address.house_number || '1'}`,
    };

    setLocationInfo(addressData);
  };

  const getOriginInfo = async () => {
    if (!origin) return;
    const { latitude, longitude } = origin;
    const { address } = await getAddress(latitude, longitude);
    const addressData = {
      city: address.city,
      country: address.country,
      address: `${address.road}, ${address.house_number || '1'}`,
    };

    setOriginInfo(addressData);
  };

  const getDestinationInfo = async () => {
    if (!destination) return;
    const { latitude, longitude } = destination;
    const { address } = await getAddress(latitude, longitude);
    const addressData = {
      city: address.city,
      country: address.country,
      address: `${address.road}, ${address.house_number || '1'}`,
    };

    setDestinationInfo(addressData);
  };

  useEffect(() => {
    Promise.all([
      getOriginInfo(),
      getDestinationInfo(),
      getCurrentLocationInfo(),
    ])
    .catch(error => {
      console.log(error);
    })
    .finally(() => {
      setIsLoading(false);
    });
  }, [origin, destination, currentLocation]);

  if (isSelected && originInfo && locationInfo) {
    return <ToOrigin origin={originInfo} location={locationInfo} />
  }

  return (
    <View style={styles.routeInfo}>
      {isLoading
        ? <ActivityIndicator size="large" color="#EBEBEB" />
        : (
          <>
            <Text style={styles.title}>
              Ваш маршрут прокладено
            </Text>

            <View style={styles.info}>
              <Image
                source={require('../../assets/images/truck.png')}
                style={{
                  width: 130,
                  height: 80,
                  borderRadius: 12,
                }}
              />

              {(originInfo && destinationInfo) && (
                <View>
                  <View style={[styles.routeDetails, styles.origin]}>
                      <View style={styles.address}>
                        <Text style={styles.country}>
                          {`${originInfo?.country}, м. ${originInfo?.city}`}
                        </Text>
                        <Text style={styles.street}>
                          {originInfo?.address}
                        </Text>
                      </View>

                    <View>
                      <Text style={styles.date}>{departureDate}</Text>
                      <Text style={styles.time}>{departureTime}</Text>
                    </View>
                  </View>

                  <View style={styles.routeDetails}>
                    <View style={styles.address}>
                      <Text style={styles.country}>
                        {`${destinationInfo?.country}, м. ${destinationInfo?.city}`}
                      </Text>
                      <Text style={styles.street}>
                        {destinationInfo?.address}
                      </Text>
                    </View>

                    <View>
                      <Text style={styles.date}>{date}</Text>
                      <Text style={styles.time}>{time}</Text>
                    </View>
                  </View>
                </View>
              )}
            </View>
          </>
        )}
    </View>
  );
}

export default RouteInfo;
