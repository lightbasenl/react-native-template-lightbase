import React from 'react';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from 'app/assets/fonts/selection.json';
import colors from 'app/assets/styleguide/colors';
import { IconProps } from 'react-native-vector-icons/Icon';

const Ico = createIconSetFromIcoMoon(icoMoonConfig);

export default function Icon({ name, color = colors.darkText, size = 30, ...iconProps }: IconProps) {
  return <Ico name={name} color={color} size={size} {...iconProps} />;
}
