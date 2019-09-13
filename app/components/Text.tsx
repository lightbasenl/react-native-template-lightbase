import React, { PropsWithChildren } from 'react';
import { TextProps, Text as RNText, TextStyle } from 'react-native';
import colors from 'app/assets/styleguide/colors';

const baseProps = {
  allowFontScaling: false,
};

type Props = PropsWithChildren<TextProps>;

const Text: Record<string, (p: Props) => React.ReactElement> = {
  Base: ({ style, ...props }) => <RNText {...baseProps} {...props} style={[styles.base, style]} />,
  Bold: ({ style, ...props }) => <RNText {...baseProps} {...props} style={[styles.bold, style]} />,
};

const baseStyles = {
  fontSize: 16,
  color: colors.darkText,
  lineHeight: 22,
};

const styles: Record<string, TextStyle> = {
  base: baseStyles,
  bold: {
    fontWeight: 'bold',
  },
};

export default Text;
