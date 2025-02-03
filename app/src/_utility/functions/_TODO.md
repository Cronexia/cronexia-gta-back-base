# TODO dans les fonctions

- [POC-70](https://cronexia.atlassian.net/browse/POC-170)

---

⚡️ c/c rapide yay

---

Prio SOMME ET CUMUL.

Différence somme & cumul : somme est reset à chaque ajout de résultat ; cumul ça dépend de son humeur, par défaut pas de remise a zero

Somme = incrémenter mais valeur différente de 1

---

🌱 Voir pour passer la périodicité en paramètre des fonctions ?

LA PERIODICITE DES FONCTIONS D AGGLO EST DISSOCIEE DE CELLE DE LEURS COMPTEURS

---

🌱 Amélioration de la fonction CUMUL > Il faudra pouvoir mettre le compteur à zero à un moment donne (c'est souvent des conditions de date qui determinent la remise à zero genre remise à zero en fin de mois, en fin d'annee...) ainsi que pouvoir plafonner sa valeur par une fonction Min et/ou Max

---

🧠🧠🧠 yeah réfléchir pour la suite

- techniquement ca risque de vite faire usine a gaz de tout stocker dans le déroulé compteur
  - on pourrait stocker dans les fonctions (singleton)
    - ~le nombre de calculs effectués avant reset
      - moitié inutile avec les périodes incomplète
      - a moins de pouvoir initialiser a une certaine valeur
    - fonction de reset de valeur stockée
  - Après ca reste de la refacto cela ne change trop rien au problème
- 🧠⚡️ en vrai ne pas trop se prendre la tête, si la boucle compteur évolue
  - passe de daily systématique en incrémention par périodes
    - 💩 mais pas forcément pour les agglo
      - 🔀➕ yeah on va pas se mentir, passer le choix du type de params/fonction en paramètres ca va etre la mort
        - Il vaudrait mieux faire des fonctions dédiées quitte à avoir un peu de récurrence dans les noms
          - ~INCREMATION_PAR_JOUR
          - ~INCREMATION_PAR_PERIODICITE
          - etc.
