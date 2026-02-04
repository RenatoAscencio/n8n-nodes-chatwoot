module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    sourceType: 'module',
    ecmaVersion: 2019,
  },
  ignorePatterns: [
    'dist/**',
    'node_modules/**',
    '.eslintrc.js',
    'jest.config.js',
    'test/**',
    'scripts/**',
  ],
  plugins: ['@typescript-eslint', 'eslint-plugin-n8n-nodes-base'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:n8n-nodes-base/community',
    'prettier',
  ],
  rules: {
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'n8n-nodes-base/node-param-description-missing-final-period': 'off',
    'n8n-nodes-base/node-param-description-excess-final-period': 'off',
  },
  env: {
    node: true,
    es6: true,
  },
};
