import { InputType, Field } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

import { FindUniquePopulation } from '../find-unique-population';

// One to many / Only one 📦
@InputType()
export class NestedPopulationOneToManyInput {
  // Nested connect
  @Field(() => FindUniquePopulation, {
    name: 'connect',
    description: 'Population > where unique (id or name)',
    nullable: false,
  })
  @IsOptional()
  populationConnect?: FindUniquePopulation;
}
