import React, { FC } from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './style';
import { HomeIndicatorIcon } from '../../assets/icons/homeIndicatorIcon';
import { useNavBar } from '../../context/navBarContext';
import { NavLink } from '../../types/types';
import { getIcon } from '../../helpers/utils';

const NavBar: FC = () => {
  const { activeNavLink, setActiveNavLink } = useNavBar();
  const navigation = useNavigation()

  const handleNavigate = (page: NavLink) => {
    setActiveNavLink(page);

    if (page === NavLink.drive) {
      navigation.navigate('Main');
    } else {
      navigation.navigate('Developing');
    }
  };

  return (
    <View style={styles.navBar}>
      <View style={styles.container}>
        {Object.entries(NavLink).map(([key, value]) => (
          <TouchableWithoutFeedback key={key} onPress={() => handleNavigate(value)}>
            <View style={[styles.pressed, (activeNavLink === value) && styles.pressedActive]}>
              {getIcon(value)}
            </View>
          </TouchableWithoutFeedback>
        ))}
      </View>

      <HomeIndicatorIcon styles={styles.homeIndicator} />
    </View>
  );
}

export default NavBar;
