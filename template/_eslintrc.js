module.exports = {
  root: true,
  extends: '@lightbase/eslint-config-lightbase/rn',
  env: {
    jest: true,
  },
  rules: {
    'no-unused-vars': 'error',
    '@typescript-eslint/no-explicit-any': [0],
    'react-hooks/exhaustive-deps': [
      1,
      {
        enableDangerousAutofixThisMayCauseInfiniteLoops: true,
        additionalHooks:
          '(useAnimatedStyle|useAnimatedProps|useDerivedValue|useAnimatedGestureHandler)',
      },
    ],
  },
};
