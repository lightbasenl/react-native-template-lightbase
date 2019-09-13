import React from 'react';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from 'app/assets/fonts/selection.json';
import colors from 'app/assets/styleguide/colors';
import { IconProps } from 'react-native-vector-icons/Icon';

const Ico = createIconSetFromIcoMoon(icoMoonConfig);

const Icon: React.FC<IconProps> = ({ name, color = colors.darkText, size = 30, ...iconProps }) => (
  <Ico name={name} color={color} size={size} {...iconProps} />
);

export default Icon;
