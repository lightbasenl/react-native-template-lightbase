import * as React from 'react';
import { Platform, Pressable, PressableProps } from 'react-native';
import tinycolor from 'tinycolor2';

export default {
  Base,
};

type Props = React.PropsWithChildren<PressableProps> & { backgroundColor?: string };

function Base({ style, android_ripple, backgroundColor, ...props }: Props) {
  let pressColor =
    tinycolor(backgroundColor).getLuminance() < 0.2
      ? tinycolor(backgroundColor).lighten(20).toString()
      : tinycolor(backgroundColor).darken().toString();

  return (
    <Pressable
      // only include ripple effect if backgroundColor is specified
      android_ripple={{ color: backgroundColor ? pressColor : undefined, ...android_ripple }}
      hitSlop={{ top: 5, left: 5, bottom: 5, right: 5 }}
      style={({ pressed }) => [
        // If no background color is specified revert back to opacity onPress
        backgroundColor
          ? { backgroundColor: pressed && Platform.OS === 'ios' ? pressColor : backgroundColor }
          : // fallback on opacity change if no background color is specified
            { opacity: pressed && !backgroundColor ? 0.7 : 1 },
        typeof style === 'function' && style({ pressed }),
        typeof style === 'object' && style,
      ]}
      {...props}
    />
  );
}
