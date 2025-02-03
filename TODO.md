# 🌱 TODO

List of pending tasks.

- 🌱 TODO: CPT > Définitions de Fonctions > 💬 Traduire
- 🌱 TODO: Repasser partout > "Nbr" devient "Int" ou "Flt" ou fonction de entier ou float
  - Oulah clairement pas le moment :')
- ♻️ Refacto > Compteurs > CT_AdmissibleParams > ✂️ Séparer en deux tables
    - xx_Type
    - xx_EntityType
    - Clairement pas indispensable mais ca risque de très vite devenir relou à l'usage en vrai (~= toujours le même type mais refaire pour changer l'entité)
- 🌱 En attente de dev
      - 🌱 CycleReference
        - 🌱 Enum String // 🌱 Non implémenté
          - 🌱 Création des variables
          - ♻️ Code similaire pour ResourceEnum, à réutiliser
      - 🌱 ScheduleReference
        - 🌱 Enum String // 🌱 Non implémenté
          - 🌱 Création des variables
          - ♻️ Code similaire pour ResourceEnum, à réutiliser

---

- 💾 Base de données
  - ⚡️ Prisma > définition des indexes [stacks for geeks](https://stackforgeeks.com/blog/how-to-achieve-modelspecific-type-inference-from-prisma-model-without-explicitly-passing-the-index-string-to-prismaclient-object#mastering-database-indexes-and-constraints-with-prisma-a-comprehensive-guide)
  - `schema.prisma` > Translate fields to english
    - 🙈 Don't Ignore Prisma SQL Migration when in Prod
  - 🖼️ Gestion & stockage des images
  - ⚡️🧠 CounterExec > Pas mal de pré-calculs possibles à faire en vrai avec PostgreSQL > index `Brin`
      - 🛑📅 Restricted days management
        - Listes des journées, par an
          - D'une année sur l'autre cela ne change pas, on peut les stocker de manière ordonnées
          - Pré-calculer les lundi out, mardi out, etc.
      - etc.
  - Corriger les relations actuellement optionnelles (pour faciliter seeds & tests) qui ne devraient pas l'être
    - ex:

model ResourceStrVal {
  // 📁🔧 Which ResourceField is this value related to ?
  resourceField   ResourceField? @relation(fields: [resourceFieldId], references: [idResourceField])
  resourceFieldId String?        @db.Uuid

Une ResourceStrVal DOIT appartenir à une Resource, on ne peut pas avoir de valeurs "flottantes"/non rattachées.

- ---
- 🕵️‍♂️ Gestion propre des Anomalies
  - cf. ~`cronexia-suivi/reunions/2024/06-juin/240610-sprint-7-horaires-et-events-03-reunion.md`
- ---
- 🔒️ Sécurité
  - Auth
    - Connexion à la BDD
    - Auth > JSON Web Tokens > [Secret](https://docs.nestjs.com/techniques/configuration)
      - Générer son propre secret via OpenSSL (Lien dead)
    - Sécuriser accès super admin avec id/pass aléatoires
    - Mise en place de helmet MAIS
      - Attention, configuration particulière avec [Fastify & swagger](https://docs.nestjs.com/openapi/introduction#bootstrap)
  - [CORS](https://docs.nestjs.com/security/cors)
  - [CSRF](https://docs.nestjs.com/security/csrf)
  - Prisma Client > [logs](https://www.prisma.io/docs/orm/prisma-client/observability-and-logging/logging)
  - 🛑 Remove (access) to
    - 📌 `__tests-and-examples`
    - 🤡 `_mock`
  - 🐳 Redis > Actuellement utilisation de `redis stack` afin d'avoir l'admin
    - Mais basculer sur redis vanilla pour la prod
  - Redis > 🐛 Sometimes username isn't taken into account, use "default" for dev
  - Redis insight > RI_ENCRYPTION_KEY
- ---
- Resources
  - Rattachements
    - Currently if a wrong type is used, throws a generic Error 500
- ---
- ⚡️ Performances
  - [JS Perfs & benchs](https://youtube.com/watch?v=_pWA4rbzvIg)
  - Filter out resources without dates at the end of resourceMergeManualEventsTimesByDay
  - GraphQL
    - [batching technique](https://graphql.org/learn/best-practices/#server-side-batching-caching)
      - tool like [DataLoader](https://github.com/graphql/dataloader).
    - [Complexity](https://docs.nestjs.com/graphql/complexity)
      - restrict queries with a maximum complexity, cf. graphql doc
      - 📦️⚡️/🔥🐛 graphql-query-complexity
  - Mercurius
    - [Batched queries](https://mercurius.dev/#/docs/batched-queries)
    - [plugins](https://mercurius.dev/#/docs/plugins)
  - Prisma Client
    - [Query optimization](https://www.prisma.io/docs/orm/prisma-client/queries/query-optimization-performance)
      - Logs avec durées
    - [The transaction API](https://www.prisma.io/docs/orm/prisma-client/queries/transactions#the-transaction-api)
    - [Options for case-insensitive filtering](https://www.prisma.io/docs/orm/prisma-client/queries/case-sensitivity#options-for-case-insensitive-filtering)
      - Optimisations pour les recherches textuelles
      - ~populations > XXX_StrVal > equals, not, startsWith, endsWith, contains
    - Prisma [atomic number operations](https://www.prisma.io/docs/orm/reference/prisma-client-reference#atomic-number-operations)
  - [Bun 1.2](https://www.youtube.com/watch?v=uSzffuqfJQk)
    - Lecture écriture de fichiers via bun s3
    - Voir si possibilité de remplacer la base node par bun avec NestJs ?
    - Connexion à PostgreSQL ?
    - Passage en fullstack avec minify lel wat
  - 🟥 Redis > Peu conduire à des problèmes de perfs via le conteneur > [vaut mieux en natif](https://stackoverflow.com/questions/75359027/why-does-redis-run-slower-in-docker-than-it-does-natively)
  - Counter exec > décaler les tests qui throw (dependance cyclique, etc.)
    - Les place à la création/modification du Counter & rajouter des booleans en BDD
    - Permettra d'alleger les caclculs de compteurs
  - Gestion de l'historisation > cut tableau plutôt que 2 requêtes first before & in period
    - Actuellement
      - on récupère premièr résultat avant ou égale a period.dateStart
      - on récupère tous les résultats ]period]
      - on merge
    - ---
    - Opti > Réduit d'une requête mais travaux plus lourd sous Nest
      - Récupérer les résultats *period] ~= tout ce qui il y a avant la fin de période, incluse
      - Trouver l'élément le plus proche ou égal au début de période
        - ~nest find(elem) => date < a comparer // ou ptet indexOf
        - puis slice le tableau la dessus
      - (déjà en place sur 2-3 trucs, ScheduleReference > ScheduleBolVals ?)
    - ---
    - Egalement possible de cut au premier élément > period.dateStart
      - reste d'avant .pop() pour récupérer le premier élément le plus proche
    - ---
    - MAIS BON même si mieux pour la bdd, plus lourd pour la RAM
      - Pas oublier de delete/unset les variables après coup lol
  - Utiliser Js `Map` plutôt que `Object {}` pour les couples clés/valeurs [yay](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
    - Eviter des injections d'objets en cas d'ajout de la part d'utilisateur
    - Plus simple & safe (meilleur typage, size, for... of, pas de propriété non souhaitée)
    - Plus performant !
    - 🚨Pas de serialisation par défaut ~JSON.stringify/parse, mais workaround a implémenter
- ---
- 👌 Clean code
  - Nest config clean > [Nest config service & env](https://docs.nestjs.com/techniques/configuration)
  - CtResultBolDaily et tous les autres CtResult_TYPE_TEMPO
    - resource & counter son obligatoire (un résultat ne peut exister sans)
    - si resource est supprimée, cascade delete de ses résultats de compteurs
    - si counter est supprimé, cascade delete de ses résultats de compteurs
  - Counter > Déplacer les champs debug/historique dans une table dédiée
