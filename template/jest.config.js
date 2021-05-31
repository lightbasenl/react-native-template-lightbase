module.exports = {
  preset: 'react-native',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect', './jest.setup.js'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFiles: ['./jest.mocks.js', './node_modules/react-native-gesture-handler/jestSetup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(@react-native|react-native|react-native-permissions||rn-async-storage-flipper||reactotron-react-native|react-native-flipper|react-native-reanimated|react-native-screens/native-stack|@react-navigation|@react-native-community|react-native-code-push|react-native-gesture-handler|)/)',
  ],
};
