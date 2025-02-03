// CLASSNAME_MAJ_FIRST REMOVE
// CLASSNAME_LOWC_FIRST REMOVE
// CLASSNAME_FILE_KEBAB_CASE REMOVE

import { InputType, Field } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

import { CreateCLASSNAME_MAJ_FIRSTInput } from '../create-CLASSNAME_FILE_KEBAB_CASE.input';
import { FindUniqueCLASSNAME_MAJ_FIRST } from '../find-unique-CLASSNAME_FILE_KEBAB_CASE';

// Many to one / [0-N] 📦📦📦
@InputType()
export class NestedCLASSNAME_MAJ_FIRSTManyToOneInput {
  // Nested create
  @Field(() => [CreateCLASSNAME_MAJ_FIRSTInput], {
    name: 'create',
    description: 'Array of CLASSNAME_MAJ_FIRSTs',
    nullable: 'itemsAndList',
  })
  @IsOptional()
  CLASSNAME_LOWC_FIRSTsCreate?: CreateCLASSNAME_MAJ_FIRSTInput[];

  // Nested createMany
  @Field(() => [CreateCLASSNAME_MAJ_FIRSTInput], {
    name: 'createMany',
    description: 'Array of CLASSNAME_MAJ_FIRSTs',
    nullable: 'itemsAndList',
  })
  @IsOptional()
  CLASSNAME_LOWC_FIRSTsCreateMany?: CreateCLASSNAME_MAJ_FIRSTInput[];

  // Nested connect
  @Field(() => [FindUniqueCLASSNAME_MAJ_FIRST], {
    name: 'connect',
    description:
      'Array of CLASSNAME_MAJ_FIRSTs > where unique (fieldname AND value)',
    nullable: 'itemsAndList',
  })
  @IsOptional()
  CLASSNAME_LOWC_FIRSTsConnect?: FindUniqueCLASSNAME_MAJ_FIRST[];

  // Nested disconnect
  @Field(() => [FindUniqueCLASSNAME_MAJ_FIRST], {
    name: 'disconnect',
    description:
      'Array of CLASSNAME_MAJ_FIRSTs > where unique (fieldname AND value)',
    nullable: 'itemsAndList',
  })
  @IsOptional()
  CLASSNAME_LOWC_FIRSTsDisconnect?: FindUniqueCLASSNAME_MAJ_FIRST[];
}
