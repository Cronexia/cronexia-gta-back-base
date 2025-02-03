// * Script to generate metadatas.ts (CLI plugin)
// 🔍 cf.
//      1. [Github Issue](https://github.com/nestjs/swagger/issues/2493)
//      2. [nest > cli plugin > swc](https://docs.nestjs.com/openapi/cli-plugin#swc-builder)
//      3. [nest > swc > monorepo](https://docs.nestjs.com/recipes/swc#monorepo-and-cli-plugins)

// * Swagger doc example
// import { PluginMetadataGenerator } from '@nestjs/cli/lib/compiler/plugins';
// import { ReadonlyVisitor } from '@nestjs/swagger/dist/plugin';

// const generator = new PluginMetadataGenerator();
// generator.generate({
//   visitors: [
//     new ReadonlyVisitor({ introspectComments: true, pathToSource: __dirname }),
//   ],
//   outputDir: __dirname,
//   watch: true,
//   tsconfigPath: 'apps/<name>/tsconfig.app.json',
// });

// * GraphQL adaptation
import { PluginMetadataGenerator } from '@nestjs/cli/lib/compiler/plugins/plugin-metadata-generator';
import { ReadonlyVisitor } from '@nestjs/graphql/dist/plugin';

const generator = new PluginMetadataGenerator();
generator.generate({
  visitors: [
    new ReadonlyVisitor({ introspectComments: true, pathToSource: __dirname }),
  ],
  outputDir: __dirname,

  // ! 🚨 Endless
  // watch: true,
  watch: false,

  // tsconfigPath: './tsconfig.json',

  // * Generate an empty src/metadata.ts by excluding all `*.ts` files
  tsconfigPath: './tsconfig.generate-empty-metadata.ts.json',
});
