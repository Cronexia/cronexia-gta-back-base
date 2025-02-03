import { InputType, Field, registerEnumType } from '@nestjs/graphql';
import { IsEnum, IsString, IsDefined, IsOptional } from 'class-validator';

import { operatorLogicalEnum } from '../enums/operator-logical.enum';

import { NestedPopCriteriaManyToOneInput } from '../../pop-criterias/dto/nested/nested-many-to-one-pop-criteria.input';

@InputType()
export class CreatePopulationInput {
  constructor() {
    // ! 🔢 Dedicated ENUMs
    registerEnumType(operatorLogicalEnum, {
      name: 'operatorLogicalEnum',
      description: 'Supports only specific types: AND, OR, NOT',
      valuesMap: {
        AND: {
          description: 'AND type',
        },
        OR: {
          description: 'OR type',
        },
        NOT: {
          description: 'NOT type',
        },
      },
    });
  }

  // * Population
  // 💥💥💥 `@InputType()` fields NEEDS at least one Decorator (other than `@Field`) to appear, else they are whitelisted

  @Field(() => String, {
    name: 'name',
    description: 'Name of the Population. Must be unique.',
    nullable: false,
  })
  @IsDefined()
  @IsString()
  name: string;

  // TODO: 🌱 Cannot determine a GraphQL output type for the "operatorLogical".
  // TODO: 🌱 Make sure your class is decorated with an appropriate decorator.
  // @Field(() => operatorLogicalEnum, {
  @Field(() => String, {
    name: 'operatorLogical',
    description: 'Supports only specific types: AND, OR, NOT',
    nullable: false,
  })
  @IsDefined()
  @IsEnum(operatorLogicalEnum)
  operatorLogical: operatorLogicalEnum;

  // ---

  // * 🔗 Relations

  // Create nested children / Many to one / [0-N] 📦📦📦
  @Field(() => NestedPopCriteriaManyToOneInput, {
    name: 'popCriterias',
    description: 'Contains PopCriteria create method',
    nullable: true,
  })
  @IsOptional()
  popCriterias?: NestedPopCriteriaManyToOneInput;
}
