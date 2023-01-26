module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'eslint-config-standard-with-typescript',
    'plugin:prettier/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended'
  ],
  settings: {
    react: {
      version: 'detect'
    }
  },
  env: {
    browser: true
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: './tsconfig.json'
      },
      extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:@typescript-eslint/strict'
      ],
      rules: {
        '@typescript-eslint/require-await': 'error',
        '@typescript-eslint/return-await': 'error',
        '@typescript-eslint/default-param-last': 'error',
        '@typescript-eslint/no-shadow': 'error',
        '@typescript-eslint/no-unused-vars': ['error', { ignoreRestSiblings: true }],
        '@typescript-eslint/no-confusing-void-expression': ['error', { ignoreArrowShorthand: true }], // Allows returning void expressions in arrow functions
        '@typescript-eslint/no-misused-promises': 'off',
        '@typescript-eslint/strict-boolean-expressions': 'off'
      }
    },
    {
      files: ['*.graphql'],
      parser: '@graphql-eslint/eslint-plugin',
      parserOptions: {
        schema: './graphqlSchema.graphql',
        operations: '**/*.graphql',
        skipGraphQLConfig: true
      },
      extends: ['plugin:@graphql-eslint/schema-recommended', 'plugin:@graphql-eslint/operations-recommended'],
      rules: {
        '@graphql-eslint/selection-set-depth': 'off',
        '@graphql-eslint/executable-definitions': 'off',
        '@graphql-eslint/strict-id-in-types': 'off',
        '@graphql-eslint/require-description': 'off',
        'spaced-comment': 'off' // To make it possible to do eslint-disable-next-line
      }
    }
  ],
  ignorePatterns: ['*.d.ts', 'graphqlTypes.ts', 'graphqlOperations.ts', 'graphqlOperationTypes.ts'],
  rules: {
    'no-nested-ternary': 'error',
    'no-restricted-globals': 'error',
    'no-else-return': 'error',
    'no-param-reassign': 'error',
    'prefer-destructuring': ['error', { array: false }],
    'prefer-template': 'error',
    'no-lonely-if': 'error',
    'react/jsx-no-constructed-context-values': 'error',
    'react/jsx-no-useless-fragment': ['error', { allowExpressions: true }],
    'react/no-unstable-nested-components': 'error',
    'react/jsx-curly-brace-presence': ['error', 'never']
  }
}
