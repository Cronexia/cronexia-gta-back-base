# How the project was created

Here's a list of all the operations executed to setup the project

Most of it will be [NestJs official documentation](https://docs.nestjs.com/) applied & compiled

Assuming all the [requirements](./setup-requirements.md) are met

## Create NestJs project

```bash
# Nest CLI global installation
bun install -g @nestjs/cli

# Nest project creation in app/ folder
nest new app
# 🔥🐛💥 DO NOT USE PNPM as it introduce a bugged package messing up with SWC compiler type checking
# ? Which package manager would you ❤️ to use? 💩 pnpm
# ? Which package manager would you ❤️ to use? ✅ npm

cd app
rm package-lock.json

# 🐛FIX: In case of install with pnpm > clean npm packages
# rm -Rf node_modules && rm -f bun.lockb && rm -f pnpm-lock.yaml && rm -f package-lock.json && bun i

# 📌 Test
bun run start
# http://localhost:3000/ > "Hello world" > 🎉

# Update project to latest cli
bun install @nestjs/cli
```

### ⚡️ Switch to Fastify

Faster HTTP provider

🔍 [Doc](https://docs.nestjs.com/techniques/performance)

```bash
bun install @nestjs/platform-fastify
```

Update `src/main.ts`

```ts
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: false }),
  );
  await app.listen(3000);
}
bootstrap();
```

### ⚡️ Switch to SWC builder

Faster compiler

🔍 [Doc](https://docs.nestjs.com/recipes/swc)

```bash
bun install -d @swc/cli @swc/core jest @swc/jest
```

~~Update `package.json` scripts to include `-b swc`~~

🐛 *Don't call it twice*

Update `nest-cli.json` to use SWC by default

```json
"compilerOptions": {
  "builder": "swc",
  "typeCheck": true
}
```

---

Jest + SWC

Update `package.json`

```json
"jest": {
  "transform": {
    "^.+\\.(t|j)s?$": ["@swc/jest"]
  }
}
```

New file `.swcrc`

```json
{
  "$schema": "https://json.schemastore.org/swcrc",
  "sourceMaps": true,
  "jsc": {
    "parser": {
      "syntax": "typescript",
      "decorators": true,
      "dynamicImport": true
    },
    "transform": {
      "legacyDecorator": true,
      "decoratorMetadata": true
    },
    "baseUrl": "./"
  },
  "minify": false
}
```

### ❌ HMR / Hot Modules Reload

🔍 [doc](https://docs.nestjs.com/recipes/hot-reload)

Not implemented as it felt slower than SWC, and NestJs now include vanilla `--watch`

### 👌 Linting and formatting

Usage of `eslint` & `prettier`.

I'd recommand VSCode plugin installation, usage :

- ESLint > Ctrl Shift P > "Fix" **Fix all auto-fixable problems**
- Prettier > Ctrl Shift P > "Format" **Format document** > 🚨 Choose prettier

If usage needed in CLI (later DevOps or CI/CD)

```bash
bun run lint
bun run format
```

### 🗺️ Routing

In order to take advantage of express typings (as in the request: Request parameter example above), install @types/express package.

```bash
bun install @types/express 
```

### 🔧 Configuration implementation

Setup configuration module & [validator](https://docs.nestjs.com/techniques/configuration#schema-validation)

Allow the use of a `.env` file to inject environnement variables

🔍 [doc](https://docs.nestjs.com/techniques/configuration)

```bash
bun install @nestjs/config joi
```

Update `app.module.ts`

```ts
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({
  // ⚡️As accessing process.env can be slow, you can set the cache property of the options object passed to ConfigModule.forRoot() to increase the performance of ConfigService#get method when it comes to variables stored in process.env.
  cache: true,
})],
})
```

---

## Database

Tried to stay as agnostic as possible if someday we need to switch to something else (~MongoDB)

Chosen stack (cf. documentation in Confluence) is PostgreSQL

Use of official 🐳 [Docker hub > PostgreSQL image](https://hub.docker.com/_/postgres)

With minor tweaks, cf. `docker-compose-database-postgresql.yml`

- Enable ports for external (Nest) access
- Enable volumes to keep datas upon container stop/destroy

### Connect PostgreSQL to NestJS

```bash
# Install Postgre package
bun install pg
```

We need to install the ORM in order to let it manage the database connection.

#### Prisma ORM installation

🔍 [NestJs > Prisma](https://docs.nestjs.com/recipes/prisma#getting-started)

```bash
# Install prisma package, as a dev dependency
bun install prisma -d 

# 📌 Verification
bun prisma

# Prisma setup
bun prisma init

# ✔ Your Prisma schema was created at prisma/schema.prisma
#   You can now open it in your favorite editor.

# warn You already have a .gitignore file. Don't forget to add `.env` in it to not commit any private information.

# Next steps:
# 1. Set the DATABASE_URL in the .env file to point to your existing database. If your database has no tables yet, read https://pris.ly/d/getting-started
# 2. Set the provider of the datasource block in schema.prisma to match your database: postgresql, mysql, sqlite, sqlserver, mongodb or cockroachdb.
# 3. Run prisma db pull to turn your database schema into a Prisma schema.
# 4. Run prisma generate to generate the Prisma Client. You can then start querying your database.

# More information in our documentation:
# https://pris.ly/d/getting-started
```

#### Install and generate Prisma Client

Prisma Client is a type-safe database client that's generated from your Prisma model definition.

Because of this approach, Prisma Client can expose CRUD operations that are tailored specifically to your models.

```bash
# npm install @prisma/client
bun install @prisma/client

# 🚨 The prisma generate command reads your Prisma schema and updates the generated Prisma Client library inside node_modules/@prisma/client.

bun prisma generate
# Environment variables loaded from .env
# Prisma schema loaded from prisma/schema.prisma

# ✔ Generated Prisma Client (v5.7.1) to ./node_modules/@prisma/client in 74ms

# Start using Prisma Client in Node.js (See: https://pris.ly/d/client)
# ```
# import { PrismaClient } from '@prisma/client'
# const prisma = new PrismaClient()
# ```
# or start using Prisma Client at the edge (See: https://pris.ly/d/accelerate)
# ```
# import { PrismaClient } from '@prisma/client/edge'
# const prisma = new PrismaClient()
# ```

# See other ways of importing Prisma Client: http://pris.ly/d/importing-client
```

### GraphQL & Mercurius

🔍 See dedicated README[Graphql management](./graphql-management.md)

Nest offers two ways of building GraphQL applications, the **code first** and the **schema first** methods.

In the **code first** approach, you use **decorators and TypeScript classes** to generate the corresponding GraphQL schema.

In the **schema first** approach, the source of truth is **GraphQL SDL** (Schema Definition Language) files.

Going with ✅ **code first** to stay full TypeScript.

⚡️ It is possible to generate GraphQL stuff thourgh Nest generator

```bash
bun nest generate resource
# ? What name would you like to use for this resource (plural, e.g., "users")? articles
# ? What transport layer do you use? (Use arrow keys)
#   REST API
# ❯ GraphQL (code first)
#   GraphQL (schema first)
#   Microservice (non-HTTP)
#   WebSockets
# ? Would you like to generate CRUD entry points? Yes
```

#### Interface GraphiQL

Interactive, in-browser **GraphQL IDE**, available by default on [/graphiql](http://localhost:3000/graphiql).

---

## Allow to load JSON files from server

For example to load mock datas

Update `tsconfig.json`

```json
{
  "compilerOptions": {
    // ... other options
    "esModuleInterop": true,
    "resolveJsonModule": true
  }
}
```

---

## Date, time & timezones management

Use of UTC global format

🧠 There's a difference between what is stored in database & what is displayed/compiled in code

Javascript tries to help and display time updated with locale variations, ex: heures d'été/hiver

🚨 Enforce the usage of `Date().toLocale`[...] for frontend.

### Explicitly set timezone in NodeJS

Update `main.ts`

```ts
// * 🌐🕒 Explicitly set the timezone
process.env.TZ = `Europe/Paris`;
```

📌 Tests

```ts
// ? It is 14h44 in Paris
// ❌ 2023-12-20T13:44:20.371Z
console.log(new Date());

// ✅ Wed Dec 20 2023 14:44:20 GMT+0100 (Central European Standard Time)
console.log(new Date().toString());

// ✅ 20/12/2023
console.log(new Date().toLocaleDateString('fr-FR'));

// ✅ 14:44:20
console.log(new Date().toLocaleTimeString('fr-FR'));
```

---

## ⚰️⚡️ Remove ununsed code

Some packages are defaulted with NestJs and can be removed

```bash
bun remove @nestjs/platform-express
```

---

## ✅🐛 Allow the use of BigInt

There's a bug/implementation missing in ts/NestJs to serialize JSON Bit Int

See [the solution](https://github.com/GoogleChromeLabs/jsbi/issues/30#issuecomment-1721402063).

Added a small function in `app/src/utils.ts` and call it in `main.ts`

---

## ⚡️ Use compression with Fastify

🔍 cf. [NestJs > Compression > Fastify](https://docs.nestjs.com/techniques/compression#use-with-fastify)

```bash
bun add @fastify/compress
```

Update `main.ts`

```ts
import compression from '@fastify/compress';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  // [...]

  // * ⚡️ Use compression
  await app.register(compression);

  await app.listen(3000);
}
bootstrap();
```

Compression options can be specified after 'compression', cf. :

- 🔍 Repository [@fastify/compress](https://www.npmjs.com/package/@fastify/compress)

✅📌 Testing through browser console > network > (Make an API call) > Headers > `Accept-Encoding: gzip, deflate, br`

---

## 🤖📝 Documentation generation > "compodoc"

🔍 cf.

- [NestJs > Recipes > Documentation](https://docs.nestjs.com/recipes/documentation)
- [Compodoc.. doc](https://compodoc.app/guides/usage.html)

```bash
# Install package
bun i -d @compodoc/compodoc

# Generate documentation
# ~✅
# npx @compodoc/compodoc -p tsconfig.json -s
# ❌
# bun @compodoc/compodoc -p tsconfig.json -s
```

🙈 Ignore generated files & folders

### 🐛 Port 8080 already used by adminer > change through configuration

You can provide a configuration file in the root of your project folder.

Compodoc will search files like : .compodocrc, .compodocrc.json, .compodocrc.yaml or a compodoc property in your ✅ `package.json`

A JSON schema is available here : `./node_modules/@compodoc/compodoc/src/config/schema.json`

```json
// [...]
{
  "scripts": {
    // Allow "bun run docs"
    "docs": "compodoc -p tsconfig.json -d documentation -s"
  },
  "compodoc": {
    // Changing port > http://localhost:8042/
    "port": 8042
  }
}
```

---

## 💩 / 🔥🐛 Devtools integration

💸 Ain't free ! > Nope 💩 [DevTools nest](https://devtools.nestjs.com/choose-plan)

---

🔍 [NestJs > devtools](https://docs.nestjs.com/devtools/overview)

Config helpers > [nest issues](https://github.com/nestjs/nest/issues/11415#issuecomment-1493440961)

Update `main.ts`

```ts
const app = await NestFactory.create(AppModule, {
  snapshot: true,
});
```

Install package

```bash
bun i @nestjs/devtools-integration
```

🚨 WARNING > If you're using @nestjs/graphql package in your application, make sure to install the latest version (npm i @nestjs/graphql@11). >> ✅ "@nestjs/graphql": "^12.0.11",

Update `app.module.ts`

```ts
@Module({
  imports: [
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

---

## 🌐🤖 GraphQL > Using the CLI plugin

🔍 [NestJs > CLI plugin](https://docs.nestjs.com/graphql/cli-plugin)

Update `nest-cli.json`

```json
// [...]
{
  "compilerOptions": {
    "plugins": [
      {
        "name": "@nestjs/graphql",
        "options": {
          // "typeFileNameSuffix": [".input.ts", ".args.ts"],
          "introspectComments": true
        }
      }
    ],
    // SWC builder > Enable type checking
    "typeCheck": true
  }
}
```

SWC builder > For standard setups (non-monorepo), to use CLI Plugins with the SWC builder, you need to enable type checking.

Already setup.

✅📌 `bun run start:dev` > `src/metadata.ts` generated

Now, the serialized metadata file must be loaded by the GraphQLModule method

Update `app.module.ts`

```ts
import metadata from './metadata'; // <-- file auto-generated by the "PluginMetadataGenerator"

GraphQLModule.forRoot<...>({
  ..., // other options
  metadata,
}),
```

### Integration with ts-jest (e2e tests)

🔍 [NestJs > CLI plugin](https://docs.nestjs.com/graphql/cli-plugin#integration-with-ts-jest-e2e-tests)

Create an e2e test directory `e2e-tests-directory/`

Create `app/e2e-tests-directory/fix-graphql-transformer.ts` with recommanded content

Update Jest e2e configuration `app/test/jest-e2e.json`

```json
{
  // [...] other configuration
  "transform": {
    "^.+\\.(t|j)s$": [
      "ts-jest",
      {
        "astTransformers": {
          // "before": ["<path to the file created above>"]
          "before": ["../e2e-tests-directory/fix-graphql-transformer.ts"]
        }
      }
    ]
  }
}
```

---

### 🐛 `metadata.ts` n'est pas généré avec `bun run start`

1. 🔍 [Github Issue](https://github.com/nestjs/swagger/issues/2493)
   1. Yeah la commande de génération des metadatas n'est lancée qu'au watch et au type-check
   2. L'app essaie de charger le fichier avant sa génération
2. 🔍 Génération dans un script a part qu'on execute avant ? cf.
   1. [nest > cli plugin > swc](https://docs.nestjs.com/openapi/cli-plugin#swc-builder)
   2. [nest > swc > monorepo](https://docs.nestjs.com/recipes/swc#monorepo-and-cli-plugins)
3. 🐛 Résolution du problème
   1. 🐛 La génération se fait à côté de la vérification des types, attente infinie
      1. Par défaut en watch > false
   2. 🐛 Erreur liée aux tests unitaires `app/test/app.e2e-spec.ts` > commentay
   3. 💩 CLI Plugins (SWC)# > The --type-check flag will automatically execute NestJS CLI plugins and produce a serialized metadata file which then can be loaded by the application at runtime.
      1. 💩💩💩 Yeaaah sauf que le type check échoue parce que la classe n'existe pas parce que le fichier n'est pas généré parce que.. le type fail -_-
      2. 🐛📌💩 tsconfig > ignorer metadata.ts ?
      3. ✨🐛 Ptet des commentaires pour ignorer le lint de l'import manquant ?
         1. Pas testé
      4. ✅✅✅🐛📌✅ Détournement du script de génération des métadatas
         1. On ignore tous les fichiers ts
         2. On fait tourner le script détourné (sans erreur d'imports manquants)
         3. Un fichier metadata "vide" (fichier & classe dispos) est généré
         4. bun start classique qui relance le type-check qui génère les metas
      5. ✅👌 Meilleur nommage
      6. ✅🔨 Ajout du patch aux scripts `bun` dans `package.json`

#### Détails

Script de génération dans `app/src/generate-empty-metadata.ts`, adapation du modèle fourni dans la doc:

1. Utilisation du plugin cli de GraphQL au lieu de Swagger
2. Passage de `watch`: à `false`, sinon ça ne termine jamais ("watch" > en attente de modifs)
3. Changement du fichier de configuration TS > `tsconfigPath: './tsconfig.generate-empty-metadata.ts.json',`
   1. Création d'un fichier dédié
   2. On ignore l'intégralité des fichiers `[...] > "exclude": ["**/*.ts"]` afin que le fichier `"metadata.ts"` soit généré sans erreur d'import manquant (lui même dans `main.ts`)

📌 Test du script : Virer `src/metadata.ts` si déjà généré via le watch (`bun run start:dev`)

```bash
bun ts-node src/generate-empty-metadata.ts
# 📌 Fichier créé
```

Mise en place auto pour les utilisateurs ; on l'exécute avant la commande originale

`package.json` > `scripts` > ~ `ts-node src/generate-empty-metadata.ts && nest start`

🚨🚨🚨 Actuellement **pas** en place pour "start:prod", 📌 à priori pas besoin

---
---
---

## 🌐📦️ GraphQL > Use graphql-scalars

Common custom GraphQL Scalars for precise type-safe GraphQL schemas

🔍 [Package documentation](https://the-guild.dev/graphql/scalars/docs/quick-start)

```bash
bun add graphql-scalars
```

Ready to use, [yay](https://the-guild.dev/graphql/scalars/docs/quick-start#integration-to-your-existing-graphql-schema)

---

## 🤖 Swagger > Mise en place du plugin CLI

🔍 [NestJs > OpenAPI > CLI Plugin](https://docs.nestjs.com/openapi/cli-plugin#cli-plugin)

Instead of manually annotating each property, consider using the Swagger plugin which will automatically provide this for you.

🔍 [Installation](https://docs.nestjs.com/openapi/cli-plugin#using-the-cli-plugin)

Update `nest-cli.json`

```json
"plugins": [
  {
    "name": "@nestjs/swagger",
    "options": {
      // the module will reuse class-validator validation decorators (e.g. @Max(10) will add max: 10 to schema definition)
      "classValidatorShim": true,
      // If set to true, plugin will generate descriptions and example values for properties based on comments
      "introspectComments": true

      // * All possibilities
      //    dtoFileNameSuffix?: string[],
      //    controllerFileNameSuffix?: string[],
      //    classValidatorShim?: boolean,
      //    dtoKeyOfComment?: string,
      //    controllerKeyOfComment?: string,
      //    introspectComments?: boolean,
    }
  }
]
```

SWC builder > For standard setups (non-monorepo), to use CLI Plugins with the SWC builder, you need to enable type checking.

Already setup.

Now, the serialized 🚨**metadata** file must be loaded by the `SwaggerModule#loadPluginMetadata` method, as shown below:

✅📌 Conflict with GraphQL CLI ? 🤖 `cronexia-gta/app/src/metadata.ts` > `return { "@nestjs/graphql": { "models": [] }, "@nestjs/swagger": { "models": ` Nope they are separated

Update `main.ts`

```ts
import metadata from './metadata'; // <-- file auto-generated by the "PluginMetadataGenerator"

await SwaggerModule.loadPluginMetadata(metadata); // <-- here
const document = SwaggerModule.createDocument(app, config);
```

### Integration with ts-jest (e2e tests)

Same thing as GraphQL

---

### 💎🛒 Prisma Client / 🤖📝 Documentation generation & local server

Using community doc generation are there mostly nothing on PC documentation

🔗 [Prisma Documentation Generator](https://github.com/pantharshit00/prisma-docs-generator)

1. Install package

```bash
bun i -d prisma-docs-generator
```

2. Add the generator to the schema

`app/prisma/schema.prisma`

Add a second generator, do not override/merge with "prisma-client-js"

```ts
generator docs {
  provider = "node node_modules/prisma-docs-generator"
}
```

3. Generate the documentation alonside PC

```bash
# Default generation in app/prisma/docs, can be modified
bun prisma generate
```

4. Serve the local server

```bash
# Default port is 5858 > http://localhost:5858
bun prisma-docs-generator serve
# With a specific port 8043 > http://localhost:5858
bun prisma-docs-generator serve -p 8043
```

5. Ignore generated stuff

`.gitignore` add one line `app/prisma/docs`

---
---
---

