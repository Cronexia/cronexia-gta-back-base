// * Create partial query to retreive the first instance before or equal to the date
// 📌💩 quick tests, can't pass PC types as params ~PrismaClient.CycleOnResourceFindFirstArgs
//
// 👷👌 Usage, with proper types:
//      const cycleOnResourceFindFirstArgs: PrismaClient.CycleOnResourceFindFirstArgs =
//        craftFirstHistoryBeforeArgs(date);
//
//      const query: PrismaClient.ResourceFindManyArgs = {
//        where: resourceWhereInput,
//        include: {
//          cycleOnResources: cycleOnResourceFindFirstArgs,
//        },
//      };
export function craftFirstHistoryBeforeArgs(
  periodDateStart: Date | string,
): object {
  // console.log(`craftFirstHistoryBeforeArgs(${periodDateStart})`);

  // 🔀 Convert to Dates, if needed
  if (typeof periodDateStart === 'string') {
    periodDateStart = new Date(periodDateStart);
  }

  // TODO: ♻️📌 Tester s'il s'agit effectivement d'une date, ou throw. Réutilisable

  // console.log(
  //   `craftFirstHistoryBeforeArgs(${periodDateStart.toLocaleDateString(
  //     'fr-FR',
  //   )})`,
  // );

  // * Query craft
  // 👷 take: 1 is mandatory, can be used either in findFirst or findMany
  //      Especially in nested request ([1-n] findFirst,  or [n-1] / [n-m] findMany)
  //      Can't enforce Prisma Client types, cause JS doesn't allow dynamic access to namespaces props
  const findArgs = {
    where: {
      effectDate: { lte: periodDateStart },
    },
    // Most recent to older
    orderBy: {
      effectDate: 'desc',
    },
    // Just one
    take: 1,
  };

  // console.log('---');
  // console.log(findArgs);
  // console.log('---');

  return findArgs;
}
