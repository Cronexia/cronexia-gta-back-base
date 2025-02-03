# Compteurs

Fichier récapitulatif pour estimation & feuille de route de dev

Index

- ❓ Questions restantes
- ✅ Ressources
- ✅ Fonctionnement
  - ✅ Fonctionnement "ligne par ligne"
  - ✅ Sauvegardes en base de données
- ✅ Vocabulaire
- ✅ Fonctionnalités
- ✅ Structure BDD temporaire
- Inventaire & Estimations de temps de dev

---

## ❓ Questions restantes

❔ Lorsque l'on utilise un compteur, on spécifie une ou plusieurs resources, et une période (une ou plusieurs dates)
Les resources & les dates demandées ne sont pas spécifiques au compteur (pas enregistrées en BDD & immuables), mais sont bien des paramètres à lui passer ?

(J'imagine que oui, donc) si le compteur est relancé avec une population et/ou une période différente, est-ce que l'on concserve les éventuels résultats précédents ?

~Je fais un compteur que j'execute pour Max du 1 au 10 avril.
Si je relance le compteur pour Max du 5 au 15 avril, je calcul et j'écrase les résultats du 5 au 10, je calcule du 11 au 15, et je conserve du 1 au 5 ?

✅ Fonctionnement validé comme ça par PO

---

> Si besoin de grouper on fait **un autre compteur qui calcul sur les résultats du premier**
❔ Stockage sans Resource ?
❔ ou par grouper tu entends changer de périodicité : prendre les resultats par jour et les regrouper par semaine (par exemple)

PO : Un compteur ne peux jamais ne pas être lié à une resource.
>> Un compteur est toujours lié à une resource

Compteur groupés ou qui renvoient des valeurs simple > Hors scope POC.

---

❔ Les fonctions sont forcément appliquées directement sur les paramètres ?
❔ Où peut les traiter à part avec des variables

MA_VARIABLE = MOYENNE(truc)
SI MA_VARIABLE > 10
ALORS ...

> Si je reformule, tu veux dire est ce qu'on permet d'ecrire ça SI MOYENNE(truc) > 10 ou est ce qu'on impose de passer par une variable MA_VARIABLE = MOYENNE(truc)
> SI MA_VARIABLE > 10
> Donc si c'est ce que tu voulais dire, on peut imposer le passage par une variable (notamment au niveau du POC)

✅ Possibilité de forcer passage par la variable pour le POC

---

❔ 15/07/24 > Peut-on affecter une variable dans une condition ?

SI CPT_4 > 10
ALORS temps_abs = 5
    temps_abs_cumulé = CPT3 + temps_abs

✅ Oui

Edit max : ~❌✅ Non, elle peut être définie dans ✅ALORS ou ✅SINON, pas dans ❌SI ou ❌SINON SI

---

❔ 15/07/24 > Peut-on peut calculer une variable (ou autre) de manière conditionnelle :
~
SI date < 15/04
   CPT_1 + CPT_2
SINON
   CPT_3 + CPT_4

✅ Oui

---

❔ 15/07/24 > Peut-on avoir des conditions imbriquées ?

SI contrat = CDI
ALORS
    SI abs > 10
    ALORS  3333
    SINON 4444
SINON 5555

❌ Non

---

Résultats de compteurs

❔ Si besoin de grouper (aggrégation) on fait un autre compteur qui calcule sur les résultats du premier

✅ On passe sur la périodicité au dessus.

Ex: CPT1 calcule les absences par jour
CPT2 aggrège les absences par semaine, sur le dimanche

📝 Vu avec PO: on peut aggréger sur la même périodicité, même si cela n'a pas de sens (résultats non pertinents)

❔ Stockage sans Resources

❌ Non. Les résultats sont à stocker par resource, par date.

---

## Ressources

- Excel `Configuration V0.8.xlsx`
- Excel `Formules de compteurs V0.2.xlsx`
- Notes au fil de l'eau `cronexia-suivi/suivi/2024/07-juillet/240708-suivi.md`
- CR échanges, Q&R `cronexia-suivi/reunions/2024/07-juillet/240709-nouvelles-reponses-compteurs.md`
- 👷 Exemples de compteurs
  - Word `Exemples compteurs.doc` (Teams uniquement ?)
  - Excel `MDP_chronos-distri_sécurisation emploi.V3_POC.xlsx` (Teams uniquement ?)

---

## Fonctionnement

Les compteurs permettent d'effectuer des calculs (personnalisés) sur des jeux de données
relatives aux ressources, à date.

💥 Même si ils peuvent être effectué sur des ensembles de Resources, les compteurs sont **individuels**.
C'est à dire que les calculs sont effectués **PAR Resource**, **PAR date**.

cf. `cronexia-suivi/reunions/2024/07-juillet/240709-nouvelles-reponses-compteurs.md` > ligne ~190.

Aucun lien entre 2 resources pour un seul compteur

- Si besoin de grouper on fait **un autre compteur qui calcul sur les résultats du premier**
- Le premier est appelé "compteur intermédiaire"

Un compteur traite UNE SEULE RESOURCE, et renvoie SON* RESULTAT
- *ou un résultat par périodicité
  - journalier  > 1 résultat par jour
  - semaine     > 1 résultat pour le dimanche de cette semaine
    - *Si semaine partielle (sans dimanche) le calcul n'est pas effectué pour cette semaine*
  - mois        > 1 résultat pour le dernier jour de ce mois
    - *Si mois partiel (sans le dernier jour) le calcul n'est pas effectué pour ce mois*

📜 Les valeurs sont à calculer à date d'effet

~~💥Attention au niveau des compteurs ^~~
  - ~~**On boucle par date, puis par resource**~~
  - ~~❌ ET NON par resource, par date~~
  - *Virtuellement cela ne change rien si tout est indépendant*
ex: moyenne heures travaillées par les resources POUR CHAQUE JOUR
  - Max
    - J1 > 8h
    - J2 > 7,5h
    - J3 > etc.

---

### Fonctionnement "étape par étape"

En rapport avec les différentes captures d'écran que tu m'as montré.

En gros une "étape" de compteur pourrait contenir (? = optionnel) :

Exemple :

AFFECTATION
CONDITION
RETOUR        PARAM_1             OPERATEUR    PARAM_2

(AFFECT.)     CPT_2               =            heuresDansLeMois
SI            heuresParSemaine    ===          35
ET            heuresDansLeMois    >            140
ALORS
(RETOUR)      CPT_1               =            1
SINON
(RETOUR)      CPT_1               =            0

---

### Fonctionnement des sauvegardes en base de données

Les résultats des compteurs doivent être enregistrés en base de données.

Ces résultats sont à enregistrer par Resource, par Date.

Si un compteur renvoie plusieurs résultats (ex: heures de présence sur une semaine, périodicité par jour) :

Chacun des résultats est une ligne dans la base de données.

---
---
---
---
---
---
---
---
---

## Vocabulaire & détail fonctionnement

- 🧮 Compteur *Counter* : Ensemble d'Etapes à effectuer (fonctions, conditions, calculs, renvoi de résultats)
  - 🛑💾 Arguments, *définis lors de l'appel du compteur*
    - Sur une ou plusieurs Resources (indépendamment les unes des autres)
    - Sur une période donnée (date ou intervalle)
  - 💾 Avec une périodicité donnée
    - Par jour
    - Par semaine
    - Par mois
    - Par année
  - Qui renvoie, par Resource par date,
    - Un résultat
    - 💩 ~~Ou un ensemble des résultats~~ Non, l'ensemble de résultat est "un résultat par date"
    - 🚨 Peu également ne pas renvoyer de résultat pour (la resource, la date) : conditions non remplies
- Si un compteur est réutilisé dans un autre compteur, on peut parler de "compteur intermédiaire"
- ---
- ♻️🧹 Maintenance ; 🚨 Stocker la périodicité des résultats c'est redondant avec la périodicité d'un compteur MAIS
  - SI la périodicité du compteur change, ses résultats sont HS
  - 🤖🧹 Lors de la mise à jour de la périodicité
    - Virer tous les résultats de compteurs dont la périodicité est différente
    - ~✨ le type ne sera pas stocké en BDD car on va faire des tables dédiées pour chaque
- ---
- 📅💡 Jours admissibles / *AdmissibleDays*
  - Les jours de la semaine sur lesquels effectuer les calculs de compteur
  - ~ cases à cocher de lundi à dimanche


---
---
---

- 🪜 Etape *Step*
  - Le compteur fonctionne "ligne par ligne", une étape est l'une des lignes.
  - Chaque étape dispose d'un rang indiquant l'ordre dans lequel elles sont effectuées
  - Il peut s'agir
    - Du test d'une **condition** (dont dépendront l'exécution des lignes consécutives)
    - D'un **calcul**
      - Le résultat peut être stocké via une affectation de variable
    - D'un résultat de **fonction**, affecté à une variable
    - D'un renvoi de **résultat**
  - 💾 Besoin de typer les étapes

