module.exports = {
  root: true,
  env: { es2020: true, browser: true },
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
    'plugin:prettier/recommended',
    'plugin:@next/next/recommended',
  ],
  ignorePatterns: ['dist', 'coverage', '.eslintrc.cjs'],
  plugins: [
    'react',
    'react-hooks',
    'react-compiler',
    'react-refresh',
    '@typescript-eslint',
    '@next/eslint-plugin-next',
  ],
  rules: {
    ...require('eslint-plugin-react-hooks').configs.recommended.rules,
    ...require('eslint-plugin-react').configs.recommended.rules,
    ...require('eslint-plugin-react').configs['jsx-runtime'].rules,
    ...require('@typescript-eslint/eslint-plugin').configs.recommended.rules,
    ...require('@next/eslint-plugin-next').configs.recommended.rules,
  },
};
