import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer, NavigationScreenProp, NavigationRoute, NavigationState } from 'react-navigation';

import ErrorBoundary from 'screens/ErrorBoundary';
import View from 'app/components/View';

export interface Navigation {
  navigation: NavigationScreenProp<NavigationRoute>;
}

const MainNav = createBottomTabNavigator({
  Home: View.Base,
  Profile: View.Base,
  More: View.Base,
});

AppNavigator.router = MainNav.router;
function AppNavigator({ navigation }: Navigation) {
  return (
    <ErrorBoundary goBack={navigation.goBack}>
      <MainNav navigation={navigation} />
    </ErrorBoundary>
  );
}

const AppContainer = createAppContainer(AppNavigator);

function getActiveRouteName(navigationState: NavigationState) {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  if (route.routes) {
    return getActiveRouteName(route);
  }
  return route.routeName;
}

export default function Navigation() {
  return (
    <AppContainer
      onNavigationStateChange={(prevState, currentState) => {
        const currentScreen = getActiveRouteName(currentState);
        const prevScreen = getActiveRouteName(prevState);
        if (prevScreen !== currentScreen) {
          console.log({ currentScreen });
        }
      }}
    />
  );
}
