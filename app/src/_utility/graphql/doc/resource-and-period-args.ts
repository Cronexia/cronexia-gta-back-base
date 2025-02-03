// * 📝🌐 GraphQL Documentation for Resource AND Period Args

export function docResourceAndPeriodArgs() {
  return `\n
  \n---
  \n
  \n#### 🔧 Arguments
  \n**resource** > Required, either matricule, last name or a population
  \n- *matricule* > String
  \n  - 🥇 matricule has priority over lastName and populations
  \n- *lastName* > String
  \n  - 🥈 lastName has priority over populationName
  \n  - Last name of the Resource.
  \n  - 🚨👥 Can lead to homonyms (👪 multiple Resources).
  \n- *populationName* > String
  \n  - Name of the 👪 Population. Can return multiple Resources.
  \n- *ids* > 🗃️ Array of String.
  \n  - Array of Resources ids.
  \n- *matricules* > 🗃️ Array of String
  \n  - Array of Resources matricules.
  \n
  \n**period** > Required, 1 or 2 dates
  \n- *dateStart* > 📅 A specific date, when to search from
  \n- *dateEnd* > Optionnal. 📅 A specific date, when to search up to
  \n  - if *dateEnd* is ommited, search will be on the *dateStart* day
  \n`;
}
