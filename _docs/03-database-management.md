# 💾 Database management

In this project, database management (creation, access, etc.) works through multiples technologies.

## Technologies interactions resumé

1. *PostgreSQL* is the database engine
   1. *Adminer* is the direct dashboard
2. *Prisma* > is used as an ORM and defines database structure (& evolution) through a file `schema.prisma`
3. *Prisma Client* > Generates typed classes for NestJs, based on `schema.prisma`
4. *NestJS* is the server / back part
  1. Relation with *Prisma*
    1. **Instanciate** *Prisma* **service** to enable direct database access through dedicated methods ~`find`, `findMany`, `create`, `update`, etc.
    2. *Prisma CLient* is a global module, with (**generated**) classes corresponding to Components database structure
  2. NestJs contains *Modules*, which groups everything together by component
    1. *DTOs*
      1. **Entity** > Straight match to database structure
        1. Used by services
      2. *Model* > Back, transformation / obfuscation of database fields before serving
        1. Some times there is no need for a Model, then the Entity can be re-used
      3. *DTO Front* > What is available to users through GraphQL API
        1. Used by Resolvers
        2. Usually `input` or `args` files
    2. *Service* > create component method to allow database entries management
       1. Type safe through *Prisma Client*
       2. Method through *Prisma service instance*
    3. *Resolver* > users access to the GraphQL API (~= routes)
       1. Uses *Entity* alonside *Prisma Client* to enforce type AND data integrity
       2. Uses (multiples) component/s services to allow user restricted access to database

---

## 📝🔗 Summary

1. 💎💾 [Prisma ORM](./03.1-prisma-orm.md) / Database creation
   1. 🏭 [Process](./03.2-prisma-orm-process.md)
2. 💎🛒 [Prisma Client](./03.3-prisma-client.md)
3. 📚 [DTOs](./03.4-dto.md) / Data Transfer Objects
4. 🌐 [GraphQL](./04-graphql.md)
   1. 🏭👷💬 [Params](./04.1-graphql-params.md)
   2. 🏭👷🚦 [CRUD implementation process](./04.2-graphql-crud.md)
   3. 🏭👷🔗 [Relations implementation process](./04.3-graphql-relations.md) ~= SQL JOIN

---

## 💾🔧 Database configuration

### Custom port for PostgreSQL

Oddly enough, it seems that the default port `5432` tends to bug "sometimes".

Moving to `5433` in the dockerfile.

---

### Connection credentials

Stored in `.env`

---

## 📝 Notes

### Alternative MongoDB

An example docker compose file for MongoDB is available in the `cronexia-tests/cronexia-nest-mongodb` repository

#### Notes on MongoDB compatibility

With typeORM > Entity > `@PrimaryGeneratedColumn()` vs `@ObjectIdColumn()`

With Prisma for Postgre > prisma/schema.prisma : `@id`

🔍 [prisma mongo](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/mongodb/creating-the-prisma-schema-typescript-mongodb)

```prisma
// Posgtgre
model Article {
  id      Int       @id @default(autoincrement())
}

// Mongo
model Post {
  // ✅
  id      String    @id @default(auto()) @map("_id") @db.ObjectId
}
```

📌 Compatibility test

❌ Native type ObjectId is not supported for postgresql connector.
