# Upgrade / Command lines

One lines to upgrades

---

## 🐧 System

```bash
# Assurer les dernières maj & suppressions des paquets deprecated
sudo apt dist-upgrade && sudo apt -y autoremove

# Installation du paquet de maj
sudo apt install update-manager-core

# Installer la dernière version, même si elle n'est pas encore sortie (~24.04)
#   🚨 Attention, besoin d'actions manuelles de validation
sudo do-release-upgrade -d

# (Restart du terminal)

# Vérifier la version
lsb_release -a

# Dernière maj paquets au cazou
sudo apt update && sudo apt --fix-broken install && sudo apt -y upgrade && sudo apt dist-upgrade && sudo apt -y autoremove
```

---

## 📦️ Packages / Softwares

One liner, if broken execute each command individually

```bash
omz update
git -C ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k pull && sudo apt update && sudo apt --fix-broken install && sudo apt -y upgrade && sudo apt -y clean && sudo apt -y autoremove && docker system prune -af && sudo npm install -g npm@latest && sudo npm install -f --global yarn && pnpm add -g pnpm && bun upgrade --canary && bun update
```

---

## 🐳💾 Database > Containerized PostgreSQL + adminer

Simply update image version in `app/docker-compose-database-postgresql.yml`

- 📝 Docs
  - [Dockerhub > Postgre](https://hub.docker.com/_/postgres)
    - [Full untruncated Readme](https://github.com/docker-library/docs/blob/master/postgres/README.md)
  - [Debian releases dates & names](https://www.debian.org/releases/)
  - [Adminer](https://hub.docker.com/_/adminer)
    - Deprecated since june 2023 but no good alternative (pg_admin slow af)
  - [pgadmin4](https://hub.docker.com/r/dpage/pgadmin4)
  - [redis](https://hub.docker.com/_/redis)
  - [redis insight](https://hub.docker.com/r/redislabs/redisinsight/tags)

♻️ Last update : 01/05/2024 > Debian "Bookworm" version 12.5, released 10/02/2024

- 📝🚨 Avoid setting to (nothing)/latest version ! In case of major update it can broke project
- 📌 Always test before upgrading !

---

## 🐳 Docker update

If docker desktop, go to ⚙️ **Settings** > ♻️ **Software updates** > and follow instructions.

In terminal only, refer to the official documentation ;)

📝 [WSL2 helpers & troubleshooting resolutions](https://github.com/youpiwaza/install-dev-env/tree/master/02-docker)

---

## 💎 Prisma & 🛒 Prisma client update

```bash
bun add prisma@latest -d && bun add @prisma/client@latest
```
