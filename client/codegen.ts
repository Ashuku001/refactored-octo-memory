
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: `http://localhost:4000/graphql`,
  documents: "graphql/**/*.graphql",
  generates: {
    "__gql__/": {
      preset: "client",
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql',
      }
    }
  }
};

export default config;
