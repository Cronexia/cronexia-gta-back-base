import { InputType, Field } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

import { CreatePopulationInput } from '../create-population.input';
import { FindUniquePopulation } from '../find-unique-population';

// Many to one / [0-N] 📦📦📦
@InputType()
export class NestedPopulationManyToOneInput {
  // Nested create
  @Field(() => [CreatePopulationInput], {
    name: 'create',
    description: 'Array of Populations',
    nullable: 'itemsAndList',
  })
  @IsOptional()
  populationsCreate?: CreatePopulationInput[];

  // Nested createMany
  @Field(() => [CreatePopulationInput], {
    name: 'createMany',
    description: 'Array of Populations',
    nullable: 'itemsAndList',
  })
  @IsOptional()
  populationsCreateMany?: CreatePopulationInput[];

  // Nested connect
  @Field(() => [FindUniquePopulation], {
    name: 'connect',
    description: 'Array of Populations > where unique (fieldname AND value)',
    nullable: 'itemsAndList',
  })
  @IsOptional()
  populationsConnect?: FindUniquePopulation[];

  // Nested disconnect
  @Field(() => [FindUniquePopulation], {
    name: 'disconnect',
    description: 'Array of Populations > where unique (fieldname AND value)',
    nullable: 'itemsAndList',
  })
  @IsOptional()
  populationsDisconnect?: FindUniquePopulation[];
}
