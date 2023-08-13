import React, { FC } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { styles } from './style';

type Props = {
  isSelected: boolean;
  resetRoutes: () => void;
  onSelect: React.Dispatch<React.SetStateAction<boolean>>;
};

const Button: FC<Props> = ({ isSelected, onSelect, resetRoutes }) => {
  return (
    isSelected
      ? (
        <TouchableOpacity
          style={styles.button}
          onPress={resetRoutes}
        >
          <Text style={styles.text}>
            Змінити маршрут
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.button}
          onPress={() => onSelect(true)}
        >
          <Text style={styles.text}>
            Обрати маршрут
          </Text>
        </TouchableOpacity>
    )
  );
};

export default Button;