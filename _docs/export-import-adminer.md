# Faire des exports de base de données

PO > Passer par pgAdmin (différent de adminer !)

Après se connecter

Database > cronexia_gta > clic droit

1. Backup
   1. 
2. Restore > query options : 
   - Clean before restore
   - Include IF EXIST clause

---

Note Max 02/12/24:

- Possibilité de relancer les conteneurs sans viander les volumes
  - `bun run start-with-previous-bdd`
- ---
- Via docker volumes
  - Besoin de lancer une seule fois `bun run set-rights-for-docker-local-volumes-for-bdd`
    - afin que le conteneur puisse modifier en local
  - Rajouté la persistence des serveurs
  - Rajouté la persistence des préférences
- Possibilité de rapatrier les sauvegardes faites via le conteneur sur la machine locale
  - `bun run get-pgadmin-backup-to-local-machine`
  - Dans `cronexia-gta/app/docker/pgadmin/_backups`
