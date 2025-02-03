// * 📌🐯 Verify Args and Throw if necessary

// No return, just throw if error
export function verifyResource(resource, errorFrom) {
  // Neither matricule, socialSecurityNumber nor lastName has been filled (incorrect direct service call)
  if (resource !== null && resource !== undefined) {
    if (
      !resource.hasOwnProperty('matricule') &&
      !resource.hasOwnProperty('lastName') &&
      !resource.hasOwnProperty('populationName') &&
      !resource.hasOwnProperty('ids') &&
      !resource.hasOwnProperty('matricules')
    ) {
      throw new Error(
        `${errorFrom}. You must specify at least one of resource.matricule, resource.lastName, resource.populationName, resource.ids or resource.matricules.`,
      );
    }
  }
}
