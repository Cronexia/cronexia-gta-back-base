import { InputType, Field } from '@nestjs/graphql';
import { IsDefined, IsDate, IsOptional } from 'class-validator';
import { GraphQLDate } from 'graphql-scalars';

@InputType({
  description: `Day with only dateStart, or Period with both dateStart & dateEnd`,
})
export class DayOrPeriodInput {
  @Field(() => GraphQLDate, {
    name: 'dateStart',
    description: `📅 A specific date, when to search from`,
    nullable: false,
  })
  @IsDefined()
  @IsDate()
  dateStart: Date;

  @Field(() => GraphQLDate, {
    name: 'dateEnd',
    description: `📅 A specific date, when to search up to`,
    nullable: true,
  })
  @IsOptional()
  @IsDate()
  dateEnd?: Date;
}
