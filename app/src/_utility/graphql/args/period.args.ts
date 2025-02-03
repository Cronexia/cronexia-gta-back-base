import { ArgsType, Field } from '@nestjs/graphql';
import { IsDefined } from 'class-validator';

import { DayOrPeriodInput } from '../inputs/day-or-period.input';

// * 👷 Usage:
//     import { DayOrPeriodInput } from '../_utility/graphql/inputs/day-or-period';
//
//     @Args('period', {
//       nullable: false,
//       type: () => DayOrPeriodInput,
//     })
//     period: DayOrPeriodInput,

@ArgsType()
export class PeriodArgs {
  @Field(() => DayOrPeriodInput, {
    name: 'period',
    description: `🔍 Search by period: between dateStart & dateEnd, or by day with only dayStart`,
    nullable: false,
  })
  @IsDefined()
  period: DayOrPeriodInput;
}
