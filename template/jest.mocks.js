jest.useFakeTimers();

jest.mock('react-native-gesture-handler', () => ({
  State: {
    UNDETERMINED: 0,
    FAILED: 1,
    BEGAN: 2,
    CANCELLED: 3,
    ACTIVE: 4,
    END: 5,
  },
  TouchableOpacity: require('react-native').TouchableOpacity,
  TapGestureHandler: require('react-native').View,
}));

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

jest.mock('react-native-reanimated', () => {
  const mocks = require('react-native-reanimated/mock');
  const NOOP = () => {};
  // mocks.default.call = () => {};
  mocks.default.addWhitelistedNativeProps = jest.fn;
  return {
    ...mocks,
    useSharedValue: jest.fn,
    makeRemote: jest.fn,
    useEvent: jest.fn,
    useDerivedValue: (a) => ({ value: a() }),
    useAnimatedScrollHandler: () => NOOP,
    useAnimatedGestureHandler: () => NOOP,
    useAnimatedStyle: (style) => style,
    useAnimatedRef: () => ({ current: null }),
    useAnimatedReaction: NOOP,

    withTiming: (toValue, config, cb) => {
      cb && setTimeout(() => cb(true), config?.duration ?? 300);
      return toValue;
    },
    withSpring: (toValue, _, cb) => {
      cb && setTimeout(() => cb(true), 0);
      return toValue;
    },
    withDecay: (_, cb) => {
      cb && setTimeout(() => cb(true), 0);
      return 0;
    },
    cancelAnimation: NOOP,
    delay: (_, b) => b,
    sequence: () => 0,
    repeat: (a) => a,
    measure: () => ({
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      pageX: 0,
      pageY: 0,
    }),
    Easing: {
      linear: jest.fn(),
      ease: jest.fn(),
      quad: jest.fn(),
      cubic: jest.fn(),
      poly: () => jest.fn(),
      sin: jest.fn(),
      circle: jest.fn(),
      exp: jest.fn(),
      elastic: () => jest.fn(),
      back: () => jest.fn(),
      bounce: () => jest.fn(),
      bezier: () => jest.fn(),
      in: () => jest.fn(),
      out: () => jest.fn(),
      inOut: () => jest.fn(),
    },
  };
});

jest.mock('react-native-config', () => ({
  API_ENDPOINT: 'string',
  API_URL: 'https://daisy-acc.rdcservices.nl',
}));

jest.mock('react-native-code-push', () => {
  const cp = () => (app) => app;
  Object.assign(cp, {
    InstallMode: {},
    CheckFrequency: {},
    SyncStatus: {},
    UpdateState: {},
    DeploymentStatus: {},
    DEFAULT_UPDATE_DIALOG: {},

    allowRestart: jest.fn(),
    checkForUpdate: jest.fn(() => Promise.resolve(null)),
    disallowRestart: jest.fn(),
    getCurrentPackage: jest.fn(() => Promise.resolve(null)),
    getUpdateMetadata: jest.fn(() => Promise.resolve(null)),
    notifyAppReady: jest.fn(() => Promise.resolve()),
    restartApp: jest.fn(),
    sync: jest.fn(() => Promise.resolve(1)),
    clearUpdates: jest.fn(),
  });
  return cp;
});

jest.mock('react-native-bootsplash', () => ({
  hide: jest.fn(),
  show: jest.fn(),
}));

jest.mock('react-native-screens', () => {
  const View = require('react-native').View;
  return {
    enableScreens: jest.fn(),
    screensEnabled: () => true,
    ScreenContainer: View,
    Screen: View,
    NativeScreen: View,
    NativeScreenContainer: View,
    ScreenStack: View,
    ScreenStackHeaderConfig: View,
    ScreenStackHeaderSubview: View,
    ScreenStackHeaderRightView: View,
    ScreenStackHeaderLeftView: View,
    ScreenStackHeaderTitleView: View,
    ScreenStackHeaderCenterView: View,
  };
});

jest.mock('reactotron-react-native', () => {
  const reactotron = {
    configure: jest.fn(() => reactotron),
    useReactNative: jest.fn(() => reactotron),
    use: jest.fn(() => reactotron),
    connect: jest.fn(() => reactotron),
    clear: jest.fn(() => reactotron),
    createEnhancer: jest.fn(() => reactotron),
    setAsyncStorageHandler: jest.fn(() => reactotron),
  };
  return reactotron;
});

jest.mock('@bugsnag/react-native', () => ({
  configureAsync: jest.fn(),
  start: jest.fn(),
  getPlugin: jest.fn(),
}));
