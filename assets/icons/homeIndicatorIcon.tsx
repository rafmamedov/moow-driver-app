import React, { FC } from 'react';
import Svg, { Rect } from 'react-native-svg';

type Props = {
  styles: Object;
};

export const HomeIndicatorIcon: FC<Props> = ({ styles }) => (
  <Svg style={styles} width="134" height="5" viewBox="0 0 134 5" fill="none">
    <Rect width="134" height="5" rx="2.5" fill="white"/>
  </Svg>
);
