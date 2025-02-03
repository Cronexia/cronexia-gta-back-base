# Caching for performance

Why and how, condensed version.

🎯 Goals:

- Improve performance by caching
  - Nest responses (GET API)
  - Prisma queries (database)

---

## Index

- Usage > `src/__tests-and-examples/tests-and-examples.resolver.ts` > test_cache_redis
- Docs
- Installation & config

---

## 🔍 Searches and Docs

Do not that Redis isn't included with packages and needs to be installed / 

### 🐯🟥 Redis for NestJs

- ~~[nest microservices](https://docs.nestjs.com/microservices/basics)~~ // Only used to replace HTTP with TCP
- ~~[npm nestjs-redis](https://www.npmjs.com/package/nestjs-redis)~~ // Redis vanilla usage
- [Nestjs caching](https://docs.nestjs.com/techniques/caching)  // Official doc
  - Uses 📦️ cache-manager to enable cache for Nest, and another 📦️ package for a redis store
  - Allow the uses of cache GET / SET / DEL methods
  - Allow a global use through `CacheInterceptor`
    - Can also fine tune through Resolver decorators
- [article medium](https://medium.com/@mut1aq/using-redis-in-nestjs-8ca1a009670f)
- [l'indien de youtube](https://www.youtube.com/watch?v=VD9XMGJQaT8)
  - 📦️ Better package > [cache-manager-redis-yet](https://www.npmjs.com/package/cache-manager-redis-yet)
    - ^is a fork of node-cache-manager-redis-store, which has a [better doc](https://github.com/dabroek/node-cache-manager-redis-store)
  - Confirm that we need a redis server instance running
  - Admin redis : **redis insight**
  - 👷 Possibility to create a Resolver > reset all cache
- - [un autre gars](https://www.youtube.com/watch?v=N9Ld96ywiW8)
  - cache-manager-redis-yet >> Redis V4 (updated)
    - la version officielle est bloquée en V3 a cause d'un bug, mais c'est un fork communautaire
    - [le thread](https://github.com/dabroek/node-cache-manager-redis-store/issues/40#issuecomment-1383193211)
      - 📌 Janvier 2023, à vérifier si toujours necessaire
    - Redis container avec conf !
    - Remplacer adminer par pgadmin4 plus récent
    - 🚨🚨🔑🔑 Passage des user:pass via l'url redis (plutot que socket{ host, port})
- [Redis config](https://redis.io/docs/latest/operate/oss_and_stack/management/config/)

---

- ✅ VS
  - Officiel [node-cache-manager-redis-store](https://github.com/dabroek/node-cache-manager-redis-store/)
  - Fork [cache-manager-redis-yet](https://www.npmjs.com/package/cache-manager-redis-yet)

- Officiellement dans la doc bah elle utilise node-cache-manager-redis-store
  - Mais pas maj depuis 2 ans, le thread incriminant toujours pas fermé
  - L'autre maj < 22 jours
  - On part sur 🎉 **cache-manager-redis-yet** 🎉
    - 📝 Garder le github de l'autre pour [la doc](https://github.com/dabroek/node-cache-manager-redis-store)

---

### 💎🟥 Redis for Prisma

- ✅ [Prisma redis](https://www.prisma.io/ecosystem)
  - Middlewares

MIDDLEWARE
**prisma-redis-middleware**
This is a Prisma middleware used for caching and storing of Prisma queries in Redis (uses an in-memory LRU cache as fallback storage).

MIDDLEWARE
**prisma-cache-middleware**
With this middleware you can cache your database queries into the Redis (one of the fastest in-memory databases for caching) and reduce your database queries.

- 👴 [prisma-redis-middleware](https://www.npmjs.com/package/prisma-redis-middleware)  
  - Mise en cache des requêtes prisma avec une bonne possibilité de configuration et de debug
    - ~tout les CRUDs, count, aggregate, groupby
  - 🚨 Pas mentionné mais je pense qu'il faut avoir un redis à côté
  - 🚨 Ne met pas en cache les rawQuery
  - 🚨 Node 16 & 18, ici Nodev21.1.0
  - 👴 $use > deprecated (anciens middleware de prisma)
- 👴 [prisma-cache-middleware](https://www.npmjs.com/package/prisma-cache-middleware)
  - Besoin d'un serveur redis en place
  - 🚨 Beaucoup plus / 🚨trop simple
  - 🚨 Besoin de définir les cahces à la mano par model PAR route // y'a du taf
    - Mais meilleure granularité
  - 👴 $use > deprecated (anciens middleware de prisma)

- ✅ package a jour avec $extends [prisma-redis-cache](https://www.npmjs.com/package/@yxx4c/prisma-redis-cache)


---

### Notes

Peu conduire à des problèmes de perfs via le conteneur > [vaut mieux en natif](https://stackoverflow.com/questions/75359027/why-does-redis-run-slower-in-docker-than-it-does-natively)

---
---
---

## Installation & config

### 🐳 Image docker redis intégrée au projet 

- Redis docker image configuration : [l'autre gars @6:41](https://youtu.be/N9Ld96ywiW8?si=XkS-Nkk1_bCD2INA&t=401)
- [🐳 Dockerhub Redis](https://hub.docker.com/_/redis)
  - Images
    - ✅ Vanilla
    - ~~Redis Stack: contains both Redis Stack server and RedisInsight. This container is best for local development because you can use RedisInsight to visualize your data.~~
    - ~~Redis Stack Server: provides Redis Stack but excludes RedisInsight. This container is best for production deployment.~~
    - ✅ Insight est également dispo à côté > redis/redisinsight
  - Version
    - redis:<version>-alpine // peut potentiellement causer des soucis en fonction de blahblahblah
    - `redis:7.4-rc2-alpine`

🔧 Config

✅ Note: Builded a new Redis image with proper user & pass (remove default, add custom)

```yaml
cache_redis:
  # image: redis:latest
  # image: redis:7.4-rc2-alpine # Build a custom image v
  # Custom image to set user and pass, disable default user
  build:
    context: ./docker/redis
    dockerfile: Dockerfile.dev
  container_name: cronexia_cache

  env_file:
    - .env
  ports:
    # Redis
    - 6379:6379
  volumes:
    - cache_redis__data:/data

cache_redis_admin:
  # image: redis/redisinsight:latest
  image: redis/redisinsight:2.52
  container_name: cronexia_cache_admin

  depends_on:
    - cache_redis
  env_file:
    - .env
  ports:
    # Redis Admin : Redis Insight
    - 5540:5540
  volumes:
    - cache_redis_admin__data:/data

volumes:
  db_postgres__data:
  cache_redis__data:
  cache_redis_admin__data:
```

`.env` file

```ini
# 🟥 Redis > Cache
#           https://hub.docker.com/_/redis
REDIS_SERVICE_NAME=cache_redis # In docker-compose, 🚨 NOT container name
# ! 🐛 Sometimes username isn't taken into account, use default for dev
REDIS_USERNAME=default
# REDIS_USERNAME=bob
REDIS_PASSWORD=bof
REDIS_DISABLE_DEFAULT_USER="true"
# REDIS_URI=redis://default:bof@cache_redis:6379
# REDIS_URI=redis://bob:bof@cache_redis:6379
REDIS_URI=redis://${REDIS_USERNAME}:${REDIS_PASSWORD}@${REDIS_SERVICE_NAME}:6379

# 🟥👷 Redis > Administration > Redis Insights
#           https://hub.docker.com/r/redis/redisinsight
#   Redis Insight config, NOT Redis
# RI_APP_PORT=5540
# RI_APP_HOST=0.0.0.0
```

---

📌 Tester bon fonctionne de redis

```bash
# Récupérer le nom du conteneur, si non fixé dans dc.yml
docker ps

# docker exec -it REDIS_CONTAINER_NAME redis-cli
docker exec -it cronexia_cache redis-cli

>> ping
> (error) NOAUTH Authentication required.
# password = bof
>> 127.0.0.1:6379> auth bob bof
> OK
>> 127.0.0.1:6379> ping
> PONG
```

📌 Tester bon fonctionne de insight

- [Browser en local](http://localhost:5540/)
- Connexion BDD > Prépopuler en copiant dans **url** `redis://bob:bof@cache_redis:6379`

---

### ⚡️🐯 Mettre en place le cache pour Nest

Install packages

```bash
bun add @nestjs/cache-manager cache-manager cache-manager-redis-yet
```

Load in `cronexia-gta/app/src/app.module.ts`

```ts
// * ⚡️🟥 Cache Management / Redis
import { CacheModule } from '@nestjs/cache-manager';
import type { RedisClientOptions } from 'redis';
import { redisStore } from 'cache-manager-redis-yet';

@Module({
  imports: [

    // // * ⚡️🟥 Cache Management / Redis // Sync
    // CacheModule.register<RedisClientOptions>({
    //   // 🔧 Config
    //   store: redisStore,
    //   ttl: 5, // seconds
    //   max: 10, // maximum number of items in cache

    //   // ⚡️ Redis configuration:
    //   // host: 'localhost',
    //   // port: 6379,
    //   socket: {
    //     host: 'localhost',
    //     port: 6379,
    //   },
    // }),

    // * ⚡️🟥 Cache Management / Redis // Async
    CacheModule.registerAsync<RedisClientOptions>({
      isGlobal: true,
      useFactory: async () => {
        const ttl = 30 * 1000; // 30s
        const max = 10; // maximum number of items in cache
        const store = await redisStore({
          ttl,
          socket: {
            host: 'localhost',
            port: 6379,
          },
        });

        return { store, ttl, max };
      },
    }),
  ]
})
export class AppModule {}
```

---

💩💩💩 Appliquer partout HS, car GraphQL

WARNING
In GraphQL applications, interceptors are executed separately for each field resolver. Thus, CacheModule (which uses interceptors to cache responses) will not work properly.

```ts
// 💩💩💩
import { CacheModule, CacheInterceptor } from '@nestjs/cache-manager';
import { APP_INTERCEPTOR } from '@nestjs/core';

// ...
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
export class AppModule {}
```

---
---
---

✅ Création d'un module de cache manuel réutilisable:

- `app/src/caches/caches.resolver.ts`
- `app/src/__tests-and-examples/tests-and-examples.resolver.ts` > test_cache_module

---
---
---

## 🌱 TODOs

- Appliquer automatiquement le cache sur GET
- ⚡️💎 Mettre en place pour prisma
  - [prisma-redis-cache](https://www.npmjs.com/package/@yxx4c/prisma-redis-cache)
  - cf. la fin de `/_docs/05.1-cache-implementation-steps.md`
