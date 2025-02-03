# Cronexia / GTA / Back

Backend GraphQL API for "Gestion du Temps et des Activités" > Version light afin de faire une prise en main.

- Pour les pré-requis & l'installation en général, voir dans `/_docs`
  - Préparer son pc > `setup-requirements.md`
  - Préparer & exécuter le projet > `setup-run.md`
- Sinon dans l'ensemble toutes les commande susuelles sont ci-dessous
  - Lancement rapide : à partir du dossier `/app`
  - 1er terminal, la base de données via docker : `bun run reset-bdd`
  - 2eme terminal, l'application NestJs : `bun run start:dev`
- Liens importants
  - Interface graphique graphql : `http://127.0.0.1:3000/graphiql#`
    - Passer par la doc afin de voir les différentes requêtes
    - Exemple de requête GraphQL ci-dessous
  - Accès à la base de données Postgre : `http://localhost:8080/?pgsql=db_postgres&username=max&db=cronexia_gta&ns=public`
- Notes sur ce qu'il reste de cette version light
  - Je n'ai conservé que les tables liées aux populations, les rares qui n'ont pas encore de relations implémentées avec le reste
    - [Visualiser la bdd](https://prisma-editor.vercel.app/schema/2937)
  - Cela peut servir de base de référence pour le code qui a été implémenté un peu partout ailleurs et voir comment cela fonctionne

```graphql
# Afficher toutes les populations
{
  populations {
    name
    operatorLogical
  }
}


# Afficher toutes les populations ainsi que leurs relations
{
  populations {
    name
    operatorLogical

    popCriterias {
      name
      table
      field
      fieldTypeHelper
      operatorComparison

      popCritValues {
        valueBol
        valueDat
        valueNbr
        valueStr
      }
    }
  }
}
```

---

## 🚀 Usual commands

Most commands can be found in `package.json` > `scripts`.

```bash
# Force latest node version
nvm use node && nvm alias default node

# (In the app/ folder)
# 🚨🐳🛢️ A lancer une seule fois, si besoin de pgAdmin (sauvegardes ou autres)
bun run set-rights-for-docker-local-volumes-for-bdd

# (Reset and) start database, then init structure & inject seeds
#   🐳 Need docker (desktop) started
#   Database runs in the background of the terminal
clear & bun run reset-bdd

# Start all containers without destroying database
bun run start-with-previous-bdd

# ---

## Start the app in the browser in production, ⚡️ Better performances
# Compile project
bun run build
# Run the project
bun run start:prod

## Lancer les pré-calculs pour l'intégralité des counters
# GQL > { ctCounterPreprocessAllCounterDatas(logs: { disableAll: true }) }

## Start the app in the browser
bun run start

## 👨‍💻 For developpers

# Watch mode
clear & bun run start:dev

bun run start:dev

# Lint all files (prettier)
bun run format

# Force all files to LF
bun run reset-eof-to-lf

# WSL2 one liner Clear cache
sudo sh -c "/usr/bin/echo 3 > /proc/sys/vm/drop_caches" && swapoff -a && swapon -a && printf '\n%s\n' 'Ram-cache and Swap Cleared'

# 🏭📁 Charger les Resources générées (précédemment via GraphQl) en BDD
# 🚨 Non intégré à > bun run reset-bdd, à lancer à part après
## GQL > mutation genResourcesSeeds { generate_ONE_SeedResourceFromJsonFilesInADedicatedFolder }
clear && bun run prisma-seed:generated-resources

# 🏭🧮 Charger les Compteurs générées (précédemment via GraphQl) en BDD
# Intégré à > bun run reset-bdd
## GQL > mutation generateCptsSeedsFromFiles { generateSeedCounterFromJsonFilesInADedicatedFolder }
clear && bun run prisma-seed:generated-cpt

# 🏭📢 GQL génération events générés (abs. normale, etc.)
{ resourcesGenerateEventsByPeriod(
    resource: {populationName: "generated_resources"}
    period: {dateStart: "2023-01-01", dateEnd: "2023-04-01"}
)}

# ---

## 💾 Database steps management

# pgAdmin > Rapatrier les sauvegardes faites via l'administration du conteneur vers le pc loca
#     Rapatrié dans `/app/docker/pgadmin/_backups`
bun run get-pgadmin-backup-to-local-machine

# Start the database containers : Postgre + adminer
#   🐳 Need docker (desktop) started
docker-compose -f docker-compose-database-postgresql.yml -p 'cronexia-gta-app' up -d

# Prisma > Create database
bun prisma migrate dev --name "init"

# 🔨👌 Lint prisma schema
bun prisma format

# Prisma > Re-generate prisma's client
bun prisma generate

# Prisma > Populate database with mock content
bun prisma db seed
# Independant seeds
#     bun run prisma-seed:po
#     bun run prisma-seed:max
```

---

### Common URIs & ⚓ Used ports

(C'est un tableau Markdown > VSCode extension "Markdown Preview Enhanced" > `Ctrl` + `Shift` + `V`)

| Port | Service name          | Technology     | Command | Uri | Identifiants |
|   ---|                    ---|             ---|---|       ---|---|
| 5433 | 💾 Database | PostgreSQL | `bun run reset-bdd` | / | max / ~~example~~ "a" |
| 3000 | 🌐🐯 GraphQL GUI | Nest & GraphQL | `bun run start:dev`| [localhost:3000/graphiql](http://localhost:3000/graphiql) | 📌 Test request `{ sayHello }`, then push the play button |
| 3000 | 🌐🐯 Web app | Nest & GraphQL | `bun run start:dev`| [localhost:3000](http://localhost:3000/) | / |
| 3000 | 🌐📌 GraphQL direct HTTP access | Nest & GraphQL | `bun run start:dev`| [localhost:3000/graphql?query={sayHello}](http://localhost:3000/graphql?query={sayHello}) | / |
| 5555 | 💾👀 Prisma studio | / | `bun prisma studio` | [localhost:5555](http://localhost:5555/) | / |
| 8080 | 💾👷 Database admin | Adminer | (`bun run reset-bdd`) | [localhost:8080](http://localhost:8080/) | System : PostgreSQL, Serveur : db_postgres, Id : max, Pass : ~~example~~ "a", Database : cronexia_gta |
| 8081 | 💾👷 Database admin | PgAdmin4 | (`bun run reset-bdd`) | [localhost:8081](http://localhost:8081/) | Id: max@cronexia.com, pass: bref, Ajouter nouveau serveur > connexion > Hôte: db_postgres, Port: 5432, User: max, Pass: ~~example~~ "a" |
| /| 💾👀 Prisma visualiser | / | / | Prisma [online visualiser/editor](https://prisma-editor.vercel.app/) | Copier contenu `app/prisma/schema.prisma` |
| 6379 | ⚡️ Cache | Redis | (`bun run reset-bdd`) | / | bob / bof. GQL clear all cache : `{ cacheClearAll }` |
| 5540 | ⚡️👷 Cache admin | Redis Insights | (`bun run reset-bdd`) | [localhost:5540](http://localhost:5540/) | "Add redis database" > Copy paste `redis://default:bof@cache_redis:6379` in **Host** > Button "Add redis database" |
| 5540 | 🛣️🌊👀 Queues visualizer | Bull board | (`bun run start:dev`) | [http://127.0.0.1:3000/queues/](http://127.0.0.1:3000/queues/) | / |
| 8042 | 🤖📝🐯 NestJs auto doc | /| `bun run docs` | [localhost:8042](http://localhost:8042/) | / |
| 8043 | 🤖📝💎 Prisma auto doc | /| `bun prisma-docs-generator serve -p 8043` | [localhost:8043](http://localhost:8043/) | / |

---

## 🔨 Environnement setup & Installation

- 🛑 [Requirements](./_docs/setup-requirements.md)
  - Requirements are <span style="color: #FF4136">**mandatory**</span> to be able to run the project
- 🤵 Setup to [run the project](./_docs/setup-run.md)
- 👨‍💻 Setup to 🚧[develop the project](./_docs/setup-developper.md)
  - 🔨 [Stack installation details](./_docs/stack-installation-details.md)
  - 🔧 [Configuration](./_docs/configuration.md)
- 🖼️ Some [screenshots](./_docs/screenshots/) are available

---

## 🐛 Troubleshooting

```bash
# 🐛 Error in console : ~error TS1002: Unterminated string literal.
#       node_modules/@fastify/ajv-compiler/node_modules/ajv/dist/ajv.d.ts:19:24
# Fix weird copy/paste typo in node_modules/ fastify dependencies
# 🙈 Go in app/node_modules/@fastify/ajv-compiler/node_modules/ajv/dist/ajv.d.ts and comment the last line

# 🐳 Database container won't start
docker-compose -f docker-compose-database-postgresql.yml up
# 🐛 Error response from daemon: driver failed programming external connectivity on endpoint app-adminer-1: Bind for 0.0.0.0:8080 failed: port is already allocated
# ✅ Check that you don't have an old container or another server already running
# ✅ You can also change the allocated port in the .yml file & in the configuration
```

---

## 📝 Documentation

This project's documentation can be found in the [_docs](./_docs/) folder.

---

### 🔒️ Sensible informations

Sensible files won't be versionned in this public project.

You can use the `_secret` suffix in your 'secret' file name.

Instead, they will be stored on a *private* repository, containing the same tree folder.

Just copy/paste the 'secrets' repository on top of this one **on your local machine only**.

And don't forget to update it if some creditentials changes.

---

## ⚙️ Technologies

| Type              | Technology                                |
|                ---|                                        ---|
| OS                | [Ubuntu](https://www.ubuntu-fr.org/)      |
| Web server        | [NodeJs](https://nodejs.org/en)           |
| Backend Framework | [NestJs](https://nestjs.com/)             |
| Database          | [PostgreSQL](https://www.postgresql.org/) |
| ORM               | [Prisma](https://www.prisma.io/)          |
| Query language    | [GraphQL](https://graphql.org/)           |
| Front end         | ?                                         |
| Containers        | [Docker](https://www.docker.com/) & [Docker desktop](https://docker.com/products/docker-desktop/) |

---

## Credits

- Cronexia
- Masamune / Maxime Chevasson
