# ⚡️💎💾 PostgreSQL indexes through Prisma

Quick c/c of researches

---

## ⚡️ Mettre en place des indexs sur PostgreSQL

- 🎯 Objectifs
  - ✅ Voir les différents types d'indexs disponibles, et mettre en avant les plus adaptés
  - ❓🔍 Implémentation via schema prisma
  - 🔍 Repasse sur les requêtes compteurs, esp. craft queries afin de déterminer les champs incriminés
    - 🔍 Idem champs générés ~events > schedule, etc.
  - 🔍 Indexs importants lors de create ?

---

### ✅ Voir les différents types d'indexs disponibles, et mettre en avant les plus adaptés

- [article d'hier](https://www.timescale.com/learn/postgresql-performance-tuning-optimizing-database-indexes)
  - En fin d'article > configuration des paramètres de postgre si besoin (allocation de mémoire, etc.)
  - [Partitionner les grandes tables (de manière auto?)](https://www.timescale.com/blog/when-to-consider-postgres-partitioning/)

---

- ✅ B-Tree indexes (default index type in PostgreSQL)
  - ✅💎
  - **Default index** type in PostgreSQL.
  - Supports <, <=, =, >=, >, BETWEEN, IN, IS NULL, IS NOT NULL.
  - Organizes entries in ascending order.
- ---
- ✅ Hash indexes
  - ✅💎
  - Ideal for **equality** checks, especially for **integers**.
  - Doesn't support range queries or sorting.
  - 💎 The Hash type will store the index data in a format that is much faster to search and insert
    - 🚨 However, only the = and <> comparisons can use the index, so other comparison operators such as < and > will be much slower
- ---
- ✅ Composite indexes
  - ✅💎 "compound indexes"
  - Multicolumn index defined on **multiple table columns**.
  - Optimize based on columns frequently used in **WHERE** clauses
- ---
- ❌ GiST and SP-GiST indexes
  - ✅💎
  - geometric shapes and full-text documents
  - spatial and hierarchical data
- ---
- ⚡️ Partial indexes
  - ❌💎???
    - [pas encore implémnté dans prisma -_-](https://github.com/prisma/prisma/issues/6974)
  - `CREATE INDEX index_product_id ON products(product_id) where product_available = ‘true’;`
  - Built over a subset of a table, **defined by a conditional expression**
  - Useful for **filtering out** frequently **unqueried** rows
    - 🧠 Probablement utile pour les events > filter out generated events qui devraient avoir leur propre table
- ---
- ⚡️ Covering indexes
  - ❌💎???
    - [pas encore implémenté](https://github.com/prisma/prisma/issues/8584)
  - `CREATE INDEX index_product_id_name_status ON products (product_id, product_name) include (status);`
  - Allows index-only scans when the select list matches index columns
  - Additional columns are specified with the INCLUDE keyword
  - ❔ Pas sûr d'avoir compris
    - ✅ [doc postgre](https://www.postgresql.org/docs/current/indexes-index-only-scans.html)
      - Ne scanne que les indexs, mais HS si on requête (select ou where) sur des champs non indéxés
    - ✅✅ [blah](https://www.crunchydata.com/blog/why-covering-indexes-are-incredibly-helpful)
      - On peut cependant récupérer des champs supplémentaires via include
      - 👷 Dans l'exemple ci-dessus, si une requête ne tape QUE sur product id, name & status
        - Gain de perfs car on ne recherche les lignes QUE par product id ou name (et non les 20 autres champs potentiels ~pas besoin du prix)
          - MAIS le status est associé à ce genre de requêtes
      - ✅ Excellent article
- ---
- ⚡️⚡️ Block Range index (BRIN)
  - ✅💎
  - `CREATE INDEX brin_example_index ON logs USING BRIN(log_date);`
  - Designed for large, sorted tables like time-series data.
  - Space-efficient, storing min and max values within logical blocks.
  - ❔⚡️ Pas tout compris mais clairement utile pour nous
    - ✅ [postgre](https://www.postgresql.org/docs/current/brin.html)
      - BRIN is designed for handling **very large tables** in which **certain columns** have some natural **correlation** with their physical **location within the table**
        - 👷 ~= données classées par dates, ordonnées par ASC. 2024 seront regroupées ensembles a la suite, 2025 aussi, etc.
        - 👷 ~= des adresses > code postaux rangés par INC
    - ✅ [blah](https://www.percona.com/blog/brin-index-for-postgresql-dont-forget-the-benefits)
      - ⚡️⚡️ BRIN index often gives similar gains as Partitioning a table.
        - Besoin de config ~> automatic summarization will be executed by autovacuum as insertions occur.
          - 🚨🚨🚨 Ne se fait pas par défaut
      - 🚨 Meilleure efficacité si les clés sont toujours ordonnées
        - ⚡️⚡️ Pointages par exemples
    - ✅ [blah](https://medium.com/geekculture/postgres-brin-index-large-data-performance-with-minimal-storage-4db6b9f64ca4)
  - ---
  - 💎 The BRIN index type is useful if you have lots of **data that does not change after it is inserted**, such as **date** and **time** values.
    - 👌 Possibilité de spécifier des classes d'opérateurs en fonction des types
      - Text, time, int, date, float, etc.
      - [Pas tout compris](https://www.postgresql.org/docs/14/brin-builtin-opclasses.html)
      - Au pire laisser par défaut...

---

### 💎🔍 Implémentation via schema prisma

- ✅🔍 [doc](https://www.prisma.io/docs/orm/prisma-schema/data-model/indexes)
- 🚀🔍 [blog](https://www.prisma.io/blog/improving-query-performance-using-indexes-2-MyoiJNMFTsfq)

(& complété ci-dessus)

You can configure indexes, unique constraints, and primary key constraints with the following attribute arguments:

---

**PostgreSQL** only

The type argument allows you to support index access methods other than PostgreSQL's default BTree access method

Available on the **@@index** attribute

Supported index access methods: 

- Hash
- Gist
  - ❌ ~Types custom
- Gin
  - 📝 Si stockage de JSON / Arrays
- SpGist
  - ❌ ~Types custom
- Brin

---

The sort argument is available for all databases on @unique, @@unique and @@index

allows you to specify the **order** that the **entries** of the constraint or index are stored **in the database**

- 💥⚡️ [Configuring Index sort order](https://www.prisma.io/docs/orm/prisma-schema/data-model/indexes#configuring-the-index-sort-order-with-sort)
  - Couplé avec **Block Range index** (BRIN) ça peut être monstrueux !

---
---
---

- [blog](https://www.prisma.io/blog/improving-query-performance-using-indexes-2-MyoiJNMFTsfq)
  - Article coupé en 3
    - intro
    - index par défaut B-Tree
    - index de type Hash
