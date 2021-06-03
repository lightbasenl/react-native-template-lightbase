import {Component, PropsWithChildren} from 'react';
import View from 'components/View';
import Bugsnag from '@bugsnag/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CodePush from 'react-native-code-push';
import { Button } from 'react-native';

interface State {
  error: boolean;
}

class ErrorBoundary extends Component<PropsWithChildren<{}>, State> {
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
              await AsyncStorage.removeItem('search');
              CodePush.restartApp();
            }}
          />
        </View.Screen>
      );
    }
    return children;
  }
}

export default ErrorBoundary;
