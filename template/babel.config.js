module.exports = function (api) {
  api.cache(true);
  const moduleResolver = [
    'module-resolver',
    {
      root: ['./src'],
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.android.js', '.android.tsx', '.ios.js', '.ios.tsx'],
    },
  ];
  if (process.env.NODE_ENV === 'production' || process.env.BABEL_ENV === 'production') {
    return {
      presets: ['module:metro-react-native-babel-preset'],
      plugins: [
        moduleResolver,
        ['transform-remove-console', { exclude: ['error', 'info'] }],
        'react-native-reanimated/plugin',
      ],
    };
  } else {
    return {
      presets: ['module:metro-react-native-babel-preset'],
      plugins: [moduleResolver, 'react-native-reanimated/plugin'],
    };
  }
};
