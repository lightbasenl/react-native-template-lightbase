import React from 'react';
import { Platform, ActivityIndicator, StatusBar, View } from 'react-native';
import { NavigationNativeContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RouteProp, useFocusEffect, NavigationState, PartialState } from '@react-navigation/core';
import AsyncStorage from '@react-native-community/async-storage';

// import Sentry from 'app/services/sentry';
import Home from 'app/screens/Home';
import Profile from 'app/screens/Profile';
import Menu from 'app/screens/Menu';
import Modal from 'app/screens/Modal';
import Onboarding from 'app/screens/Onboarding';

const LoadingStack = createNativeStackNavigator<AppStackParams>();
const OnBoardingStack = createNativeStackNavigator<AppStackParams>();
const AppStack = createNativeStackNavigator<AppStackParams>();
const Tab = createBottomTabNavigator();

export type AppStackParams = {
  StackOnboarding: undefined;
  AppStack: undefined;
  MainApp: undefined;
  Splash: undefined;
  Onboarding: undefined;
  TabNavigator: undefined;
  Modal: undefined;
  Home: undefined;
  Profile: undefined;
  Menu: undefined;
};

export interface NavScreenProp<T extends keyof AppStackParams> {
  navigation: NativeStackNavigationProp<AppStackParams, T>;
  route: RouteProp<AppStackParams, T>;
}

function getActiveRouteName(navigationState?: NavigationState | PartialState<NavigationState>) {
  if (navigationState && typeof navigationState.index === 'number') {
    const route = navigationState.routes[navigationState.index];
    if (route.state) {
      getActiveRouteName(route.state);
    } else {
      console.log(route.name);
      // Sentry.addBreadcrumb({ type: 'navigation', message: route.name });
    }
  }
}

export const OnboardingContext = React.createContext({
  setOnboardVisibility: (_: 'loading' | 'onboard' | 'mainApp') => {},
});
export default function Navigation() {
  const [loadingState, setLoadingState] = React.useState<'loading' | 'onboard' | 'mainApp'>('loading');

  React.useEffect(() => {
    const checkOnBoardingStatus = async () => {
      try {
        const onboard = await AsyncStorage.getItem('hasSeenOnboarding');
        setLoadingState(onboard ? 'mainApp' : 'onboard');
      } catch (e) {}
    };
    checkOnBoardingStatus();
  }, []);

  return (
    <OnboardingContext.Provider value={{ setOnboardVisibility: setLoadingState }}>
      <NavigationNativeContainer onStateChange={(state) => getActiveRouteName(state)}>
        <LoadingStack.Navigator screenOptions={{ headerShown: false }}>
          {loadingState === 'loading' && (
            <LoadingStack.Screen
              name="Splash"
              options={{ animation: 'fade' }}
              component={() => (
                <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                  <ActivityIndicator size="large" />
                </View>
              )}
            />
          )}
          {loadingState === 'onboard' && (
            <LoadingStack.Screen
              name="StackOnboarding"
              component={StackOnboarding}
              options={{ animation: 'fade' }}
            />
          )}
          {loadingState === 'mainApp' && (
            <LoadingStack.Screen name="AppStack" component={MainApp} options={{ animation: 'fade' }} />
          )}
        </LoadingStack.Navigator>
      </NavigationNativeContainer>
    </OnboardingContext.Provider>
  );
}

function StackOnboarding() {
  return (
    <OnBoardingStack.Navigator screenOptions={{ headerShown: false }}>
      <OnBoardingStack.Screen name="Onboarding" component={Onboarding} />
    </OnBoardingStack.Navigator>
  );
}

function MainApp() {
  return (
    <AppStack.Navigator screenOptions={{ headerShown: false, presentation: 'modal' }}>
      <AppStack.Screen name="TabNavigator" component={TabNavigator} />
      <AppStack.Screen name="Modal" component={Modal} />
    </AppStack.Navigator>
  );
}

import Ionicons from 'react-native-vector-icons/Ionicons';

export function TabNavigator() {
  useFocusEffect(() => {
    if (Platform.OS === 'ios') {
      StatusBar.setBarStyle('dark-content', true);
      return () => StatusBar.setBarStyle('light-content', true);
    }
  });
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let IconComponent = Ionicons;
          let iconName = '';

          if (route.name === 'Home') {
            iconName = 'ios-home';
          } else if (route.name === 'Profile') {
            iconName = `ios-person`;
          } else if (route.name === 'Menu') {
            iconName = `ios-options`;
          }

          // You can return any component that you like here!
          return <IconComponent name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Menu" component={Menu} />
    </Tab.Navigator>
  );
}
