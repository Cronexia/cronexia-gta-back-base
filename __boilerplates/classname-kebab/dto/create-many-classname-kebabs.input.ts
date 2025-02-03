// CLASSNAME_MAJ_FIRST REMOVE

// RELATION_MAJ_FIRST REMOVE
// RELATION_LOWC_FIRST REMOVE

import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsDefined, IsDate, IsOptional } from 'class-validator';
import { GraphQLDate } from 'graphql-scalars';

@InputType()
export class CreateManyCLASSNAME_MAJ_FIRSTsInput {
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

  //// Create with connect / One to many / Only one 📦
  // @Field(() => String, {
  //   name: 'RELATION_LOWC_FIRSTId',
  //   description: 'Related RELATION_MAJ_FIRST field',
  //   nullable: true,
  //   nullable: false,
  // })
  // @IsDefined()
  // @IsString()
  // RELATION_LOWC_FIRSTId: string;
  // @IsOptional()
  // @IsString()
  // RELATION_LOWC_FIRSTId?: string;
}
