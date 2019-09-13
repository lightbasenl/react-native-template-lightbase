import React, { PropsWithChildren } from 'react';
import { TouchableOpacityProps, ViewStyle, TouchableOpacity } from 'react-native';

type Props = PropsWithChildren<TouchableOpacityProps>;

function Touchable({ onPress, gestureHandler, disabled, ...rest }: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      hitSlop={{ top: 5, left: 5, bottom: 5, right: 5 }}
      onPress={onPress}
      disabled={disabled}
      {...rest}
    />
  );
}

const Touch: Record<string, (p: Props) => React.ReactElement> = {
  Base: ({ children, onPress, gestureHandler, ...rest }: Props) => (
    <Touchable onPress={onPress} gestureHandler={gestureHandler} {...rest} />
  ),
  Row: ({ style, ...rest }: Props) => <Touchable style={[styles.row, style]} {...rest} />,
};

const styles: Record<string, ViewStyle> = {
  row: { flexDirection: 'row', alignItems: 'center' },
};

export default Touch;
