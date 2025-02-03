// CLASSNAME_MAJ_FIRST REMOVE

import { InputType, Field } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@InputType({
  description: `🔍 Search by native field/column/property`,
})
export class CLASSNAME_MAJ_FIRSTWhereInput {
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

  // * CLASSNAME_MAJ_FIRST
  // ! 💥 Better copy/paste from dto/create and 💥
  // !        Change all to nullable: true,
  // !        Change all to @IsOptional()
  @Field(() => String, {
    name: 'XXX',
    description: 'XXX of the CLASSNAME_MAJ_FIRST. Must be unique.',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  XXX?: string;

  @Field(() => String, {
    name: 'YYY',
    description: 'YYY of the CLASSNAME_MAJ_FIRST.',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  YYY?: string;
}
