# 🚧 How to work locally

All you need to know about how to setup a local developpment environment for this project.

## 🚀 Usual commands

Most commands can be found in `package.json` > `scripts`.

```bash
# (In the app/ folder)
## Watch mode / HMR
bun run start:dev

# Linting > Eslint & prettier ; Also available through VSCode command palette
bun run lint
bun run format

# Generators, ex: a user ; see below
nest g resource user
```

---

## Local environment

For me, it's on Windows > [WSL / Windows Subsystem for Linux](https://docs.microsoft.com/fr-fr/windows/wsl/install) & [docker desktop](https://www.docker.com/products/docker-desktop/).

Cf. my [setup project](https://github.com/youpiwaza/install-dev-env) if you want to get the same setup.

- You'll need a terminal
- A text/code editor, I'll recommand [VSCode](https://code.visualstudio.com/)
  - Recommanded plugins
    - ESLint
    - indent-rainbow
    - ~Markdowns
    - Prettier
    - Prisma
- I'd recommanded setting up [Postman](https://www.postman.com/) to easily send POST/PUT/etc. requests

---

## How to start the project

All you need to know about how to start this project.

Most operation will occur in your terminal, in WLS.

## Softwares

- Start docker desktop
- Open 2 new WSL terminals
  - One will be use to run the database
  - One will be use to run the NestJs server

## Install the project

First terminal

```bash
# Clone the project sources from the Github repository through the github CLI
gh repo clone Cronexia/cronexia-gta-back-base

# Go inside the app project folder
cd cronexia-gta-back-base/app

# Install dependancies
bun install
```

## Start the database stack

Second terminal

```bash
## Check WSL connection to Docker desktop
docker info
# ✅ Client: Docker Engine - Community
#  Version:    24.0.6

# 🐛 The command 'docker' could not be found in this WSL 2 distro.
# Make sure Docker desktop hasn't gone in idle state

# Go inside the app project folder
cd cronexia-gta/app

## Start the PostgreSQL database, alongside the web admin
docker-compose -f docker-compose-database-postgresql.yml up

# The terminal will display database logs
```

## Start the NestJs app

First terminal

```bash
bun start
```

You can now access the application through your browser : [localhost:3000](http://localhost:3000/)

---
---
---

## Architecture / Folder tree

🌱 TODO

---
---
---

### 🤖🏭 CRUD Generators

🔍 [doc](https://docs.nestjs.com/recipes/crud-generator#crud-generator)

```bash
# 📌 Create users
nest g resource user

# nest g resource user
# ? What transport layer do you use? REST API
# ? Would you like to generate CRUD entry points? Yes
# CREATE src/user/user.controller.spec.ts (566 bytes)
# CREATE src/user/user.controller.ts (894 bytes)
# CREATE src/user/user.module.ts (248 bytes)
# CREATE src/user/user.service.spec.ts (453 bytes)
# CREATE src/user/user.service.ts (609 bytes)
# CREATE src/user/dto/create-user.dto.ts (30 bytes)
# CREATE src/user/dto/update-user.dto.ts (169 bytes)
# CREATE src/user/entities/user.entity.ts (21 bytes)
# UPDATE package.json (2317 bytes)
# UPDATE src/app.module.ts (312 bytes)
# ✔ Packages installed successfully.
```

---

## Software > Handling large file (JSONs for generators)

Soft [UltraEdit](https://www.ultraedit.com/)
