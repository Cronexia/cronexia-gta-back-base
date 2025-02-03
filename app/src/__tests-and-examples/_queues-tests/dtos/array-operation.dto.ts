import { ArgsType, Field, Float } from '@nestjs/graphql';
import { ArrayNotEmpty, IsArray } from 'class-validator';

@ArgsType()
export class ArrayOperationDto {
  @Field(() => [Float], {
    name: 'data',
    description: 'Array of float values',
    nullable: true,
  })
  @IsArray()
  @ArrayNotEmpty()
  data: number[];
}
