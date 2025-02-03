// CLASSNAME_MAJ_FIRST REMOVE

import { InputType, Field } from '@nestjs/graphql';
import { IsOptional, IsEnum } from 'class-validator';
import { OrderByEnum } from '../../_utility/graphql/enums/order-by.enum';

@InputType({
  description: `🔀 Sort by one or multiple fields, ascendent or descendant.`,
})
export class CLASSNAME_MAJ_FIRSTOrderByInput {
  // Ajout de l'identifiant unique, mais optionnel
  // Vu qu'il n'est pas dans le create, via auto-increment
  @Field(() => OrderByEnum, {
    name: 'id',
    description: `Unique ID`,
    nullable: true,
  })
  @IsOptional()
  @IsEnum(OrderByEnum)
  id?: OrderByEnum;

  // * Cronexia mandatory
  @Field(() => OrderByEnum, {
    name: 'createdBy',
    description: 'Who has created the entry',
    nullable: true,
  })
  @IsOptional()
  @IsEnum(OrderByEnum)
  createdBy?: OrderByEnum;

  @Field(() => OrderByEnum, {
    name: 'updatedBy',
    description: 'Who has last updated the entry',
    nullable: true,
  })
  @IsOptional()
  @IsEnum(OrderByEnum)
  updatedBy?: OrderByEnum;

  // * CLASSNAME_MAJ_FIRST
  @Field(() => OrderByEnum, {
    name: 'XXX',
    description: 'XXX of the CLASSNAME_MAJ_FIRST.',
    nullable: true,
  })
  @IsOptional()
  @IsEnum(OrderByEnum)
  XXX?: OrderByEnum;

  @Field(() => OrderByEnum, {
    name: 'YYY',
    description: 'YYY of the CLASSNAME_MAJ_FIRST.',
    nullable: true,
  })
  @IsOptional()
  @IsEnum(OrderByEnum)
  YYY?: OrderByEnum;
}
