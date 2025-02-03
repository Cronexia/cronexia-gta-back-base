// CLASSNAME_MAJ_FIRST REMOVE
// CLASSNAME_LOWC_FIRST REMOVE
// CLASSNAME_FILE_KEBAB_CASE REMOVE

import { InputType, Field } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

import { FindUniqueCLASSNAME_MAJ_FIRST } from '../find-unique-CLASSNAME_FILE_KEBAB_CASE';

// One to many / Only one 📦
@InputType()
export class NestedCLASSNAME_MAJ_FIRSTOneToManyInput {
  // Nested connect
  @Field(() => FindUniqueCLASSNAME_MAJ_FIRST, {
    name: 'connect',
    description: 'CLASSNAME_MAJ_FIRST > where unique (id or name)',
    nullable: false,
  })
  @IsOptional()
  CLASSNAME_LOWC_FIRSTConnect?: FindUniqueCLASSNAME_MAJ_FIRST;
}
