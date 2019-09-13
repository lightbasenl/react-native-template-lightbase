import React, { PropsWithChildren } from 'react';
import { ViewProps, View as RNView, ViewStyle } from 'react-native';

type Props = PropsWithChildren<ViewProps>;

// View Component definitions
const View: Record<string, (p: Props) => React.ReactElement> = {
  Base: ({ style, ...props }) => <RNView style={style} {...props} />,
  Row: ({ style, ...props }) => <RNView style={[styles.row, style]} {...props} />,
};

const styles: Record<string, ViewStyle> = {
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
};

export default View;