---
---
---

- ⚙️ Paramètres *Params*
  - Les paramètres sont des valeurs ou ensemble des valeurs, passés aux conditions ou aux fonctions
  - Ils peuvent être de type
    - 🪨 **Constante**
      - 👨‍💻 Note: La même valeur sera utilisée pour chaque resource, chaque date au cours du déroulé
    - 🧺 **Variable REUTILISEE**
      - Elle peut contenir
        - Une référence à un Calcul
          - ainsi que ses paramètres passés
        - Une référence de Fonction
          - ainsi que ses paramètres passés
      - ♻️ Elle peut être réutilisée dans les étapes suivantes
      - ♻️ Elle peut être ré-affectée dans les étapes suivantes
      - 💾 La variable est stockée en base de donnée, toutefois..
      - 🛑💾 Ses résultats ne le sont pas !
      - 👨‍💻🐯 Les résultats seront alimentés au fil du déroulé
    - 🦾 Une **Fonction** (avec ses paramètres)
    - 🧮 Un **Compteur** (intermédiaire)
      - ♻️ Les arguments du compteur parent Resources et Période sont réutilisés
      - ♻️🛑 La périodicité reste indépendante à chaque compteur
      - 📌 Le compteur intermédiaire doit être calculé avant d'être utilisé dans le compteur parent (dépendance)
      - 📌♻️ Il ne peut pas contenir un conteneur parent (dépendance cyclique)
    - 📁 Valeur de **champs du dossier individuel** de la resource, 📜 historisée
      - 👨‍💻 Correspondances BDD, 🚨 ENUMs (relations)
        - ResourceBolVal
        - ResourceDatVal
        - ResourceNbrVal
        - ResourceStrVal
        - ResourceEnumNbrVal
        - ResourceEnumStrVal
      - 👨‍💻💾 Prévoir arguments de ciblage
    - 📢 **Events**
      - durée
      - quantité
      - durées aggrégées
      - quantités aggrégées
      - 👨‍💻💾 Prévoir arguments de ciblage
    - ⌚ Valeurs de **Référence** 📜 historisées
      - 👨‍💻 Correspondances BDD
        - ScheduleBolVal
        - ScheduleNbrVal
        - ScheduleEnumStrVal
      - 👨‍💻💾 Prévoir arguments de ciblage
  - 📌 Les paramètres peuvent être restreint en type en fonction de leur utilisation
    - 👷Ex: fonction MODULO, 2ème paramètre Number uniquement
  - 💾 Les paramètres stockent des références vers les instances de relations concernées
    - ~= pour stocker un compteur, on ne duplique pas le compteur en BDD

