import { createRef } from 'react';

import { NavigationContainerRef, NavigatorScreenParams, RouteProp } from '@react-navigation/core';
import { createNativeStackNavigator, NativeStackNavigationProp } from 'react-native-screens/native-stack';
import RNBootSplash from 'react-native-bootsplash';
import { BugsnagNavigationContainer } from 'services/bugsnag';
import { useStore } from 'hooks/useStore';
import { useCustomTheme } from 'hooks/useCustomTheme';
import { Home } from 'screens/Home';
import { Profile } from 'screens/Profile';
import { Settings } from 'screens/Settings';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Modal } from 'screens/Modal';
import { Home2 } from 'screens/Home2';
import { Modal2 } from 'screens/Modal2';
import { Modal3 } from 'screens/Modal3';
import { Modal4 } from 'screens/Modal4';
import { Modal5 } from 'screens/Modal5';
import { TransparentModal } from 'screens/TransparentModal';

export type MainRoutes = {
  TabNav: NavigatorScreenParams<TabNavRoutes>;
  ModalNav: NavigatorScreenParams<ModalNavRoutes>;
  Modal: undefined;
  Modal2: undefined;
  TransparentModal: undefined;
};

export type ModalNavRoutes = {
  Modal3: undefined;
  Modal4: undefined;
  Modal5: undefined;
};

export type HomeNavRoutes = {
  Home: undefined;
  Home2: { backgroundColor: string };
};

export type ProfileNavRoutes = {
  Profile: undefined;
};

export type SettingsNavRoutes = {
  Settings: undefined;
};

export type TabNavRoutes = {
  HomeNav: NavigatorScreenParams<HomeNavRoutes>;
  ProfileNav: NavigatorScreenParams<ProfileNavRoutes>;
  SettingsNav: NavigatorScreenParams<SettingsNavRoutes>;
};

export type RouteNames = keyof MainRoutes;

export interface NavScreenProp<T extends RouteNames> {
  navigation: NativeStackNavigationProp<MainRoutes, T>;
  route: RouteProp<MainRoutes, T>;
}

export const navigationRef = createRef<NavigationContainerRef<MainRoutes>>();

const MainStack = createNativeStackNavigator<MainRoutes>();
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
          primary: 'green',
          background: theme.background,
          card: theme.canvas,
          text: theme.text,
          border: theme.border,
          notification: theme.notification,
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
      <MainStack.Navigator
        screenOptions={{
          stackAnimation: 'fade',
          headerShown: false,
          headerHideShadow: true,
          statusBarStyle: 'dark',
          screenOrientation: 'portrait_up',
        }}
      >
        <MainStack.Screen name="TabNav" component={TabNav} />
        <MainStack.Screen
          name="ModalNav"
          component={ModalNav}
          options={{ stackAnimation: 'default', stackPresentation: 'modal' }}
        />

        <MainStack.Screen
          name="TransparentModal"
          component={TransparentModal}
          options={{ stackAnimation: 'fade', stackPresentation: 'transparentModal' }}
        />

        <MainStack.Group
          screenOptions={{ stackAnimation: 'default', stackPresentation: 'modal', headerShown: true }}
        >
          <MainStack.Screen name="Modal" component={Modal} />
          <MainStack.Screen name="Modal2" component={Modal2} />
        </MainStack.Group>
      </MainStack.Navigator>
    </BugsnagNavigationContainer>
  );
}

const Tab = createBottomTabNavigator<TabNavRoutes>();
export function TabNav() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: false,
        tabBarLabelPosition: 'below-icon',
        tabBarAllowFontScaling: false,
      }}
    >
      <Tab.Screen name="HomeNav" component={HomeNav} />
      <Tab.Screen name="ProfileNav" component={ProfileNav} />
      <Tab.Screen name="SettingsNav" component={SettingsNav} />
    </Tab.Navigator>
  );
}

const ModalStack = createNativeStackNavigator<ModalNavRoutes>();
export function ModalNav() {
  return (
    <ModalStack.Navigator screenOptions={{ statusBarStyle: 'dark', screenOrientation: 'portrait_up' }}>
      <ModalStack.Screen name="Modal3" component={Modal3} />
      <ModalStack.Screen name="Modal4" component={Modal4} />
      <ModalStack.Screen name="Modal5" component={Modal5} />
    </ModalStack.Navigator>
  );
}

const HomeStack = createNativeStackNavigator<HomeNavRoutes>();
export function HomeNav() {
  return (
    <HomeStack.Navigator screenOptions={{ statusBarStyle: 'dark', screenOrientation: 'portrait_up' }}>
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="Home2" component={Home2} />
    </HomeStack.Navigator>
  );
}

const ProfileStack = createNativeStackNavigator<ProfileNavRoutes>();
export function ProfileNav() {
  return (
    <ProfileStack.Navigator screenOptions={{ statusBarStyle: 'dark', screenOrientation: 'portrait_up' }}>
      <ProfileStack.Screen name="Profile" component={Profile} />
    </ProfileStack.Navigator>
  );
}

const SettingsStack = createNativeStackNavigator<SettingsNavRoutes>();
export function SettingsNav() {
  return (
    <SettingsStack.Navigator screenOptions={{ statusBarStyle: 'dark', screenOrientation: 'portrait_up' }}>
      <SettingsStack.Screen name="Settings" component={Settings} />
    </SettingsStack.Navigator>
  );
}
