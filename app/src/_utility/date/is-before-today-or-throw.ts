// * Test if one or more Dates are before today, or throw
//      https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters
// 🚨 Difference of 86400000 ms (1 day) between Dates > No
//    We want to know if we can run operations "passed" midnight
export function isBeforeTodayOrThrow(...dates: Array<Date>) {
  // console.log('isBeforeTodayOrThrow');
  const now = new Date();
  const nowTime = now.getTime();

  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  // dateObj.setHours(valeurHeures[, valeurMinutes[, valeurSecondes[, valeurMs]]])
  //  [0-23]h, [0-59] mn, etc.
  yesterday.setHours(23, 59, 59, 999);
  const yesterdayTime = yesterday.getTime();

  const diffWithYesterday = nowTime - yesterdayTime;
  // console.log(now);
  // console.log(nowTime);
  // console.log(yesterday);
  // console.log(yesterdayTime);
  // console.log(diffWithYesterday); // ms
  // console.log(diff / 1000 / 60 / 60); // heures & %

  // * For each Date, difference between now() must be > diff w. yesterday
  dates.map((date) => {
    const dateToTestDiff = nowTime - date.getTime();
    // console.log('dateToTestDiff');
    // console.log(date.getTime());
    // console.log(dateToTestDiff);
    // console.log(dateToTestDiff / 1000 / 60 / 60); // heures & %
    // console.log(
    //   'dateToTestDiff < diffWithYesterday : ',
    //   dateToTestDiff < diffWithYesterday,
    // );

    if (dateToTestDiff < diffWithYesterday) {
      // 🌱🚸 Possibility to improve & return all failing dates, instead of only the first one
      throw new Error(
        `Date '${date.toLocaleDateString(
          'fr-FR',
        )}' must be anterior to yesterday, 23:59:59.`,
      );
    }
  });
}
