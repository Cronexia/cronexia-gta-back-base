# Resource > create a Resource with Nested Values

Afin de tester directement sous GraphiQL

## ✅📌 Requête sans commentaires, fonctionnelle

```json
mutation testAddOne($params: CreateResourceInput) {
  createResource(params: $params) {
    matricule
    socialSecurityNumber
  }
}

// Variables
{
  "params": {
    "matricule": "matricule-jean-michel",
    "socialSecurityNumber": 1345513831,

    "resourceBooleanValues": {
      "create": [
        {
          "matricule": "matricule-jean-michel",
          "fieldname": "isPointage",
          "value": true,
          "effectDate": "2023-02-01",
          "structureResource": {
            "connect": {
              "name": "isPointage"
            }
          }
        },
        {
          "matricule": "matricule-jean-michel",
          "fieldname": "isDurationHourManagement",
          "value": false,
          "effectDate": "2023-02-01",
          "structureResource": {
            "connect": {
              "name": "isDurationHourManagement"
            }
          }
        }
      ]
    },

    "resourceDatetimeValues": {
      "create": [
        {
          "matricule": "matricule-jean-michel",
          "fieldname": "inDate",
          "value": "2023-02-01",
          "effectDate": "2023-02-01",
          "structureResource": {
            "connect": {
              "name": "inDate"
            }
          }
        },
        {
          "matricule": "matricule-jean-michel",
          "fieldname": "outDate",
          "value": "2030-03-03",
          "effectDate": "2030-03-03",
          "structureResource": {
            "connect": {
              "name": "outDate"
            }
          }
        }
      ]
    },

    "resourceNumberValues": {
      "create": [

        {
          "matricule": "matricule-jean-michel",
          "fieldname": "employmentRatePercent",
          "value": 100,
          "effectDate": "2023-02-01",
          "structureResource": {
            "connect": {
              "name": "employmentRatePercent"
            }
          }
        },

        {
          "matricule": "matricule-jean-michel",
          "fieldname": "weeklyContractWorkDurationInMinutes",
          "value": 2100,
          "effectDate": "2023-02-01",
          "structureResource": {
            "connect": {
              "name": "weeklyContractWorkDurationInMinutes"
            }
          }
        },

        {
          "matricule": "matricule-jean-michel",
          "fieldname": "dailyContractWorkDurationInMinutes",
          "value": 420,
          "effectDate": "2023-02-01",
          "structureResource": {
            "connect": {
              "name": "dailyContractWorkDurationInMinutes"
            }
          }
        }

      ]
    },


    "resourceStringValues": {
      "create": [
        {
          "matricule": "matricule-jean-michel",
          "fieldname": "lastName",
          "value": "Poquelin",
          "effectDate": "1900-01-01",
          "structureResource": {
            "connect": {
              "name": "lastName"
            }
          }
        },

        {
          "matricule": "matricule-jean-michel",
          "fieldname": "firstName",
          "value": "Jean michel",
          "effectDate": "1900-01-01",
          "structureResource": {
            "connect": {
              "name": "firstName"
            }
          }
        },

        {
          "matricule": "matricule-jean-michel",
          "fieldname": "photo",
          "value": "<:)",
          "effectDate": "1900-01-01",
          "structureResource": {
            "connect": {
              "name": "photo"
            }
          }
        },

        {
          "matricule": "matricule-jean-michel",
          "fieldname": "adress",
          "value": "15 rue de Richelieu, 75001, Paris",
          "effectDate": "1900-01-01",
          "structureResource": {
            "connect": {
              "name": "adress"
            }
          }
        },

        {
          "matricule": "matricule-jean-michel",
          "fieldname": "phone",
          "value": "06 12 34 56 78",
          "effectDate": "1900-01-01",
          "structureResource": {
            "connect": {
              "name": "phone"
            }
          }
        },

        {
          "matricule": "matricule-jean-michel",
          "fieldname": "email",
          "value": "jm.poquelin@gmail.com",
          "effectDate": "1900-01-01",
          "structureResource": {
            "connect": {
              "name": "email"
            }
          }
        },
        
        {
          "matricule": "matricule-jean-michel",
          "fieldname": "badgeNumber",
          "value": "4242424242",
          "effectDate": "2023-02-01",
          "structureResource": {
            "connect": {
              "name": "badgeNumber"
            }
          }
        }

      ]
    },

    "resourceReferenceValues": {
      "create": [

        {
          "fieldname": "quality",
          "effectDate": "1900-01-01",
          "matricule": "matricule-jean-michel",
          "reference": {
            "connect": {
              "name": "quality"
            }
          },
          "referenceStringValue": {
            "connect": {
              "id": "98ca1162-1268-4356-8f56-85e08ad66fef"
            }
          }
        },

        {
          "fieldname": "rattachments",
          "effectDate": "1900-01-01",
          "matricule": "matricule-jean-michel",
          "reference": {
            "connect": {
              "name": "rattachments"
            }
          },
          "referenceStringValue": {
            "connect": {
              "id": "d7b1fdb3-4e92-4c84-838f-0e733847f098"
            }
          }
        },

        {
          "fieldname": "rattachments",
          "effectDate": "1900-01-01",
          "matricule": "matricule-jean-michel",
          "reference": {
            "connect": {
              "name": "rattachments"
            }
          },
          "referenceStringValue": {
            "connect": {
              "id": "35dd015a-7fec-48a1-8626-0fac48de2cb1"
            }
          }
        },

        {
          "fieldname": "outReason",
          "effectDate": "2024-03-03",
          "matricule": "matricule-jean-michel",
          "reference": {
            "connect": {
              "name": "outReason"
            }
          },
          "referenceStringValue": {
            "connect": {
              "id": "9621c425-3624-4e64-bb6a-17758ea5dc35"
            }
          }
        },

        {
          "fieldname": "job",
          "effectDate": "2024-03-03",
          "matricule": "matricule-jean-michel",
          "reference": {
            "connect": {
              "name": "job"
            }
          },
          "referenceStringValue": {
            "connect": {
              "id": "7dfb9539-44c5-45d8-9225-661f0796d996"
            }
          }
        },

        {
          "fieldname": "status",
          "effectDate": "2023-02-01",
          "matricule": "matricule-jean-michel",
          "reference": {
            "connect": {
              "name": "status"
            }
          },
          "referenceStringValue": {
            "connect": {
              "id": "66c2e0e1-9eb2-485d-92a7-75a57f2e341c"
            }
          }
        },

        {
          "fieldname": "status",
          "effectDate": "2023-02-15",
          "matricule": "matricule-jean-michel",
          "reference": {
            "connect": {
              "name": "status"
            }
          },
          "referenceStringValue": {
            "connect": {
              "id": "d6165cdc-8beb-4418-a340-8e87388512eb"
            }
          }
        },

        {
          "fieldname": "status",
          "effectDate": "2023-06-15",
          "matricule": "matricule-jean-michel",
          "reference": {
            "connect": {
              "name": "status"
            }
          },
          "referenceStringValue": {
            "connect": {
              "id": "a960f670-0e79-4de5-affb-29c107bd3a52"
            }
          }
        },

        {
          "fieldname": "status",
          "effectDate": "2023-07-07",
          "matricule": "matricule-jean-michel",
          "reference": {
            "connect": {
              "name": "status"
            }
          },
          "referenceStringValue": {
            "connect": {
              "id": "d6165cdc-8beb-4418-a340-8e87388512eb"
            }
          }
        },

        {
          "fieldname": "echelon",
          "effectDate": "2023-02-01",
          "matricule": "matricule-jean-michel",
          "reference": {
            "connect": {
              "name": "echelon"
            }
          },
          "referenceStringValue": {
            "connect": {
              "id": "25544b4f-f9a1-458a-a646-4f04e04034aa"
            }
          }
        },

        {
          "fieldname": "echelon",
          "effectDate": "2023-08-01",
          "matricule": "matricule-jean-michel",
          "reference": {
            "connect": {
              "name": "echelon"
            }
          },
          "referenceStringValue": {
            "connect": {
              "id": "78e7a3ad-f160-4715-9eb9-a2a86b92a82f"
            }
          }
        },

        {
          "fieldname": "contract",
          "effectDate": "1900-01-01",
          "matricule": "matricule-jean-michel",
          "reference": {
            "connect": {
              "name": "contract"
            }
          },
          "referenceStringValue": {
            "connect": {
              "id": "371831e0-7a53-4083-8da2-436d7ef4e911"
            }
          }
        },

        {
          "fieldname": "cycle",
          "effectDate": "1900-01-01",
          "matricule": "matricule-jean-michel",
          "reference": {
            "connect": {
              "name": "cycle"
            }
          },
          "referenceStringValue": {
            "connect": {
              "id": "0dcc273a-a943-465f-9f94-2ebd859659c5"
            }
          }
        },

        {
          "fieldname": "calendar",
          "effectDate": "1900-01-01",
          "matricule": "matricule-jean-michel",
          "reference": {
            "connect": {
              "name": "calendar"
            }
          },
          "referenceStringValue": {
            "connect": {
              "id": "ebcfc399-2d82-42f7-8e7e-b41cb014b54f"
            }
          }
        },

        {
          "fieldname": "shirtSize",
          "effectDate": "1900-01-01",
          "matricule": "matricule-jean-michel",
          "reference": {
            "connect": {
              "name": "shirtSize"
            }
          },
          "referenceStringValue": {
            "connect": {
              "id": "ccf48380-1c0f-4148-90b0-77d217523f13"
            }
          }
        },

        {
          "fieldname": "classicWeekHours",
          "effectDate": "2023-02-01",
          "matricule": "matricule-jean-michel",
          "reference": {
            "connect": {
              "name": "classicWeekHours"
            }
          },
          "referenceNumberValue": {
            "connect": {
              "id": "5f4759d7-cedd-4ed1-be26-e614af58896e"
            }
          }
        },

        {
          "fieldname": "favoriteNumber",
          "effectDate": "1900-01-01",
          "matricule": "matricule-jean-michel",
          "reference": {
            "connect": {
              "name": "favoriteNumber"
            }
          },
          "referenceNumberValue": {
            "connect": {
              "id": "00000000-0000-0000-0000-000000000042"
            }
          }
        }
      ]
    }
  }
}
```

