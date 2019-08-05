import React from 'react';
import { NavigationScreenProp, NavigationRoute } from 'react-navigation';
import View from 'app/components/View';
import Text from 'app/components/Text';
import Touch from 'app/components/Touch';

interface Props {
  goBack: NavigationScreenProp<NavigationRoute>['goBack'];
}
interface State {
  error: boolean;
}

class ErrorBoundary extends React.Component<Props, State> {
  state = { error: false };

  componentDidCatch() {
    if (!__DEV__) {
      this.setState({ error: true });
    }
  }

  goBack = async () => {
    this.props.goBack();
    this.setState({ error: false });
  };

  render() {
    const { children } = this.props;
    const { error } = this.state;
    if (error) {
      return (
        <View.Centered>
          <Text.Base>Something Went Wrong</Text.Base>
          <Touch.Base onPress={this.goBack}>
            <Text.Base>Go Back</Text.Base>
          </Touch.Base>
        </View.Centered>
      );
    }
    return children;
  }
}

export default ErrorBoundary;
