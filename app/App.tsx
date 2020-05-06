import React from 'react';
import { View, Text } from 'react-native';
import { hijackEffects } from 'stop-runaway-react-effects';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ReactQueryConfigProvider } from 'react-query';
import { enableScreens } from 'react-native-screens';

enableScreens();
__DEV__ && hijackEffects();

const queryConfig = {
  throwOnError: true,
};

const App = () => {
  return (
    <ReactQueryConfigProvider config={queryConfig}>
      <SafeAreaProvider>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>WELCOME</Text>
        </View>
      </SafeAreaProvider>
    </ReactQueryConfigProvider>
  );
};

export default App;
