import React from 'react';
import { SafeAreaView, ViewProps, View as RNView, ViewStyle } from 'react-native';

// View Component definitions
const View: Record<string, (p: ViewProps) => React.ReactNode> = {
  Base: ({ style, ...props }) => <RNView style={style} {...props} />,
  Screen: ({ style, ...props }) => <SafeAreaView style={[styles.screen, style]} {...props} />,
  Row: ({ style, ...props }) => <RNView style={[styles.row, style]} {...props} />,
};

const styles: Record<string, ViewStyle> = {
  screen: { flex: 1, backgroundColor: 'white' },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
};

export default View;
