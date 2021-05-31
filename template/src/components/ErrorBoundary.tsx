import React from 'react';
import View from 'components/View';
import Bugsnag from '@bugsnag/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CodePush from 'react-native-code-push';
import { Button } from 'react-native';
import { navigationRef } from 'navigation/Navigation';

interface State {
  error: boolean;
}

const navigation = navigationRef.current;
class ErrorBoundary extends React.Component<React.PropsWithChildren<{}>, State> {
  state = { error: false };

  componentDidCatch(error: Error) {
    Bugsnag.notify(error, (report) => {
      report.groupingHash = 'Error Boundary';
      report.severity = 'error';
    });
    this.setState({ error: true });
  }

  render() {
    const { children } = this.props;
    const { error } = this.state;

    if (error) {
      return (
        <View.Screen style={{ alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20 }}>
          <View.Spacer height="l" />
          <Button
            title="OK"
            onPress={async () => {
              if (navigation?.canGoBack()) {
                navigation.goBack();
                this.setState({ error: false });
              } else {
                await AsyncStorage.removeItem('search');
                CodePush.restartApp();
              }
            }}
          />
        </View.Screen>
      );
    }
    return children;
  }
}

export default ErrorBoundary;
