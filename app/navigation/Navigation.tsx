import React from 'react';

import {
  createAppContainer,
  createBottomTabNavigator,
  NavigationScreenProp,
  NavigationRoute,
} from 'react-navigation';

import ErrorBoundary from 'screens/ErrorBoundary';
import View from 'app/components/View';

const TabNavigator = createBottomTabNavigator({
  Home: View.Base,
  Profile: View.Base,
  More: View.Base,
});

class AppNavigator extends React.Component<{ navigation: NavigationScreenProp<NavigationRoute> }> {
  static router = TabNavigator.router;

  render() {
    const { navigation } = this.props;
    return (
      <ErrorBoundary goBack={navigation.goBack}>
        <TabNavigator navigation={navigation} />
      </ErrorBoundary>
    );
  }
}

const Navigation = createAppContainer(AppNavigator);

export default Navigation;
