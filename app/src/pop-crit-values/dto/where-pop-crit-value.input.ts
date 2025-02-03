import { InputType, Field, Float } from '@nestjs/graphql';
import { GraphQLDate } from 'graphql-scalars';
import {
  IsOptional,
  IsString,
  IsNumber,
  IsDate,
  IsBoolean,
} from 'class-validator';

@InputType({
  description: `🔍 Search by native field/column/property`,
})
export class PopCritValueWhereInput {
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
}
