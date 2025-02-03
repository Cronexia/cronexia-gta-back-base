import { InputType, Field } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

import { CreatePopCritValueInput } from '../create-pop-crit-value.input';
import { FindUniquePopCritValue } from '../find-unique-pop-crit-value';

// Many to one / [0-N] 📦📦📦
@InputType()
export class NestedPopCritValueManyToOneInput {
  // Nested create
  @Field(() => [CreatePopCritValueInput], {
    name: 'create',
    description: 'Array of PopCritValues',
    nullable: 'itemsAndList',
  })
  @IsOptional()
  popCritValuesCreate?: CreatePopCritValueInput[];

  // Nested createMany
  @Field(() => [CreatePopCritValueInput], {
    name: 'createMany',
    description: 'Array of PopCritValues',
    nullable: 'itemsAndList',
  })
  @IsOptional()
  popCritValuesCreateMany?: CreatePopCritValueInput[];

  // Nested connect
  @Field(() => [FindUniquePopCritValue], {
    name: 'connect',
    description: 'Array of PopCritValues > where unique (fieldname AND value)',
    nullable: 'itemsAndList',
  })
  @IsOptional()
  popCritValuesConnect?: FindUniquePopCritValue[];

  // Nested disconnect
  @Field(() => [FindUniquePopCritValue], {
    name: 'disconnect',
    description: 'Array of PopCritValues > where unique (fieldname AND value)',
    nullable: 'itemsAndList',
  })
  @IsOptional()
  popCritValuesDisconnect?: FindUniquePopCritValue[];
}
