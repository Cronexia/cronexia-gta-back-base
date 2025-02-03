import { InputType, Field } from '@nestjs/graphql';
import { IsOptional, IsEnum } from 'class-validator';
import { OrderByEnum } from '../../_utility/graphql/enums/order-by.enum';

@InputType({
  description: `🔀 Sort by one or multiple fields, ascendent or descendant.`,
})
export class PopulationOrderByInput {
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

  // * Population
  @Field(() => OrderByEnum, {
    name: 'name',
    description: 'name of the Population.',
    nullable: true,
  })
  @IsOptional()
  @IsEnum(OrderByEnum)
  name?: OrderByEnum;

  @Field(() => OrderByEnum, {
    name: 'operatorLogical',
    description: 'operatorLogical of the Population.',
    nullable: true,
  })
  @IsOptional()
  @IsEnum(OrderByEnum)
  operatorLogical?: OrderByEnum;
}
