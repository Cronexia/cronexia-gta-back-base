# How to boilerplate

I'd recommand doing and testing all CRUDs first, relations afterwards (Model dependancies).

Complete process in `cronexia-gta/_docs/04.2-graphql-crud.md`

---

## Generate new Resource

```bash
nest generate resource
# ? What name would you like to use for this resource (plural, e.g., "users")? StructureResources
# ? What transport layer do you use? GraphQL (code first)
# ? Would you like to generate CRUD entry points? Yes
```

---

## CRUD++

Copy paste and global replace keywords on top.

Then adapt in this order (process to c/c & check along)

- Entity *(database/schema.prisma strict fields)*
- ENUM (distinct)
  - enums/
  - dto/find
  - Resolver > constructor
- Model *(What is gonna show in the API)*
- All DTOs *(How inputs and args are managed + type conversion between GraphQL & Nest)*
- Service *(Pass args to Prisma Client)*
- Resolver *(GraphQL entrypoints)*
  - Everything
  - GraphQL documentation / examples
- 📌 Test

---

## Relations

Pay attention to the type of relation : one-to-many ~reference or many-to-one ~reference**S**[]

🚨 Pay good attention to plural (when it's an array)

- Entity
- Model
- DTO > Create input
- DTO > Nested
  - 🚨 In the nested module folder, not in the current class folder, to avoid duplicates
- One to many
  - DTO > Create Many inputs
- Module > import nested modules with forwardRef
  - 📝 > forwardRef prevents circular dependancy
- Many to one
  - Service > delete > nested
- Resolver
  - imports
  - constructor
  - @ResolveField
  - One to many
    - create > nested > convert "id" to "idRELATION_MAJ_FIRST"
  - GraphQL documentation / examples
    - I'd recommand using the nested Model
- 📌 Test
