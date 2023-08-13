import React, { FC } from 'react';
import Svg, { G, Circle, Path, Defs, ClipPath, Rect } from 'react-native-svg';

type Props = {
  isActive: boolean;
}

export const MoreInfoIcon: FC<Props> = ({ isActive }) => (
  <Svg width="36" height="35" viewBox="0 0 36 35" fill="none">
    <G clipPath="url(#clip0_208_6578)">
      <G clipPath="url(#clip1_208_6578)">
        <Circle
          cx="18"
          cy="17.5"
          r="16.4062"
          stroke={isActive ? '#665CD1' : '#EBEBEB'}
          strokeWidth="2.1875"
        />
        <Path
          d="M18 18.5938C18.7047 18.5938 19.276 18.0225 19.276 17.3177C19.276 16.613 18.7047 16.0417 18 16.0417C17.2953 16.0417 16.724 16.613 16.724 17.3177C16.724 18.0225 17.2953 18.5938 18 18.5938Z"
          stroke={isActive ? '#665CD1' : '#EBEBEB'}
          strokeWidth="2.1875"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M26.9323 18.5938C27.637 18.5938 28.2083 18.0225 28.2083 17.3177C28.2083 16.613 27.637 16.0417 26.9323 16.0417C26.2276 16.0417 25.6562 16.613 25.6562 17.3177C25.6562 18.0225 26.2276 18.5938 26.9323 18.5938Z"
          stroke={isActive ? '#665CD1' : '#EBEBEB'}
          strokeWidth="2.1875"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M9.06771 18.5938C9.77245 18.5938 10.3438 18.0225 10.3438 17.3177C10.3438 16.613 9.77245 16.0417 9.06771 16.0417C8.36298 16.0417 7.79167 16.613 7.79167 17.3177C7.79167 18.0225 8.36298 18.5938 9.06771 18.5938Z"
          stroke={isActive ? '#665CD1' : '#EBEBEB'}
          strokeWidth="2.1875"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
    </G>

    <Defs>
      <ClipPath id="clip0_208_6578">
        <Rect width="35" height="35" fill="white" transform="translate(0.5)"/>
      </ClipPath>

      <ClipPath id="clip1_208_6578">
        <Rect width="35" height="35" fill="white" transform="translate(0.5)"/>
      </ClipPath>
    </Defs>
  </Svg>
);

