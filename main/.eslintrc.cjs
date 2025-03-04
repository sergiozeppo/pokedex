module.exports = {
  root: true,
  env: { es2020: true, browser: true },
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
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
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    '@next/next/no-img-element': 0,
    'react-hooks/exhaustive-deps': 0,
  },
};
