import React, { FC } from 'react';
import Svg, { G, Path, Defs, ClipPath, Rect } from 'react-native-svg';

type Props = {
  isActive: boolean;
}

export const UserIcon: FC<Props> = ({ isActive }) => (
  <Svg width="36" height="35" viewBox="0 0 36 35" fill="none">
    <G clipPath="url(#clip0_208_6575)">
      <Path
        d="M29.6667 30.625V27.7083C29.6667 26.1612 29.0521 24.6775 27.9581 23.5835C26.8642 22.4896 25.3804 21.875 23.8333 21.875H12.1667C10.6196 21.875 9.13584 22.4896 8.04188 23.5835C6.94792 24.6775 6.33334 26.1612 6.33334 27.7083V30.625"
        stroke={isActive ? '#665CD1' : '#EBEBEB'}
        strokeWidth="2.1875"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M18 16.0417C21.2217 16.0417 23.8333 13.43 23.8333 10.2083C23.8333 6.98667 21.2217 4.375 18 4.375C14.7783 4.375 12.1667 6.98667 12.1667 10.2083C12.1667 13.43 14.7783 16.0417 18 16.0417Z"
        stroke={isActive ? '#665CD1' : '#EBEBEB'}
        strokeWidth="2.1875"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>

    <Defs>
      <ClipPath id="clip0_208_6575">
        <Rect
          width="35"
          height="35"
          transform="translate(0.5)"
          fill={isActive ? '#665CD1' : '#EBEBEB'}
        />
      </ClipPath>
    </Defs>
  </Svg>
);
