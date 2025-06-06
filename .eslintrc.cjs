/** @type {import('eslint').Linter.Config} */
module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:node/recommended',
    'plugin:promise/recommended',
    'plugin:import/recommended'
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'no-console': 'off',
    'node/no-unsupported-features/es-syntax': 'off',
    'promise/always-return': 'error',
    'promise/no-return-wrap': 'error',
  },
};
