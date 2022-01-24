module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/recommended',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'linebreak-style': 0,
    'no-plusplus': 0,
    'vue/order-in-components': ['error', {
      order: [
        'data',
        'LIFECYCLE_HOOKS',
        'methods',
        'computed',
        'watch',
      ],
    }],
    'vue/html-closing-bracket-newline': [2, {
      singleline: 'never',
      multiline: 'never',
    }],
  },
};
