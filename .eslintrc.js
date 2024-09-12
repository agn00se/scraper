module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'airbnb-typescript',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  overrides: [
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    '@typescript-eslint/no-use-before-define': 0,
    'consistent-return': 0,
    'function-paren-newline': 0,
    'import/prefer-default-export': 0,
    'prefer-destructuring': 0,
    'no-restricted-syntax': 0,
    'no-console': 0,
    'no-await-in-loop': 0,
  },
  ignorePatterns: [
    'build',
    '.*',
  ],
};