# Configuration

(See [🔧 Configuration implementation for details](./stack-installation-details.md))

Possibility to split config in [different files](https://docs.nestjs.com/techniques/configuration#configuration-namespaces).

## Environnement variables

In `/app/.env`

```ini
# ⚡️ Allow NodeJs to use 8Go RAM, instead of 4 by default
#       @see  https://medium.com/geekculture/node-js-default-memory-settings-3c0fe8a9ba1
NODE_OPTIONS="--max-old-space-size=8192"

# 💾🔌 Prisma ORM, to connect to PostgreSQL database through credentials
DATABASE_URL=" [...] "
```

### 🌐🕒 Explicitly set timezone in NodeJS

Updated `main.ts`

```ts
process.env.TZ = `Europe/Paris`;
```

🚨 Enforce the usage of `Date().toLocale`[...] for frontend.

### 📌 Validation

`app.module.ts` > ConfigModule > validationSchema

Can check for types & set defaults through Joi.

#### ✅ Add validation pipes

Most of validation & transformations are made through both packages:

- [class-validator](https://www.npmjs.com/package/class-validator)
- [class-transformer](https://www.npmjs.com/package/class-transformer/v/0.5.1)

🔍 cf. [NestJs > Validation](https://docs.nestjs.com/techniques/validation), more on Prisma's doc, cf. `orm-management.md`

Instantiated & enforced in `src/main.ts`, used in DTOs, Controllers, etc.

```ts
// * Add validation pipes (~= API controls before adding to database)
//    transform > Automatically transform payloads to be objects typed according to their DTO classes
//    whitelist > Removes property without decorator, excluding fields data overload if not explicitly defined
app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
```

---

## ⚡️ Use compression

🔍 cf.

- [NestJs > Compression > Fastify](https://docs.nestjs.com/techniques/compression#use-with-fastify)
- Repository [@fastify/compress](https://www.npmjs.com/package/@fastify/compress)

Options are accessible in `main.ts`.

---

## 💾 Database configuration

In `docker-compose-database-postgresql.yml` (docker image for PostgreSQL & Adminer)
