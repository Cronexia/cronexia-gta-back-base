// * 📝🌐 GraphQL Documentation for Resource AND Period Args

export function docPeriodArgs() {
  return `\n
  \n---
  \n
  \n#### 🔧 Arguments
  \n**period** > Required, 1 or 2 dates
  \n- *dateStart* > 📅 A specific date, when to search from
  \n- *dateEnd* > Optionnal. 📅 A specific date, when to search up to
  \n  - if *dateEnd* is ommited, search will be on the *dateStart* day
  \n`;
}
