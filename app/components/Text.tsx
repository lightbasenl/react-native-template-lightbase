import React from 'react';
import { TextProps, Text as RNText, TextStyle } from 'react-native';
import colors from 'app/assets/styleguide/colors';

const baseProps = {
  allowFontScaling: false,
};

const Text: Record<string, React.FC<TextProps>> = {
  Base: ({ style, ...props }) => <RNText {...baseProps} {...props} style={[styles.base, style]} />,
  Bold: ({ style, ...props }) => <RNText {...baseProps} {...props} style={[styles.bold, style]} />,
};

export const fontFamily = {
  base: '',
  bold: '',
};

const baseStyles = {
  fontFamily: fontFamily.base,
  fontSize: 16,
  color: colors.darkText,
  lineHeight: 22,
};

const styles: Record<string, TextStyle> = {
  base: baseStyles,
  bold: {
    ...baseStyles,
    fontFamily: fontFamily.bold,
  },
};

export default Text;
