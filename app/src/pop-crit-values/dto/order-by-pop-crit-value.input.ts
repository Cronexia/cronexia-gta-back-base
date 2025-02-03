import { InputType, Field } from '@nestjs/graphql';
import { IsOptional, IsEnum } from 'class-validator';
import { OrderByEnum } from '../../_utility/graphql/enums/order-by.enum';

@InputType({
  description: `🔀 Sort by one or multiple fields, ascendent or descendant.`,
})
export class PopCritValueOrderByInput {
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

  // * PopCritValue
  @Field(() => OrderByEnum, {
    name: 'valueBol',
    description: 'valueBol of the PopCritValue.',
    nullable: true,
  })
  @IsOptional()
  @IsEnum(OrderByEnum)
  valueBol?: OrderByEnum;

  @Field(() => OrderByEnum, {
    name: 'valueDat',
    description: 'valueDat of the PopCritValue.',
    nullable: true,
  })
  @IsOptional()
  @IsEnum(OrderByEnum)
  valueDat?: OrderByEnum;

  @Field(() => OrderByEnum, {
    name: 'valueNbr',
    description: 'valueNbr of the PopCritValue.',
    nullable: true,
  })
  @IsOptional()
  @IsEnum(OrderByEnum)
  valueNbr?: OrderByEnum;

  @Field(() => OrderByEnum, {
    name: 'valueStr',
    description: 'valueStr of the PopCritValue.',
    nullable: true,
  })
  @IsOptional()
  @IsEnum(OrderByEnum)
  valueStr?: OrderByEnum;
}
