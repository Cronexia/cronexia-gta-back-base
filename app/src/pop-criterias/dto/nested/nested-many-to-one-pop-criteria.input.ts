import { InputType, Field } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

import { CreatePopCriteriaInput } from '../create-pop-criteria.input';
import { FindUniquePopCriteria } from '../find-unique-pop-criteria';

// Many to one / [0-N] 📦📦📦
@InputType()
export class NestedPopCriteriaManyToOneInput {
  // Nested create
  @Field(() => [CreatePopCriteriaInput], {
    name: 'create',
    description: 'Array of PopCriterias',
    nullable: 'itemsAndList',
  })
  @IsOptional()
  popCriteriasCreate?: CreatePopCriteriaInput[];

  // Nested createMany
  @Field(() => [CreatePopCriteriaInput], {
    name: 'createMany',
    description: 'Array of PopCriterias',
    nullable: 'itemsAndList',
  })
  @IsOptional()
  popCriteriasCreateMany?: CreatePopCriteriaInput[];

  // Nested connect
  @Field(() => [FindUniquePopCriteria], {
    name: 'connect',
    description: 'Array of PopCriterias > where unique (fieldname AND value)',
    nullable: 'itemsAndList',
  })
  @IsOptional()
  popCriteriasConnect?: FindUniquePopCriteria[];

  // Nested disconnect
  @Field(() => [FindUniquePopCriteria], {
    name: 'disconnect',
    description: 'Array of PopCriterias > where unique (fieldname AND value)',
    nullable: 'itemsAndList',
  })
  @IsOptional()
  popCriteriasDisconnect?: FindUniquePopCriteria[];
}
