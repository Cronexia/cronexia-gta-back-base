import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

// Dual type, but needs different names
@ArgsType()
@InputType('FindUniquePopulationInput')
export class FindUniquePopulation {
  @Field(() => String, {
    name: 'id',
    description: `🔍 Search by unique ID`,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  id?: string;

  // * Only unique values (ID or @unique)
  @Field(() => String, {
    name: 'name',
    description: '🔍 Search by unique name',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  name?: string;
}