---
---
---

- 🪜🧺 Type d'Etape : (Affectation de ) Variables
  - Créer une référence à un calcul, ou une fonction
  - cf. ci-dessus "Paramètres"

---
---
---

- 🪜📌 Type d'Etape : Ensemble de ConditionS / *ConditionsGroup*
  - Comporte un Opérateur conditionnel
    - Il peut servir à débuter ou terminer un ensemble de conditions
  - Regroupement de Conditions à l'aide d'opérateurs logique
    - 🎉 Comporte une première condition
    - 🎉 Possibilité d'en rajouter via une relation explicite
  - 📌 Test des conditions afin de déterminer si la / les lignes suivantes sont exécutées
  - Opérateurs conditionels
    - SI / IF
    - SINON / ELSE
      - 🛑 Pas de condition
    - FIN / END_IF
      - 🛑 Pas de condition
  - 🌱 Actuellement, pas d'imbrication possible
  - 🌱 Actuellement, pas de priorités explicites "(" & ")"
    - `ET` reste prioritaire par rapport à `OU`
    - Acté le 09/07 > `cronexia-suivi/reunions/2024/07-juillet/240709-nouvelles-reponses-compteurs.md`
  - ✅⚡️ Possibilité de passer plus d'opérateurs & paramètres
    - cf. ci-dessous (calculs) ~> A && B || C || D

---

- 📌💡 Condition_ / *Condition*
  - 📌 Test de deux Paramètres contre un Opérateur de comparaison, afin de déterminer si la condition est vraie ou fausse
  - Opérateurs de comparaison
    - égalite               /   `==`
    - différent             /   `!=`
    - supérieur à           /   `>`
    - supérieur ou égal à   /   `>=`
    - inférieur à           /   `<`
    - inférieur ou égal à   /   `<=`
  

---

- 🔗🪜📌&📌💡 Jointure explicite entre CS & Conditions / *ExtraCondition*
  - Opérateurs logiques
    - ET
    - OU
  - Rang
    - Permer d'ordonner les conditions

---
---
---

- 🪜📟 Type d'Etape : Ensemble de CalculS / *CalcGroup*
  - 📟 Résultat de calculs entre deux Paramètres et un Opérateur arithmétique
  - 🎉 Comporte un premier calcul
  - 🎉 Possibilité d'en rajouter via une relation explicite
  - Opérateur arithmétique
    - +
    - -
    - x
    - /
  - ✅⚡️ Possibilité de passer plus d'opérateurs & paramètres
    - Ex: Plutôt que var1 = A + B, var2 = var1 + C, var3 = var2 + D, return var3
    - ⚡️ return A + B + C + D
    - 🧠 Structure des calculs
      - ⚙️ 1 paramètre fixe
      - ⚙️ [1 - n] opérateur + paramètre ?
    - 🤵‍♂️ Plus ergonomique & plus-value pour les clients potentiels ?
