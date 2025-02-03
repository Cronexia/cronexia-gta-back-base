# Requirements

Everything you need to run or develop this project.

🚨 Currently tested only on Windows & WSL.

👷 Recommended step by step & screenshots can be found [here](https://github.com/youpiwaza/install-dev-env).

---

## Operating System

It's always a good thing to keep your system updated ♻️.

Consider full updates before proceeding to further softwares installations.

On Windows > Params > Windows update

---

## Softwares

- A web browser ~Chrome, Firefox, Brave, etc.
- [.NET](https://dotnet.microsoft.com/en-us/download)
- [NodeJs](https://nodejs.org/)
  - Includes `npm` / Node Package Manager
- [WSL2](https://github.com/youpiwaza/install-dev-env/blob/master/01-terminal/README.md)
  - It's recommended to also install NodeJs on WSL
  - Terminal > [Github CLI](https://github.com/youpiwaza/install-dev-env/tree/master/01-terminal#-installation-du-cli-github)
  - Faster package manager > [Bun](https://bun.sh/docs/installation), see below
- [Docker Desktop](https://docs.docker.com/desktop/install/windows-install/)
  - [Configuration to work with WSL](https://github.com/youpiwaza/install-dev-env/tree/master/02-docker)

You can then proceed to the installation to [run the project](./setup-run.md) or to [develop the project](./setup-developper.md).

---

### Bun installation

### Installation du package manager

Much more faster than other ~npm alternatives, [bun installation](https://bun.sh/docs/installation).

```bash
# Check kernel version is > 5.6
uname -r
# 5.15.133.1-microsoft-standard-WSL2

# Install unzip
apt install unzip

# Bun install through curl
curl -fsSL https://bun.sh/install | bash 
# ♻️ Restart terminal in order to update $PATH

# 📌 Verification
bun -v
# 1.0.17

# Update to latest (at date) in order to support NestJs
bun upgrade --canary
```
