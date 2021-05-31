import React, { createRef } from 'react';

import { NavigationContainerRef, RouteProp } from '@react-navigation/core';
import { createNativeStackNavigator, NativeStackNavigationProp } from 'react-native-screens/native-stack';
import RNBootSplash from 'react-native-bootsplash';
import { BugsnagNavigationContainer } from 'services/bugsnag';
import { useStore } from 'hooks/useStore';
import { useCustomTheme } from 'hooks/useCustomTheme';
import Home from 'hooks/screens/Home';

export type MainRoutes = {
  Home: undefined;
};

export type RouteNames = keyof MainRoutes;
export interface NavScreenProp<T extends RouteNames> {
  navigation: NativeStackNavigationProp<MainRoutes, T>;
  route: RouteProp<MainRoutes, T>;
}

export const navigationRef = createRef<NavigationContainerRef<MainRoutes>>();

const HomeStack = createNativeStackNavigator<MainRoutes>();

export function Navigation() {
  const theme = useCustomTheme();
  const rehydrated = useStore((store) => store.rehydrated);
  if (!rehydrated) {
    return null;
  }
  return (
    <BugsnagNavigationContainer
      ref={navigationRef}
      onReady={() => {
        RNBootSplash.hide({ fade: true });
      }}
      theme={{
        dark: false,
        colors: {
          primary: theme.primary.main,
          background: theme.background.main,
          card: theme.surface.main,
          text: theme.primary.contrastText,
          border: theme.surface.contrastText,
          notification: theme.secondary.main,
        },
      }}
      onStateChange={() => {
        const currentRoute = navigationRef.current ? navigationRef.current.getCurrentRoute() : null;
        if (currentRoute) {
          const currentRouteName = currentRoute.name;
          if (__DEV__) {
            console.log({ screen: currentRouteName });
          }
        }
      }}
    >
      <HomeStack.Navigator
        screenOptions={{
          stackAnimation: 'fade',
          headerShown: false,
          headerHideShadow: true,
          statusBarStyle: 'dark',
          screenOrientation: 'portrait_up',
        }}
      >
        <HomeStack.Screen name="Home" component={Home} />
      </HomeStack.Navigator>
    </BugsnagNavigationContainer>
  );
}
