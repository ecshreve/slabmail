import type { CodegenConfig } from '@graphql-codegen/cli'
 
const config: CodegenConfig = {
  schema: 'http://localhost:8008/graphql',
  documents: './src/graphql/**/*.ts',
  generates: {
    './src/generated/gql.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo']
    }
  }
}
export default config