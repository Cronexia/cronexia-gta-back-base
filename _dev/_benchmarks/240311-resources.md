# ⏱️📊 Benchmarks

Test de différentes requêtes sur 5k resources mock afin d'éprouver les performances du système.

## 🤡 Ajouter 5k resources

Avec :

- la majorité des champs remplis
  - Pour les champs optionnels, certains sont laissés vides
- Les valeurs de certains champs ont été historisées
  - status
  - contract
  - classicWeekHours
  - 🚨 Certains valeurs ne sont peut être pas cohérentes ~changement de contrat mais toujours en CDI

```gql
mutation testAdd5kMocksResources {
  mockCreate5kResourcesFromJson
}
```

---

## 📝 Doc PC

- [filtering-and-sorting](https://www.prisma.io/docs/orm/prisma-client/queries/filtering-and-sorting)
- [relation-queries](https://www.prisma.io/docs/orm/prisma-client/queries/relation-queries)
- [pc > ref > opérateurs](https://www.prisma.io/docs/orm/reference/prisma-client-reference#filter-conditions-and-operators)

### ⚗️ Filtering

- Texte
  - startsWith: 'hey'   //  hey*
  - endsWith: 'hey'     //  *hey
  - contains: 'hey      // hey* | *hey* | hey*
  - equals
  - (option) mode: 'insensitive', // Default value: default
- Numérique / Maths
  - gt    // greater than // >
  - gte   // greater or equal than // >=
  - lt    // lower than // <
  - lte   // lower or equal than // <=
  - not: null
- Opérateurs, 1 { conditio } ou many [ {condition1}, {condition2}, etc.]
  - AND
  - OR
  - NOT
  - in / notIn // where: { id: { **in**: [22, 91, 14, 2, 5] },  }
- Relationels
  - every
  - some
  - none
  - [is / isNot](https://www.prisma.io/docs/orm/reference/prisma-client-reference#is)
    - 🚨 En fonction de si la relation en one to many ou many to one
- String[] ~one to Many
  - where: { tags: { has: 'databases', }, }   // Parmi un liste de tags, si l'un est 'database'

### 🔀 Sorting

- orderBy { champ: asc } | [ { champ1: desc }, { champ2: asc }]
- orderBy: {
    updatedAt: { sort: 'asc', nulls: 'last' },
  },
- Sort by relation
  - orderBy: { relation: { relationField: 'asc' } }
- Sort by relation aggregate value > après

---

## ⏱️ Tests de performance

### 👶 Requêtes simples, vérifications d'usage

```gql
{
  resource(matricule: "123456-Max") {
    matricule
    socialSecurityNumber
  }
}
⏱️ resource: 4.491ms

{
  resource(matricule: "123456-Max") {
    matricule
    socialSecurityNumber

    resourceBooleanValues {
      fieldname
      value
      effectDate
    }

    resourceDatetimeValues {
      fieldname
      value
      effectDate
    }

    resourceNumberValues {
      fieldname
      value
      effectDate
    }

    resourceStringValues {
      fieldname
      value
      effectDate
    }
    
    resourceReferenceValues {
      fieldname
      referenceNumberValue {
        value
      }
      referenceStringValue {
        value
      }
      effectDate
    }
  }
}
⏱️ resource: 3.335ms

{
  resourceFindFirst {
    matricule
    socialSecurityNumber
  }
}
⏱️ resourceFindFirst: 4.485ms

{
  resourceFindFirst(skip: 1000) {
    matricule
    socialSecurityNumber
  }
}
⏱️ resourceFindFirst: 6.56ms

{
  resources(take: 100) {
    matricule
    socialSecurityNumber
  }
}
⏱️ resources: 5.891ms

{
  findValuesAtDate(matricule: "123456-Max", date: "2030-01-01") {
    matricule
    socialSecurityNumber
    values {
      ... on ValueUntyped {
        fieldname
        effectDate
      }
      ... on ValueString {
        valueString: value
      }
      ... on ValueInt {
        valueInt: value
      }
      ... on ValueDatetime {
        valueDatetime: value
      }
      ... on ValueBoolean {
        valueBoolean: value
      }
    }
  }
}
⏱️ findValuesAtDate: 26.695ms
```

---

### 👪 Requêtes avec un grand nombre de résultats

```gql
{
  resources(take: 1000) {
    matricule
    socialSecurityNumber
  }
}
⏱️ resources: 35.588ms

{
  resources(take: 1000, skip: 2000) {
    matricule
    socialSecurityNumber
  }
}
⏱️ resources: 17.562ms

{
  resources(take: 1000, cursor: { matricule: "Tonia Govey"}) {
    matricule
    socialSecurityNumber
  }
}
⏱️ resources: 20.567ms

{
  resources(take: 2500) {
    matricule
    socialSecurityNumber
  }
}
⏱️ resources: 37.802ms // C'est insane de rapidité lel

// 5k
{
  resources {
    matricule
    socialSecurityNumber
  }
}
⏱️ resources: 72.007ms

// Tri simple
{
  resources(orderBy: {matricule: desc}) {
    matricule
    socialSecurityNumber
  }
}
⏱️ resources: 84.297ms

// Tri multiple
{
  resources(orderByOpen: [{socialSecurityNumber: "asc"}, {matricule: "asc"}]) {
    matricule
    socialSecurityNumber
  }
}
⏱️ resources: 85.753ms

{
  resources(distinct: allFields) {
    matricule
    socialSecurityNumber
  }
}
⏱️ resources: 77.247ms
```

Aucun souci sans les jointures en tout cas

---

### 👪🔗 Requêtes avec un grand nombre de résultats avec une jointure

On tape sur les String vu qu'il y a le plus d'entrées

📌 Quelques galères à l'affichage mais a priori 💩 le navigateur à genoux

> ✅ C'est principalement la VM qui pompe Processeur & RAM mais rien de déconnant
> Quelques pics navigateurs si plus de 15k passages à la ligne à afficher

```gql
{
  resources(take: 1000) {
    matricule
    socialSecurityNumber
    resourceStringValues {
      fieldname
      value
      effectDate
    }
  }
}
⏱️ resources: 20.179ms

{
  resources(take: 1000, skip: 2000) {
    matricule
    socialSecurityNumber
    resourceStringValues {
      fieldname
      value
      effectDate
    }
  }
}
⏱️ resources: 18.318ms

{
  resources(take: 1000, cursor: { matricule: "Tonia Govey"}) {
    matricule
    socialSecurityNumber
    resourceStringValues {
      fieldname
      value
      effectDate
    }
  }
}
⏱️ resources: 18.088ms

{
  resources(take: 2500) {
    matricule
    socialSecurityNumber
    resourceStringValues {
      fieldname
      value
      effectDate
    }
  }
}
⏱️ resources: 43.387ms

// 5k
{
  resources {
    matricule
    socialSecurityNumber
    resourceStringValues {
      fieldname
      value
      effectDate
    }
  }
}
⏱️ resources: 84.556ms

// intervalle débile
{
  resources (skip: 1, take: 4998){
    matricule
    socialSecurityNumber
    resourceStringValues {
      fieldname
      value
      effectDate
    }
  }
}
⏱️ resources: 78.734ms

// Tri simple
{
  resources(orderBy: {matricule: desc}) {
    matricule
    socialSecurityNumber
    resourceStringValues {
      fieldname
      value
      effectDate
    }
  }
}
⏱️ resources: 90.506ms

// Tri multiple
{
  resources(orderByOpen: [{socialSecurityNumber: "asc"}, {matricule: "asc"}]) {
    matricule
    socialSecurityNumber
    resourceStringValues {
      fieldname
      value
      effectDate
    }
  }
}
⏱️ resources: 63.627ms

{
  resources(distinct: allFields) {
    matricule
    socialSecurityNumber
    resourceStringValues {
      fieldname
      value
      effectDate
    }
  }
}
⏱️ resources: 93.993ms
```

🧠🐛 Yeah sam parait abusé ment court quand même ; surtout que le retour navigateur est parfois plus long.

- ✅ Vérifications
  - ✅📌 Pas de souci au niveau des promesses (calcul du temps de demande et non de celui de résolution)
    - A priori non
  - ✨📌 Log via middleware > ~pas concluant et pas le temps de creuser
  - ~✅📌 Log de base de Fastify
    - Pas beaucoup de doc
    - Log correctement le temps que met le retour à être affiché dans GraphiQL
    - Ressenti perte de performances ~10-25%, notamment sur les grandes requêtes (affiche 5k resources avec jointure)
      - sans logger > ~5-6 sec
      - avec logger > ~6-8 sec
  - ✅📌 Simplement perfs éclatées au niveau du retour & affichage ?
    - Resources > findMany : On récupère les 5 k avec jointures MAIS on ne renvoie que les 10 premiers APRES avoir tout récupéré ~array.slice
      - 5k resources toutes les jointures + logger
        - ⏱️ resources: 81.641ms
        - logger > "responseTime":782.4483699984848 ~= 0.78 s
      - 5k resources toutes les jointures SANS logger
        - ⏱️ resources: 75.947ms
      - 1k resources (sinon navigateur galère lol) toutes les jointures SANS logger
        - ⏱️ resources: 27.286ms
        - Affichage ~9 secondes
      - 1k resources (sinon navigateur galère lol) toutes les jointures AVEC logger
        - ⏱️ resources: 20.791ms
        - Affichage ~11 secondes // perte de perfs
        - logger > "responseTime":10736.339789997786" ~= 10.7 secondes

Yeah ptet un goulot d'étranglement au niveau plus de la quantité de données renvoyées (dto/json) que vraiment sur les requêtes/bdd/postgre

🧠🧠🧠
~~Reprise des tests sans logger afin de ne pas impacter les performances~~

Reprise des tests avec logger afin de comparer la différence temps de requête & temps d'affichage
🧠🧠🧠

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

### 👪🔗 Requêtes avec un grand nombre de résultats avec TOUTES les jointures

```gql
{
  resources(take: 100) {
    matricule
    socialSecurityNumber
    resourceBooleanValues {
      fieldname
      value
      effectDate
    }
    resourceDatetimeValues {
      fieldname
      value
      effectDate
    }
    resourceNumberValues {
      fieldname
      value
      effectDate
    }
    resourceStringValues {
      fieldname
      value
      effectDate
    }
    resourceReferenceValues {
      fieldname
      effectDate
      referenceNumberValue {
        value
      }
      referenceStringValue {
        value
      }
    }
  }
}
⏱️ resources: 7.327ms // insane lel
"responseTime":1463.5370200015604 ~= 1.4 s

// 👀👌  Même affichage de retour mais arguments différents uniquement

resources(take: 1000)
⏱️ resources: 21.284ms
"responseTime":9715.981219999492," ~ 10 s

resources(take: 2000, skip: 1000) {
⏱️ resources: 36.698ms
,"responseTime":20146.634309999645 ~ 20 s

// :D
resources(take: 4998, skip: 1) {
⏱️ resources: 95.288ms
// Au moins le processeur ainsi que la mémoire sont cappées donc a priori pas de risque de crash niveau perfs
// 💥 .resourceStringValue.findMany(\nTimed out fetching a new connection from the connection pool. More info: http://pris.ly/d/connection-pool (Current connection pool timeout: 10, connection limit: 17)",
//        TROP de connexion en parrallèle ?
// "responseTime":39239.594240002 ~timeOut @ 40 secondes

// Même requête mais en ne renvoyant que les 10 premiers résultats dans le Resolver
⏱️ resources: 89.531ms
,"responseTime":710.4607400 ~ 0,7 s

Yeah c'est chelou mais bon c'est la différence entre AR vers la BDD & le temps de retour du serveur

// ---

resources(take: 1000, skip: 1000)
⏱️ resources: 21.282ms
,"responseTime":10528.029050000012 ~ 10 s

// lel juste par curiosité malsaine > Récupérer l'ensemble des lignes renvoyées > compter sur VSCode
//  189k passages à la ligne, pour juste 1k resources xD


// Cursor annoncé plus rapide que skip ~pagination
//      théorie
//        1000 à 2000 lent
//        id 999 et les 1000 d'après rapide
resources(take: 1000, cursor: { matricule: "Daveta Phelips"}) {
⏱️ resources: 26.045ms                     // plus lent
"responseTime":9205.334929998964," ~9,2 s   // 10% plus rapide

// Tris
resources(take: 1000, orderBy: {matricule: desc}) {
⏱️ resources: 16.604ms
"responseTime":9253.806650001556,"  ~9,2 s 

resources(take: 1000, orderByOpen: [{socialSecurityNumber: "asc"}, {matricule: "asc"}]) {
⏱️ resources: 23.229ms
,"responseTime":11177.095270000398  ~11,1 s
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

### 🤮🔗 Requêtes avec un grand nombre de résultats avec TOUTES les jointures AVEC des paramètres débiles, voir méchants

```gql
// Récupérer toutes les resources dont au moins une des valeurs Number est > 2200
//    ~ weeklyContractWorkDurationInMinutes = [1800, 2100, 2520]
resources(take: 1000,
  	whereOpen: {
      resourceNumberValues: {
        some: {
          value: {
          	equals: 2200,
          }
        }
      }
    }) {
⏱️ resources: 21.446ms                     // Lel no sweat
"responseTime":10335.517280001193 ~10.3 s   // idem stable

// 👷⚡️ Je repasse à 100 retours vu que ça filtre sur l'ensemble des entrées
//      Simplement afin de moins impacter le temps de retour de mon côté

// Valeur exacte
resources(take: 100,
  	whereOpen: {
      resourceNumberValues: {
        some: {
          value: {
          	equals: 2520,
          }
        }
      }
    }) {
⏱️ resources: 8.924ms
"responseTime":1496.509739998728, ~ 1.5 s

// Toutes les resources dont l'une des valeurs String commence par "M"
//    Triées par numéro de sécu descendant
resources(take: 100,
  	whereOpen: 
      {
        resourceStringValues: {
          some: {
            value: {
              startsWith: "M",
            }
          }
        }
      },
    orderBy: { socialSecurityNumber: desc }
    ) {
⏱️ resources: 10.885ms
"responseTime":1022.8365399986506 ~ 1 s



// 🚀 Filtrer par un champ en particulier
//          Les 100 première resources dont
//            pour le champ "firstName"
//            la valeur commence par "M"
resources(take: 100,
  	whereOpen: 
      {
        resourceStringValues: {
          some: {
            AND: [
              {
								fieldname: {
                  equals: "firstName"
                }
              },
              {
                value: {
                  startsWith: "M",
                }
            	}
            ]
            
          }
        }
      },
    orderBy: { socialSecurityNumber: desc }
    ) {
⏱️ resources: 12.274ms                           // C'est même plus drôle tellement c'rapide x')
"responseTime":1036.8274400010705 ~ 1 s
// Vérif des résultats au cas ou
"matricule": "123456-Max", // firstName > Maxime
"matricule": "Maxine Busek",
"matricule": "Maye Wanek",
"matricule": "Maurine Ewens",
"matricule": "Mehetabel Gillise",
"matricule": "Mateo Grogan",
"matricule": "Malcolm Gladyer",
// Lel ça marche en vrai :')



// Prénom commence par M ET durée de contrat par semaine 2100 ou 2520
resources(take: 100,
  	whereOpen: 
      {
        AND: [
          {
            resourceStringValues: {
              some: {
                AND: [
                  {
                    fieldname: {
                      equals: "firstName"
                    }
                  },
                  {
                    value: {
                      startsWith: "M",
                    }
                  }
                ]
              }
            }
          },
          {
            resourceNumberValues: {
              some: {
                AND: [
                  {
                    fieldname: {
                      equals: "weeklyContractWorkDurationInMinutes"
                    }
                  },
                  {
                    value: {
                      in: [2100, 2520],
                    }
                  }
                ]
              }
            }
          }
        ]
      }
    ) {
⏱️ resources: 13.26ms
"responseTime":1035.2333200015128  ~ 1 s
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

### 🤮🔗🔗 References > Double jointures

Resource > Res Ref Value > Ref String Value

```gql
// Les 100 premiers en CDI, moche avec ID
resources(take: 100,
  	whereOpen: 
      {
        resourceReferenceValues: {
          some: {
            referenceStringValueId: "371831e0-7a53-4083-8da2-436d7ef4e911"
          }
        }
      }
    ) {
⏱️ resources: 18.875ms
"responseTime":1033.1730199977756  ~ 1 s


// Les 100 premiers en Interim, jointure PRESQUE clean
resources(take: 100,
  	whereOpen: 
      {
        resourceReferenceValues: {
          some: {
            referenceStringValue: {
              is: {
                value: "Interim"
              }
            }
          }
        }
      }
    ) {
⏱️ resources: 20.952ms
"responseTime":1108.8339900001884   ~ 1.1 s       // Légère augmentation




// Edit: champ de référence clean
//      Bizarement pas besoin de is/isNot dans le AND: ?
resources(take: 100,
  	whereOpen: 
      {
        resourceReferenceValues: {
          some: {
            referenceStringValue: {
              AND: [
                {
                    value: "Interim"
                },
                {
                  reference: {
                    name: "contract"
                  }
                }
              ]
              
            }
          }
        }
      }
    ) {
⏱️ resources: 27.563ms
"responseTime":1044.7534900009632 ~ 1 s





// 💩 Les 100 premiers en CDD qui ont pour numéro fétiche le 7 :DD
resources(take: 100,
  	whereOpen: 
      {
        resourceReferenceValues: {
          some: {
            AND: [

              {
                referenceStringValue: {
                  AND: [
                    {
                      reference: {
                        name: "contract"
                      }
                    },
                    {
                        value: "CDD"
                    }
                  ]

                }
              },

              {
                referenceNumberValue: {
                  AND: [

                    {
                      reference: {
                        name: "favoriteNumber"
                      }
                    },
                    {
                        value: 7
                    }

                  ]

                }
              },

            ]
          }
        }
      }
    ) {
// 💩💩💩 Rieng :(



// Les 100 premiers dont le numéro fétiche est 7 ?
resources(take: 100,
  	whereOpen: 
      {
        resourceReferenceValues: {
          some: {
            AND: [

              {
                referenceNumberValue: {
                  AND: [

                    {
                      reference: {
                        name: "favoriteNumber"
                      }
                    },
                    {
                        value: 7
                    }

                  ]

                }
              }

            ]
          }
        }
      }
    ) {
⏱️ resources: 17.782ms
"responseTime":1059.75880999863


Vérif syntaxe
resources(take: 100,
  	whereOpen: 
      {
        resourceReferenceValues: {
          some: {
                        fieldname: {
                        	endsWith: "Size"
                        }
          }
        }
      }
    ) {




// Les 100 premiers dont le numéro préféré est 7, et dont l'amil se termine par lycos.com (lel)
{
  resources(take: 100,
  	whereOpen: 
      {
        AND: [
          {
            resourceReferenceValues: {
              some: {
                referenceNumberValue: {
                  AND: [

                    {
                      reference: {
                        name: "favoriteNumber"
                      }
                    },
                    {
                        value: 7
                    }

                  ]

                }
              }
            }
          },
          {
            resourceStringValues: {
              some: {
                AND: [
                  {
                    fieldname: {
                      equals: "email"
                    }
                  },
                  {
                    value: {
                      endsWith: "lycos.com",
                    }
                  }
                ]
              }
            }
          }
        ]
      }
    ) {

⏱️ resources: 20.554ms
,"responseTime":48.47579000145197,   // Très rapide, un seul résultat x)

Testé avec take: 4000, idem x)






// Les 100 premiers numéro fétiche 7, dont l'adresse CONTIENT "un" ~"Junction"
{
  resources(take: 100,
  	whereOpen: 
      {
        AND: [
          {
            resourceReferenceValues: {
              some: {
                referenceNumberValue: {
                  AND: [

                    {
                      reference: {
                        name: "favoriteNumber"
                      }
                    },
                    {
                        value: 7
                    }

                  ]

                }
              }
            }
          },
          {
            resourceStringValues: {
              some: {
                AND: [
                  {
                    fieldname: {
                      equals: "adress"
                    }
                  },
                  {
                    value: {
                      contains: "un",
                    }
                  }
                ]
              }
            }
          }
        ]
      }
    ) {

// 🐌🐌🐌🐌🐌🐌🐌🐌🐌🐌🐌🐌 Gros ralentissement, mais attendu (recherche dans chaine de caractère sur chaine très courte)
//    Pas ms, donc ~100x moins rapide haha
⏱️ resources: 2.863s
"responseTime":3058.178749997169

Test avec une chaine de caractère plus longue (devrait être plus rapide)
resources(take: 100,
  	whereOpen: 
      {
        AND: [
          {
            resourceReferenceValues: {
              some: {
                referenceNumberValue: {
                  AND: [

                    {
                      reference: {
                        name: "favoriteNumber"
                      }
                    },
                    {
                        value: 7
                    }

                  ]

                }
              }
            }
          },
          {
            resourceStringValues: {
              some: {
                AND: [
                  {
                    fieldname: {
                      equals: "adress"
                    }
                  },
                  {
                    value: {
                      contains: "Junction",
                    }
                  }
                ]
              }
            }
          }
        ]
      }
    ) {
// haha c'est ouf, mais normal vu le genre d'algo utilisé en général
⏱️ resources: 26.293ms
"responseTime":206.67855999










// Numéro fétiche 7, adresse contient "un" et est soumis au pointages
resources(take: 100,
  	whereOpen: 
      {
        AND: [
          {
            resourceReferenceValues: {
              some: {
                referenceNumberValue: {
                  AND: [

                    {
                      reference: {
                        name: "favoriteNumber"
                      }
                    },
                    {
                        value: 7
                    }

                  ]

                }
              }
            }
          },
          
          {
            resourceStringValues: {
              some: {
                AND: [
                  {
                    fieldname: {
                      equals: "adress"
                    }
                  },
                  {
                    value: {
                      contains: "un",
                    }
                  }
                ]
              }
            }
          },
          
          {
            resourceBooleanValues: {
              some: {
                AND: [
                  {
                    fieldname: {
                      equals: "isPointage"
                    }
                  },
                  {
                    value:  true
                  }
                ]
              }
            }
          },
          
          
        ]
      }
    ) {
⏱️ resources: 45.806ms
"responseTime":122.85305999




// Comparaison de dates > ResourceDatetimeValue
// Ca ca peut manger pas mal de ressources

// Les 100 premiers rentrés dans la boite avant 2000
resources(take: 100,
  	whereOpen: 
      {
       
            resourceDatetimeValues: {
              some: {
                AND: [
                  {
                    fieldname: {
                      equals: "inDate"
                    }
                  },
                  {
                    value: {
                      lte: "2000-01-10T00:00:00.0000000-00:00"
                    }
                  }
                ]
              }
            }
         
      }
    ) {
⏱️ resources: 5.804ms // lel wat, bah pas de soucis à se faire de ce côté la
,"responseTime":1019.5550200007 ~ 1 s



// les 100 premiers rentrés dans la boite avant 2000 ou après 2005
resources(take: 100,
  	whereOpen: 
      {
       
            resourceDatetimeValues: {
              some: {
                # [~1900-2000[ & [2005-9999[
                OR: [
                  
                  # Avant 2000
                	{
                    AND: [
                      {
                        fieldname: {
                          equals: "inDate"
                        }
                      },
                      {
                        value: {
                          lte: "2000-01-10T00:00:00.0000000-00:00"
                        }
                      }
                  	]
                  },
                  
                  # Ou alors
                  
                  # Après 2005
                	{
                    AND: [
                      {
                        fieldname: {
                          equals: "inDate"
                        }
                      },
                      {
                        value: {
                          gte: "2005-01-10T00:00:00.0000000-00:00"
                        }
                      }
                  	]
                  },
                  
                  
                ]
              }
            }
         
      }
    ) {
⏱️ resources: 8.759ms        // C'est effrayant lol jamais vu des perfs pareilles sur des dates
"responseTime":949.590290




// Entrés dans la boite entre 2000 & 2005
resources(take: 100,
  	whereOpen: 
      {
       
            resourceDatetimeValues: {
              some: {
                # [2000-2005]
                AND: [
                  
                  # Après 2000
                	{
                    AND: [
                      {
                        fieldname: {
                          equals: "inDate"
                        }
                      },
                      {
                        value: {
                          gte: "2000-01-10T00:00:00.0000000-00:00"
                        }
                      },
                      # ET Avant 2005
                      {
                        value: {
                          lte: "2006-01-10T00:00:00.0000000-00:00"
                        }
                      }
                  	]
                  },
                  
                  
                  
                ]
              }
            }
         
      }
    ) {
⏱️ resources: 7.584ms
"responseTime":947.6111699976











Les 100 premiers qui ne sont NI
  Rentrés avant 2000
  NI sortis après 2018

// 💩💩💩 Résultats non corrects, probablement mauvaise syntaxe dans la requête
resources(take: 100,
  	whereOpen: 
      {
            resourceDatetimeValues: {
              none: {
                AND: [
                  
                  # Entrée avant 2000
                	{
                    AND: [
                      {
                        fieldname: {
                          equals: "inDate"
                        }
                      },
                      {
                        value: {
                          lte: "2000-01-01T00:00:00.0000000-00:00"
                        }
                      }
                  	]
                  },
                  
                  # & Partis à partir de  2018 (mock 2015-2020)              
                	{
                    AND: [
                      {
                        fieldname: {
                          equals: "outDate"
                        }
                      },
                      {
                        value: {
                          gt: "2018-01-01T00:00:00.0000000-00:00"
                        }
                      }
                  	]
                  },
                  
                ]
              }
            }
         
      }
    ) {
⏱️ resources: 3.874ms  // wat
,"responseTime":1000.1599 ~1 s











// Les 100 premiers rentrés dans la boite avant 2000 & numéro fétiche 7
resources(take: 100,
  	whereOpen: 
      {
        AND: [
          # n° 7
          {
            resourceReferenceValues: {
              some: {
                referenceNumberValue: {
                  AND: [

                    {
                      reference: {
                        name: "favoriteNumber"
                      }
                    },
                    {
                        value: 7
                    }

                  ]

                }
              }
            }
          },
          
          # & Date entrée < 2000
          
          {
            resourceDatetimeValues: {
              some: {
                AND: [
                  {
                    fieldname: {
                      equals: "inDate"
                    }
                  },
                  {
                    value: {
                      lte: "2000-01-10T00:00:00.0000000-00:00"
                    }
                  }
                ]
              }
          	}
          }
          
        ]
      }
    ) {
// Ah, un poil lent 🐌  ~10x
⏱️ resources: 388.245ms
,"responseTime":1280.26821999

// Relances
⏱️ resources: 471.394ms
"responseTime":1522.700190

⏱️ resources: 397.987ms
"responseTime":1356.2987900

Mwé, ptet le côté 1 jointure + 1 jointure double avec dates ?
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
---
---
---

### 🧮 Requêtes aggregation

- [Aggregation, grouping, and summarizing](https://www.prisma.io/docs/orm/prisma-client/queries/aggregation-grouping-summarizing)
- [Sort by relation aggregate value](https://www.prisma.io/docs/orm/prisma-client/queries/filtering-and-sorting#sort-by-relation-aggregate-value)
- [ref > count](https://www.prisma.io/docs/orm/reference/prisma-client-reference#count)

Direct avec l'ensemble des jointures au niveau des résultats

```gql
// Simple
//    Tri par nombre de resources string value
resources(take: 100,
  orderByOpen: {
    resourceStringValues: {
      _count: "desc",
    },
},
⏱️ resources: 20.344ms
"responseTime":1048.5395
```

prisma client > aggreg & group by > fonction dédiées

`await prisma.user.aggregate(`

`await prisma.user.groupBy(`

Trop long pour le temps qu'il reste aux benchmarks > En dur dans le service

`cronexia-gta/app/src/resources/resources.service.ts` > aggregateEnDur()

```ts
console.time('⏱️ resourceAggregateEnDur');
const result = await this.prisma.resource.aggregate(
  {
    _avg: {
      socialSecurityNumber: true,
    },
  }
);
console.timeEnd('⏱️ resourceAggregateEnDur');

// La moyenne des numéros de sécu, aucun sens mais test de perfs
_avg: {
  socialSecurityNumber: true,
},
⏱️ resourceAggregateEnDur: 6.737ms
{ _avg: { socialSecurityNumber: 7222807134.60036 } }
,"responseTime":20.08127

// Le nombre total de resources
{
  _count: true
}
⏱️ resourceAggregateEnDur: 9.02ms
{ _count: 5002 }
"responseTime":23.4291199

// Et si on additionnait l'ensemble des numéros de sécu en big int :D
_sum: {
  socialSecurityNumber: true,
},
⏱️ resourceAggregateEnDur: 7.398ms
{ _sum: { socialSecurityNumber: 36128481287271 } } // lelelel
"responseTime":22.1305699944

// Le plus petit n° de sécu
⏱️ resourceAggregateEnDur: 8.087ms
{ _min: { socialSecurityNumber: 4356608 } }
"responseTime":23.32462000
// ✅📌 Vérif cohérence
//        matricule	> Kelci Pavy
//        socialSecurityNumber	> 	4356608
//            Déjà il existe
// ✅📌 Adminer > order by SSN asc > ✅

// Le plus grand
_max: {
  socialSecurityNumber: true,
},
⏱️ resourceAggregateEnDur: 7.479ms
{ _max: { socialSecurityNumber: 6666666666666 } }
"responseTime":20.71901299804449,

// "resourceFindFirst": {
//   "matricule": "123456-Max",
//   "socialSecurityNumber": 6666666666666
// }
// ✅📌 Adminer > order by SSN desc > ✅

⚡️ Perfs impeccables malgré 5 k entrées

---
---
---

TOUT D'UN COUP xD

console.time('⏱️ resourceAggregateEnDur');
  const result = await this.prisma.resource.aggregate({
    // * Nombre total d'entrées
    _count: true,

    // * Moyenne
    _avg: { socialSecurityNumber: true },

    // * Somme de l'ensemble
    _sum: { socialSecurityNumber: true },

    // * Le plus petit
    _min: { socialSecurityNumber: true },

    // * Le plus grand
    _max: { socialSecurityNumber: true },
  });
  console.timeEnd('⏱️ resourceAggregateEnDur');
  console.log(result);
}

⏱️ resourceAggregateEnDur: 7.514ms
{
  _count: 5002,
  _avg: { socialSecurityNumber: 7222807134.60036 },
  _sum: { socialSecurityNumber: 36128481287271 },
  _min: { socialSecurityNumber: 4356608 },
  _max: { socialSecurityNumber: 6666666666666 }
}

,"responseTime":21.47479200

⚡️ oké
```

GROUP BY

idem en dur

```ts
// Some des SSN, groupés par "kika créé"
await this.prisma.resource.groupBy({
  by: ['createdBy'],
  _sum: {
    socialSecurityNumber: true,
  },
});
⏱️ resourceGroupByEnDur: 7.816ms
[
  {
    _sum: { socialSecurityNumber: 36128481287271 },
    createdBy: 'admin'
  }
]
,"responseTime":15.6500990

// Faire nimp, alors
//    On groupe par 'createdBy' (~tout le monde)
//      MAIS seulement ceux/celles dont le matricule contient un e (pour rappel c'est nom + prénom)
//    PUIS on fait la somme des SSN

this.prisma.resource.groupBy({
  by: ['createdBy'],
  where: {
    matricule: {
      contains: 'e',
    },
  },
  _sum: {
    socialSecurityNumber: true,
  },
});
⏱️ resourceGroupByEnDur: 9.364ms
[
  {
    _sum: { socialSecurityNumber: 20669601422762 },
    createdBy: 'admin'
  }
]
,"responseTime":21.85318399965763,



// Ajout de filtre sur un résultats d'aggrégation ~having
await this.prisma.resource.groupBy({
  by: ['createdBy'],
  where: {
    matricule: {
      contains: 'e',
    },
  },
  _sum: {
    socialSecurityNumber: true,
  },
  having: {
    socialSecurityNumber: {
      _avg: {
        gt: 1,
      },
    },
  },
});
⏱️ resourceGroupByEnDur: 8.668ms
[
  {
    _sum: { socialSecurityNumber: 20669601422762n },
    createdBy: 'admin'
  }
]
responseTime":21.99539799


// Test d'un grosse aggreg nestée
// Return multiple relation counts
// cf . https://www.prisma.io/docs/orm/prisma-client/queries/aggregation-grouping-summarizing#return-multiple-relation-counts
await this.prisma.resource.findMany({
  select: {
    _count: {
      select: {
        resourceBooleanValues: true,
        resourceDatetimeValues: true,
        resourceNumberValues: true,
        resourceStringValues: true,
        resourceReferenceValues: true,
      },
    },
  },
});

// ~ POUR CHAQUE resource,
//      On renvoie le nombre d'entrées dans les tables liées
{
    _count: {
      resourceBooleanValues: 2,
      resourceDatetimeValues: 1,
      resourceNumberValues: 3,
      resourceStringValues: 6,
      resourceReferenceValues: 14
    }
  },
  {
    _count: {
      resourceBooleanValues: 2,
      resourceDatetimeValues: 1,
      resourceNumberValues: 3,
      resourceStringValues: 6,
      resourceReferenceValues: 11
    }
  },
  ... 4902 more items // c'beaucoup lel

⚡️⚡️⚡️ // C'est insane.....
⏱️ resourceGroupByEnDur: 82.573ms
"responseTime":93.8861549
```

Pour les requêtes sur les sous champs au pire on fera double requête : une pour récupérer l'id qu'on passera à la requête d'aggeg

> ? a voir si syntaxe plus complexe disponible pour ~aggreg  nestées
