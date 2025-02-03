// CLASSNAME_MAJ_FIRST REMOVE

// RELATION_MAJ_FIRST REMOVE
// RELATION_LOWC_FIRST REMOVE
// RELATION_FILE_KEBAB_CASE REMOVE

import { Field, ObjectType } from '@nestjs/graphql';

// import { RELATION_MAJ_FIRSTModel } from '../../RELATION_FILE_KEBAB_CASEs/models/RELATION_FILE_KEBAB_CASE.model';
// import { RELATION_MAJ_FIRSTEntity } from '../../RELATION_FILE_KEBAB_CASEs/entities/RELATION_FILE_KEBAB_CASE.entity';

@ObjectType()
export class CLASSNAME_MAJ_FIRSTModel {
  // * CLASSNAME_MAJ_FIRST

  // ✨ @unique

  @Field(() => String, {
    name: 'name',
    description: 'Name of the CLASSNAME_MAJ_FIRST. Must be unique.',
    nullable: false,
  })
  name: string;

  // ---

  // TODO: 🌱 Replace String with ENUM
  @Field(() => String, {
    name: 'type',
    defaultValue: 'String',
    description:
      'Value type. Must be a be a basic one: String, Int, BigInt, Boolean, DateTime',
    nullable: false,
  })
  type: string;

  // ---

  // * 🔗 Relations

  // // Many to one / [0-N] 📦📦📦
  // @Field(() => [RELATION_MAJ_FIRSTModel], {
  //   name: 'RELATION_LOWC_FIRSTs',
  //   description: 'Related RELATION_MAJ_FIRST field',
  //   // nullable: false,
  //   // Le tableau ne peut être null, mais ses éléments oui
  //   nullable: 'items',
  //   // If both the array and its items are nullable, set nullable to 'itemsAndList' instead.
  // })
  // @IsDefined()
  // RELATION_LOWC_FIRSTs: RELATION_MAJ_FIRSTModel[];
  // @IsOptional()
  // RELATION_LOWC_FIRSTs?: RELATION_MAJ_FIRSTModel[];

  // ---

  // // One to many / Only one 📦
  // @Field(() => RELATION_MAJ_FIRSTEntity, {
  //   name: 'RELATION_LOWC_FIRST',
  //   description: 'Related RELATION_MAJ_FIRST field',
  //   nullable: true,
  //   nullable: false,
  // })
  // @IsOptional()
  // RELATION_LOWC_FIRST?: RELATION_MAJ_FIRSTEntity;
  // @IsDefined()
  // RELATION_LOWC_FIRST: RELATION_MAJ_FIRSTEntity;
}
