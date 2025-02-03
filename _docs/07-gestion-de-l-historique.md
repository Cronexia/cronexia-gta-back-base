# 📜 Gestion de l'historique & effectDate

NOTE POUR PLUS TARD : Prendre en compte les dates de fin, si 2 périodes ---111---rieng---222---

- 🔎 Mots clés recherche globale
  - effectDate effect date history historiques période avant

---

(NDM: Problème lors du déroulé afin de généréer les instances de Schedules à partir des CycleOnResources, qui ont une effectDate)
(Donc HS si plusieurs cycles & plusieurs dates d'effets)

---

🐛🐛🐛 Problème `effectDate` 

- On ne récupère pas "les CycleOnResource pour cette période"
- On doit récupérer "le premier (plus proche) CycleOnResource antérieur à la date de départ, et les éventuels autres suivant avant la date de fin"
- Et pas ceux d'après !

ex:

```js
resourcesSchedulesInstancesByPeriod(
  resource: {matricule: "max"}
  period: {dateStart: "2024-04-01", dateEnd: "2024-05-30"}
)
// Ok renvoie
//      cycle.effectDate = "2024-04-01"
//      cycle.effectDate = "2024-04-15"

resourcesSchedulesInstancesByPeriod(
  resource: {matricule: "max"}
  period: {dateStart: "2024-04-03", dateEnd: "2024-05-30"}
)
// 💩 KO renvoie
//      ~~cycle.effectDate = "2024-04-01"~~ Manquant
//      cycle.effectDate = "2024-04-15"
```

🐛🐛🐛 Yeah actuellement c'est pire que ça

```js
whereQuery.cycleOnResources = {
  some: {
    effectDate: {
      gte: period['dateStart'],
      lte: period['dateEnd'],
    },
  },
};
```

"Je renvoie les cycleOnResources des Resources dont **au moins l'une des cycleOnResources.effectDate se trouve dans la période**".

- ✨🤏🐛 Tite pétouille > les Schédules en dehors de la période sont pris en compte
  - ✨ Yeah c'est "normal", on renvoie l'intégralité si au moins une correspond

Besoin de revoir le where date............

Voir double requête, une pour la première récupération, une pour la deuxième....

    Nah, utilisation de `OR` (!= AND) dans prisma

D'où le 🤮 besoin de gestion de effectDate, donc en dehors de l'estimation, yay fun *indeed*

---

Merci moi du passé pour ses détails pour le problème

🚀 BREF

## 🧠 Algo go go

Voir les différents cas de figure pour **effectDate vs Period**, et à mon avis y'en a des cartons

Yeah besoin de définir une table des vérités

- 👶👶 UNE seule date (period) vs UNE effectDate
- 👶 une periode vs UNE effectDate
- UNE seule date (period) vs plusieurs effectDate
- 🤮 une periode vs plusieurs effectDate

---

temps ⏱️ passé ----------------- présent ------------------------ futur

---

### 👶👶 UNE date (period) vs UNE effectDate

3 possibilités

- effectDate avant date
- effectDate = date
- effectDate après date

MAIS on parle de date d'effet qui court dans le temps ~= tant qu'elle n'est pas changée sa valeur reste la même

effectDate **avant** date

                                v date
temps ⏱️ passé -----------------X------------------------ futur
temps ⏱️ passé -----XXXXXXXXXXXXXXXXXXXXXXX...----------- futur
                    ^ effectDate

✅ La valeur est disponible

---

effectDate **=** date

                                v date
temps ⏱️ passé -----------------X------------------------ futur
temps ⏱️ passé -----------------XXXXXXXXXXXXXXXXX...----- futur
                                ^ effectDate

✅ La valeur est disponible

---

effectDate **après** date

                                v date
temps ⏱️ passé -----------------X------------------------ futur
temps ⏱️ passé ------------------------XXXXXXXXXXXX...--- futur
                                       ^ effectDate

❌ La valeur n'est pas disponible pour cette Date

---
---
---

### 👶 Une periode vs UNE effectDate

- periode.dateStart
- periode.dateEnd

                                v Période
temps ⏱️ passé -------------[XXXXXXXXXXXXXX]-------------- futur

---

5 possibilités

- ✅ effectDate avant dateStart
- ✅ effectDate = dateStart
- 🤏 effectDate après dateStart & avant dateEnd
- 🤏 effectDate = dateEnd
- ❌ effectDate après dateEnd

---

effectDate **avant dateStart**

                                v Période
temps ⏱️ passé -------------[XXXXXXXXXXXXXX]-------------- futur
temps ⏱️ passé ------YYYYYYYYYYYYYYYYYYYYYYYYYYYYYY...---- futur

✅ La valeur est disponible sur l'ensemble de la période

---

effectDate **= dateStart**

                                v Période
temps ⏱️ passé -------------[XXXXXXXXXXXXXX]-------------- futur
temps ⏱️ passé -------------YYYYYYYYYYYYYYYYYYYYYYY...---- futur

✅ La valeur est disponible sur l'ensemble de la période

---

effectDate **après dateStart & avant dateEnd**

                                v Période
temps ⏱️ passé -------------[XXXXXXXXXXXXXX]-------------- futur
temps ⏱️ passé -------------------YYYYYYYYYYYYYYYYY...---- futur

🤏 La valeur est disponible sur une partie de la période : [ effectDate > period.dateEnd ]

---

effectDate **= dateEnd**

                                v Période
temps ⏱️ passé -------------[XXXXXXXXXXXXXX]-------------- futur
temps ⏱️ passé ----------------------------YYYYYYYY...---- futur

🤏 La valeur est disponible sur une partie de la période : period.dateEnd (1 journée)

---

effectDate **après dateEnd**

                                v Période
temps ⏱️ passé -------------[XXXXXXXXXXXXXX]-------------- futur
temps ⏱️ passé -------------------------------YYYYYY...--- futur

❌ La valeur n'est pas disponible pour la période : period.dateEnd (1 journée)

---
---
---

### UNE seule date (period) vs plusieurs effectDate

Mwep, en fonction du nombre d'effectDate c'compliqué.

- A l'instinct je mettrais 2 effectDate (n & n+1) dans chaque tranche de possibilité, mais c'probablement moins avec les optimisations
  - Et encore pas si pire vu qu'il n'y a qu'une date & pas d'intervalles

- N1 date d'effet 1
- N2 date d'effet 2
- N3 date d'effet 3

(bof) possibilités

- ✅ L'une des effectDates = Date
- ✅ Toutes les effectDates avant Date
- ✅ effectDates avant & après Date
- ❌ Toutes les effectDates après Date

---

L'une des effectDates = Date

                                v date
temps ⏱️ passé -----------------X------------------------ futur
temps ⏱️ passé -----N1111111111-N2222222222-N333333....-- futur

~ Peu importe si autres dates avant après, ✅ La valeur est disponible pour la date d'effet qui correspond

---

Toutes les effectDates avant Date

                                v date
temps ⏱️ passé -----------------X------------------------ futur
temps ⏱️ passé --N11111-N222222-N3333333333....---------- futur

✅ La valeur est disponible pour la date d'effet antérieure ou égale la plus proche

- ~Peu ou prou ce que j'avais implémenté pour lastName sous le capot de mémoire :
- ~= Renvoyer
  - les effectDate <= Date
  - triées par ordre descendant (plus récente en premier)
  - seulement une
- ♻️ a voir si ça marche partout pour une seule date

---

effectDates avant & après Date

                                v date
temps ⏱️ passé -----------------X------------------------ futur
temps ⏱️ passé -------N11111-N222222-N3333333333....----- futur

✅ La valeur est disponible pour la date d'effet antérieure ou égale la plus proche

---

Toutes les effectDates après Date

                     v date
temps ⏱️ passé ------X-------------------------- futur
temps ⏱️ passé -----------N111-N222-N333...----- futur

❌ La valeur n'est pas disponible pour cette Date

---
---
---

### 🤮 Une periode vs plusieurs effectDate

🤮 Possibilités

(Virer les cas simples en premier)

- 1️⃣ Une seule valeur sur l'ensemble de la période
- 🔢 Plusieurs valeurs sur l'ensemble de la période, réparties dans des intervalles

- ✅ effectDateS avant période
- ❌ effectDateS après période
- ✅ effectDateS avant ET après période
- ✅1️⃣🔢 effectDateS avant ET pendant période
  - ~~pendant = période.dateStart // Probablement résultat identique à autre chose~~
    - ♻️ Yeah nan on amalgame avec les "dates Avant"
  - pendant = milieu période
  - ~~pendant = période.dateEnd~~
    - ♻️ On amalgame avec les "dates milieu", au final cela retourne une valeur valable sur une "période" de 1 jour
- 🤏1️⃣🔢 effectDateS pendant (period.startDate exclue) ET après période 
- 🤏1️⃣🔢 effectDateS pendant période
- ✅1️⃣🔢 effectDateS avant ET pendant ET après période

---

#### effectDateS avant période

temps ⏱️ passé -------------[XXXXXXXXXXXXXX]-------------- futur
temps ⏱️ passé --N111-N22-N3333333333333333333333...------ futur

✅1️⃣ La valeur est disponible pour la période complète, valeur unique, effectDate antérieure **ou égale** la plus proche

---

#### effectDateS avant période

temps ⏱️ passé -------------[XXXXXXXXXXXXXX]------------------------- futur
temps ⏱️ passé ---------------------------------N111-N22-N33...------ futur

❌ La valeur n'est pas disponible pour cette Période

---

####  effectDateS avant ET après période

temps ⏱️ passé -------------[XXXXXXXXXXXXXX]-------------- futur
temps ⏱️ passé --N111-N22-N3333333333333333333-N4444...--- futur

✅1️⃣ La valeur est disponible pour la période complète, valeur unique, effectDate antérieure **ou égale** la plus proche

---

#### effectDateS avant ET pendant période

Pendant : 3 possibilités : periode.dateStart, milieu, periode.dateEnd

temps ⏱️ passé -------------[XXXXXXXXXXXXXX]-------------- futur
temps ⏱️ passé --N111-N2222-N3333333333333333333...------- futur

- ✅1️⃣ = periode.dateStart : La valeur est disponible pour la période complète, valeur unique, effectDate **égale** la plus proche

---

temps ⏱️ passé -------------[XXXXXXXXXXXXXX]-------------- futur
temps ⏱️ passé --N111-N22-N3333333-N44444444444...-------- futur

- ✅🔢 Les valeurs sont disponibles pour la période complète
  - Valeur ~N3 disponible sur [ period.dateStart > N44444.dateStart - 1 ]
  - Valeur ~N4 disponible sur [ N44444.dateStart > period.dateEnd ]

---

temps ⏱️ passé -------------[XXXXXXXXXXXXXX]-------------- futur
temps ⏱️ passé --N111-N22-N333-N444-N55-N666666...-------- futur

- ✅🔢 Les valeurs sont disponibles pour la période complète
  - Valeur ~N disponible sur    [ period.dateStart  > N+1.dateEnd - 1 ]
  - Valeur ~N+1 disponible sur  [ N+1.dateEnd       > N+2.dateEnd - 1 ]
  - Valeur ~N+2 disponible sur  [ N+2.dateEnd       > N+3.dateEnd - 1 ]
  - Valeur ~N+3 disponible sur  [ N+3.dateEnd       > period.dateEnd  ]

periode.dateEnd > ♻️ On amalgame avec les "dates milieu", au final cela retourne une valeur valable sur une "période" de 1 jour

---

####  effectDateS pendant (period.startDate exclue) ET après période

temps ⏱️ passé -----[XXXXXXXXXXXXXX]------------------------ futur
temps ⏱️ passé -----------N11111111111-N2222-N33333..------- futur

🤏1️⃣ La valeur est disponible sur une partie de la période : [ effectDate > period.dateEnd ]

---

temps ⏱️ passé -----[XXXXXXXXXXXXXX]------------------------ futur
temps ⏱️ passé -----------N1111-N2222-N33333..-------------- futur

🤏🔢 Les valeurs sont disponibles pour une partie de la période : [ première effectDate > period.dateEnd ]

---

Même bail que avant & pendant pour plus + de effectDate sur la période

---

#### 🤏1️⃣🔢 effectDateS pendant période

Même bail que #### effectDateS pendant (period.startDate exclue) ET après période

---

#### ✅1️⃣🔢 effectDateS avant ET pendant ET après période

Même bail que #### effectDateS avant ET pendant période

---
---
---

🧠 Clairement ce qui en ressort c'est que l'ensemble des cas ou la **date d'effet est après**:

- Une seule date d'effet > ❌ Pas de résultat pour cette date / période
- Plusieurs dates d'effet > ❌ Pas de résultat pour cette date / période
- Plusieurs dates d'effet dont **certaines sont après** > ❌ Aucun impact sur les résultats

- A contrario, comme les dates courent dans le temps tant qu'elles ne sont pas modifiées,
la dernière AVANT period.dateEnd sera toujours la même à period.dateEnd
  - *⬆️ Bien entendu si les dates sont ordonnées*
  - ♻️♻️♻️ Mayyy du coup la date juste avant celle la c'pareil, et celle d'avant aussi
    - périodes d'effet
      - [period.dateEnd > n]  // N
      - [n-1 > n]             // N-1
      - [n-2 > n-1]           // N-2
      - [n-3 > n-2]           // N-3
      - ...
      - (~peu importe period.dateStart dépassée, la valeur sera celle de la dernière date d'effet à dépasser dans le passé)
      - [n-X > period.dateStart] // N-X
      - [n-XX > n-X]

♻️🔀 En vrai cela marche dans les deux sens (en partant de passé vers futur ou futur vers passé mais quelques différences algo)

- 🧠 passé vers futur : pas besoin de la dernière date APRES la période
  - mais besoin de la première date avant
- 🧠 futur vers passé : BESOIN de la première date APRES la période
  - mais pas besoin de la première date avant
  - 🧠 peu ou prou équivalent mais côté données réelles on aura plus souvent les données passées

---

- ♻️ a voir si cet algo ça marche partout pour ~~une seule date~~ la prémière date antérieure (avec une ou plusieurs effectDates)
- ~= Renvoyer
  - les effectDate <= Date
  - triées par ordre descendant (plus récente en premier)
  - seulement une

---

👶 Après j'allais dire "de toutes manières on doit récupérer l'ensemble des couples valeur/date d'effet et refaire un déroulé"

👶👶 Mais non, on peut déléguer cette partie la ailleurs (boucle lors de l'utilisation)

Virtuellement au niveau des retours attendus on peut sur-simplifier l'algo :

- Renvoyer l'ensemble des COUPLES effectDate/Value pour la période
- Renvoyer le couple antérieur le plus proche à cette période

... Et c'est tout

---
---
---
---
---
---
---
---
---

OU PAS, fin de la journée, besoin d'implémenter & solution alternative

🔨🤮 yeah après pratico pratique comment je balance tout ça en place pour les instances de schedule ?

Actuellement récupération des resources[CoR] > `resourcesCycleOnResourceByPeriodQuery`

- `where`
  - Une clause pour les resources > matricule/lastname/pop
  - Une clause pour la période, mayyy a la va-vite
    - 🔗 Resource <> CycleOnResource [1 - n]
    - ~cycleOnResources
      - some (!= none/every)
        - effectDate
          - >= period.dateStart
          - <= period.dateEnd

~Renvoie TOUTES les Resources dont AU MOINS un des CoR se situe dans la période
~~ A noter que cela renvoie l'intégralité des CoR de chacune des Resource

Donc il faudrait plutôt une sous requête, ou de manière optimisée ~prisma/gql

Décaler l'un des conditions du where > Rajouter un where dans cycleOnResources, duh

- 👶 Vérifier pour Max quels CoR remontent, en fonction des dates
  - Actuellement `period: {dateStart: "2024-04-01", dateEnd: "2024-04-17"}`
    - Je devrais avoir 2 cycles
    - J'ai "bien" les 4 affectés à max, peut importe les dates

Le truc relou c'est pour "la première avant la date" mais si on en a avant dans la période... Ptet avec un COUNT combien y'en a dans la période, & récupérer tout `< period.dateEnd`, LIMIT COUNT + 1

Chaque chose en son temps

- 👶 ~~Rajouter~~ Déplacer un where dans cycleOnResources
  - ✨ ~whereResource => pareil
  - ✨ ~whereCycleOnResources => [effectDate >= period.dateStart && <= period.dateEnd]
  - ✅📌 Yeah je récupère bien que les deux concernées
  - ✅📌 Algo génération instances Schédules pour le dernier cycle traité jusqu'à la fin de period.dateEnd
    - De mémoire c'était déjà traité
      - La Période demandée commence le 01/04/2024 // dateEnd: "2024-04-17"
      - periodDaysCount / Cette période comprend 17 jours dont il faut générer les Schedules
      - Le Cycle 'CYCLE_JOURNEE' commence le 01/04/2024 et génèrera des Schedules pour les 14 jours suivants.
      - ✅📌 Le Cycle 'CYCLE_2X8' commence le 15/04/2024 et génèrera des Schedules pour les 2 jours suivants.

DONC la le souci c'est si jamais un cycle existe AVANT period.dateStart de l'inclure

- 👷🐛 Ex problème actuel:
  - si je demande la period: {dateStart: "2024-04-03", dateEnd: "2024-04-17"}
  - Cycles Max
    - Cycle 1 effectDate 2024-04-01
    - Cycle 2 effectDate 2024-04-15
  - Le cycle 1 ne sera pas récupéré vu que en dehors de [04-03 - 04-17]

🧠 Complément de requête "simple" afin de le rajouter ?

- ~💩 Pas de period.dateStart pour les CoR > ~✅ Ok
  - ✅ Pas de date d'effet avant > Rieng, pas de cycle attribué
  - ✅ Une seule date d'effet avant > On la récupère
  - 💩 Plusieurs dates d'effet avant > Récupérées en intégralité
- 💩 Requête récupérer la première antérieure à period.dateStart & mixer avec l'autre requête
  - ~ effectDate < ~~= (compris dans l'autre)~~ period.dateStart & order by & ~~LIMIT~~ take: 1
  - 💩 Pas sûr que l'on puisse `orderBy` directement dans le where
    - 💩 doc
    - 💩 test
  - 💩 count & filtrer ou réutiliser en tant que variable ~`take: count + 1`
  - Merge avec `OR`

Yeah dans tous les cas il faut une deuxième requête

- Eviter une requête par resource
  - ~Récupérer l'ensemble des premières effectDate par resource
  - PUIS ~ `OR effectDate IN [resource1FirstEffectDate, resource2FirstEffectDate, resource3FirstEffectDate]`
  - & compter sur la relation pour ne garder que la bonne pour chaque resource

---
---
---

🤮 Yeah après c'est ni intuitif ni trop compréhensible ni trop maintenable

ptet plus repartir de CycleOnResource

- Rajouter une fonction qui renvoie les (id des) CoR pour des resources/période
  - Une requête première effectDate
  - Une deuxième toutes celles dans l'intervalle
  - Merge `.map > push`
  - Renvoyer

Pas über optimisé mais la pas trop le choix j'ai plus d'idées

---

### ~~CycleOnResource > fonction renvoyer par resources sur une période incl. celle d'avant~~

### 📜 CycleOnResource > fonction renvoyer par resources le premier d'avant

Resources en Args > On passe par le service Resources

---

C'con parce que la première solution serait élégante pour une resource

Moins ouf pour plein.

Go tenter ça sera plus simple + on peut le traiter en tant que requête partielle

- ~resourcesCycleOnResourceFirstHistoryBefore
- ✅ service basique
- ✅ resolver basique
- ✅ Requete CoR basique
- ✅ Requete rajouter Resource
- ✅ Requete rajouter Date
- ✅📌 Tester avec max
  - ✅ Si pas de correspondance > renvoit un tableau vide
- ✅📌 Tester avec population
- ✅ GQL retours

- ✅ Récupération dans `resourcesCycleOnResourceByPeriodQuery`
- ✅ Extraction des Ids Cor
  - ✅📌 Max
  - ✅📌 Pop
    - ✅ Gestion du cas ou pas d'ids ~= pas de Cor assigné avant cette date pour cette resource
- ✅ Test avec resourcesCycleOnResourceByPeriodQuery
  - ✅📌 Max
  - ✅📌 Pop

Yeah pas sûr à 100% pour les performances sur de la masse mayyyyyyyyyyyyyyy

Clairement:

1. Ca fonctionne
2. Facile à implémenter
   1. Récupérer valeur de effectDate à la date d'avant
   2. Ajouter aux valeurs periodStart > effectDate > periodEnd
   3. Possibilité d'en faire des requêtes partielles* & limiter les appels à la BDD
      1. * Une requête supplémentaire nécessaire pour récupérer les valeurs d'avant
3. Maintenance tranquilou IMO

---
---
---
---

cf.:

- `cronexia-gta/app/src/resources/resources.service.ts` > resourcesCycleOnResourceFirstHistoryBefore()
- `cronexia-gta/app/src/resources/resources.service.ts` > resourcesCycleOnResourceByPeriodQuery() > "// * 📜🌘📁🔗 CoR History Management"

---

## 25/07/2024 > Lint & implémentation globale

Algo actuellement en place

1. ~On récupère pour l'ensemble des resources
  - La première valeur antérieure ou égale a la date de début de période (la plus proche du début)
  - Si elle existe
  - (on peut les récupérer en une fois même si plusieurs resources, tant que la valeur est en relation 1-n avec la resource)
2. Ensuite, on récupère l'intégralité des valeurs par resource, sur cette période
   1. auxquelles on ajoute les premières valeurs
      1. 👨‍💻 Première requête on récupère les ids uniquement, deuxième on fait un `in` afin de les rajouter aux résultats, même si en dehors de la période
   2. ⬆️ puis on les ordonne par date
      1. 👨‍💻 Attention, order est en dehors du where
   3. 👨‍💻 En vrai c'est en deux étapes :
      1. Craft de la query
      2. Execution

Clairement c'est plutôt très bien optimisé & peu ou prou fonctionnel

💥 ou prou.

---

### Le problème

Dans cet algo l'un des cas de figure n'est pas géré : l'absence de valeur entre deux entrées

temps ⏱️ passé -------------[XXXXXXXXXXXXXX]-------------- futur
temps ⏱️ passé -------N111-N2222-RIENG-N33333333...------- futur
algo actuel     -------------N222222222-N333---------------
                                  💥💥

En tant que tel pour des valeurs simples ce n'est pas dramatique, on rajouter une valeur nulle avec date d'effet.

temps ⏱️ passé -------------[XXXXXXXXXXXXXX]-------------- futur
temps ⏱️ passé -------N111-N2222-NULLLL-N33333333...------- futur
algo actuel     -------------N222-NULLLL-N333---------------

Et c'est good.

TOUTEFOIS

💥++ Le gros soucis vient du fait que certaines relations sont historisées

- 👨‍💻 Pas les [n-m] implicites, vu qu'aucune valeur supplémentaire n'est stockée
- 👨‍💻 [n-m] explicites, disposant de `effectDate`

🔍 Inventorier : prisma schema > effectDate

- Valeur
  - CycleBolVal
  - CycleNbrVal
  - ResourceBolVal
  - ResourceDatVal
  - ResourceNbrVal
  - ResourceStrVal
  - ScheduleBolVal
  - ScheduleNbrVal
- Relation
  - BadgeOnResource
    - effectDateStart
    - effectDateEnd // hmmmmmmmm 🏋️ chiant à gérer, beaucoup plus de vérifications
  - CycleOnResource
  - EventGroupOnResource
  - ResourceEnumVal // 📁📚🗃️ Lien entre les ENUMs, leurs valeurs et les Ressources
    - Ptet problématique également
      - Nope c'est good
  - 🔮 Groupes Compteurs

---

### Solutions

#### ✅✅ Relation > valeur nulle dans l'un des deux ids

1. Valeurs nulles > Impossible avec la relation ?
   1. La relation est la OU
   2. 💩 Absence de relation à `effectDate`
      1. 💩 Si pas de relation, pas d'effectDate
   3. 🤔 mwé ou alors
      1. Si on fait sauter l'un des côté de la relation ?
         1. ✅📌 Pas sûr que cela passe techniquement

✅ BadgeOnResource
  resourceId & ~~badgeId~~

👷 Max 01/04 badgeId 111
👷 Max 15/04 badgeId null
👷 Max 18/04 badgeId 222

mwééééé, à voir si faisable avec toutes les relations

---
---
---

📌📌📌 Pas sûr que cela passe techniquement
model BadgeOnResource {
  badge   Badge✅?  @relation(fields: [badgeId], references: [idBadge])
  badgeId String✅? @db.Uuid

Test avec une paire de seeds en plus

```js
// ✅
const badgeOnResource_Max_pas_de_badge_en_avril_2024 =
await prisma.badgeOnResource.upsert({
  where: { idBadgeOnResource: '00000000-0000-0000-0b05-000000000666' },
  update: {},
  create: {
    idBadgeOnResource: '00000000-0000-0000-0b05-000000000666',
    // ! 💥 Attention, cela ne fonctionne QUE si aucune des relations n'est définie via connect
    badgeId: null,
    resourceId: resource1.idResource,

    // * ✅🔀 Alternative : Resource connect & absence de définition pour l'autre !

    effectDateStart: new Date('2023-04-01'),
  },
});

const badgeOnResource_Max_autre_badge_en_mai_2024 =
await prisma.badgeOnResource.upsert({
  where: { idBadgeOnResource: '00000000-0000-0000-0b05-000000000667' },
  update: {},
  create: {
    idBadgeOnResource: '00000000-0000-0000-0b05-000000000667',
    badgeId: badge_PO.idBadge,
    resourceId: resource1.idResource,
    effectDateStart: new Date('2023-04-01'),
  },
});
```

---
---
---

✅ CycleOnResource
  resourceId & ~~cycleId~~

---

🤔 EventGroupOnResource
  eventGroupId & ???

Resource <n-m 💩 implicite> EventGroupOnResource <1-n> EventGroup

Yeah leur relation est stockée dans `_EventGroupOnResourceToResource` gérée par Prisma

Au pire > on passe la relation en explicite sans champ supplémentaire, ce qui permettrait de

_EventGroupOnResourceToResource
  ~~eventGroupId~~ & resourceId

Mais ça reste tordu car effectDate & la valeur nulle seraient dans des tables différentes

[prisma relations](https://www.prisma.io/docs/orm/prisma-schema/data-model/relations/many-to-many-relations)

D'après la doc pas obligatoire.

✅✅✅ Solution

Passer la relation implicite en explicite, définir l'un des champs comme optionnels

🚨🌱 Attention les de la définition des seeds:

- 🔍🐛 `Erreur Argument 'XXX' must not be null`.
- Si l'un est null et l'autre connect, c'est 💩 KO
- Soit les deux définis via les XXXId
- Soit l'un définit en connect et l'autre non définit

```js
// 👷 Exemples
const badgeOnResource_Max_pas_de_badge_en_avril_2024 =
  await prisma.badgeOnResource.upsert({
    where: { idBadgeOnResource: '00000000-0000-0000-0b05-000000000666' },
    update: {},
    create: {
      idBadgeOnResource: '00000000-0000-0000-0b05-000000000666',
      // 💩 badge: connect: null
      // 💩 badge: null             // Pas au linter mais a la compil : must no be null
      // ---
      // 💩 KO, must not be null car Id & connect
      badgeId: null,
      resource: connect: { matricule: resource1.matricule },
      // ---
      // ✅ les deux XXXId, OK
      badgeId: null,
      resourceId: resource1.idResource,
      // ---
      // ✅ connect & absence de définition de badge, OK
      resource: connect: { matricule: resource1.matricule },
    },
  });
```

---
---
---
---
---
---
---
---
---

✅ ResourceEnumVal
  ~~resourceEnumId~~
  ~~resourceEnumNbrValId~~    // osef des valeurs ou null les deux pour explicite
  ~~resourceEnumStrValId~~    // osef des valeurs ou null les deux pour explicite
  resourceId

Resource <n-1> ResourceEnumVals <1-n> ResourceEnum          <n-m> resourceEnumNbrVal
                                                            \<n-m> resourceEnumStrVal
                               \<1-n> resourceEnumNbrVal
                               \<1-n> resourceEnumStrVal                   

---
---
---

#### ❌ Boolean affecté

Une case en plus dans la structure

- isAffected vrai/faux
  - si faux > absence de valeur
- Rajoute un test mais pas si pire
- ✅ Stocké au niveau d'effectDate > plus transparent
- Potentiellement des mauvaises données
  - isAffected > false
  - 💩 XXXId > 34567890
  - Mais bon si géré par CRUD aucun souci
    - ~~Mais vecteur à erreur humaine~~ > dans les seeds > ca va

---
---
---

#### ❌ effectDateEnd

- effectDateStart
- effectDateEnd // hmmmmmmmm 🏋️ chiant à gérer, beaucoup plus de vérifications

IMO vraiment pas optimisé

---
---
---

### ✅✅ Choix de la solution

Clairement relation nulle c'est le plus simple à mettre en place même s'il y a un peu de retouche BDD (obligatoires > optionnels)

Surtout niveau logique ça respecte le même principe qu'avec les valeurs "simples" historisées

yeah go

---
---
---

## 👷 Ajout d'une description

Afin de lever les doutes & désaffectation "implicites" via null

model > `description String @default("📜 Ajout/Ré-affectation/Suppression d'une Resource au groupe d'Events, à date historisée")`

seed > description: `📜 Ajout d'un Badge à Max, à date historisée du 01/12/2023`,
                                                                                🚨 c/c avec virgule
