import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';

import { operatorLogicalEnum } from '../enums/operator-logical.enum';
import { IsDefined, IsEnum } from 'class-validator';

import { PopCriteriaModel } from '../../pop-criterias/models/pop-criteria.model';

@ObjectType()
export class PopulationModel {
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

  // ✨ @unique

  @Field(() => String, {
    name: 'name',
    description: 'Name of the Population. Must be unique.',
    nullable: false,
  })
  name: string;

  // ---

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

  // Many to one / [0-N] 📦📦📦
  @Field(() => [PopCriteriaModel], {
    name: 'popCriterias',
    description: 'Actuals values, String typed',
    // nullable: false,
    // Le tableau ne peut être nul, mais ses éléments oui
    nullable: 'items',
    // If both the array and its items are nullable, set nullable to 'itemsAndList' instead.
  })
  popCriterias: PopCriteriaModel[];
}
