import React from 'react';
import { initialWindowMetrics, SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClientProvider } from 'react-query';
import codepush from 'react-native-code-push';

import { queryClient } from './utils/api';
import ErrorBoundary from 'components/ErrorBoundary';
import { Navigation } from 'navigation/Navigation';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <ErrorBoundary>
          <Navigation />
        </ErrorBoundary>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}

const codepushConfig = {
  checkFrequency: codepush.CheckFrequency.ON_APP_RESUME,
};

export default codepush(codepushConfig)(App);
