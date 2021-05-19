import * as React from 'react';
import { ViewProps, View, ViewStyle } from 'react-native';
import { SafeAreaView, NativeSafeAreaViewProps, SafeAreaProvider } from 'react-native-safe-area-context';
import { useCustomTheme } from 'hooks/useCustomTheme';
import useStaticScreenSize from 'hooks/useStaticScreenSize';

type Props = React.PropsWithChildren<ViewProps>;

export default {
  Base,
  Row,
  Screen,
  Spacer,
  LineSpacer,
};

function Base({ style, ...props }: Props) {
  return <View style={style} {...props} />;
}

const spacerRange = {
  none: 1,
  xs: 5,
  s: 10,
  m: 20,
  l: 30,
  xl: 40,
  xxl: 60,
} as const;

const spacerRangeSmall = {
  none: 1,
  xs: 5,
  s: 7.5,
  m: 15,
  l: 20,
  xl: 30,
  xxl: 40,
} as const;

function Spacer({ height, width }: { height?: keyof typeof spacerRange; width?: keyof typeof spacerRange }) {
  const { smallScreen } = useStaticScreenSize();

  const range = smallScreen ? spacerRangeSmall : spacerRange;
  return (
    <View
      style={{
        paddingVertical: height ? range[height] / 2 : undefined,
        width: width ? range[width] : undefined,
      }}
    />
  );
}

function LineSpacer({ height, style }: { height: keyof typeof spacerRange; style?: ViewStyle }) {
  const theme = useCustomTheme();

  const { smallScreen } = useStaticScreenSize();

  const range = smallScreen ? spacerRangeSmall : spacerRange;

  return (
    <View
      style={[
        {
          height: 1,
          backgroundColor: theme.surface.contrastText,
          opacity: 0.1,
          width: '100%',
          marginVertical: range[height] / 2,
        },
        style,
      ]}
    />
  );
}

function Row({ style, ...props }: Props) {
  return <View style={[{ flexDirection: 'row', alignItems: 'center' }, style]} {...props} />;
}

function Screen({
  style,
  children,
  type,
  title,
  ...props
}: NativeSafeAreaViewProps & { type?: 'modal' | 'modalDark'; title?: string }) {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={[{ flex: 1 }, style]} {...props}>
        {children}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
