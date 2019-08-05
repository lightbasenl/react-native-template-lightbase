// jest.config.js
module.exports = {
  preset: "react-native",
  setupFiles: ["./__mocks__/setup.js"],
  transformIgnorePatterns: ["node_modules/(?!(react-native)/)"],
  testPathIgnorePatterns: ["\\.snap$", "<rootDir>/node_modules/"],
  transform: {
    "\\.(ts|tsx)$": "ts-jest",
  },
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.jest.json",
    },
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test))\\.[jt]sx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    "^app/(.*)": "<rootDir>/app/$1",
    "^components/(.*)": "<rootDir>/app/components/$1",
    "^screens/(.*)": "<rootDir>/app/screens/$1",
    "^navigation/(.*)": "<rootDir>/app/navigation/$1",
    "^hooks/(.*)": "<rootDir>/app/hooks/$1",
    "^services/(.*)": "<rootDir>/app/services/$1",
    "^assets/(.*)": "<rootDir>/app/assets/$1",
  },
  cacheDirectory: ".jest/cache",
  collectCoverageFrom: ["**/app/**/*.{ts,tsx}"],
};
