import { ArgsType, Field, Float } from '@nestjs/graphql';
import { IsDefined, IsNumber } from 'class-validator';

@ArgsType()
export class JobParamsArgs {
  @Field(() => Float, {
    name: 'num',
    description: 'First number value',
    nullable: true,
  })
  @IsDefined()
  @IsNumber()
  num: number;

  @Field(() => Float, {
    name: 'num2',
    description: 'Second number value',
    nullable: true,
  })
  @IsDefined()
  @IsNumber()
  num2: number;
}
