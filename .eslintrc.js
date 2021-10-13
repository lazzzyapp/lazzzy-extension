module.exports = {
  extends: ['@diamondyuan/react-typescript', 'prettier'],
  plugins: ['eslint-plugin-prettier'],
  rules: {
    'no-use-before-define': 'off',
    'arrow-body-style': 'off',
    'no-redeclare': 'off',
    'prettier/prettier': 'error',
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: './webpack/webpack.common.js',
      },
    },
  },
};
/*
  module.exports = {
    extends: [require.resolve('@umijs/fabric/dist/eslint')],
    globals: {
      ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
      page: true,
      REACT_APP_ENV: true,
    },
  };
  
*/
