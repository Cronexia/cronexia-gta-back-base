# How to start the project

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
gh repo clone gh repo clone Cronexia/cronexia-gta-back

# Go inside the app project folder
cd cronexia-gta/app

# Install dependancies
bun i
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
#     -f / specify file
#     -p / specify stack name
docker-compose -f docker-compose-database-postgresql.yml -p 'cronexia-gta-app' up

# The terminal will display database logs
```

## Start the NestJs app

First terminal

```bash
bun run start
```

You can now access the application through your browser : [localhost:3000](http://localhost:3000/)
