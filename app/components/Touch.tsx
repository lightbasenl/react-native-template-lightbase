import React from 'react';
import {
  TouchableOpacityProps,
  Platform,
  ViewStyle,
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native';
import View from './View';
import { TouchableNativeFeedback as GTouchFeedback } from 'react-native-gesture-handler';

type Props = TouchableOpacityProps & {
  children?: React.ReactNode;
  gestureHandler?: boolean;
  disabled?: boolean;
};

function Touchable({ onPress, gestureHandler, disabled, ...rest }: Props) {
  // Touch events inside gesturehandlers will not work unless the react-native-gesture-handler touchable is used on RN
  const Native = gestureHandler ? GTouchFeedback : TouchableNativeFeedback;

  if (Platform.OS === 'android') {
    return (
      <Native hitSlop={{ top: 5, left: 5, bottom: 5, right: 5 }} onPress={onPress} disabled={disabled}>
        <View.Base {...rest} />
      </Native>
    );
  } else {
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
}

const Touch: Record<string, (p: Props) => React.ReactNode> = {
  Base: ({ children, onPress, gestureHandler, ...rest }: Props) => (
    <Touchable onPress={onPress} gestureHandler={gestureHandler} {...rest}>
      {children}
    </Touchable>
  ),
  Row: ({ style, ...rest }: Props) => <Touchable style={[styles.row, style]} {...rest} />,
};

const styles: Record<string, ViewStyle> = {
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: 4,
    borderWidth: 1,
    paddingHorizontal: 20,
  },
  row: { flexDirection: 'row', alignItems: 'center' },
};

export default Touch;
