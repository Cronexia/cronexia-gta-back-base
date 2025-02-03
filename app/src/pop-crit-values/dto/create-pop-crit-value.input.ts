import { InputType, Field, Float } from '@nestjs/graphql';
import { GraphQLDate } from 'graphql-scalars';
import {
  IsOptional,
  IsString,
  IsNumber,
  IsDate,
  IsBoolean,
} from 'class-validator';

import { NestedPopCriteriaOneToManyInput } from '../../pop-criterias/dto/nested/nested-one-to-many-pop-criteria.input';

@InputType()
export class CreatePopCritValueInput {
  // * PopCritValue
  // 💥💥💥 `@InputType()` fields NEEDS at least one Decorator (other than `@Field`) to appear, else they are whitelisted

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

  // TODO: 🌱 create > relations required, but not in case of a nested create, ex: resource > create > ResNV
  // TODO: 🌱 > Make a nested create
  // Create with connect / One to many / Only one 📦
  @Field(() => NestedPopCriteriaOneToManyInput, {
    name: 'popCriteria',
    description: 'Related PopCriteria field',
    nullable: true,
  })
  @IsOptional()
  popCriteria?: NestedPopCriteriaOneToManyInput;
}
