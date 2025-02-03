import { ObjectType, Field, Float } from '@nestjs/graphql';
import { GraphQLDate } from 'graphql-scalars';
import {
  IsOptional,
  IsString,
  IsNumber,
  IsDate,
  IsBoolean,
} from 'class-validator';

import { PopCriteriaEntity } from '../../pop-criterias/entities/pop-criteria.entity';

@ObjectType()
export class PopCritValueModel {
  // * PopCritValue
  @Field(() => Boolean, {
    name: 'valueBol',
    description: 'The value itself, with Boolean type enforcement',
    nullable: true,
  })
  @IsOptional()
  @IsBoolean()
  valueBol?: boolean;

  @Field(() => GraphQLDate, {
    name: 'valueDat',
    description: 'The value itself, with Date type enforcement',
    nullable: true,
  })
  @IsOptional()
  @IsDate()
  valueDat?: Date;

  @Field(() => Float, {
    name: 'valueNbr',
    description: 'The value itself, with Float type enforcement',
    nullable: true,
  })
  @IsOptional()
  @IsNumber()
  valueNbr?: number;

  @Field(() => String, {
    name: 'valueStr',
    description: 'The value, with String type enforced.',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  valueStr?: string;

  // ---

  // * 🔗 Relations

  // One to many / Only one 📦
  @Field(() => PopCriteriaEntity, {
    name: 'popCriteria',
    description: 'Related PopCriteria field',
    nullable: false,
  })
  popCriteria: PopCriteriaEntity;
}
