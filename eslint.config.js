import js from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier/flat'
import globals from 'globals'

export default [
 {
  ignores: [
   '**/node_modules/**',
   '**/dist/**',
   '**/public/**',
   '**/project_info/**',
  ],
 },

 {
  files: ['**/*.{js,mjs,cjs}'],
  languageOptions: {
   ecmaVersion: 'latest',
   sourceType: 'module',
   globals: { ...globals.browser, ...globals.node },
  },
  ...js.configs.recommended,
  rules: {
   eqeqeq: ['error', 'always'],
   camelcase: ['error', { properties: 'never', ignoreDestructuring: true }],
  },
 },

 // Must be last: turns off rules that conflict with Prettier
 eslintConfigPrettier,
]
