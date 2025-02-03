// CLASSNAME_MAJ_FIRST REMOVE
// CLASSNAME_FILE_KEBAB_CASE REMOVE

import { ArgsType, Field, registerEnumType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { GraphQLJSONObject } from 'graphql-scalars';

import { Prisma as PrismaClient } from '@prisma/client';

// * CLASSNAME_MAJ_FIRST
// DTOs
import { FindUniqueCLASSNAME_MAJ_FIRST } from './find-unique-CLASSNAME_FILE_KEBAB_CASE';
import { CLASSNAME_MAJ_FIRSTOrderByInput } from './order-by-CLASSNAME_FILE_KEBAB_CASE.input';
import { CLASSNAME_MAJ_FIRSTWhereInput } from './where-CLASSNAME_FILE_KEBAB_CASE.input';
// ENUMs
import { CLASSNAME_MAJ_FIRSTDistinctEnum } from '../enums/CLASSNAME_FILE_KEBAB_CASE-distinct.enum';

@ArgsType()
export class FindArgs {
  constructor() {
    // ! 🔢 Dedicated ENUMs
    registerEnumType(CLASSNAME_MAJ_FIRSTDistinctEnum, {
      name: 'CLASSNAME_MAJ_FIRSTDistinctEnum',
      description: '👥 Filter out duplicates rows for one or all fields.',
      valuesMap: {
        allFields: {
          description: '👥 Filter out duplicates rows for both name and type',
        },
        name: {
          description: '👥 Filter out duplicates rows for name',
        },
        none: {
          description: 'Default value, no deduplicate.',
        },
      },
    });
  }

  // 1 Arg : where, 🚨 @InputType with all fields as optionnal
  @Field(() => CLASSNAME_MAJ_FIRSTWhereInput, {
    name: 'where',
    description: `🔍 Search by native field/column/property`,
    nullable: true,
  })
  @IsOptional()
  where: CLASSNAME_MAJ_FIRSTWhereInput;

  // 1 Arg : 🚨 NOT an @InputType : whereOpen, ~= Object
  @Field(() => GraphQLJSONObject, {
    name: 'whereOpen',
    description: `🔍♾️ Same as where, but with all GraphQL capabilities provided by Prisma Client`,
    nullable: true,
  })
  @IsOptional()
  whereOpen?: PrismaClient.CLASSNAME_MAJ_FIRSTWhereInput;

  // 1 Arg : where, 🚨 @InputType with all fields as optionnal
  @Field(() => CLASSNAME_MAJ_FIRSTOrderByInput, {
    name: 'orderBy',
    description: `🔀 Sort by one or multiple fields, ascendent or descendant.`,
    nullable: true,
  })
  @IsOptional()
  orderBy?: CLASSNAME_MAJ_FIRSTOrderByInput;

  // 1 Arg : 🚨 NOT an @InputType : whereOpen, ~= Object
  @Field(() => [GraphQLJSONObject], {
    name: 'orderByOpen',
    description: `🔀 Same as orderBy, but with all GraphQL capabilities provided by Prisma Client.
    Sort by one or multiple fields, and their relations.`,
    nullable: true,
  })
  @IsOptional()
  orderByOpen?: PrismaClient.CLASSNAME_MAJ_FIRSTOrderByWithRelationInput;

  @Field(() => FindUniqueCLASSNAME_MAJ_FIRST, {
    name: 'cursor',
    description: `🎯 Start the result from an element. ⚡️ Better performances than ~ > 10 000.`,
    nullable: true,
  })
  @IsOptional()
  cursor?: FindUniqueCLASSNAME_MAJ_FIRST;

  @Field(() => CLASSNAME_MAJ_FIRSTDistinctEnum, {
    name: 'distinct',
    description: `👥 Filter out duplicates rows for one or all fields.`,
    nullable: true,
    defaultValue: 'none',
  })
  @IsOptional()
  distinct?: CLASSNAME_MAJ_FIRSTDistinctEnum;
}
