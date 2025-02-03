// * 🔨🔎 Craft a Query for Resources, from Resource Args
//            returns ~= ResourceWhereInput

// * 👷 Usage :
//      import { craftPeriodWhereInput } from '../_utility/graphql/craft-where-input/period';
//
//      const periodWhereInput = craftPeriodWhereInput(period);

import { DayOrPeriodInput } from '../inputs/day-or-period.input';

export function craftPeriodWhereInput(period: DayOrPeriodInput): object {
  // period.dateStart || [period.dateStart - period.dateEnd]
  let periodWhereInput: unknown = period['dateStart'];

  if (period['dateEnd'] !== undefined) {
    periodWhereInput = {
      gte: period['dateStart'],
      lte: period['dateEnd'],
    };
  }

  return periodWhereInput as object;
}