- ---
- 📟 Table *Calc* / Même bail que pour les conditions
  - Au lieu de stocker la première condition, on stocke le premier ~~paramètre de~~ calcul
    - 👷🧠 D'un point de vue code on devrait stocker le premier paramètre ici,
    - et les calculs partiels dans la table suivante, mais clairement ce n'est pas intuitif
      - Et cela permet d'assurer qu'un calcul complet est présent
  - On rajoute les autres via relation explicite (qui rajoute l'opérateur arithmétique)

---
---
---

- 🪜💯 Type d'Etape : Resultats
  - Explicitement renvoyer un* résultat de compteur (suite aux calculs / conditions)
    - Renverra plusieurs résultats par resource par date, en fonction de la périodicité propre au compteur
      - Par jour / Daily : Un résultat par jour, par resource
      - Par semaine / Weekly : Un résultat par semaine, par resource, stocké le dimanche de cette semaine
        - 📝 Si la période ne comporte pas de dimanche, le résultat n'est pas renvoyé
          - 👷Ex: Du lundi 01/04 au mercredi 10/04
            - Un résultat est renvoyé pour le dimanche 07/04
            - Aucun résultat suivant (lundi au mercredi) 
        - 📝 Si la période est incomplète mais comporte un dimanche, le calcul est effectué avec les entrées partielles
          - 👷Ex: Du mercredi 03/04 au dimanche 07/04
            - Un résultat est renvoyé pour le dimanche 07/04, ayant pour source mercredi, jeudi, vendredi, samedi, dimanche
      - Par mois / Monthly : Un résultat par mois, par resource, le dernier jour du mois
        - 📝 Même logique que pour les semaines
      - Par année / Yearly : Un résultat par année, par resource, le dernier jour du mois
        - 📝 Même logique que pour les semaines
  - 🔗 Doit comprendre le step
    - Pas besoin du rank, qui est inclus dans step
  - 💯 Peut être
    - Un calcul
    - Une fonction
    - Un paramètre

---

- 💾💯 Stockage des Resultats
  - 💾 Stockage des résultats
    - 👨‍💻 Tables différentes
      - 👌 Par type <Number|Boolean>
        - 🌱 à voir plus tard si on fait pour String, Date, etc.
      - ⚡️ Par périodicité, pour des raisons de performances
        - La table de stockage des résultats par jour va être bien remplie
      - 🌱 Honnêtement je serai pour séparer la table de résultats par jour > par année également
        - Histoire d'éviter les tables avec 1M+ entrées
  - 👨‍💻 Doit comprendre la date du résultat
  - 👨‍💻 Doit comprendre la resource (relation) ainsi que la date
  - 👨‍💻 Doit comprendre le compteur dont est issu le résultat
  - 👨‍💻👷 (Aide au debug) Pour les résultats weekly+
    - Stocker la date de début du calcul du résultat
    - Stocker la date de fin du calcul du résultat
    - partialCalculation<Number> // semaine, mois, année incomplète > nombre de jours de calculs

---
---
---

- 🦾 Fonctions
  - Opération sur un paramètre (de calcul) ou affectation directe à une variable
  - ⚙️ Les nombre de paramètres peut être variables en fonction de la fonction appelée
    - 👷Ex: Valeur absolue : 1 paramètre
    - 👷Ex: Moyenne : 2 paramètres
  - Actuellement, il y a 3 types de fonctions
    - 🦾➗ Fonctions **Maths** (calculs)
      - Prend un ensemble de résultats et les renvoient tous, modifiés
      - 👷Ex: MODULO ( données, 2 )
      - 🚨MIN et MAX sont des fonctions de calculs
        - 👷Ex: MAX ( données, 10 ) > *Pour chaque donnée*, Renvoie la plus haute valeur entre la donnée et 10
    - 🦾⚗️ Fonctions d'**Aggrégations**
      - Prend un ensemble de résultats et n'en renvoie qu'un (changement de périodicité vers une plus élevée)
      - Ex: 7 entrées pour 7 jours (compteur périodicité par jour) > groupés sur une semaine (compteur périodicité par semaine)
    - 🌱🦾⚛️ Fonctions **Atomiques**
      - Incrémenter / Décrémenter
      - A chaque occurence (~= condition remplie), le compteur augmente de 1
      - 👨‍💻 Prisma [atomic number operations](https://www.prisma.io/docs/orm/reference/prisma-client-reference#atomic-number-operations)
    - 🦾🌐 Fonctions globales
      - Renvoient des vérités générales, en fonction de la période
      - 👷Ex: Nb fériés > Retourne le nombre de jours feries pour la periode du compteur selectionnée
  - 📝 Une liste des fonctions et de leurs types / paramètres est disponible ci-dessous

---

- ~~🦾🛑⚙️ Fonctions > Restrictions des paramètres~~
- ⚙️🛑 Restrictions des paramètres
  - ~idem AdmissibleDays mais avec les différents types
    - 🚨 type <Boolean|Number>
    - 🚨 entityType<constante|compteur|etc.>

---
---
---

📝🧺 Variables, notes:

- Egalement appelé "calculs intermédiaires"
- Une variable peut stocker :
  - 💾 une (référence à une ?) opération
  - 🐯 Les résultats, populés au fil des calculs
  - Type ou opération > ❓ que des relations en fait
- ---
- ❓👨‍💻 Ré-affectation de la variable en cours de route, comment gérer les références en BDD ?
- ❓ Si les variables gardent une référence (du calcul ou de la fonction, ainsi que de leurs paramètres)
  - Il faut que ces derniers soient créés au préalable, insi que la caraible elle même,
  - avant de pouvoir la réutiliser 
  -  SOIT
    - Les étapes sont créées consécutivement (utilisation d'Ajax et mise à jour du front en direct)
  - ❓ SOIT
    - On rend les variables abstraites
    - Par exemple en rajoutant une propriété "name" aux instances de fonctions & de calculs
      - Ca reste compliqué si on ne sait pas dans quelle table chercher "name"
        - ✅ Stockage uniquement dans Steps != de conditions
  - ❓❓👨‍💻 Dans les deux cas c'est compliqué à gérer, en particulier si la variable peut être ré-affectée (plusieurs références)
    - Ou stockage nom & rang (concordance avec le rang de l'étape) ?
- ---
- *Note PO*
- Calculs compteur : plutôt pour UNE date, calcul sur les ensembles de données des resources
- Pas besoin de stocker les valeurs par date dans une variable (rapport au métier)
  - 👷 eg. format `{ matricule_max: valeur, matricule_po: valeur, matricule_3: valeur }`
  - ❓👨‍💻⚡️ Reste à voir si on traite chaque resource/date indépendament (partial query comme events)

---
---
---

- 🔖 Surcharges
  - De résultat de compteur : pour une resource précise, pour une date précise,
    - une surcharge manuelle de résultat peut être mise en place
  - Elle ne remplace pas le résultat original, qui est conservé
  - La surcharge peut fonctionner par périodicité
    - Remplacer le résultat de la semaine (dimanche) d'une Resource
    - Remplacer le résultat du mois (dernier jour du mois) d'une Resource
  - ❔ Si le compteur est recalculé, la surcharge est-elle conservée lors du re-calcul du compteur ?
    - Oui

---
---
---
---
---
---
---
---
---

## ⚙️ Paramètres, types & contraintes

On parle de la classe / table Paramètres ; et non des arguments passés au compteur, ni ses propriétés (~périodicité)

La majorité des utilisations autorisent tous les types, à l'exception des fonctions.

- ~~🧮 Compteur / Pas d'appel direct au paramètre~~
- ~~🧮🪜 Etape / Pas d'appel direct au paramètre~~
- ~~⚙️ Paramètres / ♻️🔀 Récursivité indirecte ?~~
  - ~le PARAM_1 d'une condition est une fonction qui prend 2 paramètres
  - ❓👨‍💻 Yeah mal au crâne
  - ✨ Ca devrait être transparent mais à tester (problème n+1 ?)
- ~~🪜🧺 Type d'Etape : (Affectation de ) Variables / ♻️🔀 Récursivité indirecte ?~~
  - Contient un Calcul qui est effectué avec une fonction dans l'un de ses paramètres
  - ✨ Ca devrait être transparent mais à tester (problème n+1 ?)
- ~~🪜📌 Type d'Etape : Ensemble de conditions / Pas d'appel direct au paramètre~~
- ✅🪜📌💡 Type d'Etape : Conditions
  - Deux paramètres
  - Pas de restriction
- 🛑🪜📟 Type d'Etape : Calcul
  - Deux paramètres
  - Restriction `Number` uniquement
- ✅🪜💯 Type d'Etape : Resultats
  - Un paramètre
  - Pas de restriction
- ❓🧺 Variables
  - ❓👨‍💻 Dépendra de la manière dont elles seront traitées
- ⚙️⚙️ Types de paramètres
  - 🪨 Constantes
    - 🛑 `Number` et `Boolean` uniquement
      - Les valeurs "complexes" sont stockées dans les variables
  - ✨🧺 Variable
    - Peut contenir tous les autres types, avec leurs restrictions propres
  - ✨🦾 Fonction, ci dessous
  - ✨🧮 ~~Compteur~~
  - ✨📁 ~~Valeur de **champs du dossier individuel** / Pas d'appel direct au paramètre~~
  - ✨📢 ~~Events / Pas d'appel direct au paramètre~~
  - ✨⌚ ~~Valeurs de **Référence** / Pas d'appel direct au paramètre~~

---
---
---

### 🦾 Fonctions : Catégorisation, restrictions, retours

🛑 L'intégralité des fonctions ont des restrictions de paramètres

❓❓ A valider mais clairement cela sera mieux de fixer l'ordre des paramètres quand leurs types sont différents.

~ CPT1 % 2 est différent de 2 % CTP1

#### 🦾➗ Fonctions Maths (calculs)

- Modulo / `%`
  - Paramètre 1 : ensemble de données
    - Compteurs
    - Variables
  - Paramètre 2 : valeur de la division euclidienne
    - `Number/Int`
  - 💯 Retour
    - ensemble de données `Number/Int`
- ---
- MAX
  - Paramètres x 2 :
    - Compteurs
    - Variables
    - `Number/Float`
  - 💯 Retour
    - ensemble de données `Number/Float`
- ---
- MIN
  - Paramètres x 2 :
    - Compteurs
    - Variables
    - `Number/Float`
  - 💯 Retour
    - ensemble de données `Number/Float`
- ---
- Partie entière
  - Paramètre x 1 :
    - Compteurs
    - Variables
  - 💯 Retour
    - ensemble de données `Number/Float`
- ---
- Partie décimale
  - Paramètre 1 :
    - Compteurs
    - Variables
  - ❓🌱 Paramètre 2 : Nombre de chiffres après la virgule
    - `Number/Int`
  - ❓🌱 Paramètre 3 : Type d'arrondi
    - Vers le haut, vers le bas, au plus proche
  - 💯 Retour
    - ensemble de données `Number/Float`
- ---
- Arrondi
  - Paramètre 1 : ensemble de données
    - Compteurs
    - Variables
  - Paramètre 2 : Nombre de décimales
    - `Number/Int`
  - 💯 Retour
    - ensemble de données `Number/Float`
- ---
- Est type jour
  - 📄 Paramètres Excel : `le type de jour testé (lundi, mardi, …., dimanche, ouvré, ouvrable, férié)`
  - Paramètre 1 : ensemble de données
    - Compteurs
    - Variables
  - ❓ Paramètre 2 : ENUM ou ENUM[]
    - `lundi`
    - [`lundi`, `mardi`, `mercredi`]
  - 💯 Retour
    - `Boolean`
- ---
- Est absence jour
  - Paramètre 1 : ensemble de données
    - Compteurs
    - Variables
  - 💯 Retour / 0 si pas d'absence jour, quantité de l'absence dans le cas inverse (0,5 ou 1)
    - `Number/Float`
- ---
- Est absence heure
  - Paramètre 1 : ensemble de données
    - Compteurs
    - Variables
  - 💯 Retour / 0 si pas d'absence heure, durée de l'absence dans le cas inverse
    - `Number/Float`
- ---
- Est absence heure
  - Paramètre 1 : ensemble de données
    - Compteurs
    - Variables
  - 💯 Retour / 0 si pas d'absence heure, durée de l'absence dans le cas inverse
    - `Number/Float`
- 

---

#### 🦾⚗️ Fonctions d'Aggrégations

- ❓🌱 MAX (aggreg) / Plus haute valeur parmis une liste ?
  - Paramètre 1 :
    - Compteurs
    - Variables
  - 💯 Retour
    - `Number/Float`
- ---
- ❓🌱 MIN (aggreg) / Plus haute valeur parmis une liste ?
  - Paramètre 1 :
    - Compteurs
    - Variables
  - 💯 Retour
    - `Number/Float`
- ---
- Moyenne
  - Paramètre 1 : ensemble de données
    - Compteurs
    - Variables
  - Paramètre 2 : valeur de la division
    - `Number`
  - 💯 Retour
    - `Number/Float`
- ---
- Somme
  - Paramètre 1 : ensemble de données
    - Compteurs
    - ❓ ~~Variables~~ // Uniquement variables dans l'Excel
  - 💯 Retour
    - `Number/Float`

---

#### 🌱🦾⚛️ Fonctions Atomiques

- ❓❓ Cumul
  - ❓ Je ne comprend pas la description `Nb d'occurrences du compteur à cumuler (si nb occurences positive, on cumul du jour J vers le jour J+nb occurences, si nb occurences négative, on cumul du jour j vers le jour J-nb occurences)`
  - ❓ Correspond à incrémenter / décrémenter ?
  - ❓ ~= CPT1 absences par jour. CPT2 compte le nombre d'absences sur cette semaine ?
  - 📄 Paramètres Excel :
    - Compteur
    - Constante
  - ---
  - Paramètre 1 : ensemble de données
    - Compteur
  - Paramètre 2 : valeur comparative (si égal, on incrémente ?)
    - Compteur
    - Constante
  - 💯 Retour
    - ensemble de données `Number/Int`
- ❓ Incrémenter
  - 💯 Retour
    - `Number/Int`
- ❓ Décrémenter
  - 💯 Retour
    - `Number/Int`

---

#### 🦾🌐 Fonctions globales

❓❓ Ce sont des fonctions globales si le calcul s'effectue sur l'intégralité de la période. Si on a besoin du nombre de jour à date depuis le début de la période, on peut les passer en fonctions atomiques ~cumuls.

- Nb fériés : Retourne le nombre de jours feries pour la periode du compteur selectionnée
  - Pas de paramètre
    - (la période est un argument du compteur qui sera transmis)
  - 💯 Retour
    - `Number/Int`
- ---
- Nb ouvrés
  - Pas de paramètre
  - 💯 Retour
    - `Number/Int`
- ---
- Nb ouvrables
  - Pas de paramètre
  - 💯 Retour
    - `Number/Int`
- ---
- Nb calendaires
  - Pas de paramètre
  - 💯 Retour
    - `Number/Int`
- ---
- Aujourd'hui
  - Pas de paramètre
  - 💯 Retour
    - `Date`
- ---
- Date du jour (❓ Lors du déroulé j'imagine)
  - Pas de paramètre
  - 💯 Retour
    - `Date`
- ---
- Date courante : Date en cours de calcul (ex: 20230601). On pourra par exemple comparer cette date à la valeur d'une constante (SI Date AAAAMMJJ < Constante 20230901)
  - Paramètre 1 : Date à formatter
    - Fonction type Date
    - `Date`
  - Paramètre 2 : Format souhaité
    - ~`String` // AAAAMMDD, etc.
      - [Options Intl/DateTime](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat)
        - [& virer "-"](https://stackoverflow.com/questions/3066586/get-string-in-yyyymmdd-format-from-js-date-object)
  - 💯 Retour
    - `Number/Int`

---

#### 🦾🌱 Fonctions TODO

- Valeur veille : Compteur du jour J qui récupère la valeur de la journée d'avant
  - Paramètre 1 : ensemble de données
    - Compteur
  - 💯 Retour
    - 💥 ANY

---
---
---
---
---
---
---
---
---

## 🔨 Fonctionnalités à prévoir

- Création de l'ensemble des éléments & relations permettant de les relier
- Choix de la périodicité
- Gestion de l'ensemble
  - des calculs
  - des comparaisons
  - des fonctions *dans un premier temps que 2 : SOMME & MAX❓*
  - conditions
- Configuration par compteurs
  - isOverloadable<Boolean> // POC-77 // Peut-on surcharger le/s résultat du compteur pour ce compteur ?
  - Types de jours à calculer > Liste des jours de la semaine avec cases à cocher: les jours coches uniquement sont à calculer
- Gestion des dépendances
  - Si un compteur utilise un autre compteur
    - Ce dernier doit avoir déjà été calculé
    - Pas de dépendance cyclique
- Déclenchements conditionnels
  - Groupes Compteurs, par relation Resource 📜 historisée
- Visualisation des résultats
  - Par population, par période
  - 🚨 Les visus peuvent être partielles (pas toutes les resource, pas toutes les dates)
- CRON > POC-79
  - 🔍 CRONs

---
---
---
---
---
---
---
---
---

## 🚧💾 Structure BDD provisoire

Bien dégrossi plus propre dans `cronexia-suivi/suivi/2024/07-juillet/240708-suivi.md` l. 250

- ⚡️ Refaire en rapide pour estimation
  - ⚡️ Les champs hors fonctionnalités ~front & hors POC ne sont pas ajoutés la, mais pas oubliés

- ✅ compteurs
  - ✅ Champs excels
  - ✅ periode dernier calcul : date de debut
  - ✅ periode dernier calcul : date de fin
  - ✅ date de dernier calcul // ✨ Les résultats ne sont pas historisés
    - ~~isCalculated<Boolean> // Le calcul a-t-il déjà été effectué ?~~
    - déduit d'après la date de dernier calcul > on conserve plus d'infos
  - ✅ isOverloadable<Boolean> // POC-77 // Peut-on surcharger le résultat du compteur ?
  - ✅ Périodicité de calcul<ENUM>
  - ✅ resultTypeEnum<Boolean | Number>
  - ✅ Types de jours à calculer // Liste des jours de la semaine avec cases à cocher: les jours coches uniquement sont à calculer
    - 🔗 jours à calculer [0-1]
      - lundi<Boolean>
      - mardi<Boolean>
      - etc.
  - ✅🔗 resources dernier calcul [m-n]  // qui qu'est concerné ? // ou stockage type resource<matricule|nom|pop>
    - ✅ Plus simple > String > concat paramètre passé au compteur
  - ---
  - 🔗 operations [m-n] // LIGNE // Peut contenir N opérations
    - ❓❓ Stocker les résultats ? Plus facile pour gérer le compteur
    - Condition<ENUM> 👨‍💻 `Prévoir traitements sur lignes multiples`
      - 👨‍💻 `Prévoir vérification coherences opérateurs (pas de SINON sans SI)`
    - 🔗 Variable? // Si défini, affectation
    - // OpérateurS
      - opérateur arithmétique<ENUM>
      - opérateur de comparaison<ENUM>
    - ---
    - // Paramètre_1 // ❓🔗 Table dédiée pour éviter le bordel ?
      - 🔗 Constante // 👨‍💻 `x 2` <Boolean | Number>
      - 🔗 Variable
      - ❓ Resultat de fonction // ❓ Stocké dans Constante ? 👨‍💻 `x 2`
      - 🔗♻️ Compteur // ♻️👨‍💻🔍 Gestion de la récursivité & dépendances
        - ordre d'execution, 👷 dependances, 🤖 calculable ?
      - Valeur de champs du dossier individuel de la resource, 📜 historisée
        - 🔗 ResourceField // 👨‍💻 Enormément de taf afin de gérer les 6 cas possibles derrière + historisé 👨‍💻 `🔗 x 6`
      - Event > durée & quantité & Events durées aggrégées & quantités aggrégées
        - 👨‍💻🤮 yeaaaaaaaaaah mais en fait c'est pas la table Event, on parle d'instances par resources par dates
          - 🔗 EventByDay
          - 🔗 EventRangeOnResource || EventRangeByDay
      - Valeurs de Référence 👨‍💻📜 historisées
        - 👨‍💻 `🔗 x 3`
    - ---
    - // Paramètre_2 👨‍💻 `x 2` Idem Param_1
  - ❓🔗 Dépendances Compteurs ?
    - ~~Besoin de stocker relations~~ par relation > operation > param 1 & 2
    - ~~Besoin de stocker~~ ordre d'exécution > on peut le calculer mais yeah ca peut aider
  - ---
  - ✅🔗 resultats compteurs [m-n] // 👨‍💻 `x 2` <Boolean | Number> 👨‍💻 `x 3` <Daily|Weekly|Monthly>
    - ✅ resultTypeEnum<Boolean | Number>
    - ✅ date
    - ✅ Périodicité du resultat // `counterPeriodicityEnum @default(Daily) // Daily, Weekly, Monthly, TODO_Calendar`
    - ✅ valeur du resultat<Boolean | Number>
    - ✅❓ valeur de surcharge<Boolean | Number> // ❓ si éclaté quand recalcul ici, SINON TABLE DÉDIÉE
    - ✅🔗 Resource
    - ✅🔗 Compteur
  - Groupes Compteurs, par relation Resource 📜 historisée
    - 🔗 table groupe compteur
    - 🔗 table relation groupe compteur >< compteurs [m-n]
    - 🔗🔗 table relation groupe compteur >< resource [m-n] explicite

❓👨‍💻 Stocker résultats de chaque truc et/ou déroulé en vrai

---
---
---

## Inventaire & Estimations de temps de dev

(Ecrit au fil de l'eau mais priorisé ensuite)

- 📜 Gestion de l'historique ~effectDate partout 👨‍💻 `x 10 (Resource + Schedule + Groupes compteurs)`
- L'intégralité est personnalisable, donc CRUD pour l'ensemble des tables créées en BDD & Seeds pour les tests
  - 🔨 table,  🔗 relation, 🔢 enum
  - ---
- 🔨 compteurs
  - 🔢 Périodicité de calcul
  - 🔢 resultTypeEnum
  - 🔨🔗 Types de jours à calculer à calculer [0-1]
  - 🔗🔗 resources dernier calcul [m-n]
- 🔨🔗 operations [1-n]
  - 🔢 Condition
  - 🔨🔗🔗🔗 Variable
  - 🔢🔢 OpérateurS
  - 🔨 Paramètre_1 & Paramètre_2 `👨‍💻 x 2 ? si table dédiée > réutiliser`
    - 🔨? Constante // 👨‍💻 `x 2` <Boolean | Number>
    - 🔨🔗 Variable
      - 🚨🚨🚨 Besoin de stocker la PRIODICITE des RESUTALTS contenus dans la variable
    - 🔨❓ Resultat de fonction
    - 🔗🔗♻️ Compteur // ♻️👨‍💻🔍 Gestion de la récursivité & dépendances
    - 🔗 Valeur de champs du dossier individuel de la resource 👨‍💻 `x 6, gros taf` & 📜
    - 🔗 Event `x 3, + calculs`
    - 🔗 Valeurs de Référence 👨‍💻 `🔗 x 3` & 📜
  - 🔢 resultTypeEnum
  - 🔗 Dépendances Compteurs
- 🔨🔗🔗 resultats compteurs [m-n]
  - 🔢🔢🔢
  - 🔨 valeur surcharge
  - 🔗 Resource
  - 🚨 Besoin de plusieurs tables, même si on pourrait grouper ça serait le bordel + perfs--
    - Découpler par type <Number|Boolean>
    - Découpler par périodicité day/week/month
      - Les compteurs ont une périodicité unique donc pas de soucis
- 🔨 Groupes Compteurs
  - 🔗 compteur
  - 🔗🔗 resources

Total

- 10 🔢
- 11 🔨
- 8* 🔗 simple
- 5* 🔗🔗 complexes

* Les relations sont à mettre en place des deux côtés

---

- ⏱️ Estimation à prendre en compte
- ✨ Détail/découpage estimation, redondant, ne pas prendre en compte dans le total
- ⏱️💯 Total

⏱️💾 Estimations BDD

🔍 Gestion de la récursivité & dépendances, & tests [1 à 2 jours]
✅⏱️ 11 tables > avec conception [2-3 jours]
✅⏱️ 11 CRUDs sans relation > [2 jours]
✅⏱️ 10 ENUMs > 0.5 jours
✅⏱️ 8 relations simples > 30mn x 8 ~4h
✅⏱️ 5 relations complexes > 1h x 5 ~5h
✅⏱️ Tests au fil de l'eau, rajouter ~[1 journée]

Total: ⏱️💯~8 jours, probablement plus si la structure évolue, + seeds & tests (1 journée vu le nombre),
plus éventuelles galères (~♻️ dépendances cycliques modules) ⏱️💯 **compter 10**

Probablement ⏱️ 5 jours de plus pour les types plus compliqués avec les relations, lors de leurs implémentations (events, compteurs, etc.)

---

⏱️💪 Estimations Fonctionnalités

Note: Clairement il y aura une période de recettage à vide avant de pouvoir faire tourner des compteurs basiques

Ou alors exclure des types de variables (garder les simples) pour faire tourner en basique puis rajouter au fur et à mesure, et même

- ✅📜 Gestion de l'historique ~effectDate partout 👨‍💻 `x 10 (Resource + Schedule + Groupes compteurs)` [3 à 5 jours, facile]
- ✅ **POC-67** / `CRUD compteurs` > Peu ou prou BDD + CRUDs, donc les ✨ ~~10 jours ci-dessus~~
- ✅ **POC-72** / `Premiers calculs` / ⏱️~[8 - 11] jours facile
  - Ca dépend vraiment de ce qui doit être implémenté
  - (exclus d'après les autres POC) : Périodicité, Conditions, Var_Events, Var_compteurs, CRONs, fonctions, groupes compteurs, forcer
  - reste : 
    - compteurs basiques (structure, crud)
      - résultats
    - opérations
    - variables
      - constantes
      - variables
      - valeurs resources histo
      - valeurs de ref histo
    - opé_math
    - opé_conditions
    - ~~faire en sorte que ça marche~~ fonctionnalité
  - 📝 Note max : découper Jira pour visu
  - ✨⏱️ ~4-5 jours facile
    - ✨ Conception supplémentaire, 1 journée (découpée mais bon clairement ca va bouffer du temps)
    - ✨ Mise en place 3+ jours
    - ✨ Tests & ajustements 2+ jours
    - ✨ Gestion de plusieurs opérations ("ligne par ligne") [3-5] jours
    - ✨ Recettage 1 journée
- ✅ **POC-76** / `Voir les résultats` / ⏱️ 1,5 journée
  - ⏱️ 1 journée pour le basique & perenne pour évolution
  - ⏱️🚨 Ptet Besoin de repasser dessus au fur et a mesure qu'on rajoutera des types de variables
    - ~~0.5 jours par type de retour, voir plus~~
    - ✨ yeah si ca renvoie systématiquement des Bool/Number et/ou en tableaux, ptet pas besoin d'adapter
    - ✨ Recettage 0.5 journée
- ✅ **POC-68** / `Périodicité` / ⏱️ [2,5 - 4,5] jours
  - Large car besoin de fonctions sur la gestion des dates en plus
  - Besoin de seeds également
  - ✨ Recettage 0.5 journée
- ✅ **POC-69** / `Conditions` / ⏱️ 6 jours (sans conviction)
  - Chaud avec la gestion ligne par ligne
  - SI SINON ALORS ✨ 3 jours
  - ET OU ✨ 2 jours
  - ✨ Recettage 1 journée
- **POC-78** / `valeurs resource + conditions` > doublon ?
- ✅ **POC-71** / `Events & aggregats` / ⏱️ 4 jours
  - ♻️ le taf des Events Manuels
  - 🔀 Probablement besoin de retourner le tableau resources[dates[données]] >> dates[resources[données]]
  - 🔍 aggregats > checker rapidement si prisma/postgre ⏱️ ~0.5
  - ✨ 3 jours
  - ✨ Recettage 1 journée
- ✅ **POC-75** / `Compteur-ception` / ⏱️ 11+ jours, à ré-estimer quand j'aurais mis les bases en place
  - 🔍 Prisma > Récursivité des tables (compteur avec relation compteur)
  - ✨ Recettage 1 journée
- ✅ **POC-79** / `CRONs` / ⏱️ [1,5 - 2,5] jours
  - 🔍 CRONs
  - ✨ Recettage 0,5 journée
- ✅ **POC-70** / `Fonctions` / ⏱️ [3,5 - 5,5] jours
  - A voir la manière dont cela sera implémenté ligne par ligne, je suis pas fixé
  - A voir le nombre de fonctions à implémenter dans un premier temps
  - 🚨 Potentiellement problématique
  - ✨ Recettage 0,5 journée
- ✅ **POC-73** / `Groupes compteurs` / ⏱️ [5 - 6] jours
  - Dans l'absolu pas si complexe, mais
    - Gestion de l'historique > Relation avec Resources
    - Seeds & Tests compliqués et couteux
    - ✨ Recettage 1 journée
- ✅ **POC-77** / `Forcer valeurs` ⏱️ [2,5 - 3,5] jours
  - La valeur remplacée est conservée lorsque l'on relance le compteur
    - ✨ Implémentation [2 - 3] jours
    - ✨ Recettage 0,5 journée

Total : ⏱️💯 47,5 - 60,5 jours // paye ton rateau, + prévoir le recettage en plus !

---
---
---
---
---
---
---
---
---
---
