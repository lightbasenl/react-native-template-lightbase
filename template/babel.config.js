module.exports = function (api) {
  api.cache(true);
  const moduleResolver = [
    'module-resolver',
    {
      root: ['./src'],
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.android.js', '.android.tsx', '.ios.js', '.ios.tsx'],
    },
  ];

  const presets = [['module:metro-react-native-babel-preset', { useTransformReactJSXExperimental: true }]];

  const plugins = [
    moduleResolver,
    ['@babel/plugin-transform-react-jsx', { runtime: 'automatic' }],
    'react-native-reanimated/plugin',
  ];

  if (process.env.NODE_ENV === 'production' || process.env.BABEL_ENV === 'production') {
    return {
      presets,
      plugins: [['transform-remove-console', { exclude: ['error', 'info'] }], ...plugins],
    };
  } else {
    return {
      presets,
      plugins,
    };
  }
};
