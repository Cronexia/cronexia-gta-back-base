import { ArgsType, Field, registerEnumType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { GraphQLJSONObject } from 'graphql-scalars';

import { Prisma as PrismaClient } from '@prisma/client';

// * Population
// DTOs
import { FindUniquePopulation } from './find-unique-population';
import { PopulationOrderByInput } from './order-by-population.input';
import { PopulationWhereInput } from './where-population.input';
// ENUMs
import { PopulationDistinctEnum } from '../enums/population-distinct.enum';

@ArgsType()
export class FindArgs {
  constructor() {
    // ! 🔢 Dedicated ENUMs
    registerEnumType(PopulationDistinctEnum, {
      name: 'PopulationDistinctEnum',
      description: '👥 Filter out duplicates rows for one or all fields.',
      valuesMap: {
        allFields: {
          description:
            '👥 Filter out duplicates rows for both name and operatorLogical',
        },
        name: {
          description: '👥 Filter out duplicates rows for name',
        },
        operatorLogical: {
          description: '👥 Filter out duplicates rows for operatorLogical',
        },
        none: {
          description: 'Default value, no deduplicate.',
        },
      },
    });
  }

  // 1 Arg : where, 🚨 @InputType with all fields as optionnal
  @Field(() => PopulationWhereInput, {
    name: 'where',
    description: `🔍 Search by native field/column/property`,
    nullable: true,
  })
  @IsOptional()
  where: PopulationWhereInput;

  // 1 Arg : 🚨 NOT an @InputType : whereOpen, ~= Object
  @Field(() => GraphQLJSONObject, {
    name: 'whereOpen',
    description: `🔍♾️ Same as where, but with all GraphQL capabilities provided by Prisma Client`,
    nullable: true,
  })
  @IsOptional()
  whereOpen?: PrismaClient.PopulationWhereInput;

  // 1 Arg : where, 🚨 @InputType with all fields as optionnal
  @Field(() => PopulationOrderByInput, {
    name: 'orderBy',
    description: `🔀 Sort by one or multiple fields, ascendent or descendant.`,
    nullable: true,
  })
  @IsOptional()
  orderBy?: PopulationOrderByInput;

  // 1 Arg : 🚨 NOT an @InputType : whereOpen, ~= Object
  @Field(() => [GraphQLJSONObject], {
    name: 'orderByOpen',
    description: `🔀 Same as orderBy, but with all GraphQL capabilities provided by Prisma Client.
    Sort by one or multiple fields, and their relations.`,
    nullable: true,
  })
  @IsOptional()
  orderByOpen?: PrismaClient.PopulationOrderByWithRelationInput;

  @Field(() => FindUniquePopulation, {
    name: 'cursor',
    description: `🎯 Start the result from an element. ⚡️ Better performances than ~ > 10 000.`,
    nullable: true,
  })
  @IsOptional()
  cursor?: FindUniquePopulation;

  @Field(() => PopulationDistinctEnum, {
    name: 'distinct',
    description: `👥 Filter out duplicates rows for one or all fields.`,
    nullable: true,
    defaultValue: 'none',
  })
  @IsOptional()
  distinct?: PopulationDistinctEnum;
}
