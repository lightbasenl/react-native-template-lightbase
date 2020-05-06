module.exports = {
  root: true,
  extends: '@lightbase/eslint-config-lightbase/rn',
  env: {
    jest: true,
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['app', './app'],
          ['assets', './app/assets'],
          ['components', './app/components'],
          ['context', './app/context'],
          ['hooks', './app/hooks'],
          ['mock', './app/mock'],
          ['navigation', './app/navigation'],
          ['screens', './app/screens'],
          ['services', './app/services'],
          ['utils', './app/utils*'],
        ],
        extensions: ['.ts', '.js', '.jsx', '.json', '.tsx', '.native.js'],
      },
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.native.js'],
      },
    },
  },
};