### 📌 Verification

```gql
{
  findValuesAtDate(matricule: "matricule-jean-michel", date: "2030-01-01") {
    matricule
    socialSecurityNumber
    
    values {
      # Champs communs
      ... on ValueUntyped {
        fieldname
        effectDate
      }

      # Champs typés
      ... on ValueString {
        # value # 🚨
        ###     Fields "value" conflict because they return conflicting types "String" and "Int".
        ###     Use different aliases on the fields to fetch both if this was intentionnal.
        ### Besoin d'un alias sinon conflit dans le nom lié au type -_-
        valueString: value
      }

      ... on ValueInt {
        # value 
        valueInt: value
      }

      ... on ValueDatetime {
        # value 
        valueDatetime: value
      }

      ... on ValueBoolean {
        # value 
        valueBoolean: value
      }

      
    
    } # /values
  }
}
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

## Requête avec commentaires

Afin de palier aux UUID qui obfusquent pas mal d'informations pour le moment.

La requête ne fonctionne pas, car les params sont au format JSON qui ne supportent pas les commentaires.

Pas complètement mise à jour par rapport à la requête fonctionnelle.

```json
mutation testAddOne($params: CreateResourceInput) {
  createResource(params: $params) {
    matricule
    socialSecurityNumber
  }
}

