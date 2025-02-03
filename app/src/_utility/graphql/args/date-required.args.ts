import { ArgsType, Field } from '@nestjs/graphql';
import { IsDefined, IsDate } from 'class-validator';
import { GraphQLDate } from 'graphql-scalars';

@ArgsType()
export class DateRequiredArgs {
  @Field(() => GraphQLDate, {
    name: 'date',
    description: `📅 A specific date`,
    nullable: false,
  })
  @IsDefined()
  @IsDate()
  date: Date;
}
