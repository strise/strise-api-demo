const config = {
  overwrite: true,
  schema: process.env.API,
  documents: './src/graphql/**/*.graphql',
  generates: {
    './graphqlSchema.json': {
      plugins: ['schema-ast']
    },
    './src/types/graphqlTypes.ts': {
      plugins: ['typescript']
    },
    './src/types/graphqlOperationTypes.ts': {
      preset: 'import-types',
      plugins: ['typescript-operations'],
      presetConfig: {
        typesPath: './graphqlTypes'
      }
    },
    './src/utils/graphqlOperations.ts': {
      preset: 'import-types',
      plugins: ['typescript-react-apollo'],
      config: {
        importOperationTypesFrom: 'Types'
      },
      presetConfig: {
        typesPath: '../types/graphqlOperationTypes'
      }
    }
  }
}

export default config
