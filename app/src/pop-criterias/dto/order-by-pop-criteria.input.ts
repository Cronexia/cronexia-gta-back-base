import { InputType, Field } from '@nestjs/graphql';
import { IsOptional, IsEnum } from 'class-validator';
import { OrderByEnum } from '../../_utility/graphql/enums/order-by.enum';

@InputType({
  description: `🔀 Sort by one or multiple fields, ascendent or descendant.`,
})
export class PopCriteriaOrderByInput {
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

  // * PopCriteria
  @Field(() => OrderByEnum, {
    name: 'name',
    description: 'name of the PopCriteria.',
    nullable: true,
  })
  @IsOptional()
  @IsEnum(OrderByEnum)
  name?: OrderByEnum;

  @Field(() => OrderByEnum, {
    name: 'table',
    description: 'table of the PopCriteria.',
    nullable: true,
  })
  @IsOptional()
  @IsEnum(OrderByEnum)
  table?: OrderByEnum;

  @Field(() => OrderByEnum, {
    name: 'field',
    description: 'field of the PopCriteria.',
    nullable: true,
  })
  @IsOptional()
  @IsEnum(OrderByEnum)
  field?: OrderByEnum;

  @Field(() => OrderByEnum, {
    name: 'fieldTypeHelper',
    description: 'fieldTypeHelper of the PopCriteria.',
    nullable: true,
  })
  @IsOptional()
  @IsEnum(OrderByEnum)
  fieldTypeHelper?: OrderByEnum;

  @Field(() => OrderByEnum, {
    name: 'operatorComparison',
    description: 'operatorComparison of the PopCriteria.',
    nullable: true,
  })
  @IsOptional()
  @IsEnum(OrderByEnum)
  operatorComparison?: OrderByEnum;
}
