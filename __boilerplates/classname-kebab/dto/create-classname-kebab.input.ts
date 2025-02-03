// CLASSNAME_MAJ_FIRST REMOVE

// RELATION_MAJ_FIRST REMOVE
// RELATION_LOWC_FIRST REMOVE
// RELATION_FILE_KEBAB_CASE REMOVE

import { InputType, Field } from '@nestjs/graphql';
import {
  IsOptional,
  IsString,
  IsDefined,
  // IsDate,
} from 'class-validator';

// import { NestedRELATION_MAJ_FIRSTOneToManyInput } from '../../RELATION_FILE_KEBAB_CASEs/dto/nested/nested-one-to-many-RELATION_FILE_KEBAB_CASE.input';
// import { NestedRELATION_MAJ_FIRSTManyToOneInput } from '../../RELATION_FILE_KEBAB_CASEs/dto/nested/nested-many-to-one-RELATION_FILE_KEBAB_CASE.input';

@InputType()
export class CreateCLASSNAME_MAJ_FIRSTInput {
  // * CLASSNAME_MAJ_FIRST
  // 💥💥💥 `@InputType()` fields NEEDS at least one Decorator (other than `@Field`) to appear, else they are whitelisted

  @Field(() => String, {
    name: 'name',
    description: 'Name of the CLASSNAME_MAJ_FIRST. Must be unique.',
    nullable: false,
  })
  @IsDefined()
  @IsString()
  name: string;

  @Field(() => String, {
    name: 'type',
    defaultValue: 'String',
    description:
      'Value type. Must be a be a basic one: String, Int, BigInt, Boolean, DateTime',
    nullable: false,
  })
  @IsDefined()
  @IsString()
  type: string;

  // ---

  // * 🔗 Relations

  //// Create nested children / Many to one / [0-N] 📦📦📦
  // @Field(() => NestedRELATION_MAJ_FIRSTManyToOneInput, {
  //   name: 'RELATION_LOWC_FIRSTs',
  //   description: 'Contains RELATION_MAJ_FIRST create method',
  //   nullable: true,
  // })
  // @IsOptional()
  // RELATION_LOWC_FIRSTs?: NestedRELATION_MAJ_FIRSTManyToOneInput;

  // ---

  // TODO: 🌱 create > relations required, but not in case of a nested create, ex: resource > create > ResNV
  // TODO: 🌱 > Make a nested create
  //// Create with connect / One to many / Only one 📦
  // @Field(() => NestedRELATION_MAJ_FIRSTOneToManyInput, {
  //   name: 'RELATION_LOWC_FIRST',
  //   description: 'Related RELATION_MAJ_FIRST field',
  //   nullable: true,
  //   nullable: false,
  // })
  // @IsOptional()
  // RELATION_LOWC_FIRST?: NestedRELATION_MAJ_FIRSTOneToManyInput;
  // RELATION_LOWC_FIRST: NestedRELATION_MAJ_FIRSTOneToManyInput;
}
