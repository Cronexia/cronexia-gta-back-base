import { InputType, Field, registerEnumType } from '@nestjs/graphql';
import { IsString, IsDefined, IsEnum } from 'class-validator';

import { operatorLogicalEnum } from '../enums/operator-logical.enum';

@InputType()
export class CreateManyPopulationsInput {
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

  // /
}