// Variables
{
  "params": {
    "matricule": "matricule-jean-michel",
    "socialSecurityNumber": 1345513831,

    // Resource Boolean Values
    "resourceBooleanValues": {
      "create": [
        // IsPointage
        {
          "matricule": "matricule-jean-michel",
          "fieldname": "isPointage",
          "value": true,
          "effectDate": "2023-02-01",
          "structureResource": {
            "connect": {
              "name": "isPointage"
            }
          }
        },
        // IsDurationHourManagement
        {
          "matricule": "matricule-jean-michel",
          "fieldname": "isDurationHourManagement",
          "value": false,
          "effectDate": "2023-02-01",
          "structureResource": {
            "connect": {
              "name": "isDurationHourManagement"
            }
          }
        },
      ]
    },

    // Resource DateTime Values
    "resourceDatetimeValues": {
      "create": [
        // inDate
        {
          "matricule": "matricule-jean-michel",
          "fieldname": "inDate",
          "value": "2023-02-01",
          "effectDate": "2023-02-01",
          "structureResource": {
            "connect": {
              "name": "inDate"
            }
          }
        },
        // outDate
        {
          "matricule": "matricule-jean-michel",
          "fieldname": "outDate",
          "value": "2030-03-03",
          "effectDate": "2030-03-03",
          "structureResource": {
            "connect": {
              "name": "outDate"
            }
          }
        }
      ]
    },

    // 🔢 Resource Number Value
    "resourceNumberValues": {
      "create": [

        // EmploymentRatePercent
        {
          "matricule": "matricule-jean-michel",
          "fieldname": "employmentRatePercent",
          "value": 100,
          "effectDate": "2023-02-01",
          "structureResource": {
            "connect": {
              "name": "employmentRatePercent"
            }
          }
        },

        // WeeklyContractWorkDurationInMinutes
        {
          "matricule": "matricule-jean-michel",
          "fieldname": "weeklyContractWorkDurationInMinutes",
          // 35h x 60 min
          "value": 2100,
          "effectDate": "2023-02-01",
          "structureResource": {
            "connect": {
              "name": "weeklyContractWorkDurationInMinutes"
            }
          }
        },

        // DailyContractWorkDurationInMinutes
        {
          "matricule": "matricule-jean-michel",
          "fieldname": "dailyContractWorkDurationInMinutes",
          // 7h x 60 min
          "value": 420,
          "effectDate": "2023-02-01",
          "structureResource": {
            "connect": {
              "name": "dailyContractWorkDurationInMinutes"
            }
          }
        },

      ]
    },

    // ---

    // 💬 Resource String Value
    "resourceStringValues": {
      "create": [
        // Nom
        {
          "matricule": "matricule-jean-michel",
          "fieldname": "lastName",
          "value": "Poquelin",
          "effectDate": "1900-01-01",
          "structureResource": {
            "connect": {
              "name": "lastName"
            }
          }
        },

        // Prenom
        {
          "matricule": "matricule-jean-michel",
          "fieldname": "firstName",
          "value": "Jean michel",
          "effectDate": "1900-01-01",
          "structureResource": {
            "connect": {
              "name": "firstName"
            }
          }
        },

        // Photo
        {
          "matricule": "matricule-jean-michel",
          "fieldname": "photo",
          "value": "<:)",
          "effectDate": "1900-01-01",
          "structureResource": {
            "connect": {
              "name": "photo"
            }
          }
        },

        // Adresse
        {
          "matricule": "matricule-jean-michel",
          "fieldname": "adress",
          "value": "15 rue de Richelieu, 75001, Paris",
          "effectDate": "1900-01-01",
          "structureResource": {
            "connect": {
              "name": "adress"
            }
          }
        },

        // Téléphone
        {
          "matricule": "matricule-jean-michel",
          "fieldname": "phone",
          "value": "06 12 34 56 78",
          "effectDate": "1900-01-01",
          "structureResource": {
            "connect": {
              "name": "phone"
            }
          }
        },

        // Email
        {
          "matricule": "matricule-jean-michel",
          "fieldname": "email",
          "value": "jm.poquelin@gmail.com",
          "effectDate": "1900-01-01",
          "structureResource": {
            "connect": {
              "name": "email"
            }
          }
        },

        // BadgeNumber
        {
          "matricule": "matricule-jean-michel",
          "fieldname": "badgeNumber",
          "value": "4242424242",
          "effectDate": "2023-02-01",
          "structureResource": {
            "connect": {
              "name": "badgeNumber"
            }
          }
        },

      ]
    },

    // ---

    // 🔗 References
    "resourceReferenceValues": {
      "create": [

        #// 🔗💬 Reference String Values
        // Qualité / Mr / Mme / etc.
        {
          "fieldname": "quality",
          "effectDate": "1900-01-01",
          "matricule": "matricule-jean-michel",
          "reference": {
            "connect": {
              "name": "quality"
            }
          },
          "referenceStringValue": {
            "connect": {
              // Monsieur
              "id": "98ca1162-1268-4356-8f56-85e08ad66fef"
            }
          }
        },

        // Rattachements
        //   Région parisienne
        {
          "fieldname": "rattachments",
          "effectDate": "1900-01-01",
          "matricule": "matricule-jean-michel",
          "reference": {
            "connect": {
              "name": "rattachments"
            }
          },
          "referenceStringValue": {
            "connect": {
              "id": "d7b1fdb3-4e92-4c84-838f-0e733847f098"
            }
          }
        },

        //   Agence de Paris
        {
          "fieldname": "rattachments",
          "effectDate": "1900-01-01",
          "matricule": "matricule-jean-michel",
          "reference": {
            "connect": {
              "name": "rattachments"
            }
          },
          "referenceStringValue": {
            "connect": {
              "id": "35dd015a-7fec-48a1-8626-0fac48de2cb1"
            }
          }
        },

        // Raison du départ
        {
          "fieldname": "outReason",
          "effectDate": "2024-03-03",
          "matricule": "matricule-jean-michel",
          "reference": {
            "connect": {
              "name": "outReason"
            }
          },
          "referenceStringValue": {
            "connect": {
              // Rupture à l'amiable
              "id": "9621c425-3624-4e64-bb6a-17758ea5dc35"
            }
          }
        },

        // Emploi
        {
          "fieldname": "job",
          "effectDate": "2024-03-03",
          "matricule": "matricule-jean-michel",
          "reference": {
            "connect": {
              "name": "job"
            }
          },
          "referenceStringValue": {
            "connect": {
              // Commercial
              "id": "7dfb9539-44c5-45d8-9225-661f0796d996"
            }
          }
        },

        #// Status avec historique
        // Status > Entrée boite > Formation
        {
          "fieldname": "status",
          "effectDate": "2023-02-01",
          "matricule": "matricule-jean-michel",
          "reference": {
            "connect": {
              "name": "status"
            }
          },
          "referenceStringValue": {
            "connect": {
              // En Formation
              "id": "66c2e0e1-9eb2-485d-92a7-75a57f2e341c"
            }
          }
        },

        // Status > Boulot
        {
          "fieldname": "status",
          "effectDate": "2023-02-15",
          "matricule": "matricule-jean-michel",
          "reference": {
            "connect": {
              "name": "status"
            }
          },
          "referenceStringValue": {
            "connect": {
              // En Poste
              "id": "d6165cdc-8beb-4418-a340-8e87388512eb"
            }
          }
        },

        // Status > Malade
        {
          "fieldname": "status",
          "effectDate": "2023-06-15",
          "matricule": "matricule-jean-michel",
          "reference": {
            "connect": {
              "name": "status"
            }
          },
          "referenceStringValue": {
            "connect": {
              // Malade
              "id": "a960f670-0e79-4de5-affb-29c107bd3a52"
            }
          }
        },

        // Status > De nouveau en poste
        {
          "fieldname": "status",
          "effectDate": "2023-07-07",
          "matricule": "matricule-jean-michel",
          "reference": {
            "connect": {
              "name": "status"
            }
          },
          "referenceStringValue": {
            "connect": {
              // En Poste
              "id": "d6165cdc-8beb-4418-a340-8e87388512eb"
            }
          }
        },

        // Echelon
        {
          "fieldname": "echelon",
          "effectDate": "2023-02-01",
          "matricule": "matricule-jean-michel",
          "reference": {
            "connect": {
              "name": "echelon"
            }
          },
          "referenceStringValue": {
            "connect": {
              // 1er echelon
              "id": "25544b4f-f9a1-458a-a646-4f04e04034aa"
            }
          }
        },

        // Echelon > Promotion
        {
          "fieldname": "echelon",
          "effectDate": "2023-08-01",
          "matricule": "matricule-jean-michel",
          "reference": {
            "connect": {
              "name": "echelon"
            }
          },
          "referenceStringValue": {
            "connect": {
              // 2eme echelon
              "id": "78e7a3ad-f160-4715-9eb9-a2a86b92a82f"
            }
          }
        },

        // Contract
        {
          "fieldname": "contract",
          "effectDate": "1900-01-01",
          "matricule": "matricule-jean-michel",
          "reference": {
            "connect": {
              "name": "contract"
            }
          },
          "referenceStringValue": {
            "connect": {
              // CDI
              "id": "371831e0-7a53-4083-8da2-436d7ef4e911"
            }
          }
        },

        // Cycle
        {
          "fieldname": "cycle",
          "effectDate": "1900-01-01",
          "matricule": "matricule-jean-michel",
          "reference": {
            "connect": {
              "name": "cycle"
            }
          },
          "referenceStringValue": {
            "connect": {
              // Diurne
              "id": "0dcc273a-a943-465f-9f94-2ebd859659c5"
            }
          }
        },

        // Calendar
        {
          "fieldname": "calendar",
          "effectDate": "1900-01-01",
          "matricule": "matricule-jean-michel",
          "reference": {
            "connect": {
              "name": "calendar"
            }
          },
          "referenceStringValue": {
            "connect": {
              // Grégorien
              "id": "ebcfc399-2d82-42f7-8e7e-b41cb014b54f"
            }
          }
        },

        // ShirtSize
        {
          "fieldname": "shirtSize",
          "effectDate": "1900-01-01",
          "matricule": "matricule-jean-michel",
          "reference": {
            "connect": {
              "name": "shirtSize"
            }
          },
          "referenceStringValue": {
            "connect": {
              // M
              "id": "ccf48380-1c0f-4148-90b0-77d217523f13"
            }
          }
        },

        // ---

        #// 🔗🔢 Reference Number Values

        // Classic Week Hours
        {
          "fieldname": "classicWeekHours",
          "effectDate": "2023-02-01",
          "matricule": "matricule-jean-michel",
          "reference": {
            "connect": {
              "name": "classicWeekHours"
            }
          },
          "referenceNumberValue": {
            "connect": {
              // 42
              "id": "5f4759d7-cedd-4ed1-be26-e614af58896e"
            }
          }
        }
      ]
    }
  }
}
```
