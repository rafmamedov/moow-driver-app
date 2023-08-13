import React, { FC } from 'react';
import Svg, { G, Path, Defs, ClipPath, Rect } from 'react-native-svg';

type Props = {
  isActive: boolean;
}

export const MessagesIcon: FC<Props> = ({ isActive }) => (
  <Svg width="36" height="35" viewBox="0 0 36 35" fill="none">
    <G clipPath="url(#clip0_208_6571)">
      <Path
        d="M31.125 21.875C31.125 22.6485 30.8177 23.3904 30.2707 23.9374C29.7237 24.4844 28.9819 24.7917 28.2083 24.7917H10.7083L4.875 30.625V7.29167C4.875 6.51812 5.18229 5.77625 5.72927 5.22927C6.27625 4.68229 7.01812 4.375 7.79167 4.375H28.2083C28.9819 4.375 29.7237 4.68229 30.2707 5.22927C30.8177 5.77625 31.125 6.51812 31.125 7.29167V21.875Z"
        stroke={isActive ? '#665CD1' : '#EBEBEB'}
        strokeWidth="2.1875"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>

    <Defs>
      <ClipPath id="clip0_208_6571">
        <Rect width="35" height="35" fill="white" transform="translate(0.5)"/>
      </ClipPath>
    </Defs>
  </Svg>
);
