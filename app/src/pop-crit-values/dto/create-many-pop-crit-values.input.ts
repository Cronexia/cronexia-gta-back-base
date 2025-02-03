import { InputType, Field, Float } from '@nestjs/graphql';
import { GraphQLDate } from 'graphql-scalars';
import {
  IsOptional,
  IsString,
  IsNumber,
  IsDate,
  IsBoolean,
  IsDefined,
} from 'class-validator';

@InputType()
export class CreateManyPopCritValuesInput {
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

  // Create with connect / One to many / Only one 📦
  @Field(() => String, {
    name: 'popCriteriaId',
    description: 'Related PopCriteria field',
    nullable: false,
  })
  @IsDefined()
  @IsString()
  popCriteriaId: string;
}
