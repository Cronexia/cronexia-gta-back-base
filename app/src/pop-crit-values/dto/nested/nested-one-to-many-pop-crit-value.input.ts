import { InputType, Field } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

import { FindUniquePopCritValue } from '../find-unique-pop-crit-value';

// One to many / Only one 📦
@InputType()
export class NestedPopCritValueOneToManyInput {
  // Nested connect
  @Field(() => FindUniquePopCritValue, {
    name: 'connect',
    description: 'PopCritValue > where unique (id or name)',
    nullable: false,
  })
  @IsOptional()
  popCritValueConnect?: FindUniquePopCritValue;
}
