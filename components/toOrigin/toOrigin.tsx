import React, { FC } from 'react';
import { View, Text } from 'react-native';
import { styles } from './style';
import { RouteIcon } from '../../assets/icons/routeIcon';
import { Adress } from '../../types/types';

type Props = {
  location: Adress;
  origin: Adress;
};

const ToOrigin: FC<Props> = ({ location, origin }) => {
  return (
    <View style={styles.routeInfo}>
      <Text style={styles.title}>
        Маршрут до точки загрузки
      </Text>

      <View style={styles.info}>
        <RouteIcon />

        <View>
          <View style={[styles.routeDetails, styles.origin]}>
              <View style={styles.address}>
                <Text style={styles.country}>
                  Поточна точка знаходження
                </Text>
                <Text style={styles.street}>
                  {location?.address}
                </Text>
              </View>
          </View>

          <View style={styles.routeDetails}>
            <View style={styles.address}>
              <Text style={styles.country}>
                {`${origin?.country}, м. ${origin?.city}`}
              </Text>
              <Text style={styles.street}>
                {origin?.address}
              </Text>
            </View>

            <View>
              <Text style={styles.date}>Потрібний час прибуття</Text>
              <Text style={styles.time}>12:00</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

export default ToOrigin;