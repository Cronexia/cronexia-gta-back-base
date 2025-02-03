import { InputType, Field } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

import { FindUniquePopCriteria } from '../find-unique-pop-criteria';

// One to many / Only one 📦
@InputType()
export class NestedPopCriteriaOneToManyInput {
  // Nested connect
  @Field(() => FindUniquePopCriteria, {
    name: 'connect',
    description: 'PopCriteria > where unique (id or name)',
    nullable: false,
  })
  @IsOptional()
  popCriteriaConnect?: FindUniquePopCriteria;
}
