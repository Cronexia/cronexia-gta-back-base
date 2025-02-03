// * 📌🐯 Verify Args and Throw if necessary

// No return, just throw if error
export function verifyPeriod(period, errorFrom) {
  if (period === null || period === undefined) {
    throw new Error(`${errorFrom}. You must specify the period.`);
  }

  if (period.hasOwnProperty('dateStart') === false) {
    throw new Error(`${errorFrom}. Period must have at least 'dateStart'.`);
  }

  if (period.hasOwnProperty('dateEnd')) {
    if (period['dateStart'] > period['dateEnd']) {
      throw new Error(
        `${errorFrom}. Period > dateStart must be anterior to dateEnd.`,
      );
    }
  }
}
