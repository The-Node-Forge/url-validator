import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import _import from 'eslint-plugin-import';
import prettier from 'eslint-plugin-prettier';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: ['docs/**'],
  },
  ...fixupConfigRules(
    compat.extends(
      'eslint:recommended',
      'plugin:import/typescript',
      'plugin:@typescript-eslint/recommended',
      'plugin:prettier/recommended',
      'plugin:import/recommended',
      'prettier',
    ),
  ),
  {
    plugins: {
      '@typescript-eslint': fixupPluginRules(typescriptEslint),
      import: fixupPluginRules(_import),
      prettier: fixupPluginRules(prettier),
    },

    languageOptions: {
      globals: {
        ...globals.node,
      },
      parser: tsParser,
      ecmaVersion: 2021,
      sourceType: 'module',
    },

    settings: {
      'import/resolver': {
        typescript: {},
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
          moduleDirectory: ['node_modules', 'src/'],
        },
      },
    },

    rules: {
      'space-before-function-paren': ['error', 'always'], // Space before function parentheses
      'func-call-spacing': ['error', 'never'], // Prevents spaces inside function calls
      'comma-spacing': ['error', { before: false, after: true }], // Space after commas in function args
      'object-curly-spacing': ['error', 'always'], // Ensures spaces inside curly braces
      'keyword-spacing': ['error', { before: true, after: true }], // Space around keywords
      'space-infix-ops': ['error', { int32Hint: false }], // Space around operators
      semi: ['error', 'always'],
      'no-magic-numbers': ['error', { ignore: [0, 1] }],
      'import/order': [
        'error',
        {
          groups: [
            ['builtin', 'external'],
            ['internal', 'sibling', 'parent'],
          ],
          'newlines-between': 'always',
        },
      ],
      'no-unused-vars': ['warn'],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'prefer-template': 'warn',
      'prefer-destructuring': [
        'error',
        {
          AssignmentExpression: { array: true, object: true },
          VariableDeclarator: { array: true, object: true },
        },
        { enforceForRenamedProperties: false },
      ],
      'prettier/prettier': 'error', // Enforce Prettier formatting
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
];
