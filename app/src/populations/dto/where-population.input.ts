import { InputType, Field, registerEnumType } from '@nestjs/graphql';
import { IsEnum, IsString, IsOptional } from 'class-validator';

import { operatorLogicalEnum } from '../enums/operator-logical.enum';

@InputType({
  description: `🔍 Search by native field/column/property`,
})
export class PopulationWhereInput {
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

  // Ajout de l'identifiant unique, mais optionnel
  // Vu qu'il n'est pas dans le create, via auto-increment
  @Field(() => String, {
    name: 'id',
    description: `Unique ID`,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  id?: string;

  // * Cronexia mandatory
  @Field(() => String, {
    name: 'createdBy',
    description: 'Who has created the entry',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  createdBy?: string;

  @Field(() => String, {
    name: 'updatedBy',
    description: 'Who has last updated the entry',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  updatedBy?: string;

  // * Population
  @Field(() => String, {
    name: 'name',
    description: 'Name of the Population. Must be unique.',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  name: string;

  // TODO: 🌱 Cannot determine a GraphQL output type for the "operatorLogical".
  // TODO: 🌱 Make sure your class is decorated with an appropriate decorator.
  // @Field(() => operatorLogicalEnum, {
  @Field(() => String, {
    name: 'operatorLogical',
    description: 'Supports only specific types: AND, OR, NOT',
    nullable: true,
  })
  @IsOptional()
  @IsEnum(operatorLogicalEnum)
  operatorLogical: operatorLogicalEnum;
}
