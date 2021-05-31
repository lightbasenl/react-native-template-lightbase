import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/core';
import {
  HomeNavRoutes,
  MainRoutes,
  ModalNavRoutes,
  ProfileNavRoutes,
  SettingsNavRoutes,
  TabNavRoutes,
} from 'navigation/Navigation';
import { NativeStackNavigationProp } from 'react-native-screens/native-stack';

export const useMainNavigation = () => useNavigation<NativeStackNavigationProp<MainRoutes>>();
export const useMainRoute = <T extends keyof MainRoutes>() => useRoute<RouteProp<MainRoutes, T>>();

export const useModalNavigation = () => useNavigation<ModalNavProp>();
export const useModalRoute = <T extends keyof ModalNavRoutes>() => useRoute<RouteProp<ModalNavRoutes, T>>();

export const useHomeTabNavigation = () => useNavigation<HomeNavProp>();
export const useHomeTabRoute = <T extends keyof HomeNavRoutes>() => useRoute<RouteProp<HomeNavRoutes, T>>();

export const useProfileTabNavigation = () => useNavigation<ProfileNavProp>();
export const useProfileTabRoute = <T extends keyof ProfileNavRoutes>() =>
  useRoute<RouteProp<ProfileNavRoutes, T>>();

export const useSettingsTabNavigation = () => useNavigation<SettingsNavProp>();
export const useSettingsTabRoute = <T extends keyof SettingsNavRoutes>() =>
  useRoute<RouteProp<SettingsNavRoutes, T>>();

type ModalNavProp = CompositeNavigationProp<
  NativeStackNavigationProp<ModalNavRoutes>,
  NativeStackNavigationProp<MainRoutes>
>;

type HomeNavProp = CompositeNavigationProp<
  NativeStackNavigationProp<HomeNavRoutes>,
  CompositeNavigationProp<
    BottomTabNavigationProp<TabNavRoutes, 'HomeNav'>,
    NativeStackNavigationProp<MainRoutes>
  >
>;

type ProfileNavProp = CompositeNavigationProp<
  NativeStackNavigationProp<ProfileNavRoutes>,
  CompositeNavigationProp<
    BottomTabNavigationProp<TabNavRoutes, 'ProfileNav'>,
    NativeStackNavigationProp<MainRoutes>
  >
>;

type SettingsNavProp = CompositeNavigationProp<
  NativeStackNavigationProp<SettingsNavRoutes>,
  CompositeNavigationProp<
    BottomTabNavigationProp<TabNavRoutes, 'SettingsNav'>,
    NativeStackNavigationProp<MainRoutes>
  >
>;
